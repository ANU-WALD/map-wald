import { AfterViewInit, EventEmitter } from '@angular/core';
export declare class DateElementComponent implements AfterViewInit {
    label: string;
    property: string;
    src: any;
    step: number;
    changed: EventEmitter<any>;
    constructor();
    ngAfterViewInit(): void;
    move(n: number): void;
}
