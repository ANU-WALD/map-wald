import { Component, Input, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { TimeUtilsService } from "../time-utils.service";
import { InterpolationService } from '../interpolation.service';

const MILLISECONDS_PER_DAY=24*60*60*1000;

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
  @Input() stepDays = 1;
  @Input() referenceDate:string = null;

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
    this.date = new Date(Date.UTC(this.dateStruct.year,this.dateStruct.month-1,this.dateStruct.day));
    // this.date.setUTCFullYear(this.dateStruct.year)
    // this.date.setUTCMonth(this.dateStruct.month-1)
    // this.date.setUTCDate(this.dateStruct.day);
    this.checkReference();
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

  checkReference(): any {
    if(!this.referenceDate){
      return;
    }

    let refComponents = InterpolationService.interpolate(this.referenceDate,{
      year:this.date.getFullYear(),
      month:this.date.getMonth()+1,
      date:this.date.getDate()
    }).split('-').map(s=>+s);

    let currentRef = new Date(Date.UTC(refComponents[0],refComponents[1]-1,refComponents[2]));

    console.log('currentRef',currentRef);
    console.log('currentDate',this.date);
    let timeSpan = MILLISECONDS_PER_DAY * this.stepDays;

    let days = (this.date.getTime() - currentRef.getTime())/timeSpan;
    this.date = new Date(currentRef.getTime() + Math.round(days)*timeSpan);
    this.dateStruct = this.timeUtils.convertDate(this.date);
  }

}