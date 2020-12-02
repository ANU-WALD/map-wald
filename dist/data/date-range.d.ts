import { UTCDate } from '../time-utils.service';
export declare class DateRange {
    start: UTCDate;
    end: UTCDate;
    format: string;
    static dateFromConfig(json: any, end?: boolean): UTCDate;
    static fromJSON(json: any): DateRange;
    containsYear(yr: number): boolean;
    contains(d: UTCDate): boolean;
}
