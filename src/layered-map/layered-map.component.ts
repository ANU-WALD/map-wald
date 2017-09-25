import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { LayerSelection } from '../data/catalog';
import { StaticDataService } from '../static-data.service';
import { DataMouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { Feature, Point, GeometryObject } from 'geojson';

declare var Plotly: any;


@Component({
  selector: 'layered-map',
  templateUrl: './layered-map.component.html',
  styleUrls: ['./layered-map.component.scss']
})
export class LayeredMapComponent implements AfterViewInit, OnChanges {
  @Input() layers: Array<MappedLayer> = [];
  @Output() layersChange = new EventEmitter<Array<MappedLayer>>();
  @Output() featureSelected = new EventEmitter<Feature<GeometryObject>>();

  control_positions = [
    'TOP_CENTER',
    'TOP_LEFT',
    'TOP_RIGHT',
    'LEFT_TOP',
    'RIGHT_TOP',
    'LEFT_CENTER',
    'RIGHT_CENTER',
    'LEFT_BOTTOM',
    'RIGHT_BOTTOM',
    'BOTTOM_CENTER',
    'BOTTOM_LEFT',
    'BOTTOM_RIGHT'
  ];
  control_classes: Array<string>;
  // google maps zoom level
  zoom: number = 4;

  // initial center position for the map
  lat: number = -22.673858;
  lng: number = 129.815982;

  constructor(private staticData:StaticDataService) {
    this.control_classes = this.control_positions.map(pos=>{
      return `.map-control.${pos.toLowerCase().replace('_','-')}`;
    });
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
}