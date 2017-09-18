import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TimeUtilsService } from "../time-utils.service";


declare var Plotly: any;

@Component({
  selector: 'date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent implements AfterViewInit  {
  @Input() date: Date;
  @Output() dateChange = new EventEmitter();
  @Input() timestep: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;

  minDateStruct:NgbDateStruct;
  maxDateStruct:NgbDateStruct;
  dateStruct:NgbDateStruct;

  atMax:boolean=false;
  atMin:boolean=false;

  constructor(private timeUtils: TimeUtilsService){

  }

  ngAfterViewInit(){

  }

  ngOnChanges(changes:any){
    if(changes.minDate){
      this.minDateStruct = this.timeUtils.convertDate(this.minDate);
    }

    if(changes.maxDate){
      this.maxDateStruct = this.timeUtils.convertDate(this.maxDate);
    }

    if(changes.date){
      this.dateStruct = this.timeUtils.convertDate(this.date);
    }

    this.checkLimits();
  }

  dateStructChanged(){
    console.log(this.dateStruct);
    this.date = new Date(this.dateStruct.year,this.dateStruct.month-1,this.dateStruct.day);
    this.dateChange.emit(this.date);
  }

  move(n:number){
    this.date = new Date(this.date);
    this.date.setDate(this.date.getDate()+n);
    this.onDateChanged();
    this.dateChange.emit(this.date);
  }

  onDateChanged(){
    this.checkLimits();
  }

  checkLimits(){
    this.atMax = this.timeUtils.datesEqual(this.dateStruct,this.maxDateStruct);
    this.atMin = this.timeUtils.datesEqual(this.dateStruct,this.minDateStruct);
  }
  // TODO not enforcing limits etc...
}