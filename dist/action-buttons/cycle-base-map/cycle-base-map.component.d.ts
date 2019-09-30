import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
export interface BaseLayer {
    map_type_id: string;
    label: string;
    icon?: string;
}
export declare class CycleBaseMapComponent implements AfterViewInit, OnChanges {
    map: LayeredMapComponent;
    maxZoom: number;
    baseLayers: BaseLayer[];
    baseLayer: BaseLayer;
    tooltip: string;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    toggleBaseLayer(): void;
}
