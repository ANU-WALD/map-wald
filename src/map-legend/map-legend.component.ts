import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import {palettes} from '../colorbrewer';

@Component({
  selector: 'map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss']
})
export class MapLegendComponent implements OnInit {
  @Input() colours: Array<string> = ['red', 'white', 'blue'];
  @Input() labels: Array<string> = ['rouge', 'blanc', 'blue'];
  @Input() title: string = 'the title';
  @Input() mapUnits :string = '';

  _cbPalette:string
  _cbCount:number;
  _cbReverse:boolean;
  _cbRange:Array<number>;

  @Input() set cbPalette(cbp:string){
    this._cbPalette = cbp;
    this.generatePalette();
  }

  get cbPalette():string{return this._cbPalette;}

  @Input() set cbCount(cbc:number){
    this._cbCount=cbc;
    this.generatePalette();
  }

  get cbCount():number{return this._cbCount;}

  @Input() set cbReverse(cbr:boolean){
    this._cbReverse=cbr;
    this.generatePalette();
  }

  get cbReverse():boolean{return this._cbReverse;}

  @Input() set cbRange(cbr:Array<number>){
    this._cbRange = cbr;
    this.generatePalette();
  }

  get cbRange():Array<number>{return this._cbRange;}

  generateLabels():Array<string>|null{
    if(!this._cbRange||!this._cbCount){
      return null;
    }

    var delta = (this._cbRange[1]-this._cbRange[0])/(this._cbCount-1);
    var result = [];
    for(let i=0;i<(this._cbCount-1);i++){
      result.push(''+(this._cbRange[0]+i*delta));
    }
    result.push('&ge;'+this._cbRange[1]);
    result.reverse();
    return result;
  }

  generatePalette(){
    if(!this._cbPalette||!this._cbCount){
      return;
    }

    let colours = palettes[this._cbPalette][this._cbCount].slice();
    colours.reverse();
    this.colours = colours;
    this.labels = this.generateLabels() || colours;
  }

  constructor() { }

  ngOnInit() { }

}
