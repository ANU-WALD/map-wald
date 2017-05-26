import { Injectable } from '@angular/core';
//const proj4 = require('proj4');
//const Proj = proj4.Proj;
//const defs = proj4.defs;
//proj4.InterfaceProjection;
//const InterfaceCoordinates = proj4.InterfaceCoordinates;
//const TemplateCoordinates = proj4.TemplateCoordinates;
//const proj4 = require('proj4');//.default;
import * as proj4 from 'proj4';
const D2R = Math.PI/180;

@Injectable()
export class WMSService {

  static TILE_SIZE=256;
  static TILE_WIDTH=WMSService.TILE_SIZE;
  static TILE_HEIGHT=WMSService.TILE_SIZE;

  constructor() {
    this.webMercator = proj4.Proj('EPSG:3857');
    //this.webMercator = proj4.Proj(proj4.defs('EPSG:3857'));
  }

  public webMercator: any;

  public pointToWebMercator(pt:any):number[]{
    var _pt = {x:pt.lng()*D2R,y:pt.lat()*D2R};
    return this.webMercator.forward(_pt);
  };

  public computeTileBounds(map:any,coord:any,zoom:number):string{
    var proj = map.getProjection();
    var zfactor = Math.pow(2, zoom);
    var xScale = WMSService.TILE_WIDTH/zfactor;
    var yScale = WMSService.TILE_HEIGHT/zfactor;

    var top = proj.fromPointToLatLng({x:coord.x * xScale, y:coord.y * yScale});
    var bot = proj.fromPointToLatLng({x:(coord.x + 1) * xScale, y:(coord.y + 1) * yScale});

    top = this.pointToWebMercator(top);
    bot = this.pointToWebMercator(bot);
    var bbox = [top.x,bot.y,bot.x,top.y];
    bbox = bbox.map((n)=>n.toFixed(20).replace(/\.?0+$/,"")); // Avoid e notation on small numbers
    return bbox.join(',');
  };

  public buildImageMap(getMap:()=>any,
                       getURL:(zoom:number)=>string,
                       getOptions:(zoom:number)=>any,
                       getOpacity:()=>number):any{
    var me = this;
    return new (<any>window).google.maps.ImageMapType({
      getTileUrl: function(coord:any,zoom:number):string{
        var theMap = getMap();
        if(!theMap){
          return '';
        }

        var bbox = me.computeTileBounds(theMap,coord,zoom);

        var url = getURL(zoom) + '&service=WMS&version=1.1.1&request=GetMap';
        url += "&BBOX=" + bbox;      // set bounding box
        url += "&FORMAT=image/png" ; //WMS format
        var layerParams = getOpacity?getOptions(zoom):{};
        layerParams.width = layerParams.width || WMSService.TILE_WIDTH;
        layerParams.height = layerParams.height || WMSService.TILE_HEIGHT;
        for(var key in layerParams){
          url += '&'+key+'='+layerParams[key];
        }
        url += "&SRS=EPSG:3857";     //set Web Mercator
        return url;
      },
      tileSize:new (<any>window).google.maps.Size(WMSService.TILE_SIZE,WMSService.TILE_SIZE),
      isPng:true,
      opacity:getOpacity?getOpacity():1.0
    });
  };

}
