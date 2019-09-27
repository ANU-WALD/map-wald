import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'date-shifter',
  template: `<div>
  <h3>{{dateText}}</h3>
  <input type="range"
         class="form-control"
         min="-4"
         [max]="4"
         step="1"
         [(ngModel)]="value"
         (ngModelChange)="sliderMoved()"
         (mouseup)="reset()">
  <h4>{{label}}</h4>
</div>

  `,
  styles: [``]
})
export class DateShifterComponent implements AfterViewInit,OnChanges  {
  @Input() interval = 2000;
  @Input() limits:Date[] = null;
  @Input() date = new Date();
  @Output() dateChange = new EventEmitter<Date>();

  value = 0;
  label = '-';
  timer:number = 0;
  dateText = '-';

  constructor(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.interval){
      this.startTimer();
    }
  }

  startTimer(): any {
    if(this.timer){
      clearInterval(this.timer);
    }
    this.timer = window.setInterval(()=>this.tick(),this.interval);
  }

  ngAfterViewInit(){
    this.startTimer();
  }

  reset(){
    this.value = 0;
    this.sliderMoved();
  }

  tick(): any {
    if(!this.value){
      return;
    }

    let sign = this.value < 0 ? -1 : 1;
    this.date = new Date(this.date.getTime());
    switch(Math.abs(this.value)){
      case 1:
        this.date.setDate(this.date.getDate()+sign);
        break;
      case 2:
        this.date.setDate(this.date.getDate()+7*sign);
        break;
      case 3:
        this.date.setMonth(this.date.getMonth()+sign);
        break;
      case 4:
        this.date.setFullYear(this.date.getFullYear()+sign);
        break;
    }

    if(this.limits&&this.limits.length){
      if(this.date.getTime()<this.limits[0].getTime()){
        this.date = this.limits[0];
      }
      if(this.date.getTime()>this.limits[1].getTime()){
        this.date = this.limits[1];
      }
    }
    this.setDateText();
    this.dateChange.emit(this.date);
  }
  setDateText(): any {
    this.dateText = this.date.toLocaleDateString();
  }

  sliderMoved(){
    this.setLabel();
  }

  setLabel() {
    if(this.value<0){
      this.label = 'back 1';
    } else if(this.value>0){
      this.label = 'advance 1';
    } else {
      this.label = '-';
    }

    switch(Math.abs(this.value)){
      case 1:
        this.label += 'day';
        break;
      case 2:
        this.label += 'week';
        break;
      case 3:
        this.label += 'month';
        break;
      case 4:
        this.label += 'year';
        break;
    }
  }
}
