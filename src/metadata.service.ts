import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { DapDDX, DapDAS } from 'dap-query-js/dist/dap-query';
import { Observable } from 'rxjs/Observable';
import { OpendapService } from './opendap.service';

import 'rxjs/add/operator/publishReplay';

@Injectable()
export class MetadataService {
  ddxCache:{[key:string]:Observable<DapDDX>}={}
  dasCache:{[key:string]:Observable<DapDAS>}={}
  
  constructor(private dap:OpendapService) {

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
}
