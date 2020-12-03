import * as ɵngcc0 from '@angular/core';
export interface DateStruct {
    day: number;
    month: number;
    year: number;
}
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
    convertDate(d: (UTCDate | string)): DateStruct;
    datesEqual(lhs: DateStruct, rhs: DateStruct): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TimeUtilsService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<TimeUtilsService>;
}

//# sourceMappingURL=time-utils.service.d.ts.map