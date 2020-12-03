import { HttpClient } from '@angular/common/http';
import { Catalog, Layer } from './data/catalog';
import { Observable } from 'rxjs';
import { Bounds } from './data/bounds';
import { MetadataService } from './metadata.service';
import * as ɵngcc0 from '@angular/core';
export declare class CatalogService {
    private _http;
    private metadata;
    current: Catalog;
    constructor(_http: HttpClient, metadata: MetadataService);
    load(catalogJSON: any): void;
    loadFrom(path: string): Observable<Catalog>;
    findExtentOfLayer(l: Layer): Observable<Bounds>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CatalogService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<CatalogService>;
}

//# sourceMappingURL=catalog.service.d.ts.map