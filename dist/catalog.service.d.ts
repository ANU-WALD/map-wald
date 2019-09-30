import { HttpClient } from '@angular/common/http';
import { Catalog, Layer } from './data/catalog';
import { Observable } from 'rxjs';
import { Bounds } from './data/bounds';
import { MetadataService } from './metadata.service';
export declare class CatalogService {
    private _http;
    private metadata;
    current: Catalog;
    constructor(_http: HttpClient, metadata: MetadataService);
    load(catalogJSON: any): void;
    loadFrom(path: string): Observable<Catalog>;
    findExtentOfLayer(l: Layer): Observable<Bounds>;
}
