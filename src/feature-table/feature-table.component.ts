import { Component, Input, AfterViewInit } from '@angular/core';

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
      <td>{{feature.properties[prop]}}</td>
    </tr>
  </tbody>
</table>`,styles: [`.feature-table{
  max-width:300px;
}`]})
export class FeatureTableComponent implements AfterViewInit  {
  @Input() feature: any;
  _keys = Object.keys;

  constructor(){

  }

  ngAfterViewInit(){

  }
}