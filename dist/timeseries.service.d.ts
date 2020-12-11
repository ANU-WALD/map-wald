import { MappedLayer } from './data/mapped-layer';
import { OpendapService } from './opendap.service';
import { MetadataService } from './metadata.service';
import { DapDDX } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
import { UTCDate } from './time-utils.service';
import * as ɵngcc0 from '@angular/core';
export interface LatLng {
    lat(): number;
    lng(): number;
    toJSON(): any;
    toString(): string;
}
export interface TimeSeries {
    dates: Array<UTCDate>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TimeseriesService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TimeseriesService>;
}

//# sourceMappingURL=timeseries.service.d.ts.map