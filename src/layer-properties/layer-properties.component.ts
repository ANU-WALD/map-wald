import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { Publication } from '../data/catalog';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { GeometryObject, Feature } from 'geojson';
import { PointSelectionService, PointSelection } from '../point-selection.service';

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
  <div *ngIf="layer?.layer.publications.length===1">
    {{publication?.label}}
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
  <div *ngIf="layer.layer.options.vectors">
    <p>Lets filter those {{layer.layer.options.vectors}}s, eh?</p>
  </div>
-->

  <div *ngIf="publication?.pointdata">
    <div *ngFor="let tag of getKeys(publication.pointdata.tags)">
      {{tag}}
      <select [(ngModel)]="tags[tag]" (ngModelChange)="queryPointData()">
        <option *ngFor="let val of publication.pointdata.tags[tag]">{{val}}</option>
      </select> 
    </div>
    Variable:
    <select [(ngModel)]="selectedVariable" (ngModelChange)="queryPointData()">
      <option *ngFor="let v of pointVariables">{{v}}</option>
    </select>
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
export class LayerPropertiesComponent implements AfterViewInit, OnDestroy {
  getKeys = Object.keys;
  @Input() layer: MappedLayer;
  @Input() map: LayeredMapComponent;
  @Output() propertyChanged = new EventEmitter();
  @Input() tooltipPlacement:string='right';
  tags:{[key:string]:string}={}
  pointVariables:string[] = [];
  selectedVariable:string;
  selectedFeature: Feature<GeometryObject>;
  selectedFeatureSubscription:any;

  constructor(private pointSelectionService: PointSelectionService) {

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
    if(this.map){
      this.selectedFeatureSubscription = 
        this.map.featureSelected.subscribe((f:Feature<GeometryObject>)=>this.featureSelected(f));
    }
  }

  ngOnDestroy(): void {
    if(this.selectedFeatureSubscription){
      this.selectedFeatureSubscription.unsubscribe();
    }
  }

  featureSelected(f:Feature<GeometryObject>){
    if(!this.publication||!this.publication.pointdata){
      return;
    }
    this.selectedFeature = f;
    // No guarantee that this is from the same layer!!!!
    this.queryPointData();
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

  pointSelection():PointSelection{
    return {
      catalog:this.publication.pointdata,
      variable:this.selectedVariable,
      feature:this.selectedFeature,
      tags:this.tags
    };
  }

  queryPointData(){
    this.pointSelectionChanged();
    this.pointSelectionService.timeseriesVariables(
      this.pointSelection()).subscribe(variables=>{
      this.pointVariables = variables;
      if(variables.indexOf(this.selectedVariable)<0){
        this.selectedVariable = variables[0];
      }
      this.pointSelectionChanged();
    });
  }

  pointSelectionChanged(){
    this.pointSelectionService.pointSelection(this.pointSelection());
  }
}