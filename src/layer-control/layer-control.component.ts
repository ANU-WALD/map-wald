import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MetadataService } from '../metadata.service';


declare var Plotly: any;

@Component({
  selector: 'layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.scss']
})
export class LayerControlComponent implements AfterViewInit, OnChanges {
  @Input() layers: Array<MappedLayer>;
  @Input() map: LayeredMapComponent;
  @Output() layersChange = new EventEmitter();
  uniformViewMode: boolean | undefined;
  foo: string = 'bar';

  constructor(private metadata:MetadataService) {

  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.layers || !this.layers) {
      return;
    }
    this.applyViewMode();
    this.fetchMetadata();
  }

  applyViewMode(){
    if (this.uniformViewMode === undefined) {
      return;
    }

    this.layers.forEach(l => l.options.legend = this.uniformViewMode);
  }

  allLegends(showLegend: boolean) {
    this.uniformViewMode = showLegend;
    this.layers.forEach(l => l.options.legend = showLegend);
  }

  layerLegend(layer: MappedLayer, showLegend: false) {
    this.uniformViewMode = undefined;
    layer.options.legend = showLegend;
  }

  moveToTop(idx: number) {
    this.layers = [this.layers[idx]].concat(this.layers.slice(0, idx)).concat(this.layers.slice(idx + 1));
    this._changed();
  }

  moveUp(idx: number) {
    if (idx === 0) {
      return;
    }

    var layers = this.layers;
    this.layers = layers.slice(0, idx - 1).concat([layers[idx], layers[idx - 1]]).concat(layers.slice(idx + 1));
    this._changed();
  }

  moveDown(idx: number) {
    if (idx === (this.layers.length - 1)) {
      return;
    }

    var layers = this.layers;
    this.layers = layers.slice(0, idx).concat([layers[idx + 1], layers[idx]]).concat(layers.slice(idx + 2));
    this._changed();
  }

  moveToBottom(idx: number) {
    this.layers = this.layers.slice(0, idx).concat(this.layers.slice(idx + 1)).concat([this.layers[idx]]);
    this._changed();
  }

  removeLayer(idx: number) {
    var layers = this.layers.slice();
    layers.splice(idx, 1);
    this.layers = layers;
    this._changed();
  }

  layerPropertyChanged(l: MappedLayer) {
    this.layers = this.layers.slice();
    this._changed();
  }

  private _changed() {
    this.fetchMetadata();
    this.layersChange.emit(this.layers);
  }

  fetchMetadata(){
    this.layers.forEach(ml=>{
      this.metadata.populateMetadata(ml);
    })
  }
}