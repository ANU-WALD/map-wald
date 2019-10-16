import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';

import { CommonModule } from '@angular/common';
import { MapWaldCoreModule } from 'map-wald/core';
import { MapWaldBootstrapModule } from 'map-wald/visual';

// export * from '../core/src/index-core';
// export * from '../visual/src/index-bootstrap';

//import { CSVService } from './src/csv.service';

//$importList

//$exportList

export * from './parsing/csv';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    HttpClientModule,
    NgPipesModule,
    NgbModule,
    MapWaldBootstrapModule,
    MapWaldCoreModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class MapWaldModule {
  // static forRoot(moduleInitialisation:any): ModuleWithProviders {
  //   return {
  //     ngModule: MapWaldModule,
  //     providers: []
  //   };
  // }
}

