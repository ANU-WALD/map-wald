import { AfterViewInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
export declare class DateShifterComponent implements AfterViewInit, OnChanges {
    interval: number;
    limits: Date[];
    date: Date;
    dateChange: EventEmitter<Date>;
    value: number;
    label: string;
    timer: number;
    dateText: string;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    startTimer(): any;
    ngAfterViewInit(): void;
    reset(): void;
    tick(): any;
    setDateText(): any;
    sliderMoved(): void;
    setLabel(): void;
}
