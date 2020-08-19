import { ModuleWithProviders } from '@angular/core';
export * from './data/catalog';
export * from './data/mapped-layer';
export * from './data/tree';
export * from './data/bounds';
export * from './data/actions';
export * from './wms.service';
export * from './projection.service';
export * from './map-view.service';
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
export * from './tree-filter.service';
export * from './parsing/csv';
export declare class MapWaldCoreModule {
    static forRoot(moduleInitialisation: any): ModuleWithProviders<MapWaldCoreModule>;
}
