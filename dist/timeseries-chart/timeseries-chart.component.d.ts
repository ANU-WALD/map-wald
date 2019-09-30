import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSeries } from '../timeseries.service';
export declare class TimeseriesChartComponent implements AfterViewInit, OnChanges {
    private _element;
    title: string;
    timeSeries: Array<TimeSeries>;
    marginLeft: number;
    marginRight: number;
    marginTop: number;
    marginBottom: number;
    titlefont: any;
    constructor(_element: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    draw(): void;
}
