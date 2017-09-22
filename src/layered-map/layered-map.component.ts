import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { LayerSelection } from '../data/catalog';
import { StaticDataService } from '../static-data.service';

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

  constructor(private staticData:StaticDataService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit() {
  }

  layersChanged(changes: Array<MappedLayer>) {
  }

  layerAdded(selection: LayerSelection) {
    var ex = this.layers.find(l => l.layer === selection.layer);
    if (ex) {
      return;
    }

    var mapped = new MappedLayer();
    mapped.layer = selection.layer;
    mapped.layerType = 'wms';
    mapped.options.legend = true;
    mapped.options.date = new Date(2016, 0, 1); // Set to most recent available date

    if(selection.layer.options.vectors){
      this.staticData.get(selection.layer.options.host,selection.layer.options.filepath).subscribe(data=>{
        mapped.staticData=data;
        this.activateLayer(mapped,selection);
      });
    } else {
      this.activateLayer(mapped, selection);
    }
  }

  private activateLayer(mapped: MappedLayer, selection: LayerSelection) {
    mapped.update();
    if (selection.action === 'replace') {
      this.layers = [mapped];
    }
    else {
      this.layers = [mapped].concat(this.layers);
    }
    this.layersChange.emit(this.layers);
  }
}