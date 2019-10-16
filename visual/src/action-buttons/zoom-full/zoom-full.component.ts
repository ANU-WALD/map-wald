import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
import { Bounds } from 'map-wald/core';


declare var Plotly: any;

@Component({
  selector: 'zoom-full',
  template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom to full extent"
        placement="right"
        (click)="zoomToBounds()"
><i class="fa fa-arrows-alt"></i></button>
`,styles: []})
export class ZoomFullComponent implements AfterViewInit  {
  @Input() map:LayeredMapComponent;
  @Input() bounds:Bounds;

  constructor(){

  }

  ngAfterViewInit(){

  }

  zoomToBounds(){
    this.map.zoomToBounds(Object.assign({},this.bounds));
  }
}
