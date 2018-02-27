import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { DapDDX, DapDAS } from 'dap-query-js/dist/dap-query';
import { Observable } from 'rxjs/Observable';
import { OpendapService } from './opendap.service';
import { Bounds } from './data/bounds';

import 'rxjs/add/operator/publishReplay';
import { CatalogHost } from '../index';

export const LAT_NAMES=['latitude','lat'];
export const LNG_NAMES=['longitude','lng','lon'];
export const TIME_NAMES=['time','t'];

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

  getDDX(host:CatalogHost,file:string):Observable<DapDDX>{
    var url = this.dap.makeURL(host,file);

    if(!this.ddxCache[url]){
      this.ddxCache[url] = 
        this.dap.getDDX(url).publishReplay().refCount();
    }

    return this.ddxCache[url];
}

  getDDXForLayer(ml:MappedLayer):Observable<DapDDX>{
    return this.getDDX(ml.flattenedSettings.host,ml.interpolatedFile);
  }

  getDAS(host:CatalogHost,file:string):Observable<DapDAS>{
    var url = this.dap.makeURL(host,file);

    if(!this.dasCache[url]){
      this.dasCache[url] = 
        this.dap.getDAS(url).publishReplay().refCount();
    }

    return this.dasCache[url];
  }

  getDASForLayer(ml:MappedLayer):Observable<DapDAS>{
    return this.getDAS(ml.flattenedSettings.host,ml.interpolatedFile);
  }

  populateMetadata(ml:MappedLayer){
    if(ml.flattenedSettings.host.software !=='tds'){
      ml.retrievedMetadata={};
      return;
    }

    this.getDDXForLayer(ml).subscribe(ddx=>{
      var entry = ddx.variables[ml.flattenedSettings.variable];
      ml.retrievedMetadata = entry;
    })
  }

  getGrid(host:CatalogHost,file:string):Observable<Array<Array<number>>>{
    var ddx$ = this.getDDX(host,file);
    var das$ = this.getDAS(host,file);
    var url = this.dap.makeURL(host,file);

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

  getGridForLayer(ml:MappedLayer):Observable<Array<Array<number>>>{
    return this.getGrid(ml.flattenedSettings.host,ml.interpolatedFile);
  }

    getSpatialExtent(ml:MappedLayer):Observable<Bounds>{
      return this.getGridForLayer(ml).map(([lats,lngs])=>{
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
