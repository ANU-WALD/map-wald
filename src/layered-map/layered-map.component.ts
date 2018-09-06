import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, 
         Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { LayerSelection } from '../data/actions';
import { StaticDataService } from '../static-data.service';
import { DataMouseEvent, LatLng, AgmMap, LatLngBoundsLiteral } from '@agm/core';
import { Feature, Point, GeometryObject } from 'geojson';
import { Marker, MapTypeControlOptions, ControlPosition } from '@agm/core/services/google-maps-types';
import { Bounds } from '../data/bounds';
import { MetadataService } from '../metadata.service';

export interface SimpleMarker {
  loc:LatLng;
  value:string;
  open:boolean;
  iconUrl:string;
}

@Component({
  selector: 'layered-map',
  template: `<agm-map #theMap
[(latitude)]="lat"
[(longitude)]="lng"
[(zoom)]="zoom"
[disableDefaultUI]="false"
[zoomControl]="false"
[mapTypeControl]="true"
[mapTypeControlOptions]="mapTypeOptions"
scaleControl="true"
[fitBounds]="bounds"
(mapClick)="mapClick($event)">

<agm-marker *ngFor="let marker of markers"
            [longitude]="marker.loc.lng"
            [latitude]="marker.loc.lat"
            [iconUrl]="marker.iconUrl">
  <agm-info-window [disableAutoPan]="true" [isOpen]="marker.open">
    <strong>{{marker.value}}</strong>
  </agm-info-window>
</agm-marker>

<ng-container *ngFor="let mp of layers.slice()|reverse; let i = index" [ngSwitch]="mp.layerType">
  <wms-layer *ngSwitchCase="'wms'"
    [url]="mp.url"
    [params]="mp.wmsParameters"
    [opacity]="mp.opacity"
    [position]="i">
  </wms-layer>
  <agm-data-layer *ngSwitchCase="'vector'"
                [geoJson]="mp.staticData"
                [style]="mp._styleFunc"
                (layerClick)="clicked($event)"

                >
  </agm-data-layer>

  <!--

  -->
</ng-container>

<!-- for map controls -->
<map-control position="TOP_CENTER">
    <ng-content select=".map-control.top-center"></ng-content>
</map-control>

<map-control position="TOP_LEFT">
    <ng-content select=".map-control.top-left"></ng-content>
</map-control>

<map-control position="TOP_RIGHT">
    <ng-content select=".map-control.top-right"></ng-content>
</map-control>

<map-control position="LEFT_TOP">
    <ng-content select=".map-control.left-top"></ng-content>
</map-control>

<map-control position="RIGHT_TOP">
    <ng-content select=".map-control.right-top"></ng-content>
</map-control>

<map-control position="LEFT_CENTER">
    <ng-content select=".map-control.left-center"></ng-content>
</map-control>

<map-control position="RIGHT_CENTER">
    <ng-content select=".map-control.right-center"></ng-content>
</map-control>

<map-control position="LEFT_BOTTOM">
    <ng-content select=".map-control.left-bottom"></ng-content>
</map-control>

<map-control position="RIGHT_BOTTOM">
    <ng-content select=".map-control.right-bottom"></ng-content>
</map-control>

<map-control position="BOTTOM_CENTER">
    <ng-content select=".map-control.bottom-center"></ng-content>
</map-control>

<map-control position="BOTTOM_LEFT">
    <ng-content select=".map-control.bottom-left"></ng-content>
</map-control>

<map-control position="BOTTOM_RIGHT">
    <ng-content select=".map-control.bottom-right"></ng-content>
</map-control>

<!--
<map-control position="LEFT_CENTER">
  <div class="card map-control">
    <div class="card-block control-card-content">
      <layer-control #layerControl
        [(layers)]="layers"
        (layersChange)="layersChanged($event)"></layer-control>
    </div>
  </div>
</map-control>
-->

</agm-map>
<!--
(mapClick)="mapClick($event)"
(centerChange)="moved($event)"
(zoomChange)="moved($event)"
  [mapTypeId]="baseLayer?baseLayer.map_type_id : null"

-->

`,styles: []})
export class LayeredMapComponent implements AfterViewInit, OnChanges {
  @Input() layers: Array<MappedLayer> = [];
  @Input() markers:Array<SimpleMarker> = [];
  
  @Output() layersChange = new EventEmitter<Array<MappedLayer>>();
  @Output() featureSelected = new EventEmitter<Feature<GeometryObject>>();
  @Output() pointSelected = new EventEmitter<LatLng>();

  @ViewChild(AgmMap) theMap:AgmMap;
  
  // google maps zoom level
  zoom: number = 4;
  mapTypeOptions: MapTypeControlOptions={
    position:ControlPosition.BOTTOM_LEFT
  };
  
  // initial center position for the map
  lat: number = -22.673858;
  lng: number = 129.815982;
  bounds:Bounds;

  constructor(private staticData:StaticDataService,
              private metadata:MetadataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if zoom in changes...
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
      this.staticData.get(selection.layer.options.host,selection.layer.options.filepath).subscribe(
        (data:any)=>{
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
      if(selection.filter){
        this.layers = this.layers.filter(ml=>!selection.filter(ml));
      } else {
        this.layers = [];
      }
    }
    this.layers = [mapped].concat(this.layers);

    this.layersChange.emit(this.layers);
  }

  extractFeature(f:any) : Feature<Point>{
    var geo = f.getGeometry();
    geo = {
      type:'Point',
      coordinates:geo.get(0)
    }

    var props:{[key:string]:any} = {};
    f.forEachProperty((val:any,prop:string)=>props[prop]=val);

    return {
      type:'Feature',
      geometry:geo,
      properties:props
    };
  }

  clicked(event:DataMouseEvent){
    var feature = this.extractFeature(event.feature);
    this.featureSelected.emit(feature);
  }

  mapClick(event:any){
    var coords:LatLng = event.coords;
    this.pointSelected.emit(coords);
  }

  zoomToBounds(bounds:Bounds){
    this.bounds = bounds;
  }
}