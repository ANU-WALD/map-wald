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

  constructor(private _wmsService:WMSService,
              public _wrapper:GoogleMapsAPIWrapper) {}
  map: any;
  overlay:any;
  zoom: number = 4;

  public buildMap(){
    this._wrapper.getNativeMap().then((theMap)=>{
      this.map = theMap;

      this.overlay = this._wmsService.buildImageMap(
          ()=>this.map,
          (z)=>this.url+'?',
          (z)=>this.params,
          ()=>this.opacity
        );

      this.map.overlayMapTypes.removeAt(0);
      this.map.overlayMapTypes.push(this.overlay);
    }).catch((e)=>console.log(e));

  }
  ngOnInit() {
    this._wrapper.getNativeMap().then((theMap)=>{
      console.log('map-wald',theMap);
      this.map = theMap;

      this.overlay = this._wmsService.buildImageMap(
          ()=>this.map,
          (z)=>this.url+'?',
          (z)=>this.params,
          ()=>this.opacity
        );
      this.map.overlayMapTypes.push(this.overlay);
    }).catch((e)=>console.log(e));
  }
}
