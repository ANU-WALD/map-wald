import {
  Component, Input, ViewChild, AfterViewInit, ElementRef,
  OnChanges, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Catalog, LayerSelection, Layer, LayerAction, Theme } from '../data/catalog';
import { TreeModel } from '../data/tree';

declare var Plotly: any;

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements AfterViewInit, OnChanges {
  @Input() catalog: Catalog;
  @Output() layerSelected: EventEmitter<LayerSelection> = new EventEmitter<LayerSelection>();

  layers: Array<Layer> = [];
  tree: TreeModel = { label: 'no catalog loaded' };

  constructor() {

  }

  ngAfterViewInit() {
    if (this.catalog) {
      this.buildTree();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.catalog && this.catalog) {
      this.buildTree();
    }
  }

  buildTree() {
    this.layers = [];
    var cat = this.catalog;
    var tree: TreeModel = {
      label: cat.name,
      expanded: true
      // settings:{
      //   static:true,
      //   leftMenu:false
      // }
    }

    var layerActions = [
      {
        icon: 'fa fa-map',
        tooltip: 'Map this layer. (Replace any existing layers)',
        action: (node: TreeModel) => this.layerClick(node.data, 'replace')
      },
      {
        icon: 'fa fa-plus',
        tooltip: 'Add this layer to the map.',
        action: (node: TreeModel) => this.layerClick(node.data, 'add')
      }
    ];

    var deferredLayers = cat.themes.map(t => t.layers.filter(l => l.path)).reduce((l, r) => l.concat(r), []);
    var deferredThemes = cat.themes.filter(t => t.path);

    function layerToTree(l: Layer) {
      return {
        label: l.name,
        data: l,
        actions: layerActions
      };
    }

    function themeToTree(t: Theme): TreeModel {
      return {
        label: t.name,
        expanded: false,
        children: t.layers.filter(l => !l.path).map(layerToTree)
      };
    }

    tree.children = cat.themes.filter(t => !t.path).map(themeToTree);

    function findParent(path: string): [TreeModel,number] {
      var components = path.split('/');
      var parent: TreeModel = tree;
      var index = -1;
      
      for (var component of components) {
        var split = component.split('@');
        component = split[0];
        index = -1;
        if(split.length>1){
          index = +split[1];
        }

        var found = false;
        for (var n of parent.children) {
          if (n.label === component) {
            parent = n;
            found = true;
            break;
          }
        }

        if (!found) {
          var newNode: TreeModel = {
            label: component,
            expanded: false,
            children: []
          };
          addChild(parent,newNode,index);
          parent = newNode;
        }
      }
      return [parent,index];
    }

    function addChild(parent:TreeModel,child:TreeModel,i:number){
      if(i<0){
        parent.children.push(child);            
      } else {
        parent.children.splice(i,0,child);
      }
}

    deferredThemes.forEach(t => {
      var [parent,index] = findParent(t.path);
      addChild(parent,themeToTree(t),index);
    });

    deferredLayers.forEach(l => {
      var [parent,index] = findParent(l.path);
      addChild(parent,layerToTree(l),index);
    });
    this.tree = tree;
  }

  layerClick(l: Layer, action: LayerAction) {
    var selection: LayerSelection = {
      layer: l,
      action: action
    };
    this.layerSelected.emit(selection);
  }

  nodeSelected(e: TreeModel) {
    if (!e.data) {
      return;
    }

    var layer = <Layer>e.data;
    this.layerClick(layer, 'replace');
  }
}
