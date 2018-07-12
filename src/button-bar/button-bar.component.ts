import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';


declare var Plotly: any;

@Component({
  selector: 'button-bar',
  template: `<div class="button-bar bb-vertical">
  <ng-content></ng-content>
</div>

`,styles: [`
.button-bar{
  margin:3px;
  border:1px solid grey;
  border-radius: 3px;
  background:white;
}

.bb-vertical{
  max-width:30px;
  button {
    width:30px;
  }
}`]})
export class ButtonBarComponent implements AfterViewInit  {

  constructor(){

  }

  ngAfterViewInit(){

  }
}