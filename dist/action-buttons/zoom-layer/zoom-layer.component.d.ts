import { AfterViewInit } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
import { MappedLayer } from '../../data/mapped-layer';
import { Bounds } from '../../data/bounds';
export declare class ZoomLayerComponent implements AfterViewInit {
    map: LayeredMapComponent;
    layer: MappedLayer;
    fullBounds: Bounds;
    constructor();
    ngAfterViewInit(): void;
    zoomToLayer(): void;
}
