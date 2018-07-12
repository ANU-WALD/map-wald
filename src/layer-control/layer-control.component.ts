import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MetadataService } from '../metadata.service';


declare var Plotly: any;

@Component({
  selector: 'layer-control',
  template: `<div class="layers-control">
  <div class="layers-control-header"> <!-- header -->
    <div class="float-right">
      <!-- TODO Attach handlers and tooltips to each icon -->
      <i class="fa fa-lg fa-cog discrete-icon" (click)="allLegends(false)"></i>
      <i class="fa fa-lg fa-th-list discrete-icon" (click)="allLegends(true)"></i>
    </div>
    <br/>
  </div>

  <div *ngIf="layers">
    <div *ngFor="let l of layers; let i = index"
         class="layer-control d-flex justify-content-between">
      <div class="p-2" style="width:100%">
        <div *ngIf="l.options.legend">
          <div *ngIf="l.flattenedSettings?.palette || l.legendURL">
            <map-legend [title]="l.title"
              [imageURL]="l.legendURL"
              [helpText]="l.description()"
              [mapUnits]="l.flattenedSettings?.units"
              [cbPalette]="l.flattenedSettings?.palette?.name||l.flattenedSettings?.palette"
              [cbCount]="l.flattenedSettings?.numcolorbands||l.flattenedSettings?.palette?.count"
              [cbReverse]="l.flattenedSettings?.palette?.reverse"
              [cbRange]="l.flattenedSettings?.colorscalerange">
            </map-legend>
          </div>
        </div>

        <div *ngIf="!l.options.legend">
          <layer-properties [layer]="l"
                            [map]="map"
                            (propertyChanged)="layerPropertyChanged($event)">
          </layer-properties>
        </div>
      </div>
      <div class="p-2">
          <div>
            <!-- TODO Attach handlers and tooltips to each icon -->
            <i class="fa fa-bars discrete-icon"></i><br/>
            <i class="fa fa-cog discrete-icon" 
               ngbTooltip="Show layer controls" placement="right" data-container="body"
               (click)="layerLegend(l,false)"></i><br/>
            <i class="fa fa-th-list discrete-icon"
               ngbTooltip="Show layer data" placement="right" data-container="body"
               (click)="layerLegend(l,true)"></i><br/>
            <i class="fa fa-angle-double-up discrete-icon" 
               ngbTooltip="Move to top" placement="right" data-container="body"
              (click)="moveToTop(i)"></i><br/>
            <i class="fa fa-angle-up discrete-icon"
               ngbTooltip="Move up" placement="right" data-container="body"
              (click)="moveUp(i)"></i><br/>
            <i class="fa fa-angle-down discrete-icon"
               ngbTooltip="Move down" placement="right" data-container="body"
              (click)="moveDown(i)"></i><br/>
            <i class="fa fa-angle-double-down discrete-icon"
               ngbTooltip="Move to bottom" placement="right" data-container="body"
              (click)="moveToBottom(i)"></i><br/>
            <i class="fa fa-times discrete-icon" 
               ngbTooltip="Remove layer" placement="right" data-container="body"
              data-toggle="tooltip" title="Remove layer"
              (click)="removeLayer(i)"></i>
          </div>
        </div>
      </div>
  </div>
</div>

<!-- Should this control be outside the map? eg to the left? -->
`,styles: [`.layers-control{
  width:200px;
}


.layers-control-header, .layer-control{
  border-bottom: 1px solid #aaa;
}`]})
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