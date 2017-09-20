import { Component, Input, ViewChild, AfterViewInit, ElementRef,
         OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Catalog, LayerSelection, Layer, LayerAction } from '../data/catalog';
import { TreeModel } from '../simple-tree/simple-tree.component';

declare var Plotly: any;

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit, OnChanges  {
  @Input() catalog: Catalog;
  @Output() layerSelected:EventEmitter<LayerSelection> = new EventEmitter<LayerSelection>();
  
  layers :Array<Layer> = [];
  tree:TreeModel = {label:'no catalog loaded'};
  
  constructor(){

  }

  ngAfterViewInit(){
    if(this.catalog){
      this.buildTree();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.catalog && this.catalog){
      this.buildTree();
    }
  }
 
  buildTree(){
    this.layers = [];
    var cat = this.catalog;
    var tree:TreeModel = {
      label: cat.name,
      expanded:true
      // settings:{
      //   static:true,
      //   leftMenu:false
      // }
    }

    var actions = [
      {
        icon:'fa fa-map',
        tooltip:'Map this layer. (Replace any existing layers)',
        action:(node:TreeModel)=>this.layerClick(node.data,'replace')
      },
      {
        icon:'fa fa-plus',
        tooltip:'Add this layer to the map.',
        action:(node:TreeModel)=>this.layerClick(node.data,'add')
      }
    ];

    tree.children = cat.themes.map(t=>{
      return {
        label:t.name,
        expanded:false,
        children:t.layers.map(l=>{
          return {
            label:l.name,
            data:l,
            actions:actions
          };
        })
      };
    });

    this.tree = tree;
  }

  layerClick(l:Layer,action:LayerAction){
    var selection:LayerSelection ={
      layer:l,
      action:action
    };
    this.layerSelected.emit(selection);
  }

  nodeSelected(e:TreeModel){
    console.log(e);

    if(!e.data){
      return;
    }

    var layer = <Layer>e.data;
    this.layerClick(layer,'replace');
  }
}
