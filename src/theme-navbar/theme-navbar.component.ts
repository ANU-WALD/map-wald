import { Component, Input, Output, ViewChild,
         AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { Catalog, Layer } from "../data/catalog";

declare var Plotly: any;

export type LayerAction = 'replace' | 'add'

export interface LayerSelection{
  layer:Layer;
  action: LayerAction;
}

@Component({
  selector: 'theme-navbar',
  templateUrl: './theme-navbar.component.html',
  styleUrls: ['./theme-navbar.component.scss']
})
export class ThemeNavbarComponent implements AfterViewInit  {
  @Input() catalog:Catalog;
  @Input() includeSearch:boolean;

  @Output() layerSelected:EventEmitter<LayerSelection> = new EventEmitter<LayerSelection>();

  constructor(){

  }

  ngAfterViewInit(){

  }

  layerClick(event:any,layer:Layer,action:LayerAction){
    this.stop(event);
    var selection = {
      layer:layer,
      action:action
    };

    this.layerSelected.emit(selection);
  }

  stop(event:any){
    event.preventDefault();
    event.stopPropagation();
  }
}