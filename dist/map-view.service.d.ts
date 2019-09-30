import { Location } from '@angular/common';
export declare class MapViewParameterService {
    private _location?;
    constructor(_location?: Location);
    static parameterNames: Array<string>;
    current(): any;
    update(changes: any): void;
    retrieveFromRoute(route: any): any;
    constructRoute(parameters: any): string;
    routerPaths(): Array<any>;
}
