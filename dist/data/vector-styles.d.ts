export interface ScaledStyle<T extends SimpleStyleValue> {
    property: string;
    getStyleValue(feature: any): T;
}
export declare class CategoricalStyle<T extends SimpleStyleValue> implements ScaledStyle<T> {
    property: string;
    categories: string[];
    values: {
        [key: string]: T;
    };
    constructor(property: string, categories: string[]);
    getStyleValue(feature: any): T;
}
export declare class RangeStyle<T extends SimpleStyleValue> implements ScaledStyle<T> {
    property: string;
    values: T[];
    breakpoints: number[];
    constructor(property: string, values: T[], breakpoints: number[]);
    idx(val: number): number;
    getStyleValue(feature: any): T;
}
export declare type SimpleStyleValue = boolean | string | number;
export declare type StyleValue = SimpleStyleValue | ScaledStyle<SimpleStyleValue>;
