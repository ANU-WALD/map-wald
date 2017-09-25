import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'feature-table',
  templateUrl: './feature-table.component.html',
  styleUrls: ['./feature-table.component.scss']
})
export class FeatureTableComponent implements AfterViewInit  {
  @Input() feature: any;
  _keys = Object.keys;

  constructor(){

  }

  ngAfterViewInit(){

  }
}