import { Component, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayerPropertyStyle } from '../data/catalog';

@Component({
  selector: 'feature-table',
  template: `<table *ngIf="feature" class="table table-striped table-sm feature-table">
  <thead>
    <tr>
      <td><strong>Property</strong></td>
      <td><strong>Value</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Geometry</strong></td>
      <td>{{feature.geometry.type}}</td>
    </tr>
    <tr *ngFor="let prop of _keys(feature.properties)">
      <td><strong>{{prop}}</strong></td>
      <td *ngIf="!styles||!styles[prop]">{{feature.properties[prop]}}</td>
      <td *ngIf="styles&&styles[prop]">
        <a *ngIf="styles[prop].hyperlink" target="_blank" [href]="feature.properties[prop]">
          {{feature.properties[prop]}}
        </a>
      </td>
    </tr>
  </tbody>
</table>`,styles: [`.feature-table{
  max-width:300px;
}`]})
export class FeatureTableComponent implements AfterViewInit, OnChanges {
  @Input() feature: any;
  @Input() styles: {[key:string]:LayerPropertyStyle} = {}
  _keys = Object.keys;

  constructor(){

  }

  ngAfterViewInit(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.styles){
      this.styles = {};
    }
  }
}