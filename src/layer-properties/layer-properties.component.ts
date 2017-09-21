import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { Publication } from "../data/catalog";
import { OpendapService } from '../opendap.service';
import { LayeredMapComponent } from '../layered-map/layered-map.component';

declare var Plotly: any;

@Component({
  selector: 'layer-properties',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements AfterViewInit {
  @Input() layer: MappedLayer;
  @Input() map: LayeredMapComponent;
  @Output() propertyChanged = new EventEmitter();
  //publication:Publication;
  constructor(private dap:OpendapService) {

  }

  get publication(): (Publication | null) {
    if (!this.layer || !this.layer.layer || !this.layer.layer.publications) {
      return null;
    }
    return this.layer.layer.publications[this.layer.options.publication || 0];
  }

  ngAfterViewInit() {
    // if(this.layer){
    //   this.publication=this.layer.layer.publications[this.layer.options.publication||0];
    // }
    // if (this.layer &&
    //   this.layer.layer.options.smallExtent &&
    //   !this.layer.spatialExtent) {
    //   this.loadExtent();
    // }
  }

  publicationSelected(idx: number) {
    //    console.log(idx);
    this.layer.options.publication = idx;
    // this.publication=this.layer.layer.publications[idx];
    this.update(idx);
  }

  update(event: any) {
    console.log('properties changed', event, this.layer.options);
    this.layer.update();
    this.propertyChanged.emit(this.layer);
  }

  private loadExtent() {
    if (this.layer.layer.options.host.software !== 'tds') {
      return;
    }

    this.dap.getExtent(this.dap.makeURL(this.layer.layer.options.host,this.layer.interpolatedFile))
      .subscribe((ext:any)=>console.log(ext));
  }

  zoomToExtent() {
    if(!this.map){
      console.log('NO MAP!');
      return;
    }

    this.map.lat = this.layer.layer.lat;
    this.map.lng = this.layer.layer.lon;
    this.map.zoom = this.layer.layer.zoom || 13;
  }
}