import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { SampleComponent } from './src/sample.component';
import { SampleDirective } from './src/sample.directive';
import { SamplePipe } from './src/sample.pipe';
//import { CSVService } from './src/csv.service';
import { MapViewParameterService } from './src/map-view.service';
import { WMSService } from './src/wms.service';
import {GeocodingService} from './src/geocoding.service';
import {InterpolationService} from './src/interpolation.service';
import { ProjectionService } from './src/projection.service';
import { WMSLayerComponent } from './src/wms-layer/wms-layer.component';
import { MapLegendComponent } from './src/map-legend/map-legend.component';
import { MapControlComponent } from './src/map-control/map-control.component';
import { AgmCoreModule } from '@agm/core';

export * from './src/sample.component';
export * from './src/sample.directive';
export * from './src/sample.pipe';
export * from './src/wms.service';
export * from './src/projection.service';
export * from './src/map-view.service';
export * from './src/geocoding.service';
export * from './src/interpolation.service';
export * from './src/wms-layer/wms-layer.component';
export * from './src/map-legend/map-legend.component';

const services = [
  WMSService,
  MapViewParameterService,
  ProjectionService,
  GeocodingService,
  InterpolationService
];

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    NgbModule
  ],
  declarations: [
    WMSLayerComponent,
    MapLegendComponent,
    MapControlComponent,
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  exports: [
    WMSLayerComponent,
    MapLegendComponent,
    MapControlComponent,
    SampleComponent,
    SampleDirective,
    SamplePipe
  ],
  providers: services
})
export class MapWaldModule {
  static forRoot(moduleInitialisation:any): ModuleWithProviders {
    return {
      ngModule: MapWaldModule,
      providers: services
    };
  }
}
