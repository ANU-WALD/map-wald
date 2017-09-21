import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Catalog } from "./data/catalog";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CatalogService {
  constructor(private _http:HttpClient){
    
  }

  current:Catalog;
  
  load(catalogJSON:any){
    this.current = new Catalog(catalogJSON);
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
}