import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'location-search',
  template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Location search"
        placement="right"
        [disabled]="true"

><i class="fa fa-search"></i></button>
`,styles: []})
export class LocationSearchComponent implements AfterViewInit  {

  constructor(){

  }

  ngAfterViewInit(){

  }
}