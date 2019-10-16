import { Component, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as store from 'store';


declare var Plotly: any;

@Component({
  selector: 'one-time-splash',
  template: `<ng-template #splashTemplate let-c="close" let-d="dismiss">
  <div class="modal-header">
    <h4 class="modal-title">
      {{label}}</h4>
    <button type="button" class="close" aria-label="Close" (click)="d('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <ng-content></ng-content>
  </div>
  <div class="modal-footer">
    <label *ngIf="application">
      <input type="checkbox" [(ngModel)]="doNotShow" (ngModelChange)="doNotShowClicked()">
      &nbsp; {{hideMessage}}
    </label>
    <button type="button" class="btn btn-secondary" (click)="c('Close click')">Close</button>
  </div>
  </ng-template>
`,
  styles: [``]
})
export class OneTimeSplashComponent implements AfterViewInit  {
  @ViewChild('splashTemplate',{static:false}) splashTemplate:any;
  @Input() application:string;
  @Input() label = 'About';
  @Input() hideMessage = 'Understood, I don’t need to see this again';
  @Input() klass: string;
  doNotShow: boolean;
  current:NgbModalRef;

  constructor(private modalService: NgbModal){

  }

  storageKey(){
    if(!this.application){
      return null;
    }

    return this.application  + '-splash-skip';
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      const key = this.storageKey();
      if(key){
        this.doNotShow = store.get(key,false);
      }

      if(!this.doNotShow){
        this.show();
      }
    });
  }

  show(){
    this.current = this.modalService.open(this.splashTemplate,{
      size:'lg',
      windowClass:this.klass
    });
  }

  close(){
    if(!this.current){
      return;
    }

    this.current.close();
    this.current=null;
  }

  doNotShowClicked(){
    const key = this.storageKey();
    if(!key){
      return;
    }

    store.set(key,this.doNotShow);
  }
}
