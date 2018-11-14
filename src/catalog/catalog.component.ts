import {
  Component, Input, ViewChild, AfterViewInit, ElementRef,
  OnChanges, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Catalog,  Layer, Theme } from '../data/catalog';
import { LayerSelection } from '../data/actions';
import { TreeModel } from '../data/tree';
import { TreeFilterService } from '../tree-filter.service';
import { MetadataService } from '../metadata.service';
import { MappedLayer } from '../data/mapped-layer';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

declare var Plotly: any;

export interface CatalogNodeAction {
  action:string;
  icon:string;
  tooltip:string;
}

@Component({
  selector: 'catalog',
  template: `<div class="input-group">
  <span class="input-group-btn">
            <button class="btn" type="button" [disabled]="!filterText"
              (click)="filterText = ''">
            <i *ngIf="filterText"class="fa fa-times" aria-hidden="true"></i>
            <i *ngIf="!filterText"class="fa fa-search" aria-hidden="true"></i>
            </button>
  </span>
  <input #filterInput type="text" class="form-control" placeholder="Catalog search..."
  [(ngModel)]="filterText"/>
</div>

<simple-tree 
  [tree]="this.filterService.filterTree(tree, filterText)"
  [showTop]="false"
  [leafIcon]="leafIcon"
  [collapsedIcon]="collapsedIcon"
  [expandedIcon]="expandedIcon"
  (nodeSelected)="nodeSelected($event)">
</simple-tree>
`,styles: [`
.node-name{
  font-size:1em;
}
`],})
export class CatalogComponent implements AfterViewInit, OnChanges {
  @Input() catalog: Catalog;
  @Input() showPlaceholders = true;
  @Input() defaultAction = 'add';
  @Input() layerActions: CatalogNodeAction[] = [];
  @Output() layerSelected: EventEmitter<LayerSelection> = new EventEmitter<LayerSelection>();
  @Input() collapsedIcon = 'fa fa-caret-right';
  @Input() expandedIcon = 'fa fa-caret-down';
  @Input() leafIcon = 'fa fa-minus';

  layers: Array<Layer> = [];
  tree: TreeModel = { label: 'no catalog loaded' };
  filterText = ''; 

  filterService: TreeFilterService;

  constructor(filterService: TreeFilterService, private metadata:MetadataService) {
    this.filterService = filterService;
  }

  ngAfterViewInit() {
    if (this.catalog) {
      this.buildTree();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.catalog && this.catalog) {
      this.filterText = '';
      this.buildTree();
      this.highlightLayers([],this.tree);
    }
  }

  buildTree() {
    let self = this;
    this.layers = [];
    var cat = this.catalog;
    var tree: TreeModel = {
      label: cat.name,
      expanded: true,
      visible: true,
      // settings:{
      //   static:true,
      //   leftMenu:false
      // }
    }

    var deferredLayers = cat.themes.map(t => t.layers.filter(l => l.path&&!l.skip)).reduce((l, r) => l.concat(r), []);
    var deferredThemes = cat.themes.filter(t => t.path&&!t.skip);

    const treeActions = this.layerActions.map(la=>{
      return {
        icon:la.icon,
        tooltip:la.tooltip,
        action:(node: TreeModel) => this.layerClick(node.data,la.action)
      };
    });

    const layerToTree = (l: Layer)=> {
      let result:TreeModel = {
        label: l.name,
        data: l,
        visible: true,
        actions: treeActions
      };

      const tmp = new MappedLayer();
      tmp.layer = l;
      tmp.update();

      if(l.description){
        result.tooltip = of(l.description);
      } else {
        result.tooltip = this.metadata.getMetadata(tmp).pipe(
          map(meta=>meta.long_name)
        );
      }
      return result;
    }

    function themeToTree(t: Theme): TreeModel {
      return {
        label: t.name,
        expanded: false,
        visible: true,
        children: t.layers.filter(l => !l.path&&!l.skip)
          .filter(l=>self.showPlaceholders||!l.placeholder)
          .map(layerToTree)
      };
    }

    tree.children = cat.themes.filter(t => !t.path&&!t.skip).map(themeToTree);

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
            visible: true,
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

  layerClick(l: Layer,action:string) {
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
    this.layerClick(layer,this.defaultAction);
  }

  activeLayers(layers:Layer[]){
    this.highlightLayers(layers,this.tree);
  }

  highlightLayers(layers:Layer[],tree:TreeModel):boolean{
    tree.klass = null;

    if(tree.data&&(layers.indexOf(tree.data)>=0)){
      tree.klass = 'active-layer';
      return true;
    }

    if(tree.children){
      let activeChild = false;
      for(let i=0;i<tree.children.length;i++){
        activeChild = this.highlightLayers(layers,tree.children[i]) || activeChild;
      }
      if(activeChild){
        tree.klass = 'active-child';
      }
      tree.klass = (tree.klass||'') + ' theme';
      return activeChild;
    }

    return false;
  }
}
