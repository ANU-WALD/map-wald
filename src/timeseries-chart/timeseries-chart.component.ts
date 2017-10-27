import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { TimeSeries } from '../timeseries.service';
//import * as Plotly from 'plotly.js/dist/plotly-basic';

//declare var Plotly: any;
const Plotly = require('plotly.js/dist/plotly-basic');

@Component({
  selector: 'timeseries-chart',
  templateUrl: './timeseries-chart.component.html',
  styleUrls: ['./timeseries-chart.component.scss']
})
export class TimeseriesChartComponent implements AfterViewInit, OnChanges  {
  @Input() timeSeries: Array<TimeSeries> = [];
  @Input() marginLeft:number = 40;
  @Input() marginRight:number = 10;
  @Input() marginTop:number = 0;
  @Input() marginBottom:number = 20;

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

    var layout:any = {
      margin: {
        t: this.marginTop,
        l:this.marginLeft,
        r:this.marginRight,
        b:this.marginBottom
      },
      yaxis:{
        fixedrange: true
      },
      width:320,
      height:200
    };

    Plotly.plot( node, this.timeSeries.map(ts=>{
      return {x:ts.dates,y:ts.values};
    }), layout );
  }
}