import { Location } from '@angular/common';
import * as ɵngcc0 from '@angular/core';
export declare class MapViewParameterService {
    private _location?;
    constructor(_location?: Location);
    static parameterNames: Array<string>;
    current(): any;
    update(changes: any): void;
    retrieveFromRoute(route: any): any;
    constructRoute(parameters: any): string;
    routerPaths(): Array<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MapViewParameterService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<MapViewParameterService>;
}

//# sourceMappingURL=map-view.service.d.ts.map