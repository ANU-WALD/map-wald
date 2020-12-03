import { HttpClient } from '@angular/common/http';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class StaticDataService {
    private http;
    cache: {
        [key: string]: Observable<any>;
    };
    constructor(http: HttpClient);
    get(host: CatalogHost, path: string): Observable<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<StaticDataService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<StaticDataService>;
}

//# sourceMappingURL=static-data.service.d.ts.map