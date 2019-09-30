import { AfterViewInit } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
export declare class ZoomInComponent implements AfterViewInit {
    map: LayeredMapComponent;
    maxZoom: number;
    constructor();
    ngAfterViewInit(): void;
    zoomIn(): void;
}
