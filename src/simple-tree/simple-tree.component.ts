import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TreeModel } from '../data/tree';

declare var Plotly: any;

@Component({
  selector: 'simple-tree',
  template: `<div *ngIf="tree&&tree.visible" class="simple-tree">

  <div *ngIf="inner">
    <li ><simple-tree-node [tree]="tree"
                           [options]="options"
                           (nodeSelected)="childSelected($event)"></simple-tree-node>
      <ul *ngIf="tree.children&&tree.expanded" class="inner-list">
        <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
                    (nodeSelected)="childSelected($event)"
                    [options]="options"></simple-tree>
      </ul>
    </li>
  </div>

  <div *ngIf="!inner&&showTop">
    <ul class="outer-list">
      <li><simple-tree-node [tree]="tree" [options]="options"
        (nodeSelected)="childSelected($event)"></simple-tree-node>
        <ul *ngIf="tree.children&&tree.expanded" class="inner-list">
            <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
            (nodeSelected)="childSelected($event)"
            [options]="options"></simple-tree>
        </ul>
      </li>
    </ul>
  </div>

  <div *ngIf="!inner&&!showTop">
      <ul *ngIf="tree.children&&tree.expanded" class="outer-list">
          <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
          (nodeSelected)="childSelected($event)"
          [options]="options"></simple-tree>
      </ul>
    </div>
  
</div>
`,styles: [`
.simple-tree ul{
  list-style-type: none
}

ul.outer-list{
  padding-left:5px;
}

ul.inner-list{
  padding-left:15px;
}`]})
export class SimpleTreeComponent implements AfterViewInit, OnChanges {
  @Input() tree: TreeModel;
  @Input() showTop: boolean = true;
  @Input() inner: boolean;

  @Input() collapsedIcon = 'fa fa-caret-right';
  @Input() expandedIcon = 'fa fa-caret-down';
  @Input() leafIcon = 'fa fa-minus';

  @Output() nodeSelected = new EventEmitter();

  @Input() options:any = {};

  constructor() {

  }

  ngAfterViewInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.options){
      return;
    }

    this.options = {
      collapsedIcon:this.collapsedIcon,
      expandedIcon:this.expandedIcon,
      leafIcon:this.leafIcon
    };
  }

  childSelected(node:TreeModel){
    this.nodeSelected.emit(node);
  }

}