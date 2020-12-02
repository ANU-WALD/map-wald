import { HttpClient } from '@angular/common/http';
import { CatalogHost } from './data/catalog';
import { Observable } from 'rxjs';
export declare class StaticDataService {
    private http;
    cache: {
        [key: string]: Observable<any>;
    };
    constructor(http: HttpClient);
    get(host: CatalogHost, path: string): Observable<any>;
}
