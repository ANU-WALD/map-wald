

import { Layer } from "./catalog";
import { InterpolationService } from "../interpolation.service";

export type MappedLayerTypes = 'wms' | 'vector';

export interface MappedLayerOptions {
  legend?: boolean;
  publication?: number;
  date?: Date,

  [key: string]: any;
}

export const WMS_PARAMETER_NAMES:{[key:string]:Array<string>} = {
  tds: [
    'layers',
    'styles',
    'colorscalerange',
    'abovemaxcolor',
    'belowmincolor',
    'time',
    'transparent',
    'logscale'
  ],
  geoserver: [
    'transparent',
    'layers'
  ]
};

export const INTERPOLATED_PARAMETERS = [
  'styles'
];

export class MappedLayer {
  layer: Layer;
  options: MappedLayerOptions = {};
  layerType: MappedLayerTypes;

  interpolatedFile:string;
  url: string;
  wmsParameters: any = {};
  flattenedSettings: any = {};
  spatialExtent:any;

  leading0(n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }

  update() {
    var pub = (this.options.publication === undefined) ?
      this.layer.publications.findIndex(p => !p.skip) :
      this.options.publication;

    var publication = this.layer.publications[pub];

    var host = publication.options.host || {};
    var baseURL = host.url;

    var software = host.software || 'tds';

    this.interpolatedFile = (publication.options.filepath || '')
    var mapParams = Object.assign({},
      this.layer,
      publication.options,
      publication.options.mapOptions || {},
      this.options.date ? {
        decade: decadeText(this.options.date),
        year: this.options.date.getFullYear(),
        month: this.leading0(this.options.date.getMonth() + 1),
        day: this.leading0(this.options.date.getDate()),
      } : {},
      this.options);

    if (mapParams.timeFormat) {
      mapParams['time'] = InterpolationService.interpolate(mapParams.timeFormat, mapParams);
    }
    INTERPOLATED_PARAMETERS.forEach(p=>{
      if(mapParams[p]){
        mapParams[p] = InterpolationService.interpolate(mapParams[p],mapParams);
      }
    });
    mapParams.layers = mapParams.layers || mapParams.layer || mapParams.variable;
    this.interpolatedFile = InterpolationService.interpolate(this.interpolatedFile, mapParams);
    this.url = baseURL + '/wms/' + this.interpolatedFile;
    
    if (mapParams.vectors) {
      this.wmsParameters = null;
    } else {
      this.wmsParameters = {};
      WMS_PARAMETER_NAMES[software].forEach(param => {
        if (mapParams[param]) {
          this.wmsParameters[param] = mapParams[param];
        }
      });
      this.flattenedSettings = mapParams;
    }
  }
}

function decadeText(d: Date): string {
  var decade = d.getFullYear().toString().slice(0, 3);
  return `${decade}0-${decade}9`;
}