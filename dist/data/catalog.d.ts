import { Bounds } from './bounds';
import { Observable } from 'rxjs';
export interface CatalogHost {
    url?: string;
    software?: string;
    downloadLink?: string;
}
export declare class CatalogOptions {
    host?: CatalogHost;
    downloadPath?: string;
    filepath?: string;
    palette?: string;
    colorscalerange?: Array<number>;
    legend?: string;
    mapOptions?: any;
    timeFormat?: string;
    publisher?: string;
    publisherURL?: string;
    units?: string;
    smallExtent?: boolean;
    vectors?: "point" | "line" | "polygon";
    styles?: any;
    publicationLabel?: string;
    variable?: string;
    start?: string;
    end?: string;
}
export declare class Catalog {
    name: string;
    themes: Array<Theme>;
    options: CatalogOptions;
    publications: Array<Publication>;
    constructor(config?: any);
    propagateOptions(): void;
    instantiateNamedOptions(): void;
    allLayers(): Array<Layer>;
}
export declare class Theme {
    name: string;
    dataCreator?: string;
    skip: boolean;
    layers: Array<Layer>;
    path: string;
    options: CatalogOptions;
    publications: Array<Publication>;
    constructor(config?: any);
    propagateOptions(): void;
    instantiateNamedOptions(source: any): void;
}
export declare class Layer {
    publications: Array<Publication>;
    skip: boolean;
    options: CatalogOptions;
    placeholder: boolean;
    name: string;
    dataCreator?: string;
    path: string;
    [key: string]: any;
    spatialExtent: Observable<Bounds>;
    constructor(config?: any);
    propagateOptions(): void;
    instantiateNamedOptions(source: any): void;
}
export declare class Publication {
    timestep: string;
    timestepMultiplier: number;
    timestepReference: string;
    label: string;
    skip: boolean;
    options: CatalogOptions;
    pointdata?: PointData;
    constructor(config?: any);
    instantiateNamedOptions(source: any): void;
}
export interface PointData {
    protocol: string;
    url: string;
    coordinates: {
        [key: string]: number;
    };
    tags: {
        [key: string]: Array<string | LayerTagValue>;
    };
    labels?: string[];
    defaultVariable: string;
    displayFormat?: string;
    chart?: string;
    exclude?: string[];
}
export interface LayerPropertyStyle {
    hyperlink?: boolean;
    placeholder?: string;
}
export interface LayerTagValue {
    value: string;
    label: string;
}
export interface LayerTagMap {
    [key: string]: LayerTagValue[];
}
