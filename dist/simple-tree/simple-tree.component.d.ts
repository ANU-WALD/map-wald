import { AfterViewInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { TreeModel } from '../data/tree';
export declare class SimpleTreeComponent implements AfterViewInit, OnChanges {
    tree: TreeModel;
    showTop: boolean;
    inner: boolean;
    collapsedIcon: string;
    expandedIcon: string;
    leafIcon: string;
    nodeSelected: EventEmitter<any>;
    options: any;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    childSelected(node: TreeModel): void;
}
