import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';


declare var Plotly: any;

@Component({
  selector: 'cycle-opacity',
  template: `<button class="btn btn-secondary btn-sm"
                     (click)="cycleTransparency()"
                     [ngbTooltip]="tooltip"
                     placement="right">
<i class="fa" [ngClass]="(layerOpacity<0.5)?'fa-circle-o':((layerOpacity<0.9)?'fa-adjust':'fa-circle')"></i>
</button>`,styles: []})
export class CycleOpacityComponent implements AfterViewInit, OnChanges  {
  @Input() map:LayeredMapComponent;
  @Input() maxZoom = 32;
  @Input() tooltip = 'Adjust transparency of grid layer';
  @Input() layerOpacity = 1.0;
  @Input() step = 0.4;

  constructor(){

  }

  ngAfterViewInit(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.map){
      this.map.layersChange.subscribe(()=>this.updateLayers());
    }
  }

  cycleTransparency(){
    this.layerOpacity -= this.step;
    if(this.layerOpacity<0){
      this.layerOpacity = 1.0;
    }
    this.updateLayers();
  }

  private updateLayers() {
    this.map.layers.forEach(l => l.opacity = this.layerOpacity);
  }
}
