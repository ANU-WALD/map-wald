import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { LatLng } from '@agm/core';
import { OpendapService } from './opendap.service';
import { MetadataService, LAT_NAMES, LNG_NAMES } from './metadata.service';
import { Observable } from 'rxjs/Observable';
import { DapDDX, DapDAS, DapData } from 'dap-query-js/dist/dap-query';

export interface TimeSeries{
  dates:Array<Date>;
  values:Array<number>;
}

@Injectable()
export class TimeseriesService {

  constructor(private metadata:MetadataService,private dap:OpendapService) {

  }

  getTimeseries(ml:MappedLayer,pt:LatLng):Observable<TimeSeries>{
    var ddx$ = this.metadata.getDDX(ml);
    var das$ = this.metadata.getDAS(ml);
    var url = this.dap.makeURL(ml.flattenedSettings.host,ml.interpolatedFile);
    var variable = ml.flattenedSettings.variable;
    return Observable.forkJoin(ddx$,das$,this.metadata.getGrid(ml)).switchMap(
      ([ddx,das,[lats,lngs]])=>{
      var latIndex = this.indexInDimension((<any>pt).lat,lats,true);
      var lngIndex = this.indexInDimension((<any>pt).lng,lngs,false);

      var query = this.makeTimeQuery(ddx,variable,latIndex,lngIndex);
      return this.dap.getData(`${url}.ascii?${variable}${query}`,das)
    }).map((data:DapData)=>{
      return {
        dates:<Array<Date>> data.time,
        values:<Array<number>> data[variable]
      };
    })
  }


  makeTimeQuery(ddx:DapDDX,variable:string,latIndex:number,lngIndex:number):string{
    var metadata = ddx.variables[variable];
    var query='';

    metadata.dimensions.forEach((dim:any)=>{
      var dName:string = dim.name.toLowerCase();
      if(dName==='time'){
        query += this.dapRangeQuery(0,+(dim.size)-1);
      } else if(LAT_NAMES.indexOf(dName)>=0){
          query += this.dapRangeQuery(latIndex);
      } else if(LNG_NAMES.indexOf(dName)>=0){
        query += this.dapRangeQuery(lngIndex);
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

  indexInDimension(c:number,dim:Array<number>,rev?:boolean,trim?:number):number{
    var minIndex = 0;
    var maxIndex = dim.length-1;

    if(trim){
      maxIndex-=trim;
    }

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
