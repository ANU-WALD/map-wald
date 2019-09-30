import { AfterViewInit, EventEmitter } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TimeUtilsService } from "../time-utils.service";
export declare class DateSelectionComponent implements AfterViewInit {
    private timeUtils;
    date: Date;
    dateChange: EventEmitter<any>;
    timestep: string;
    minDate: Date | string;
    maxDate: Date | string;
    style: ('popup' | 'arrows');
    stepDays: number;
    referenceDate: string;
    need: {
        day: boolean;
        month: boolean;
        year: boolean;
    };
    minDateStruct: NgbDateStruct;
    maxDateStruct: NgbDateStruct;
    dateStruct: NgbDateStruct;
    atMax: boolean;
    atMin: boolean;
    constructor(timeUtils: TimeUtilsService);
    ngAfterViewInit(): void;
    ngOnChanges(changes: any): void;
    dateStructChanged(): void;
    assessDateComponents(): void;
    move(n: number): void;
    onDateChanged(): void;
    checkLimits(): void;
    checkReference(): any;
}
