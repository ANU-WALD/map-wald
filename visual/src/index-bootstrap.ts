import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MapWaldCoreModule } from 'map-wald/core';

import { WMSLayerComponent } from './wms-layer/wms-layer.component';
import { MapLegendComponent } from './map-legend/map-legend.component';
import { MapControlComponent } from './map-control/map-control.component';
import { DateShifterComponent } from './date-shifter/date-shifter.component';
import { OneTimeSplashComponent } from './one-time-splash/one-time-splash.component';
import { DateElementComponent } from './date-element/date-element.component';
import { ShareViewComponent } from './share-view/share-view.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { ZoomLayerComponent } from './action-buttons/zoom-layer/zoom-layer.component';
import { ZoomFullComponent } from './action-buttons/zoom-full/zoom-full.component';
import { ZoomOutComponent } from './action-buttons/zoom-out/zoom-out.component';
import { ZoomInComponent } from './action-buttons/zoom-in/zoom-in.component';
import {CycleBaseMapComponent} from './action-buttons/cycle-base-map/cycle-base-map.component';
import {CycleOpacityComponent} from './action-buttons/cycle-opacity/cycle-opacity.component';
import { ButtonBarComponent } from './button-bar/button-bar.component';
import { TimeseriesChartComponent } from './timeseries-chart/timeseries-chart.component';
import { FeatureTableComponent } from './feature-table/feature-table.component';
import { CollapsibleMapControlComponent } from './collapsible-map-control/collapsible-map-control.component';
import { BaseMapSelectionComponent } from './base-map-selection/base-map-selection.component';
import { SimpleTreeNodeComponent } from './simple-tree-node/simple-tree-node.component';
import { SimpleTreeComponent } from './simple-tree/simple-tree.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { LayerPropertiesComponent } from './layer-properties/layer-properties.component';
import { LayerControlComponent } from './layer-control/layer-control.component';
import { LayeredMapComponent } from './layered-map/layered-map.component';
import { ThemeNavbarComponent } from './theme-navbar/theme-navbar.component';

import { GeocodingService } from './geocoding.service';

export * from './wms-layer/wms-layer.component';
export * from './map-legend/map-legend.component';
export * from './date-shifter/date-shifter.component';
export * from './one-time-splash/one-time-splash.component';
export * from './date-element/date-element.component';
export * from './share-view/share-view.component';
export * from './location-search/location-search.component';
export * from './action-buttons/zoom-layer/zoom-layer.component';
export * from './action-buttons/zoom-full/zoom-full.component';
export * from './action-buttons/zoom-out/zoom-out.component';
export * from './action-buttons/zoom-in/zoom-in.component';
export * from './action-buttons/cycle-base-map/cycle-base-map.component';
export * from './action-buttons/cycle-opacity/cycle-opacity.component';

export * from './button-bar/button-bar.component';
export * from './timeseries-chart/timeseries-chart.component';
export * from './feature-table/feature-table.component';
export * from './collapsible-map-control/collapsible-map-control.component';
export * from './base-map-selection/base-map-selection.component';
export * from './simple-tree-node/simple-tree-node.component';
export * from './simple-tree/simple-tree.component';
export * from './catalog/catalog.component';
export * from './date-selection/date-selection.component';
export * from './layer-properties/layer-properties.component';
export * from './layer-control/layer-control.component';
export * from './layered-map/layered-map.component';
export * from './theme-navbar/theme-navbar.component';
export * from './map-control/map-control.component';

export * from './geocoding.service';


const components = [
  //$componentList
  DateShifterComponent,
  OneTimeSplashComponent,
  DateElementComponent,
  ShareViewComponent,
  LocationSearchComponent,
  ZoomLayerComponent,
  ZoomFullComponent,
  ZoomOutComponent,
  ZoomInComponent,
  CycleBaseMapComponent,
  CycleOpacityComponent,
  ButtonBarComponent,
  TimeseriesChartComponent,
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
  MapControlComponent
];

const services = [
  //$serviceList
  GeocodingService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    HttpClientModule,
    NgPipesModule,
    NgbModule,
    MapWaldCoreModule
  ],
  declarations: components,
  exports: components,
  providers: services
})
export class MapWaldBootstrapModule {
  static forRoot(moduleInitialisation:any): ModuleWithProviders {
    return {
      ngModule: MapWaldBootstrapModule,
      providers: services
    };
  }
}
