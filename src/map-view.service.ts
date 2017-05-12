import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class MapViewParameterService {
  constructor(names?:Array<string>) {
    this.parameterNames=names||[];
  }

  parameterNames:Array<string> = [];

  retrieveFromRoute(route:any){
    var result:any = {};
    for(var name of this.parameterNames){
        result[name] = route.snapshot.params[name];
    }
    return result;
  };

  constructRoute(parameters:any){
    return this.parameterNames.map(n=>parameters[n]||'_').join('/');
  }

  routerPaths(component:any):Array<any>{
    var result:Array<any> = [];
    var path = '';
    result.push({path:path,component:component});
    for(var name of this.parameterNames){
      path += `:${name}`;
      result.unshift({path:path,component:component});
      path += '/';
    }
    console.log(result);
    return result;
  }
}
