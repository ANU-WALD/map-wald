import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
//import { GeometryObject, Feature } from 'geojson';

@Component({
  selector: 'feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss']
})
export class FeatureTableComponent implements AfterViewInit  {
  @Input() feature: Feature<GeometryObject>;
  _keys = Object.keys;
  
  constructor(){

  }

  ngAfterViewInit(){

  }
}