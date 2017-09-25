import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'collapsible-map-control',
  templateUrl: './collapsible-map-control.component.html',
  styleUrls: ['./collapsible-map-control.component.scss']
})
export class CollapsibleMapControlComponent implements AfterViewInit  {
  @Input() isCollapsed: boolean;
  @Input() heading: string;
  @Input() direction: string;

  constructor(){

  }

  ngAfterViewInit(){

  }
}