import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
export declare class CycleOpacityComponent implements AfterViewInit, OnChanges {
    map: LayeredMapComponent;
    maxZoom: number;
    tooltip: string;
    layerOpacity: number;
    step: number;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    cycleTransparency(): void;
    private updateLayers;
}
