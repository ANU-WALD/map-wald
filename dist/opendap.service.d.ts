import { HttpClient } from '@angular/common/http';
import { DapData, DapDAS, DapDDX } from 'dap-query-js/dist/dap-query';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
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
}
