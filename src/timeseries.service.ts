import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { LatLng } from '@agm/core';
import { OpendapService } from './opendap.service';
import { MetadataService, LAT_NAMES, LNG_NAMES, TIME_NAMES } from './metadata.service';
import { Observable } from 'rxjs/Observable';
import { DapDDX, DapDAS, DapData } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from './data/catalog';

export interface TimeSeries{
  dates:Array<Date>;
  values:Array<number>;
}

export interface SimpleLatLng{
  lat:number,
  lng:number
};

@Injectable()
export class TimeseriesService {

  constructor(private metadata:MetadataService,private dap:OpendapService) {

  }

  getTimeseries(host:CatalogHost,file:string,variable:string,pt:(LatLng|SimpleLatLng)):Observable<TimeSeries>{
    var ddx$ = this.metadata.getDDX(host,file);
    var das$ = this.metadata.getDAS(host,file);
    var url = this.dap.makeURL(host,file);
    var variable = variable;
    return Observable.forkJoin(ddx$,das$,this.metadata.getGrid(host,file)).switchMap(
      ([ddx,das,[lats,lngs]])=>{
      var latIndex = this.indexInDimension((<any>pt).lat,lats);
      var lngIndex = this.indexInDimension((<any>pt).lng,lngs);

      var query = this.makeTimeQuery(ddx,variable,latIndex,lngIndex);
      return this.dap.getData(`${url}.ascii?${variable}${query}`,das)
    }).map((data:DapData)=>{
      return {
        dates:<Array<Date>> (data.time||data.t),
        values:<Array<number>> data[variable]
      };
    })
  }

  getTimeseriesForLayer(ml:MappedLayer,pt:LatLng):Observable<TimeSeries>{
    return this.getTimeseries(ml.flattenedSettings.host,ml.interpolatedFile,ml.flattenedSettings.variable,pt);
  }


  makeTimeQuery(ddx:DapDDX,variable:string,latIndex:number,lngIndex:number):string{
    var metadata = ddx.variables[variable];
    var query='';

    metadata.dimensions.forEach((dim:any)=>{
      var dName:string = dim.name.toLowerCase();
      if(TIME_NAMES.indexOf(dName)>=0){
        query += this.dapRangeQuery(0,+(dim.size)-1);
      } else if(LAT_NAMES.indexOf(dName)>=0){
          query += this.dapRangeQuery(latIndex);
      } else if(LNG_NAMES.indexOf(dName)>=0){
        query += this.dapRangeQuery(lngIndex);
      } else { 
        query += this.dapRangeQuery(0);
      }
    });
    return query;
  }

  dapRangeQuery(from:number,to?:number,step?:number):string{
    step = step || 1;
    if(to===undefined){
      to = from;
    }
    return '['+from+':'+step+':'+to+']';
  }

  indexInDimension(c:number,dim:Array<number>,trim?:number):number{
    var minIndex = 0;
    var maxIndex = dim.length-1;

    if(trim){
      maxIndex-=trim;
    }
    
    const rev = dim[0] > dim[dim.length-1];
    if(rev){
      minIndex = maxIndex;
      maxIndex = 0;
    }
    var currentIndex;

    while((minIndex<=maxIndex)||(rev&&(maxIndex<=minIndex))){
      if(c<=dim[minIndex]){
        return minIndex;
      }

      if(c>=dim[maxIndex]){
        return maxIndex;
      }

      currentIndex = Math.floor((minIndex + maxIndex) / 2);

      var d1 = Math.abs(dim[currentIndex]-c);
      var d2 = Math.abs(dim[currentIndex+1]-c);

      if(rev){
        if (d2 <= d1) {
            maxIndex = currentIndex + 1;
        } else {
            minIndex = currentIndex;
        }
      } else {
        if (d2 <= d1) {
            minIndex = currentIndex + 1;
        } else {
            maxIndex = currentIndex;
        }
      }
    }
    return currentIndex;
  };

}
