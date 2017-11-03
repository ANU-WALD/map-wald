import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';


declare var Plotly: any;

@Component({
  selector: 'zoom-in',
  templateUrl: './zoom-in.component.html',
  styleUrls: ['./zoom-in.component.scss']
})
export class ZoomInComponent implements AfterViewInit  {
  @Input() map:LayeredMapComponent;
  @Input() maxZoom:number = 32;

  constructor(){

  }

  ngAfterViewInit(){

  }

  zoomIn(){
    if(!this.map){
      return;
    }
    this.map.zoom = Math.min(this.maxZoom,this.map.zoom+1);
  }
}