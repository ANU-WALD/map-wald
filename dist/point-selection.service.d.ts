import { Observable } from 'rxjs';
import { PointData, LayerTagValue } from './data/catalog';
import { Feature, GeometryObject } from 'geojson';
import { MetadataService } from './metadata.service';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export interface PointSelection {
    catalog: PointData;
    variable: string;
    feature: Feature<GeometryObject>;
    tags: {
        [key: string]: string;
    };
}
export declare class PointSelectionService {
    private meta;
    private latestPointSelectionSource;
    latestPointSelection: Observable<PointSelection>;
    constructor(meta: MetadataService);
    private unchanged;
    pointSelection(sel: PointSelection): void;
    fullUrl(sel: PointSelection): string;
    validUrl(url: string): boolean;
    timeseriesVariables(sel: PointSelection): Observable<LayerTagValue[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PointSelectionService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PointSelectionService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PointSelectionService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PointSelectionService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PointSelectionService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PointSelectionService>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PointSelectionService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PointSelectionService>;
}

//# sourceMappingURL=point-selection.service.d.ts.map