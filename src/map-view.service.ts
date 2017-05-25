import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Injectable()
export class MapViewParameterService {
  constructor(private _location?: Location) {

  }

  static parameterNames:Array<string> = [];

  current():any{
    if(!this._location){
      return {};
    }

    var path = this._location.path().split('/');
    if(path.length>MapViewParameterService.parameterNames.length){
      path.shift();
    }
    var result:any = {};
    MapViewParameterService.parameterNames.forEach((p,i)=>result[p]=path[i]||'_');
    return result;
  }

  update(changes:any){
    if(!this._location){
      return;
    }

    var updated = this.current();
    Object.assign(updated,changes);
    this._location.go(this.constructRoute(updated));
  }

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
