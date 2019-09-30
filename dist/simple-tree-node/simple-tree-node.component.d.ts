import { AfterViewInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TreeModel } from '../data/tree';
export declare class SimpleTreeNodeComponent implements AfterViewInit, OnChanges {
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    tree: TreeModel;
    options: any;
    nodeSelected: EventEmitter<any>;
    expanded: boolean;
    leaf: boolean;
    collapsed: boolean;
    icon: string;
    treeClick(event: any): void;
    private evalState;
}
