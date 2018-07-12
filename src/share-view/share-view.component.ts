import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'share-view',
  template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Share current view"
        placement="right"
        [disabled]="true"
><i class="fa fa-share-alt"></i></button>
`,styles: []})
export class ShareViewComponent implements AfterViewInit  {

  constructor(){

  }

  ngAfterViewInit(){

  }
}