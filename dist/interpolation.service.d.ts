export declare class InterpolationService {
    static templateMatcher: RegExp;
    private static isDefined;
    static interpolate(expr: string, params?: any): string;
    static getValue(target: any, key: string): string;
}
