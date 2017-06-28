import { Component, OnInit, AfterViewInit, Input} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {WMSService} from '../wms.service';

@Component({
  selector: 'app-wms-layer',
  template:''
})
export class WMSLayerComponent implements OnInit{
  @Input() url:string;
  @Input() params:any;
  @Input() opacity:number=1.0;
  @Input() position:number=0;

  constructor(private _wmsService:WMSService,
              public _wrapper:GoogleMapsAPIWrapper) {}
  map: any;
  overlay:any;
  zoom: number = 4;

  buildMap(){
    console.log("Building WMS layer");
    this._wrapper.getNativeMap().then((theMap)=>{
      this.map = theMap;

      this.overlay = this._wmsService.buildImageMap(
          ()=>this.map,
          (z)=>this.url+'?',
          (z)=>this.params,
          ()=>this.opacity
        );

      if(this.map.overlayMapTypes.length===this.position){
        this.map.overlayMapTypes.push(this.overlay);
      } else if(this.map.overlayMapTypes.length>this.position){
        this.map.overlayMapTypes.removeAt(this.position);
        this.map.overlayMapTypes.insertAt(this.position,this.overlay);
      } else {
        while(this.map.overlayMapTypes.length<this.position){
          // Temporarily add replicate layers.
          // These should be replaced by other wms-layer components
          this.map.overlayMapTypes.push(this.overlay);
        }
        this.map.overlayMapTypes.push(this.overlay);
      }
    }).catch((e)=>console.log(e));
  }
  ngOnInit() {
    this.buildMap();
  }
}
