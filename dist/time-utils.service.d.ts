import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
export interface UTCDate {
    getTime(): number;
    getUTCFullYear(): number;
    getUTCMonth(): number;
    getUTCDate(): number;
    setUTCFullYear(n: number): void;
    setUTCMonth(n: number): void;
    setUTCDate(n: number): void;
}
export declare function utcDate(y: number, m?: number, d?: number): UTCDate;
export declare function utcDateCopy(d: UTCDate): UTCDate;
export declare class TimeUtilsService {
    constructor();
    specialDates: {
        [key: string]: (() => Date);
    };
    convertDate(d: (UTCDate | string)): NgbDateStruct;
    datesEqual(lhs: NgbDateStruct, rhs: NgbDateStruct): boolean;
}
