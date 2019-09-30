import { TreeModel } from './data/tree';
export declare class TreeFilterService {
    constructor();
    filterTree(tree: TreeModel, filterText: string): TreeModel;
    showAll(tree: TreeModel): void;
}
