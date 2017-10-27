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
  @Input() style: ('popup'|'arrows') = 'arrows';
  need = {
    day:true,
    month:true,
    year:true
  };

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

    if(changes.timestep){
      this.assessDateComponents();
    }
    this.checkLimits();
  }

  dateStructChanged(){
    this.date = new Date()
    this.date.setUTCFullYear(this.dateStruct.year)
    this.date.setUTCMonth(this.dateStruct.month-1)
    this.date.setUTCDate(this.dateStruct.day);
    this.dateChange.emit(this.date);
  }

  assessDateComponents(){
    this.need.day = this.need.month = this.need.year = true;
    if(this.timestep==='daily'){
      return;
    }
    this.need.day = false;

    if(this.timestep==='annual') {
      this.need.month = false;
    }
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