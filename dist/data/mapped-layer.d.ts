import { Layer } from './catalog';
export declare type MappedLayerTypes = 'wms' | 'vector' | 'circle';
export interface MappedLayerOptions {
    legend?: boolean;
    publication?: number;
    date?: Date;
    [key: string]: any;
}
export declare const WMS_PARAMETER_NAMES: {
    [key: string]: Array<string>;
};
export declare const WMS_URL_FORMAT: {
    [key: string]: string;
};
export declare const INTERPOLATED_PARAMETERS: string[];
export declare class MappedLayer {
    constructor(data?: any);
    title: string;
    layer: Layer;
    options: MappedLayerOptions;
    legendURL: string;
    layerType: MappedLayerTypes;
    retrievedMetadata: {
        [key: string]: any;
    };
    interpolatedFile: string;
    interpolatedDownloadURL: string;
    url: string;
    wmsParameters: any;
    flattenedSettings: any;
    staticData: any;
    opacity: number;
    _styleFunc: (f: any) => void;
    description(): string;
    leading0(n: number): string;
    defaultPublication(): number;
    update(): void;
}
