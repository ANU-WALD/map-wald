import * as ɵngcc0 from '@angular/core';
export declare class WMSService {
    static TILE_SIZE: number;
    static TILE_WIDTH: number;
    static TILE_HEIGHT: number;
    constructor();
    webMercator: any;
    pointToWebMercator(pt: any): {
        x: number;
        y: number;
    };
    computeTileBounds(map: any, coord: any, zoom: number): string;
    buildImageMap(getMap: () => any, getURL: (zoom: number) => string, getOptions?: (zoom: number) => any, getOpacity?: () => number): any;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<WMSService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<WMSService>;
}

//# sourceMappingURL=wms.service.d.ts.map