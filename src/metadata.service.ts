import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { DapDDX, DapDAS, DapData } from 'dap-query-js/dist/dap-query';
import { OpendapService } from './opendap.service';
import { Bounds } from './data/bounds';

import { CatalogHost } from '../index';
import { forkJoin, Observable } from 'rxjs';
import { switchMap, publishReplay, refCount, map, switchAll } from 'rxjs/operators';

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
        this.dap.getDDX(url).pipe(publishReplay(),refCount());
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
        this.dap.getDAS(url).pipe(publishReplay(),refCount());
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

  getGrid(host:CatalogHost,file:string):Observable<number[][]>{
    const ddx$ = this.getDDX(host,file);
    const das$ = this.getDAS(host,file);
    const url = this.dap.makeURL(host,file);

    const res$ = <Observable<number[][]>>forkJoin([ddx$,das$]).pipe(
      map((metadata:any[])=>{
        const ddx:DapDDX = metadata[0];
        const das:DapDAS = metadata[1];

        const latCoord = this.identifyCoordinate(ddx,...LAT_NAMES);
        const lngCoord = this.identifyCoordinate(ddx,...LNG_NAMES);

        const lat$ = 
          this.dap.getData(`${url}.ascii?${latCoord}`,das).pipe(
            map((dd:DapData)=><number[]>dd[latCoord]));
        const lng$ =
          this.dap.getData(`${url}.ascii?${lngCoord}`,das).pipe(
            map((dd:DapData)=><number[]>dd[lngCoord]));

        return forkJoin<number[]>([lat$,lng$]);
      }),switchAll(),publishReplay(),refCount());
      return res$;
  }

  getGridForLayer(ml:MappedLayer):Observable<Array<Array<number>>>{
    return this.getGrid(ml.flattenedSettings.host,ml.interpolatedFile);
  }

    getSpatialExtent(ml:MappedLayer):Observable<Bounds>{
      return this.getGridForLayer(ml).pipe(map(([lats,lngs])=>{
        var result:Bounds = {
          east: Math.max(...lngs),
          west: Math.min(...lngs),
          north: Math.max(...lats),
          south: Math.min(...lats)
        };
        return result;
      })).pipe(publishReplay(), refCount());
  }
}
