import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MappedLayer } from '../data/mapped-layer';
import { Bounds } from '../data/bounds';


declare var Plotly: any;

@Component({
  selector: 'zoom-layer',
  template: `<button type="button" [disabled]="!layer" class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom to selected layer"
        placement="right"
        (click)="zoomToLayer()"
><i class="fa fa-compress"></i>
</button>
`,styles: []})
export class ZoomLayerComponent implements AfterViewInit {
  @Input() map: LayeredMapComponent;
  @Input() layer: MappedLayer;
  @Input() fullBounds: Bounds;

  constructor() {

  }

  ngAfterViewInit() {

  }

  zoomToLayer() {
    if(this.layer.layer.spatialExtent){
      console.log('Zoom to layer');
      this.layer.layer.spatialExtent.subscribe(b=>{
        this.map.zoomToBounds(Object.assign({},b));
      });
    } else {
      console.log('Zoom full');
      this.map.zoomToBounds(Object.assign({}, this.fullBounds));
    }
  }
}