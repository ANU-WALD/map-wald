import { MappedLayer } from './mapped-layer';
import { Layer } from './catalog';
export declare type LayerAction = 'replace' | 'add' | string;
export declare type LayerFilter = (l: MappedLayer) => boolean;
export interface LayerSelection {
    layer: Layer;
    action: LayerAction;
    filter?: LayerFilter;
}
