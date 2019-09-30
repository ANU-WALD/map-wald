import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { TreeFilterService } from './tree-filter.service';
import { PaletteService } from './palette.service';
import { TimeUtilsService } from './time-utils.service';
import { StaticDataService } from './static-data.service';
import { MetadataService } from './metadata.service';
import { OpendapService } from './opendap.service';
import { TimeseriesService } from './timeseries.service';
import { PointSelectionService } from './point-selection.service';
import { AvailableDatesService } from './available-dates.service';
import { CatalogService } from './catalog.service';
import { MapViewParameterService } from './map-view.service';
import { WMSService } from './wms.service';
import { GeocodingService } from './geocoding.service';
import { ProjectionService } from './projection.service';

export * from './data/catalog';
export * from './data/mapped-layer';
export * from './data/tree';
export * from './data/bounds';
export * from './data/actions';

export * from './wms.service';
export * from './projection.service';
export * from './map-view.service';
export * from './geocoding.service';
export * from './interpolation.service';
export * from './available-dates.service';
export * from './point-selection.service';
export * from './metadata.service';
export * from './catalog.service';
export * from './palette.service';
export * from './static-data.service';
export * from './opendap.service';
export * from './timeseries.service';
export * from './time-utils.service';

export const services = [
  //$serviceList
  AvailableDatesService,
  PointSelectionService,
  TimeseriesService,
  StaticDataService,
  MetadataService,
  OpendapService,
  PaletteService,
  TimeUtilsService,
  WMSService,
  MapViewParameterService,
  ProjectionService,
  GeocodingService,
  CatalogService,
  TreeFilterService
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    HttpClientModule
  ],
  declarations: [],
  exports: [],
  providers: services
})
export class MapWaldCoreModule {
  static forRoot(moduleInitialisation: any): ModuleWithProviders {
    return {
      ngModule: MapWaldCoreModule,
      providers: services
    };
  }
}

