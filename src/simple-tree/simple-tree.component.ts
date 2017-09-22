import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { TreeModel } from '../data/tree';

declare var Plotly: any;

@Component({
  selector: 'simple-tree',
  templateUrl: './simple-tree.component.html',
  styleUrls: ['./simple-tree.component.scss']
})
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