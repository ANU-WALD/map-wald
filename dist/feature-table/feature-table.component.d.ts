import { AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayerPropertyStyle } from '../data/catalog';
export declare class FeatureTableComponent implements AfterViewInit, OnChanges {
    feature: any;
    styles: {
        [key: string]: LayerPropertyStyle;
    };
    _keys: {
        (o: object): string[];
        (o: {}): string[];
    };
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
