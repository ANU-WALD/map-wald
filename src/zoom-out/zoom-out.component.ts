import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';


declare var Plotly: any;

@Component({
  selector: 'zoom-out',
  templateUrl: './zoom-out.component.html',
  styleUrls: ['./zoom-out.component.scss']
})
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