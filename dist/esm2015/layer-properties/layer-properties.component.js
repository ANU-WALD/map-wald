import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { PointSelectionService, PointSelection } from '../point-selection.service';
let LayerPropertiesComponent = class LayerPropertiesComponent {
    constructor(pointSelectionService) {
        this.pointSelectionService = pointSelectionService;
        this.getKeys = Object.keys;
        this.propertyChanged = new EventEmitter();
        this.tooltipPlacement = 'right';
        this.availableTags = null;
        this.tags = {};
        this.pointVariables = [];
    }
    get publication() {
        if (!this.layer || !this.layer.layer || !this.layer.layer.publications) {
            return null;
        }
        return this.layer.layer.publications[this.layer.options.publication || 0];
    }
    ngAfterViewInit() {
        // if(this.layer){
        //   this.publication=this.layer.layer.publications[this.layer.options.publication||0];
        // }
        // if (this.layer &&
        //   this.layer.layer.options.smallExtent &&
        //   !this.layer.spatialExtent) {
        //   this.loadExtent();
        // }
        if (this.map) {
            this.selectedFeatureSubscription =
                this.map.featureSelected.subscribe((evt) => this.featureSelected(evt));
        }
        if (this.layer) {
            setTimeout(() => {
                this.findTags();
            });
        }
    }
    ngOnDestroy() {
        if (this.selectedFeatureSubscription) {
            this.selectedFeatureSubscription.unsubscribe();
        }
    }
    featureSelected(evt) {
        if (!this.publication || !this.publication.pointdata) {
            return;
        }
        this.selectedFeature = evt.feature;
        // No guarantee that this is from the same layer!!!!
        this.queryPointData();
    }
    publicationSelected(idx) {
        this.layer.options.publication = idx;
        // this.publication=this.layer.layer.publications[idx];
        if (this.publication.pointdata) {
            this.pointSelectionChanged();
            this.updateVariables();
        }
        this.update(idx);
    }
    updateLayer() {
        this.layer.options.tags = this.tags;
        this.layer.update();
        this.propertyChanged.emit(this.layer);
    }
    update(event) {
        this.updateLayer();
        setTimeout(() => {
            this.findTags();
        });
    }
    processTags(tags) {
        if (!tags) {
            return null;
        }
        let result = {};
        Object.keys(tags).forEach(k => {
            let values = tags[k];
            result[k] = values.map(v => {
                let vAsTag = v;
                if (vAsTag.value && vAsTag.label) {
                    return vAsTag;
                }
                let vAsString = v;
                return {
                    value: vAsString,
                    label: vAsString
                };
            });
        });
        return result;
    }
    findTags() {
        if (this.publication.pointdata) {
            this.availableTags = this.processTags(this.publication.pointdata.tags);
        }
        else {
            this.availableTags = this.processTags(this.layer.flattenedSettings.options.tags);
        }
        this.setDefaultTags();
    }
    tagChanged(t) {
        this.queryPointData();
        this.update(null);
    }
    setDefaultTags() {
        if (!this.availableTags) {
            return;
        }
        Object.keys(this.availableTags).forEach(tag => {
            if (this.tags[tag] === undefined) {
                this.tags[tag] = this.availableTags[tag][0].value;
            }
        });
        this.updateLayer();
    }
    zoomToExtent() {
        if (!this.map) {
            console.log('NO MAP!');
            return;
        }
        this.map.lat = this.layer.layer.lat;
        this.map.lng = this.layer.layer.lon;
        this.map.zoom = this.layer.layer.zoom || 13;
    }
    pointSelection() {
        return {
            catalog: this.publication.pointdata,
            variable: this.selectedVariable,
            feature: this.selectedFeature,
            tags: this.tags
        };
    }
    queryPointData() {
        let pointdata = this.publication && this.publication.pointdata;
        if (!this.publication || !this.publication.pointdata) {
            return;
        }
        this.pointSelectionChanged();
        this.updateVariables();
    }
    updateVariables() {
        let sel = this.pointSelection();
        this.pointSelectionService.timeseriesVariables(sel).subscribe(variables => {
            this.pointVariables = variables.slice();
            if (this.publication.pointdata.exclude) {
                this.pointVariables = this.pointVariables.filter(v => {
                    return !this.publication.pointdata.exclude.some(pattern => {
                        return !!v.value.match(pattern);
                    });
                });
            }
            if (!this.pointVariables.length) {
                this.selectedVariable = null;
            }
            else if (this.pointVariables.findIndex(t => t.value === this.selectedVariable) < 0) {
                if (this.pointVariables.findIndex(t => t.value === this.publication.pointdata.defaultVariable) >= 0) {
                    this.selectedVariable = this.publication.pointdata.defaultVariable;
                }
                else {
                    this.selectedVariable = this.pointVariables[0].value;
                }
            }
            this.pointSelectionChanged();
        });
    }
    pointSelectionChanged() {
        this.pointSelectionService.pointSelection(this.pointSelection());
    }
};
LayerPropertiesComponent.ctorParameters = () => [
    { type: PointSelectionService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", MappedLayer)
], LayerPropertiesComponent.prototype, "layer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", LayeredMapComponent)
], LayerPropertiesComponent.prototype, "map", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], LayerPropertiesComponent.prototype, "propertyChanged", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LayerPropertiesComponent.prototype, "tooltipPlacement", void 0);
LayerPropertiesComponent = tslib_1.__decorate([
    Component({
        selector: 'layer-properties',
        template: `<div class="container-fluid">
  <p><strong>{{layer?.title}}</strong>
    <span *ngIf="layer.description()" 
    [ngbTooltip]="layer.description()"
    [placement]="tooltipPlacement"
    class="layer-info-target"
    container="body">
  &nbsp;<i class="fa fa-info-circle"></i>
  </span>
  &nbsp;<span *ngIf="layer.interpolatedDownloadURL">
    <small><a target="_blank" 
              [href]="layer.interpolatedDownloadURL"
              [ngbTooltip]="'Download data'"
              container="body">
      <i class="fa fa-download"></i>
    </a></small>
  </span>
  </p>

  <div *ngIf="layer?.layer.publications.length>1">
    <span *ngIf="layer.layer.publications[0].timestep">Timestep </span>
    <span *ngIf="!layer.layer.publications[0].timestep">{{ layer.layer.options.publicationLabel || 'Variable' }} </span>
    <select [(ngModel)]="layer.options.publication" (ngModelChange)="publicationSelected($event)">
      <option *ngFor="let p of layer.layer.publications; let i=index" [ngValue]="i">{{p.label || p.timestep}}</option>
    </select>
  </div>
  <div *ngIf="layer?.layer.publications.length===1">
    {{publication?.label}}
  </div>

  <div *ngIf="publication&&publication.timestep">
    <hr/>
    <date-selection [(date)]="layer.options.date"
      (dateChange)="update($event)"
      [timestep]="publication.timestep"
      [stepDays]="publication.timestepMultiplier||1"
      [referenceDate]="publication.timestepReference"
      [minDate]="publication.options.start"
      [maxDate]="publication.options.end"></date-selection>
  </div>

  <div *ngIf="layer.layer.options.smallExtent">
    <hr/>
    <button class="btn btn-sm btn-primary" (click)="zoomToExtent()">Zoom to Extent</button>
  </div>

<!--
  <div *ngIf="layer.layer.options.vectors">
    <p>Lets filter those {{layer.layer.options.vectors}}s, eh?</p>
  </div>
-->

  <div *ngIf="availableTags">
    <div *ngFor="let tag of getKeys(availableTags)">
      {{tag}}
      <select [(ngModel)]="tags[tag]" (ngModelChange)="tagChanged(tag)">
        <option *ngFor="let val of availableTags[tag]" [ngValue]="val.value">{{val.label}}</option>
      </select> 
    </div>
  </div>

  <div *ngIf="publication?.pointdata">
    Variable:
    <select [(ngModel)]="selectedVariable" (ngModelChange)="queryPointData()">
      <option *ngFor="let v of pointVariables" [ngValue]="v.value">{{v.label}}</option>
    </select>
  </div>
  <!--
  <div *ngIf="publication">
    <p>Start: {{publication.options.start}}</p>
    <p>End: {{publication.options.end}}</p>
    <p>{{publication|json}}</p>
  </div>
  <button (click)="update()">Force update...</button>
  -->
</div>`
    }),
    tslib_1.__metadata("design:paramtypes", [PointSelectionService])
], LayerPropertiesComponent);
export { LayerPropertiesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItcHJvcGVydGllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImxheWVyLXByb3BlcnRpZXMvbGF5ZXItcHJvcGVydGllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQUUsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFtRm5GLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXdCO0lBYW5DLFlBQW9CLHFCQUE0QztRQUE1QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBWmhFLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBR1osb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RDLHFCQUFnQixHQUFXLE9BQU8sQ0FBQztRQUM1QyxrQkFBYSxHQUFnQixJQUFJLENBQUM7UUFDbEMsU0FBSSxHQUE4QixFQUFFLENBQUE7UUFDcEMsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO0lBT3JDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3RFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxX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SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQ0YsQ0FBQTs7WUF2TDRDLHFCQUFxQjs7QUFYdkQ7SUFBUixLQUFLLEVBQUU7c0NBQVEsV0FBVzt1REFBQztBQUNuQjtJQUFSLEtBQUssRUFBRTtzQ0FBTSxtQkFBbUI7cURBQUM7QUFDeEI7SUFBVCxNQUFNLEVBQUU7O2lFQUFzQztBQUN0QztJQUFSLEtBQUssRUFBRTs7a0VBQW9DO0FBTGpDLHdCQUF3QjtJQS9FcEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJFTDtLQUNOLENBQUM7NkNBYzJDLHFCQUFxQjtHQWJyRCx3QkFBd0IsQ0FvTXBDO1NBcE1ZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBQdWJsaWNhdGlvbiwgTGF5ZXJUYWdWYWx1ZSwgTGF5ZXJUYWdNYXAgfSBmcm9tICcuLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgTGF5ZXJlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uL2xheWVyZWQtbWFwL2xheWVyZWQtbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9tZXRyeU9iamVjdCwgRmVhdHVyZSB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlLCBQb2ludFNlbGVjdGlvbiB9IGZyb20gJy4uL3BvaW50LXNlbGVjdGlvbi5zZXJ2aWNlJztcblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xheWVyLXByb3BlcnRpZXMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cbiAgPHA+PHN0cm9uZz57e2xheWVyPy50aXRsZX19PC9zdHJvbmc+XG4gICAgPHNwYW4gKm5nSWY9XCJsYXllci5kZXNjcmlwdGlvbigpXCIgXG4gICAgW25nYlRvb2x0aXBdPVwibGF5ZXIuZGVzY3JpcHRpb24oKVwiXG4gICAgW3BsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICBjbGFzcz1cImxheWVyLWluZm8tdGFyZ2V0XCJcbiAgICBjb250YWluZXI9XCJib2R5XCI+XG4gICZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+XG4gIDwvc3Bhbj5cbiAgJm5ic3A7PHNwYW4gKm5nSWY9XCJsYXllci5pbnRlcnBvbGF0ZWREb3dubG9hZFVSTFwiPlxuICAgIDxzbWFsbD48YSB0YXJnZXQ9XCJfYmxhbmtcIiBcbiAgICAgICAgICAgICAgW2hyZWZdPVwibGF5ZXIuaW50ZXJwb2xhdGVkRG93bmxvYWRVUkxcIlxuICAgICAgICAgICAgICBbbmdiVG9vbHRpcF09XCInRG93bmxvYWQgZGF0YSdcIlxuICAgICAgICAgICAgICBjb250YWluZXI9XCJib2R5XCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWRvd25sb2FkXCI+PC9pPlxuICAgIDwvYT48L3NtYWxsPlxuICA8L3NwYW4+XG4gIDwvcD5cblxuICA8ZGl2ICpuZ0lmPVwibGF5ZXI/LmxheWVyLnB1YmxpY2F0aW9ucy5sZW5ndGg+MVwiPlxuICAgIDxzcGFuICpuZ0lmPVwibGF5ZXIubGF5ZXIucHVibGljYXRpb25zWzBdLnRpbWVzdGVwXCI+VGltZXN0ZXAgPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwiIWxheWVyLmxheWVyLnB1YmxpY2F0aW9uc1swXS50aW1lc3RlcFwiPnt7IGxheWVyLmxheWVyLm9wdGlvbnMucHVibGljYXRpb25MYWJlbCB8fCAnVmFyaWFibGUnIH19IDwvc3Bhbj5cbiAgICA8c2VsZWN0IFsobmdNb2RlbCldPVwibGF5ZXIub3B0aW9ucy5wdWJsaWNhdGlvblwiIChuZ01vZGVsQ2hhbmdlKT1cInB1YmxpY2F0aW9uU2VsZWN0ZWQoJGV2ZW50KVwiPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgcCBvZiBsYXllci5sYXllci5wdWJsaWNhdGlvbnM7IGxldCBpPWluZGV4XCIgW25nVmFsdWVdPVwiaVwiPnt7cC5sYWJlbCB8fCBwLnRpbWVzdGVwfX08L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG4gIDxkaXYgKm5nSWY9XCJsYXllcj8ubGF5ZXIucHVibGljYXRpb25zLmxlbmd0aD09PTFcIj5cbiAgICB7e3B1YmxpY2F0aW9uPy5sYWJlbH19XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJwdWJsaWNhdGlvbiYmcHVibGljYXRpb24udGltZXN0ZXBcIj5cbiAgICA8aHIvPlxuICAgIDxkYXRlLXNlbGVjdGlvbiBbKGRhdGUpXT1cImxheWVyLm9wdGlvbnMuZGF0ZVwiXG4gICAgICAoZGF0ZUNoYW5nZSk9XCJ1cGRhdGUoJGV2ZW50KVwiXG4gICAgICBbdGltZXN0ZXBdPVwicHVibGljYXRpb24udGltZXN0ZXBcIlxuICAgICAgW3N0ZXBEYXlzXT1cInB1YmxpY2F0aW9uLnRpbWVzdGVwTXVsdGlwbGllcnx8MVwiXG4gICAgICBbcmVmZXJlbmNlRGF0ZV09XCJwdWJsaWNhdGlvbi50aW1lc3RlcFJlZmVyZW5jZVwiXG4gICAgICBbbWluRGF0ZV09XCJwdWJsaWNhdGlvbi5vcHRpb25zLnN0YXJ0XCJcbiAgICAgIFttYXhEYXRlXT1cInB1YmxpY2F0aW9uLm9wdGlvbnMuZW5kXCI+PC9kYXRlLXNlbGVjdGlvbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cImxheWVyLmxheWVyLm9wdGlvbnMuc21hbGxFeHRlbnRcIj5cbiAgICA8aHIvPlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1wcmltYXJ5XCIgKGNsaWNrKT1cInpvb21Ub0V4dGVudCgpXCI+Wm9vbSB0byBFeHRlbnQ8L2J1dHRvbj5cbiAgPC9kaXY+XG5cbjwhLS1cbiAgPGRpdiAqbmdJZj1cImxheWVyLmxheWVyLm9wdGlvbnMudmVjdG9yc1wiPlxuICAgIDxwPkxldHMgZmlsdGVyIHRob3NlIHt7bGF5ZXIubGF5ZXIub3B0aW9ucy52ZWN0b3JzfX1zLCBlaD88L3A+XG4gIDwvZGl2PlxuLS0+XG5cbiAgPGRpdiAqbmdJZj1cImF2YWlsYWJsZVRhZ3NcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB0YWcgb2YgZ2V0S2V5cyhhdmFpbGFibGVUYWdzKVwiPlxuICAgICAge3t0YWd9fVxuICAgICAgPHNlbGVjdCBbKG5nTW9kZWwpXT1cInRhZ3NbdGFnXVwiIChuZ01vZGVsQ2hhbmdlKT1cInRhZ0NoYW5nZWQodGFnKVwiPlxuICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB2YWwgb2YgYXZhaWxhYmxlVGFnc1t0YWddXCIgW25nVmFsdWVdPVwidmFsLnZhbHVlXCI+e3t2YWwubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+IFxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwicHVibGljYXRpb24/LnBvaW50ZGF0YVwiPlxuICAgIFZhcmlhYmxlOlxuICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZhcmlhYmxlXCIgKG5nTW9kZWxDaGFuZ2UpPVwicXVlcnlQb2ludERhdGEoKVwiPlxuICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgdiBvZiBwb2ludFZhcmlhYmxlc1wiIFtuZ1ZhbHVlXT1cInYudmFsdWVcIj57e3YubGFiZWx9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbiAgPCEtLVxuICA8ZGl2ICpuZ0lmPVwicHVibGljYXRpb25cIj5cbiAgICA8cD5TdGFydDoge3twdWJsaWNhdGlvbi5vcHRpb25zLnN0YXJ0fX08L3A+XG4gICAgPHA+RW5kOiB7e3B1YmxpY2F0aW9uLm9wdGlvbnMuZW5kfX08L3A+XG4gICAgPHA+e3twdWJsaWNhdGlvbnxqc29ufX08L3A+XG4gIDwvZGl2PlxuICA8YnV0dG9uIChjbGljayk9XCJ1cGRhdGUoKVwiPkZvcmNlIHVwZGF0ZS4uLjwvYnV0dG9uPlxuICAtLT5cbjwvZGl2PmAsIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTGF5ZXJQcm9wZXJ0aWVzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgZ2V0S2V5cyA9IE9iamVjdC5rZXlzO1xuICBASW5wdXQoKSBsYXllcjogTWFwcGVkTGF5ZXI7XG4gIEBJbnB1dCgpIG1hcDogTGF5ZXJlZE1hcENvbXBvbmVudDtcbiAgQE91dHB1dCgpIHByb3BlcnR5Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogc3RyaW5nID0gJ3JpZ2h0JztcbiAgYXZhaWxhYmxlVGFnczogTGF5ZXJUYWdNYXAgPSBudWxsO1xuICB0YWdzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge31cbiAgcG9pbnRWYXJpYWJsZXM6IExheWVyVGFnVmFsdWVbXSA9IFtdO1xuICBzZWxlY3RlZFZhcmlhYmxlOiBzdHJpbmc7XG4gIHNlbGVjdGVkRmVhdHVyZTogRmVhdHVyZTxHZW9tZXRyeU9iamVjdD47XG4gIHNlbGVjdGVkRmVhdHVyZVN1YnNjcmlwdGlvbjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9pbnRTZWxlY3Rpb25TZXJ2aWNlOiBQb2ludFNlbGVjdGlvblNlcnZpY2UpIHtcblxuICB9XG5cbiAgZ2V0IHB1YmxpY2F0aW9uKCk6IChQdWJsaWNhdGlvbiB8IG51bGwpIHtcbiAgICBpZiAoIXRoaXMubGF5ZXIgfHwgIXRoaXMubGF5ZXIubGF5ZXIgfHwgIXRoaXMubGF5ZXIubGF5ZXIucHVibGljYXRpb25zKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGF5ZXIubGF5ZXIucHVibGljYXRpb25zW3RoaXMubGF5ZXIub3B0aW9ucy5wdWJsaWNhdGlvbiB8fCAwXTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBpZih0aGlzLmxheWVyKXtcbiAgICAvLyAgIHRoaXMucHVibGljYXRpb249dGhpcy5sYXllci5sYXllci5wdWJsaWNhdGlvbnNbdGhpcy5sYXllci5vcHRpb25zLnB1YmxpY2F0aW9ufHwwXTtcbiAgICAvLyB9XG4gICAgLy8gaWYgKHRoaXMubGF5ZXIgJiZcbiAgICAvLyAgIHRoaXMubGF5ZXIubGF5ZXIub3B0aW9ucy5zbWFsbEV4dGVudCAmJlxuICAgIC8vICAgIXRoaXMubGF5ZXIuc3BhdGlhbEV4dGVudCkge1xuICAgIC8vICAgdGhpcy5sb2FkRXh0ZW50KCk7XG4gICAgLy8gfVxuICAgIGlmICh0aGlzLm1hcCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVTdWJzY3JpcHRpb24gPVxuICAgICAgICB0aGlzLm1hcC5mZWF0dXJlU2VsZWN0ZWQuc3Vic2NyaWJlKChldnQ6IHsgZmVhdHVyZTogRmVhdHVyZTxHZW9tZXRyeU9iamVjdD4sIGxheWVyPzogTWFwcGVkTGF5ZXIgfSkgPT4gdGhpcy5mZWF0dXJlU2VsZWN0ZWQoZXZ0KSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGF5ZXIpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmZpbmRUYWdzKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZlYXR1cmVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgZmVhdHVyZVNlbGVjdGVkKGV2dDogeyBmZWF0dXJlOiBGZWF0dXJlPEdlb21ldHJ5T2JqZWN0PiwgbGF5ZXI/OiBNYXBwZWRMYXllciB9KSB7XG4gICAgaWYgKCF0aGlzLnB1YmxpY2F0aW9uIHx8ICF0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZSA9IGV2dC5mZWF0dXJlO1xuICAgIC8vIE5vIGd1YXJhbnRlZSB0aGF0IHRoaXMgaXMgZnJvbSB0aGUgc2FtZSBsYXllciEhISFcbiAgICB0aGlzLnF1ZXJ5UG9pbnREYXRhKCk7XG4gIH1cblxuICBwdWJsaWNhdGlvblNlbGVjdGVkKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXllci5vcHRpb25zLnB1YmxpY2F0aW9uID0gaWR4O1xuICAgIC8vIHRoaXMucHVibGljYXRpb249dGhpcy5sYXllci5sYXllci5wdWJsaWNhdGlvbnNbaWR4XTtcbiAgICBpZiAodGhpcy5wdWJsaWNhdGlvbi5wb2ludGRhdGEpIHtcbiAgICAgIHRoaXMucG9pbnRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICB0aGlzLnVwZGF0ZVZhcmlhYmxlcygpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKGlkeCk7XG4gIH1cblxuICB1cGRhdGVMYXllcigpIHtcbiAgICB0aGlzLmxheWVyLm9wdGlvbnMudGFncyA9IHRoaXMudGFncztcbiAgICB0aGlzLmxheWVyLnVwZGF0ZSgpO1xuICAgIHRoaXMucHJvcGVydHlDaGFuZ2VkLmVtaXQodGhpcy5sYXllcik7XG4gIH1cblxuICB1cGRhdGUoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMudXBkYXRlTGF5ZXIoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5maW5kVGFncygpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvY2Vzc1RhZ3ModGFnczogeyBba2V5OiBzdHJpbmddOiBBcnJheTxzdHJpbmcgfCBMYXllclRhZ1ZhbHVlPiB9KTogTGF5ZXJUYWdNYXAge1xuICAgIGlmICghdGFncykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDogTGF5ZXJUYWdNYXAgPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKHRhZ3MpLmZvckVhY2goayA9PiB7XG4gICAgICBsZXQgdmFsdWVzOiBBcnJheTxzdHJpbmcgfCBMYXllclRhZ1ZhbHVlPiA9IHRhZ3Nba107XG4gICAgICByZXN1bHRba10gPSB2YWx1ZXMubWFwKHYgPT4ge1xuICAgICAgICBsZXQgdkFzVGFnID0gPExheWVyVGFnVmFsdWU+djtcbiAgICAgICAgaWYgKHZBc1RhZy52YWx1ZSAmJiB2QXNUYWcubGFiZWwpIHtcbiAgICAgICAgICByZXR1cm4gdkFzVGFnO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2QXNTdHJpbmcgPSA8c3RyaW5nPnY7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IHZBc1N0cmluZyxcbiAgICAgICAgICBsYWJlbDogdkFzU3RyaW5nXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZpbmRUYWdzKCkge1xuICAgIGlmICh0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YSkge1xuICAgICAgdGhpcy5hdmFpbGFibGVUYWdzID0gdGhpcy5wcm9jZXNzVGFncyh0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YS50YWdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hdmFpbGFibGVUYWdzID0gdGhpcy5wcm9jZXNzVGFncyh0aGlzLmxheWVyLmZsYXR0ZW5lZFNldHRpbmdzLm9wdGlvbnMudGFncyk7XG4gICAgfVxuICAgIHRoaXMuc2V0RGVmYXVsdFRhZ3MoKTtcbiAgfVxuXG4gIHRhZ0NoYW5nZWQodDogc3RyaW5nKSB7XG4gICAgdGhpcy5xdWVyeVBvaW50RGF0YSgpO1xuICAgIHRoaXMudXBkYXRlKG51bGwpO1xuICB9XG5cbiAgc2V0RGVmYXVsdFRhZ3MoKSB7XG4gICAgaWYgKCF0aGlzLmF2YWlsYWJsZVRhZ3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmF2YWlsYWJsZVRhZ3MpLmZvckVhY2godGFnID0+IHtcbiAgICAgIGlmICh0aGlzLnRhZ3NbdGFnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMudGFnc1t0YWddID0gdGhpcy5hdmFpbGFibGVUYWdzW3RhZ11bMF0udmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyKCk7XG4gIH1cblxuICB6b29tVG9FeHRlbnQoKSB7XG4gICAgaWYgKCF0aGlzLm1hcCkge1xuICAgICAgY29uc29sZS5sb2coJ05PIE1BUCEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm1hcC5sYXQgPSB0aGlzLmxheWVyLmxheWVyLmxhdDtcbiAgICB0aGlzLm1hcC5sbmcgPSB0aGlzLmxheWVyLmxheWVyLmxvbjtcbiAgICB0aGlzLm1hcC56b29tID0gdGhpcy5sYXllci5sYXllci56b29tIHx8IDEzO1xuICB9XG5cbiAgcG9pbnRTZWxlY3Rpb24oKTogUG9pbnRTZWxlY3Rpb24ge1xuICAgIHJldHVybiB7XG4gICAgICBjYXRhbG9nOiB0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YSxcbiAgICAgIHZhcmlhYmxlOiB0aGlzLnNlbGVjdGVkVmFyaWFibGUsXG4gICAgICBmZWF0dXJlOiB0aGlzLnNlbGVjdGVkRmVhdHVyZSxcbiAgICAgIHRhZ3M6IHRoaXMudGFnc1xuICAgIH07XG4gIH1cblxuICBxdWVyeVBvaW50RGF0YSgpIHtcbiAgICBsZXQgcG9pbnRkYXRhID0gdGhpcy5wdWJsaWNhdGlvbiAmJiB0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YTtcblxuICAgIGlmICghdGhpcy5wdWJsaWNhdGlvbiB8fCAhdGhpcy5wdWJsaWNhdGlvbi5wb2ludGRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBvaW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgIHRoaXMudXBkYXRlVmFyaWFibGVzKCk7XG4gIH1cblxuICB1cGRhdGVWYXJpYWJsZXMoKXtcbiAgICBsZXQgc2VsID0gdGhpcy5wb2ludFNlbGVjdGlvbigpO1xuICAgIHRoaXMucG9pbnRTZWxlY3Rpb25TZXJ2aWNlLnRpbWVzZXJpZXNWYXJpYWJsZXMoXG4gICAgICBzZWwpLnN1YnNjcmliZSh2YXJpYWJsZXMgPT4ge1xuICAgICAgICB0aGlzLnBvaW50VmFyaWFibGVzID0gdmFyaWFibGVzLnNsaWNlKCk7XG4gICAgICAgIGlmKHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLmV4Y2x1ZGUpe1xuICAgICAgICAgIHRoaXMucG9pbnRWYXJpYWJsZXMgPSB0aGlzLnBvaW50VmFyaWFibGVzLmZpbHRlcih2PT57XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLmV4Y2x1ZGUuc29tZShwYXR0ZXJuPT57XG4gICAgICAgICAgICAgIHJldHVybiAhIXYudmFsdWUubWF0Y2gocGF0dGVybik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5wb2ludFZhcmlhYmxlcy5sZW5ndGgpe1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYXJpYWJsZSA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb2ludFZhcmlhYmxlcy5maW5kSW5kZXgodD0+dC52YWx1ZT09PXRoaXMuc2VsZWN0ZWRWYXJpYWJsZSkgPCAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMucG9pbnRWYXJpYWJsZXMuZmluZEluZGV4KHQ9PnQudmFsdWU9PT10aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YS5kZWZhdWx0VmFyaWFibGUpID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRWYXJpYWJsZSA9IHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLmRlZmF1bHRWYXJpYWJsZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhcmlhYmxlID0gdGhpcy5wb2ludFZhcmlhYmxlc1swXS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb2ludFNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcG9pbnRTZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgIHRoaXMucG9pbnRTZWxlY3Rpb25TZXJ2aWNlLnBvaW50U2VsZWN0aW9uKHRoaXMucG9pbnRTZWxlY3Rpb24oKSk7XG4gIH1cbn0iXX0=