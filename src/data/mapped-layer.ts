

import { Layer } from "./catalog";
import { InterpolationService } from "../interpolation.service";

export type MappedLayerTypes = 'wms' | 'vector';

export interface MappedLayerOptions{
  legend?:boolean;
  publication?:number;
  date?:Date,

  [key:string]:any;
}

export const WMS_PARAMETER_NAMES = {
  tds:[
    'layers',
    'styles',
    'colorscalerange',
    'abovemaxcolor',
    'belowmincolor',
    'time',
    'transparent',
    'logscale'
  ]
};

export class MappedLayer {
  layer:Layer;
  options:MappedLayerOptions={};
  layerType:MappedLayerTypes;

  url:string;
  wmsParameters:any={};
  flattenedSettings:any={};

  leading0(n:number):string {
    if(n<10){
      return '0'+n;
    }
    return ''+n;
  }

  update(){
    var pub = this.options.publication||this.layer.publications.findIndex(p=>!p.skip);
    var publication = this.layer.publications[pub];

    var host = publication.options.host || {};
    var baseURL = host.url;

    var software = host.software || 'tds';

    if(software==='tds'){
      this.url = baseURL + '/wms/'+publication.options.filepath;
      var mapParams = Object.assign({},
        this.layer,
        publication.options,
        publication.options.mapOptions||{},
        this.options.date?{
          decade:decadeText(this.options.date),
          year:this.options.date.getFullYear(),
          month:this.leading0(this.options.date.getMonth()+1),
          day:this.leading0(this.options.date.getDate()),
        }:{},
        this.options);
      if(mapParams.timeFormat){
        mapParams['time']=InterpolationService.interpolate(mapParams.timeFormat,mapParams);
      }
      mapParams.layers = mapParams.layers || mapParams.layer || mapParams.variable;
      this.url = InterpolationService.interpolate(this.url,mapParams);
      this.wmsParameters={};
      WMS_PARAMETER_NAMES[software].forEach(param=>{
        if(mapParams[param]){
          this.wmsParameters[param]=mapParams[param];
        }
      });
      this.flattenedSettings = mapParams;
    }
  }
}

function decadeText(d:Date):string{
  var decade = d.getFullYear().toString().slice(0,3);
  return `${decade}0-${decade}9`;
}