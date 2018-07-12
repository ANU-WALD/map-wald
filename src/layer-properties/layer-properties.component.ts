import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { Publication } from "../data/catalog";
import { OpendapService } from '../opendap.service';
import { LayeredMapComponent } from '../layered-map/layered-map.component';

declare var Plotly: any;

@Component({
  selector: 'layer-properties',
  template: `<div class="container-fluid">
  <p><strong>{{layer?.title}}</strong>
    <span *ngIf="layer.description()" 
    [ngbTooltip]="layer.description()"
    [placement]="tooltipPlacement"
    container="body">
  <i class="fa fa-info-circle"></i>
  </span>
  </p>

  <div *ngIf="layer?.layer.publications.length>1">
    <span *ngIf="layer.layer.publications[0].timestep">Timestep </span>
    <span *ngIf="!layer.layer.publications[0].timestep">Variable </span>
    <select [(ngModel)]="layer.options.publication" (ngModelChange)="publicationSelected($event)">
      <option *ngFor="let p of layer.layer.publications; let i=index" [ngValue]="i">{{p.label || p.timestep}}</option>
    </select>
  </div>

  <div *ngIf="publication&&publication.timestep">
    <hr/>
    <date-selection [(date)]="layer.options.date"
      (dateChange)="update($event)"
      [timestep]="publication.timestep"
      [stepDays]="publication.timestepMultiplier||1"
      [referenceDate]="publication.timestepReference"
      [minDate]="publication.options.start"
      [maxDate]="publication.options.end"></date-selection>
  </div>

  <div *ngIf="layer.layer.options.smallExtent">
    <hr/>
    <button class="btn btn-sm btn-primary" (click)="zoomToExtent()">Zoom to Extent</button>
  </div>

  <!--
  <div *ngIf="publication">
    <p>Start: {{publication.options.start}}</p>
    <p>End: {{publication.options.end}}</p>
    <p>{{publication|json}}</p>
  </div>
  <button (click)="update()">Force update...</button>
  -->
</div>`,styles: []})
export class LayerPropertiesComponent implements AfterViewInit {
  @Input() layer: MappedLayer;
  @Input() map: LayeredMapComponent;
  @Output() propertyChanged = new EventEmitter();
  @Input() tooltipPlacement:string='right';
  
  //publication:Publication;
  constructor(private dap: OpendapService) {

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
    this.layer.update();
    this.propertyChanged.emit(this.layer);
  }

  zoomToExtent() {
    if (!this.map) {
      console.log('NO MAP!');
      return;
    }

    this.map.lat = this.layer.layer.lat;
    this.map.lng = this.layer.layer.lon;
    this.map.zoom = this.layer.layer.zoom || 13;
  }
}