import { AfterViewInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MetadataService } from '../metadata.service';
export declare class LayerControlComponent implements AfterViewInit, OnChanges {
    private metadata;
    layers: MappedLayer[];
    map: LayeredMapComponent;
    allowRemove: boolean;
    showLegends: boolean;
    allowReorder: boolean;
    layersChange: EventEmitter<MappedLayer[]>;
    uniformViewMode: boolean | undefined;
    foo: string;
    constructor(metadata: MetadataService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    applyViewMode(): void;
    allLegends(showLegend: boolean): void;
    layerLegend(layer: MappedLayer, showLegend: boolean): void;
    moveToTop(idx: number): void;
    moveUp(idx: number): void;
    moveDown(idx: number): void;
    moveToBottom(idx: number): void;
    removeLayer(idx: number): void;
    layerPropertyChanged(l: MappedLayer): void;
    private _changed;
    fetchMetadata(): void;
}
