import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Catalog, Layer } from "./data/catalog";
import { Observable } from 'rxjs';
import { Bounds } from './data/bounds';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';

@Injectable()
export class CatalogService {
  constructor(private _http:HttpClient, private metadata:MetadataService){
    
  }

  current:Catalog;
  
  load(catalogJSON:any){
    this.current = new Catalog(catalogJSON);

    this.current.allLayers().filter(l=>l.options.smallExtent).forEach(l=>{
      l.spatialExtent = this.findExtentOfLayer(l)
    });
  }

  loadFrom(path:string):Observable<Catalog>{
    var result = new Promise<Catalog>((res,rej)=>{
        this._http.get(path).subscribe(json=>{
          this.load(json);
          res(this.current);
        });
      });

    return Observable.fromPromise(result);
  }

  findExtentOfLayer(l: Layer):Observable<Bounds>{
    const tmp = new MappedLayer();
    tmp.layer = l;
    tmp.update();
    return this.metadata.getSpatialExtent(tmp);
  }
}