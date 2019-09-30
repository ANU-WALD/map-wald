import { AfterViewInit } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
export declare class ZoomOutComponent implements AfterViewInit {
    map: LayeredMapComponent;
    minZoom: number;
    constructor();
    ngAfterViewInit(): void;
    zoomOut(): void;
}
