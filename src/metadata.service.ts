import { Injectable } from '@angular/core';
import { MappedLayer } from './data/mapped-layer';
import { DapDDX } from 'dap-query-js/dist/dap-query';
import { Observable } from 'rxjs/Observable';
import { OpendapService } from './opendap.service';

import 'rxjs/add/operator/publishReplay';

@Injectable()
export class MetadataService {
  metadataCache:{[key:string]:Observable<DapDDX>}={}

  constructor(private dap:OpendapService) {

  }

  populateMetadata(ml:MappedLayer){
    if(ml.flattenedSettings.host.software !=='tds'){
      ml.retrievedMetadata={};
      return;
    }

    var url = this.dap.makeURL(ml.flattenedSettings.host,ml.interpolatedFile);

    if(!this.metadataCache[url]){
      this.metadataCache[url] = 
        this.dap.getDDX(url).publishReplay().refCount();
    }

    this.metadataCache[url].subscribe(ddx=>{
      var entry = ddx.variables[ml.flattenedSettings.variable];
      ml.retrievedMetadata = entry;
    })
  }
}
