import { MappedLayer } from './data/mapped-layer';
import { DapDDX, DapDAS } from 'dap-query-js/dist/dap-query';
import { OpendapService } from './opendap.service';
import { Bounds } from './data/bounds';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
import { UTCDate } from './time-utils.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare const LAT_NAMES: string[];
export declare const LNG_NAMES: string[];
export declare const TIME_NAMES: string[];
export declare class MetadataService {
    private dap;
    ddxCache: {
        [key: string]: Observable<DapDDX>;
    };
    dasCache: {
        [key: string]: Observable<DapDAS>;
    };
    constructor(dap: OpendapService);
    identifyCoordinate(ddx: DapDDX, ...possibleNames: Array<string>): string;
    getDDX(host: CatalogHost, file: string): Observable<DapDDX>;
    ddxForUrl(url: string): Observable<DapDDX>;
    getDDXForLayer(ml: MappedLayer): Observable<DapDDX>;
    getDAS(host: CatalogHost, file: string): Observable<DapDAS>;
    dasForUrl(url: string): Observable<DapDAS>;
    getDASForLayer(ml: MappedLayer): Observable<DapDAS>;
    getMetadata(ml: MappedLayer): Observable<any>;
    populateMetadata(ml: MappedLayer): void;
    getGrid(host: CatalogHost, file: string): Observable<number[][]>;
    getGridForURL(url: string): Observable<number[][]>;
    getGridForLayer(ml: MappedLayer): Observable<Array<Array<number>>>;
    getSpatialExtent(ml: MappedLayer): Observable<Bounds>;
    getTimeDimension(host: CatalogHost, file: string): Observable<UTCDate[]>;
    timeCache: {
        [key: string]: Observable<UTCDate[]>;
    };
    getTimeDimensionForURL(url: string): Observable<UTCDate[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MetadataService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MetadataService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MetadataService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MetadataService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MetadataService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MetadataService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MetadataService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MetadataService>;
}

//# sourceMappingURL=metadata.service.d.ts.map