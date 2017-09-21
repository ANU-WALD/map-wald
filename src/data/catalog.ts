
const NAMED_OPTIONS:{[key:string]:string}={
  host:'namedHosts',
  interval:'namedIntervals'
}

function clone(v:any):any{
  return JSON.parse(JSON.stringify(v));
}

function matchFirstDefinedKey(keys:Array<string>,lhs:any,rhs:any):boolean{
  for(let k of keys){
    if(lhs[k]&&rhs[k]){
      return lhs[k]===rhs[k];
    }
  }
  return false;
}

function mergeArraysByKeys(keys:Array<string>,...sources:Array<Array<Publication>>):Array<any>{
  if(!sources.length){
    return [];
  }

  var result = (<Array<any>>clone(sources[0])).map(p=>new Publication(p));

  for(var i=1;i<sources.length;i++){
    var source = sources[i];
    for(var j=0;j<source.length;j++){
      var publication:Publication = source[j];
      var match = result.findIndex((pub:any)=>matchFirstDefinedKey(keys,pub,publication));
      if(match>=0){
        var options = Object.assign({},publication.options||{},result[match].options||{})
        result[match] = Object.assign(new Publication(),publication,result[match]);
        result[match].options = options;
      } else {
        result.push(new Publication(clone(publication)));
      }
    }
  }
  return result;
}

function propagate(target:any,source:any,skipPublications?:boolean){
  target.options = Object.assign({},source.options||{},target.options||{});

  if(!skipPublications){
    target.publications = mergeArraysByKeys(['timestep','label'],target.publications||[],source.publications||[]);
//    console.log(target.publications);
  }
}

function instantiateNamedOptions(dest:any,source:any){
  for(var key in NAMED_OPTIONS){
    var configKey:string = NAMED_OPTIONS[key];
    if(!source[configKey]){
      continue;
    }

    if(!dest[key]||(typeof(dest[key])!=='string')){
      continue;
    }

    var lookup = dest[key];
    dest[key] = source[configKey][lookup];
  }
}

export interface CatalogHost{
  url?:string;
  software?:string;
}

export class CatalogOptions{
  host?:CatalogHost;
  filepath?:string;
  palette?:string;
  colorscalerange?:Array<number>;
  legend?:string;
  mapOptions?:any;
  timeFormat?:string;
  publisher?:string;
  publisherURL?:string;
  units?:string;
  smallExtent:boolean;
}

export class Catalog{
  name:string;
  themes:Array<Theme> = [];
  options:CatalogOptions;
  publications:Array<Publication>;

  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);    
    this.themes = config.themes.map((t:any)=>new Theme(t));
    this.propagateOptions();
    this.instantiateNamedOptions();
  }

  propagateOptions(){
    this.themes.forEach(t=>{
      propagate(t,this);
      t.propagateOptions();
    });
  }

  instantiateNamedOptions(){
    if(this.publications){
      this.publications.forEach(p=>p.instantiateNamedOptions(this));
    }
    this.themes.forEach(t=>t.instantiateNamedOptions(this));
  }
}

export class Theme{
  name:string;
  layers:Array<Layer> = [];
  options:CatalogOptions;
  publications:Array<Publication>;
  
  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);

    if(config.layers){
      this.layers = config.layers.map((l:any)=>new Layer(l));
    } else {
      this.layers = [];
    }
  }

  propagateOptions(){
    this.layers.forEach(l=>{
      propagate(l,this);
      l.propagateOptions();
    })
  }

  instantiateNamedOptions(source:any){
    instantiateNamedOptions(this.options,source);
    this.publications.forEach(p=>p.instantiateNamedOptions(source));
    this.layers.forEach(l=>l.instantiateNamedOptions(source));
  }

}

export class Layer{
  publications:Array<Publication> = [];
  options:CatalogOptions;
  name:string;
  [key:string]:any;

  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);
    if(config.publications){
      this.publications = config.publications.map((p:any)=>new Publication(p));
    } else {
      this.publications = [];
    }
  }

  propagateOptions(){
    this.publications.forEach(p=>{
      propagate(p,this,true);
    })
  }

  instantiateNamedOptions(source:any){
    instantiateNamedOptions(this.options,source);
    this.publications.forEach(p=>p.instantiateNamedOptions(source));
  }
}

export class Publication{
  timestep:string;
  label:string;
  skip:boolean;
  options:CatalogOptions;

  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);
  }

  instantiateNamedOptions(source:any){
    instantiateNamedOptions(this.options,source);
  }
}

export type LayerAction = 'replace' | 'add'

export interface LayerSelection{
  layer:Layer;
  action: LayerAction;
}
