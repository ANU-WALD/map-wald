import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';

import { CommonModule } from '@angular/common';
import { SampleComponent } from './src/sample.component';
import { SampleDirective } from './src/sample.directive';
import { SamplePipe } from './src/sample.pipe';
//import { CSVService } from './src/csv.service';

import {CatalogService} from './src/catalog.service';
import { MapViewParameterService } from './src/map-view.service';
import { WMSService } from './src/wms.service';
import {GeocodingService} from './src/geocoding.service';
import {InterpolationService} from './src/interpolation.service';
import { ProjectionService } from './src/projection.service';

import { WMSLayerComponent } from './src/wms-layer/wms-layer.component';
import { MapLegendComponent } from './src/map-legend/map-legend.component';
import { MapControlComponent } from './src/map-control/map-control.component';
//$importList
import { FeatureTableComponent } from './src/feature-table/feature-table.component';
import { CollapsibleMapControlComponent } from './src/collapsible-map-control/collapsible-map-control.component';
import { StaticDataService } from './src/static-data.service';
import { MetadataService } from './src/metadata.service';
import { OpendapService } from './src/opendap.service';
import { BaseMapSelectionComponent } from './src/base-map-selection/base-map-selection.component';
import { SimpleTreeNodeComponent } from './src/simple-tree-node/simple-tree-node.component';
import { SimpleTreeComponent } from './src/simple-tree/simple-tree.component';
import { CatalogComponent } from './src/catalog/catalog.component';
import { PaletteService } from './src//palette.service';
import { TimeUtilsService } from './src//time-utils.service';
import { DateSelectionComponent } from './src/date-selection/date-selection.component';
import { LayerPropertiesComponent } from './src/layer-properties/layer-properties.component';
import { LayerControlComponent } from './src/layer-control/layer-control.component';
import { LayeredMapComponent } from './src/layered-map/layered-map.component';
import { ThemeNavbarComponent } from './src/theme-navbar/theme-navbar.component';

export * from './src/data/catalog';
export * from './src/data/mapped-layer';
export * from './src/data/tree';
export * from './src/sample.component';
export * from './src/sample.directive';
export * from './src/sample.pipe';
export * from './src/catalog.service';

export * from './src/wms.service';
export * from './src/projection.service';
export * from './src/map-view.service';
export * from './src/geocoding.service';
export * from './src/interpolation.service';
export * from './src/wms-layer/wms-layer.component';
export * from './src/map-legend/map-legend.component';
//$exportList
export * from './src/feature-table/feature-table.component';
export * from './src/collapsible-map-control/collapsible-map-control.component';
export * from './src//static-data.service';
export * from './src//metadata.service';
export * from './src//opendap.service';
export * from './src/base-map-selection/base-map-selection.component';
export * from './src/simple-tree-node/simple-tree-node.component';
export * from './src/simple-tree/simple-tree.component';
export * from './src/catalog/catalog.component';
export * from './src//palette.service';
export * from './src//time-utils.service';
export * from './src/date-selection/date-selection.component';
export * from './src/layer-properties/layer-properties.component';
export * from './src/layer-control/layer-control.component';
export * from './src/layered-map/layered-map.component';
export * from './src/theme-navbar/theme-navbar.component';

export const services = [
  //$serviceList
  StaticDataService,
  MetadataService,
  OpendapService,
  PaletteService,
  TimeUtilsService,
  WMSService,
  MapViewParameterService,
  ProjectionService,
  GeocodingService,
  InterpolationService,
  CatalogService
];

export const components = [
  //$componentList
  FeatureTableComponent,
  CollapsibleMapControlComponent,
  BaseMapSelectionComponent,
  SimpleTreeNodeComponent,
  SimpleTreeComponent,
  CatalogComponent,
  DateSelectionComponent,
  LayerPropertiesComponent,
  LayerControlComponent,
  LayeredMapComponent,
  ThemeNavbarComponent,
  WMSLayerComponent,
  MapLegendComponent,
  MapControlComponent,
  SampleComponent,
  SampleDirective,
  SamplePipe
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    HttpClientModule,
    NgPipesModule,
    NgbModule
  ],
  declarations: components,
  exports: components,
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
