import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { LatLng } from '@agm/core';
import { OpendapService } from './opendap.service';
import { MetadataService, LAT_NAMES, LNG_NAMES, TIME_NAMES } from './metadata.service';
import { DapDDX, DapDAS, DapData } from 'dap-query-js/dist/dap-query';
import { CatalogHost, Layer } from './data/catalog';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

export interface TimeSeries{
  dates:Array<Date>;
  values:Array<number>;
  label?:string;
  tags?:{
    [key:string]:any
  };
  style?:string;
  units?:string;
  [key:string]:any;
}

export interface SimpleLatLng{
  lat:number,
  lng:number
};

@Injectable()
export class TimeseriesService {

  constructor(private metadata:MetadataService,private dap:OpendapService) {

  }

  getTimeseries(host:CatalogHost,file:string,variable:string,
                pt:(LatLng|SimpleLatLng),additionalIndices:any,
                fillValue?:number):Observable<TimeSeries>{
    additionalIndices = additionalIndices || {};
    var url = this.dap.makeURL(host,file);
    var ddx$ = this.metadata.ddxForUrl(url);
    var das$ = this.metadata.dasForUrl(url);
    var variable = variable;
    return forkJoin(ddx$,das$,this.metadata.getGrid(host,file)).pipe(switchMap(
      ([ddx,das,latsAndLngs])=>{
        const lats:number[] = (<number[][]>latsAndLngs)[0];
        const lngs:number[] = (<number[][]>latsAndLngs)[1];
      var latIndex = this.indexInDimension((<any>pt).lat,lats);
      var lngIndex = this.indexInDimension((<any>pt).lng,lngs);
      if(fillValue===undefined){
        fillValue = +(<DapDDX>ddx).variables[variable]._FillValue;
      }
      var query = this.makeTimeQuery(<DapDDX>ddx,variable,latIndex,lngIndex,additionalIndices);
      return this.dap.getData(`${url}.ascii?${variable}${query}`,<DapDAS>das)
    }),map((data:DapData)=>{
      let vals = (<number[]> data[variable]);
      if(!vals.length){
        vals = [<number>data[variable]];
      }
      return {
        dates:<Array<Date>> (data.time||data.t),
        values:vals.map(v=>(v===fillValue)?NaN:v)
      };
    }));
  }

  getTimeseriesForLayer(ml:MappedLayer,pt:LatLng):Observable<TimeSeries>{
    return this.getTimeseries(ml.flattenedSettings.host,
                              ml.interpolatedFile,
                              ml.flattenedSettings.layer||ml.flattenedSettings.variable,
                              pt,
                              null,
                              ml.flattenedSettings.fillValue);
  }


  makeTimeQuery(ddx:DapDDX,variable:string,latIndex:number,lngIndex:number,additionalIndices:any):string{
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
        query += this.dapRangeQuery(additionalIndices[dName]||0);
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
