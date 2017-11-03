import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';


declare var Plotly: any;

@Component({
  selector: 'zoom-layer',
  templateUrl: './zoom-layer.component.html',
  styleUrls: ['./zoom-layer.component.scss']
})
export class ZoomLayerComponent implements AfterViewInit  {
  @Input() map: LayeredMapComponent;

  constructor(){

  }

  ngAfterViewInit(){

  }
}