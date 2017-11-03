import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { Bounds } from '../data/bounds';


declare var Plotly: any;

@Component({
  selector: 'zoom-full',
  templateUrl: './zoom-full.component.html',
  styleUrls: ['./zoom-full.component.scss']
})
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