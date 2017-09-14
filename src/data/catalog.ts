
function clone(v:any):any{
  return JSON.parse(JSON.stringify(v));
}

function mergeArraysByKey(key:string,...sources:Array<Array<Publication>>):Array<any>{
  if(!sources.length){
    return [];
  }

  var result = (<Array<any>>clone(sources[0])).map(p=>new Publication(p));

  for(var i=1;i<sources.length;i++){
    var source = sources[i];
    for(var j=0;j<source.length;j++){
      var publication:Publication = source[j];
      var match = result.findIndex((pub:any)=>pub.timestep===publication.timestep);
      if(match>=0){
        var options = Object.assign({},publication.options||{},result[match].options||{})
        result[match] = Object.assign({},publication,result[match]);
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
    target.publications = mergeArraysByKey('timestep',target.publications||[],source.publications||[]);
    console.log(target.publications);
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
}

export class Catalog{
  themes:Array<Theme> = [];
  options:CatalogOptions;

  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);    
    this.themes = config.themes.map((t:any)=>new Theme(t));
    this.propagateOptions();
  }

  propagateOptions(){
    this.themes.forEach(t=>{
      propagate(t,this);
      t.propagateOptions();
    });
  }
}

export class Theme{
  layers:Array<Layer> = [];
  options:CatalogOptions;
  
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
}

export class Layer{
  publications:Array<Publication> = [];
  options:CatalogOptions;
  name:string;

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
}

export class Publication{
  timestep:string;
  options:CatalogOptions;
  
  constructor(config?:any){
    if(!config){
      return;
    }
    Object.assign(this,config);
  }
}