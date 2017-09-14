import { Injectable } from '@angular/core';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class TimeUtilsService {

  constructor() {

  }

  specialDates: {[key:string]:(()=>Date)} = {
    yesterday: ()=>{
      var d = new Date();
      d.setDate(d.getDate()-1);
      return d;
    }
  }

  convertDate(d:(Date|string)):NgbDateStruct{
    console.log(d);
    if(!d){
      d = new Date();
    }

    var date:Date;
    if(typeof(d)==='string'){
      var dateText:string = d;
      if(this.specialDates[dateText]){
        date = this.specialDates[dateText]();
      } else {
        var [year,month,day,other] = d.split('-').map(c=>+c);
        date = new Date(year,month,day);
      }
    } else {
      date = d;
    }

    return {
      day: date.getUTCDate(),
      month: date.getUTCMonth()+1,
      year: date.getUTCFullYear()
    };
  }

  datesEqual(lhs:NgbDateStruct,rhs:NgbDateStruct):boolean{
    if(!lhs || !rhs){
      return false;
    }

    return (lhs.year===rhs.year) &&
           (lhs.month===rhs.month) &&
           (lhs.day===rhs.day);

  }


}
