import { AfterViewInit, EventEmitter } from '@angular/core';
import { Catalog, Layer } from "../data/catalog";
import { LayerSelection, LayerAction } from '../data/actions';
export declare class ThemeNavbarComponent implements AfterViewInit {
    catalog: Catalog;
    includeSearch: boolean;
    layerSelected: EventEmitter<LayerSelection>;
    constructor();
    ngAfterViewInit(): void;
    layerClick(event: any, layer: Layer, action: LayerAction): void;
    stop(event: any): void;
}
