import { UTCDate } from '../time-utils.service';
export interface TimeInterval {
    days?: number;
    months?: number;
    years?: number;
}
export declare class DateRange {
    start: UTCDate;
    end: UTCDate;
    format: string;
    interval?: TimeInterval;
    static dateFromConfig(json: any, end?: boolean): UTCDate;
    static fromJSON(json: any): DateRange;
    containsYear(yr: number): boolean;
    contains(d: UTCDate): boolean;
}
