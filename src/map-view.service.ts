import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable()
export class MapViewParameterService {
  constructor() {
  }

  static parameterNames:Array<string> = [];

  retrieveFromRoute(route:any){
    var result:any = {};
    for(var name of MapViewParameterService.parameterNames){
        result[name] = route.snapshot.params[name];
    }
    return result;
  };

  constructRoute(parameters:any){
    return MapViewParameterService.parameterNames.map(n=>parameters[n]||'_').join('/');
  }

  routerPaths(/*component:any*/):Array<any>{
    var result:Array<any> = [];
    var path = '';
    result.push(path);
//    result.push({path:path,component:component});
    for(var name of MapViewParameterService.parameterNames){
      path += `:${name}`;
//      result.unshift({path:path,component:component});
      result.unshift(path);
      path += '/';
    }
    return result;
  }
}
