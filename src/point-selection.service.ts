import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { PointData, Catalog } from './data/catalog';
import { Feature, GeometryObject } from 'geojson';
import { InterpolationService } from './interpolation.service';
import { MetadataService } from './metadata.service';
import { map } from 'rxjs/operators';

export interface PointSelection {
  catalog: PointData,
  variable:string,
  feature:Feature<GeometryObject>,
  tags: {[key:string]:string}
}

@Injectable()
export class PointSelectionService {
  private latestPointSelectionSource = new BehaviorSubject<PointSelection>(null);
  latestPointSelection:Observable<PointSelection> = this.latestPointSelectionSource.asObservable();

  constructor(private meta: MetadataService) {

  }
  private unchanged(current:PointSelection,updated:PointSelection){
    if(!current && !updated){
      return true;
    }

    if(!current || !updated){
      return false;
    }

    if(current.variable !== updated.variable){
      return false;
    }

    if(!Object.keys(current.tags).every(t=>current.tags[t]===updated.tags[t])){
      return false;
    }

    if(current.catalog.url!==updated.catalog.url){
      return false;
    }

    return true;
    // return false; // TODO
  }

  pointSelection(sel: PointSelection) {
    let current = this.latestPointSelectionSource.getValue();
    if(this.unchanged(current,sel)){
      return;
    }

    let url = this.fullUrl(sel);
    if(!this.validUrl(url)){
      return; // Not a complete selection
    }

    if(!sel.variable){
      return; // Not a complete selection
    }

    this.latestPointSelectionSource.next(sel);
  }

  fullUrl(sel:PointSelection) {
    let params = Object.assign({},
                               sel.feature?sel.feature.properties:{},
                               sel.tags);
    return InterpolationService.interpolate(sel.catalog.url,params);
  }

  validUrl(url:string):boolean{
    return url.indexOf('{{')<0;
  }

  timeseriesVariables(sel:PointSelection):Observable<string[]>{
    let coords = sel.catalog.coordinates || {};
    let url = this.fullUrl(sel);
    if(!this.validUrl(url)){
      return of([]);
    }

    return this.meta.ddxForUrl(url).pipe(
      map(ddx=>{
        let variables = ddx.variables;
        return Object.keys(variables).filter(v=>{
          let dims:any[] = ddx.variables[v].dimensions;
          return Object.keys(coords).every(coord=>{
            return dims.find(dim=>dim.name===coord);
          });
        });
      })
    );
  }
}
