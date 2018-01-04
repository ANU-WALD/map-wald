import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'date-element',
  templateUrl: './date-element.component.html',
  styleUrls: ['./date-element.component.scss']
})
export class DateElementComponent implements AfterViewInit  {
  @Input() label:string;
  @Input() property:string;
  @Input() src:any;
  @Input() step = 1;
  @Output() changed = new EventEmitter<any>();
  
  constructor(){

  }

  ngAfterViewInit(){

  }

  move(n:number){
    this.src[this.property] += n;
    this.changed.emit(this.src);
  }
}