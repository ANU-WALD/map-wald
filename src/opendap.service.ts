import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseData, parseDAS,parseDDX, makeQuery, 
  simplify, DapData, DapDAS, DapDDX,  DimensionSlices, DapVariableDataArray } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from '../index';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Injectable()
export class OpendapService {

  constructor(private http:HttpClient) {

  }

  makeURL(host:CatalogHost,filepath:string):string{
    return host.url + '/dodsC/' + filepath;
  }

  get(url:string):Observable<string>{
    return this.http.get(url,{ responseType: 'text' })
  }

  getData(queryUrl:string,das:DapDAS):Observable<DapData>{
    return this.get(queryUrl)
      .map(txt=>simplify(parseData(txt,das)));
  }

  getDAS(url:string):Observable<DapDAS>{
    return this.get(url+'.das')
      .map(parseDAS);
  }

  getDDX(url:string):Observable<DapDDX>{
    return this.get(url+'.ddx')
      .map(parseDDX);
  }

  getExtent(url:string):Observable<Array<number>>{
    console.log(url);
    return Observable.forkJoin([
      this.getDAS(url),
      this.getDDX(url)
    ]).switchMap(x=>{
      console.log(x);
      var das:DapDAS = x[0];
      return Observable.forkJoin([
        this.getData(url+'.ascii?latitude',das),
        this.getData(url+'.ascii?longitude',das)
      ])})
      .map((ll:DapData[])=>{
        var lats = <DapVariableDataArray>ll[0].latitude;
        var lons = <DapVariableDataArray>ll[1].longitude;
        return [<number>lats[0],<number>lats[lats.length-1],
                <number>lons[0],<number>lons[lons.length-1]];
      });
  }
}
