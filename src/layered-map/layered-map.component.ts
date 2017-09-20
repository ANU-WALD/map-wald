import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { LayerControlComponent } from "../layer-control/layer-control.component";
import { MappedLayer } from "../data/mapped-layer";
import { LayerSelection } from '../data/catalog';

declare var Plotly: any;

@Component({
  selector: 'layered-map',
  templateUrl: './layered-map.component.html',
  styleUrls: ['./layered-map.component.scss']
})
export class LayeredMapComponent implements AfterViewInit, OnChanges {
  @Input() layers: Array<MappedLayer> = [];
  @Output() layersChange = new EventEmitter<Array<MappedLayer>>();
  
  // google maps zoom level
  zoom: number = 4;
  
  // initial center position for the map
  lat: number = -22.673858;
  lng: number = 129.815982;

  constructor(){

  }

  @ViewChild(LayerControlComponent) layerControl:LayerControlComponent;

  ngOnChanges(changes: SimpleChanges): void {
//    console.log(changes);
  }

  ngAfterViewInit(){
//    console.log(this.layerControl);
  }

  layersChanged(changes:Array<MappedLayer>){
//    console.log(changes,this.layers);
  }

  layerAdded(selection:LayerSelection){
    var existing = this.layers.find(l=>l.layer===selection.layer);
    if(existing){
      return;
    }

    var mapped = new MappedLayer();
    mapped.layer = selection.layer;
    mapped.layerType = 'wms';
    mapped.options.legend=true;
    mapped.options.date = new Date(2016,0,1); // Set to most recent available date

    mapped.update();

    if(selection.action==='replace'){
      this.layers = [mapped];
    } else {
      this.layers = [mapped].concat(this.layers);
    }
    this.layersChange.emit(this.layers);
//    this.layerControl.layers = this.layers;
  }
}