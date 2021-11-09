import { HttpClient } from '@angular/common/http';
import { DapData, DapDAS, DapDDX } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class OpendapService {
    private http;
    constructor(http: HttpClient);
    makeURL(host: CatalogHost, filepath: string): string;
    get(url: string): Observable<string>;
    getData(queryUrl: string, das: DapDAS): Observable<DapData>;
    getDAS(url: string): Observable<DapDAS>;
    getDDX(url: string): Observable<DapDDX>;
    getExtent(url: string): Observable<number[]>;
    dapRangeQuery(from: number, to?: number, step?: number): string;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<OpendapService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<OpendapService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<OpendapService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<OpendapService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<OpendapService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<OpendapService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<OpendapService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<OpendapService>;
}

//# sourceMappingURL=opendap.service.d.ts.map