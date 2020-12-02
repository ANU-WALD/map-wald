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
}
