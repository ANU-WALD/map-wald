import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { DapDDX, DapDAS } from 'dap-query-js/dist/dap-query';
import { Observable } from 'rxjs/Observable';
import { OpendapService } from './opendap.service';
import { Bounds } from './data/bounds';

import 'rxjs/add/operator/publishReplay';

export const LAT_NAMES=['latitude','lat'];
export const LNG_NAMES=['longitude','lng','lon'];

@Injectable()
export class MetadataService {
  ddxCache:{[key:string]:Observable<DapDDX>}={}
  dasCache:{[key:string]:Observable<DapDAS>}={}

  constructor(private dap:OpendapService) {

  }

  identifyCoordinate(ddx:DapDDX,...possibleNames:Array<string>):string{
    for(let n of possibleNames){
      if(ddx.variables[n]){
        return n;
      }
    }
    return undefined;
  }

  getDDX(ml:MappedLayer):Observable<DapDDX>{
    var url = this.dap.makeURL(ml.flattenedSettings.host,ml.interpolatedFile);
    
        if(!this.ddxCache[url]){
          this.ddxCache[url] = 
            this.dap.getDDX(url).publishReplay().refCount();
        }
    
        return this.ddxCache[url];
  }

  getDAS(ml:MappedLayer):Observable<DapDAS>{
    var url = this.dap.makeURL(ml.flattenedSettings.host,ml.interpolatedFile);
    
        if(!this.dasCache[url]){
          this.dasCache[url] = 
            this.dap.getDAS(url).publishReplay().refCount();
        }
    
        return this.dasCache[url];
  }

  populateMetadata(ml:MappedLayer){
    if(ml.flattenedSettings.host.software !=='tds'){
      ml.retrievedMetadata={};
      return;
    }

    this.getDDX(ml).subscribe(ddx=>{
      var entry = ddx.variables[ml.flattenedSettings.variable];
      ml.retrievedMetadata = entry;
    })
  }

  getGrid(ml:MappedLayer):Observable<Array<Array<number>>>{

    var ddx$ = this.getDDX(ml);
    var das$ = this.getDAS(ml);
    var url = this.dap.makeURL(ml.flattenedSettings.host,ml.interpolatedFile);

    return Observable.forkJoin([ddx$,das$])
      .switchMap(metadata=>{
        var ddx:DapDDX = metadata[0];
        var das:DapDAS = metadata[1];

        var latCoord = this.identifyCoordinate(ddx,...LAT_NAMES);
        var lngCoord = this.identifyCoordinate(ddx,...LNG_NAMES);

        var lat$ = 
          this.dap.getData(`${url}.ascii?${latCoord}`,das).map(dd=><Array<number>>dd[latCoord]);
        var lng$ =
          this.dap.getData(`${url}.ascii?${lngCoord}`,das).map(dd=><Array<number>>dd[lngCoord]);
        
        return Observable.forkJoin([lat$,lng$])
      }).publishReplay().refCount();
    }

    getSpatialExtent(ml:MappedLayer):Observable<Bounds>{
      return this.getGrid(ml).map(([lats,lngs])=>{
        var result:Bounds = {
          east: Math.max(...lngs),
          west: Math.min(...lngs),
          north: Math.max(...lats),
          south: Math.min(...lats)
        };
        return result;
      }).publishReplay().refCount();
  }
}
