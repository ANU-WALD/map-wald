import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'collapsible-map-control',
  template: `<div class="card map-control collapsible-control">
    <a (click)="isCollapsed = !isCollapsed">
      <div class="card-header">
        <h6 class="mb-0">
          {{heading}}
          <span *ngIf="isCollapsed" class="float-right fa fa-caret-up
            collapse-arrow" aria-hidden="true"></span>
          <span *ngIf="!isCollapsed" class="float-right fa fa-caret-down
            collapse-arrow" aria-hidden="true"></span>
        </h6>
      </div>
    </a>

    <div class="ngbCollapse" [ngbCollapse]="isCollapsed">
      <ng-content></ng-content>
    </div>
  </div>
`,styles: [`.collapsible-control{
  margin:3px;
}`]})
export class CollapsibleMapControlComponent implements AfterViewInit  {
  @Input() isCollapsed: boolean;
  @Input() heading: string;
  @Input() direction: string;

  constructor(){

  }

  ngAfterViewInit(){

  }
}