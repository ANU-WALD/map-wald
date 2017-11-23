import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, 
         Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { LayerSelection } from '../data/catalog';
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
  templateUrl: './layered-map.component.html',
  styleUrls: ['./layered-map.component.scss']
})
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
    console.log(coords);
    this.pointSelected.emit(coords);
  }

  zoomToBounds(bounds:Bounds){
    this.bounds = bounds;
  }
}