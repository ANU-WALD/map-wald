import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';

@Component({
  selector: 'map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.scss']
})
export class MapControlComponent implements OnInit,AfterViewInit {
  @ViewChild('mapControl') mapControl: Component;
  @Input() position:string = 'TOP_RIGHT';
  @Input() zIndex: number = 0;

  constructor(private _el:ElementRef, public _wrapper:GoogleMapsAPIWrapper) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this._wrapper.getNativeMap().then((m)=>{
      let content: HTMLElement = this._el.nativeElement.querySelector('.map-control-content');

      if (content.nodeName !== "DIV") {
        let controlDiv: HTMLElement = document.createElement('div');
        controlDiv.appendChild(content);
        content = controlDiv
      } 

      content.style.zIndex = this.zIndex.toString();
      //controlDiv.onclick = () => { this.controlClick.next(null); };
      (<any>m).controls[(<any>window).google.maps.ControlPosition[this.position]].push(content);
    });
  }

}
