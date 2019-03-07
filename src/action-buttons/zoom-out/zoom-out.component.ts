import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';


declare var Plotly: any;

@Component({
  selector: 'zoom-out',
  template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom out"
        placement="right"
        (click)="zoomOut()"
><i class="fa fa-minus"></i></button>`,styles: []})
export class ZoomOutComponent implements AfterViewInit  {
  @Input() map:LayeredMapComponent;
  @Input() minZoom:number = 1;
  constructor(){

  }

  ngAfterViewInit(){

  }

  zoomOut(){
    if(!this.map){
      return;
    }
    this.map.zoom = Math.max(this.minZoom, this.map.zoom - 1);
  }
}
