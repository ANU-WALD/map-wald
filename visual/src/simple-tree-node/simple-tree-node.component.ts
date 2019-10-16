import { Component, Input, ViewChild, AfterViewInit, ElementRef,
  EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TreeModel } from 'map-wald/core';

declare var Plotly: any;

@Component({
  selector: 'simple-tree-node',
  template: `<a href="#"
                (click)="treeClick($event)"
                [ngClass]="tree.klass"><i [ngClass]="icon"></i>
  &nbsp;
  <span ngbTooltip="{{tree.tooltip | async}}"
        placement="right"
        container="body">{{tree.label}}</span>
  <span *ngIf="tree.actions"
        class="float-right">
      &nbsp;
      <i *ngFor="let a of tree.actions"
       [ngClass]="a.icon"
       ngbTooltip="{{a.tooltip | async}}"
       placement="right"
       container="body"
       (click)="a.action(tree)">&nbsp;</i>
  </span>
</a>
`,styles: []})
export class SimpleTreeNodeComponent implements AfterViewInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    this.evalState();
  }

  ngAfterViewInit(): void {
  }

  @Input() tree: TreeModel;
  @Input() options:any = {};
  @Output() nodeSelected = new EventEmitter();

  expanded: boolean;
  leaf: boolean;
  collapsed: boolean;
  icon: string;

  treeClick(event: any) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.tree) {
      return;
    }
    this.tree.expanded = !this.tree.expanded;
    this.evalState();

    if(this.tree.actions&&this.tree.actions.length){
      this.tree.actions[0].action(this.tree);
    } else {
      this.nodeSelected.emit(this.tree);
    }
  }

  private evalState() {
    this.expanded = this.tree &&
      this.tree.expanded &&
      this.tree.children &&
      this.tree.children.length > 0;
    this.leaf = this.tree && (!this.tree.children || this.tree.children.length === 0);
    this.collapsed = this.tree &&
      !this.tree.expanded &&
      this.tree.children &&
      this.tree.children.length > 0;
    if (this.expanded) {
      this.icon = this.options.expandedIcon;
    }
    else if (this.collapsed) {
      this.icon = this.options.collapsedIcon;
    }
    else {
      this.icon = this.options.leafIcon;
    }
  }
}
