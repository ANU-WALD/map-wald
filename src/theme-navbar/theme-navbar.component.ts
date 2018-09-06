import { Component, Input, Output,
         AfterViewInit, EventEmitter } from '@angular/core';
import { Catalog, Layer } from "../data/catalog";
import { LayerSelection, LayerAction } from '../data/actions';

declare var Plotly: any;

@Component({
  selector: 'theme-navbar',
  template: `<ul class="navbar-nav">
  <li class="nav-item" ngbDropdown *ngFor="let theme of catalog?.themes">
    <a class="nav-link" ngbDropdownToggle href="#"><i class="fa" [ngClass]="theme.icon"></i></a>
    <div ngbDropdownMenu class="dropdown-menu">
      <a class="dropdown-item" href="#" (click)="layerClick($event,layer,'replace')" *ngFor="let layer of theme.layers">
        <div>
          <span>{{layer.name}}</span>
          <span class="float-right layer-select-icons">
            <i class="fa fa-map layer-select-icon discrete-icon"
               (click)="layerClick($event,layer,'replace')"
               placement="right"
               ngbTooltip="Map this layer. (Replace any existing layers)"></i>
            <br/>
            <i class="fa fa-plus layer-select-icon discrete-icon"
               (click)="layerClick($event,layer,'add')"
               placement="right"
               ngbTooltip="Add this layer to the map."></i>
          </span>
        </div>
      </a>
    </div>
  </li>
</ul>

<!--

[ng-reflect-ngb-tooltip].yellow + .tooltip {
    background-color: yellow;
}
-->`,styles: [`
.layer-select-icons{
  font-size:0.75em;
  margin-right:-20px;
}

/* Annoying... using /deep/ to access the child component
 * but /deep/ (and synonyms) are deprecated. Not clear what
 * we should be doing
 */
/deep/ .tooltip-inner {
  width: 400px;
}

.dropdown-item{
  border-bottom: 1px solid #aaa;
  height: 40px;
}
`]})
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