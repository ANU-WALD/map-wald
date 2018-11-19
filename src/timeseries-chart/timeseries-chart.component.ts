import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSeries } from '../timeseries.service';
//import * as Plotly from 'plotly.js/dist/plotly-basic';

//declare var Plotly: any;
//const Plotly = require('plotly.js/dist/plotly-basic');
import * as Plotly from 'plotly.js/dist/plotly-basic';

@Component({
  selector: 'timeseries-chart',
  template: `<div class="our-chart">
</div>
`,styles: []})
export class TimeseriesChartComponent implements AfterViewInit, OnChanges  {
  @Input() title:string;
  @Input() timeSeries: Array<TimeSeries> = [];
  @Input() marginLeft:number = 40;
  @Input() marginRight:number = 10;
  @Input() marginTop:number = 0;
  @Input() marginBottom:number = 20;
  @Input() titlefont:any = undefined;

  constructor(private _element:ElementRef){

  }

  ngAfterViewInit(){
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
  }

  draw(){
    var node = this._element.nativeElement.querySelector('.our-chart');

    Plotly.purge(node);

        if(!this.timeSeries || !this.timeSeries.length){
      return;
    }

    const seriesUnits = this.timeSeries.map(ts=>ts.units);
    let commonUnits:string;
    if(seriesUnits.every(u=>u===seriesUnits[0])){
      commonUnits = seriesUnits[0];
    }

    var layout:any = {
      margin: {
        t: this.marginTop + (this.title?30:0),
        l:this.marginLeft,
        r:this.marginRight,
        b:this.marginBottom
      },
      yaxis:{
        fixedrange: true,
        title:commonUnits
      },
      width:320,
      height:200,
      title:this.title || undefined,
      titlefont:this.titlefont
    };

    Plotly.plot( node, this.timeSeries.map(ts=>{
      const nonNullCount = ts.values.filter(v=>!isNaN(v)).length;
      const mode = ((ts.style!=='bar')&&(nonNullCount<365)) ?
                   'lines+markers' :
                   undefined;
      const suffix = commonUnits?'':` (${ts.units})`;
      return {
        type:(ts.style==='bar')?'bar':undefined,
        mode:mode,
        x:ts.dates,
        y:ts.values,
        name:ts.label+suffix
      };
    }), layout );
  }
}