import { MappedLayer } from './data/mapped-layer';
import { LatLng } from '@agm/core';
import { OpendapService } from './opendap.service';
import { MetadataService } from './metadata.service';
import { DapDDX } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
export interface TimeSeries {
    dates: Array<Date>;
    values: Array<number>;
    label?: string;
    tags?: {
        [key: string]: any;
    };
    style?: string;
    units?: string;
    [key: string]: any;
}
export interface SimpleLatLng {
    lat: number;
    lng: number;
}
export declare class TimeseriesService {
    private metadata;
    private dap;
    constructor(metadata: MetadataService, dap: OpendapService);
    getTimeseries(host: CatalogHost, file: string, variable: string, pt: (LatLng | SimpleLatLng), additionalIndices: any, fillValue?: number): Observable<TimeSeries>;
    getTimeseriesForLayer(ml: MappedLayer, pt: LatLng): Observable<TimeSeries>;
    makeTimeQuery(ddx: DapDDX, variable: string, latIndex: number, lngIndex: number, additionalIndices: any): string;
    dapRangeQuery(from: number, to?: number, step?: number): string;
    indexInDimension(c: number, dim: Array<number>, trim?: number): number;
}
