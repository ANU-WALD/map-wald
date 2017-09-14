import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from "../data/mapped-layer";
import { Publication } from "../data/catalog";

declare var Plotly: any;

@Component({
  selector: 'layer-properties',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements AfterViewInit  {
  @Input() layer:MappedLayer;
  @Output() propertyChanged = new EventEmitter();
  //publication:Publication;
  constructor(){

  }

  get publication():(Publication|null){
    if(!this.layer||!this.layer.layer||!this.layer.layer.publications){
      return null;
    }
    return this.layer.layer.publications[this.layer.options.publication||0];
  }

  ngAfterViewInit(){
    // if(this.layer){
    //   this.publication=this.layer.layer.publications[this.layer.options.publication||0];
    // }
  }

  publicationSelected(idx:number){
//    console.log(idx);
    this.layer.options.publication=idx;
    // this.publication=this.layer.layer.publications[idx];
    this.update(idx);
  }

  update(event:any){
    console.log('properties changed',event,this.layer.options);
    this.layer.update();
    this.propertyChanged.emit(this.layer);
  }
}