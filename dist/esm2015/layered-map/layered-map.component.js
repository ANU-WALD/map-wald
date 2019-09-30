import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList, NgZone } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { StaticDataService } from '../static-data.service';
import { AgmMap } from '@agm/core';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { MetadataService } from '../metadata.service';
let LayeredMapComponent = class LayeredMapComponent {
    constructor(_zone, staticData, metadata) {
        this._zone = _zone;
        this.staticData = staticData;
        this.metadata = metadata;
        this.layers = [];
        this.markers = [];
        this.mapTypeId = 'roadmap';
        this.layersChange = new EventEmitter();
        this.featureSelected = new EventEmitter();
        this.pointSelected = new EventEmitter();
        this.mapTypePosition = ControlPosition.BOTTOM_LEFT;
        this.streetViewControl = true;
        this.selectedFeature = null;
        // google maps zoom level
        this.zoom = 4;
        this.showMapType = true;
        this.mapTypeOptions = {
            position: ControlPosition.BOTTOM_LEFT
        };
        // initial center position for the map
        this.lat = -22.673858;
        this.lng = 129.815982;
    }
    ngOnChanges(changes) {
        // if zoom in changes...
        if (changes.mapTypePosition) {
            if (this.mapTypePosition === null) {
                this.showMapType = false;
            }
            this.mapTypeOptions = {
                position: this.mapTypePosition
            };
        }
        if (changes.layers) {
            this.setLayerPositions();
        }
        if (changes.markers && this.markers) {
            // deal with existing info windows?
            if (this.infoWindows) {
                this.infoWindows.forEach((w, i) => {
                    this._zone.runOutsideAngular(() => w.close());
                });
            }
            setTimeout(() => {
                // Check and open relevant info windows...
                this.infoWindows.forEach((w, i) => {
                    let m = this.markers[i];
                    if (m.open) {
                        this._zone.runOutsideAngular(() => w.open());
                    }
                    else {
                        this._zone.runOutsideAngular(() => w.close());
                    }
                });
            });
        }
        if (changes.bounds) {
            setTimeout(() => this._bounds = this.bounds);
        }
    }
    ngAfterViewInit() {
    }
    layersChanged(changes) {
    }
    layerAdded(selection) {
        var ex = this.layers.find(l => l.layer === selection.layer);
        if (ex) {
            return;
        }
        var mapped = new MappedLayer();
        mapped.layer = selection.layer;
        mapped.layerType = 'wms';
        mapped.options.legend = true;
        if (selection.layer.options.vectors) {
            this.staticData.get(selection.layer.options.host, selection.layer.options.filepath).subscribe((data) => {
                mapped.staticData = data;
                this.activateLayer(mapped, selection);
            });
        }
        else {
            this.activateLayer(mapped, selection);
        }
    }
    activateLayer(mapped, selection) {
        mapped.update();
        if (selection.action === 'replace') {
            if (selection.filter) {
                this.layers = this.layers.filter(ml => !selection.filter(ml));
            }
            else {
                this.layers = [];
            }
        }
        this.layers = [mapped].concat(this.layers);
        this.setLayerPositions();
        this.layersChange.emit(this.layers);
    }
    setLayerPositions() {
        let ix = 0;
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].layerType === 'wms') {
                this.layers[i].options.position = ix;
                ix++;
            }
        }
    }
    extractFeature(f) {
        var geo = f.getGeometry();
        geo = {
            type: 'Point',
            coordinates: geo.get(0)
        };
        var props = {};
        f.forEachProperty((val, prop) => props[prop] = val);
        return {
            type: 'Feature',
            geometry: geo,
            properties: props
        };
    }
    clicked(event) {
        var feature = this.extractFeature(event.feature);
        this.selectedFeature = feature;
        this.featureSelected.emit({ feature: feature });
    }
    circleClicked(ml, feature) {
        this.selectedFeature = feature;
        this.featureSelected.emit({ feature: feature, layer: ml });
    }
    mapClick(event) {
        var coords = event.coords;
        this.pointSelected.emit(coords);
    }
    zoomToBounds(bounds) {
        this._bounds = bounds;
    }
    zoomChanged() {
        this.layers = this.layers.slice();
    }
};
LayeredMapComponent.ctorParameters = () => [
    { type: NgZone },
    { type: StaticDataService },
    { type: MetadataService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], LayeredMapComponent.prototype, "layers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], LayeredMapComponent.prototype, "markers", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LayeredMapComponent.prototype, "mapTypeId", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "layersChange", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "featureSelected", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "pointSelected", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], LayeredMapComponent.prototype, "mapTypePosition", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "streetViewControl", void 0);
tslib_1.__decorate([
    ViewChild(AgmMap, { static: false }),
    tslib_1.__metadata("design:type", AgmMap)
], LayeredMapComponent.prototype, "theMap", void 0);
tslib_1.__decorate([
    ViewChildren('infoWindows'),
    tslib_1.__metadata("design:type", QueryList)
], LayeredMapComponent.prototype, "infoWindows", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], LayeredMapComponent.prototype, "zoom", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "showMapType", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], LayeredMapComponent.prototype, "lat", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], LayeredMapComponent.prototype, "lng", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LayeredMapComponent.prototype, "bounds", void 0);
LayeredMapComponent = tslib_1.__decorate([
    Component({
        selector: 'layered-map',
        template: `<agm-map #theMap
[(latitude)]="lat"
[(longitude)]="lng"
[(zoom)]="zoom"
(zoomChange)="zoomChanged()"
[disableDefaultUI]="false"
[zoomControl]="false"
[mapTypeId]="mapTypeId"
[mapTypeControl]="showMapType"
[mapTypeControlOptions]="mapTypeOptions"
[streetViewControl]="streetViewControl"
scaleControl="true"
[fitBounds]="_bounds"
(mapClick)="mapClick($event)">

<agm-marker *ngFor="let marker of markers"
            [longitude]="marker.loc.lng"
            [latitude]="marker.loc.lat"
            [iconUrl]="marker.iconUrl">
  <agm-info-window #infoWindows [disableAutoPan]="true">
    <strong>{{marker.value}}</strong>
  </agm-info-window>
</agm-marker>

<ng-container *ngFor="let mp of layers.slice()|reverse; let i = index" [ngSwitch]="mp.layerType">
  <wms-layer *ngSwitchCase="'wms'"
    [url]="mp.url"
    [params]="mp.wmsParameters"
    [opacity]="mp.opacity"
    [position]="mp.options.position">
  </wms-layer>
  <agm-data-layer *ngSwitchCase="'vector'"
                [geoJson]="mp.staticData"
                [style]="mp._styleFunc"
                (layerClick)="clicked($event)"

                >
  </agm-data-layer>

  <ng-container *ngSwitchCase="'circle'">
    <agm-circle *ngFor="let f of mp.staticData.features; let j=index"
                [latitude]="f.geometry.coordinates[1]"
                [longitude]="f.geometry.coordinates[0]"
                [radius]="10000000/(zoom*zoom*zoom*zoom)"
                [fillColor]="mp.flattenedSettings?.styles?.fillColor||'black'"
                [fillOpacity]="mp.flattenedSettings?.styles?.fillOpacity||1"
                [strokeColor]="mp.flattenedSettings?.styles?.strokeColor||'black'"
                [strokeOpacity]="mp.flattenedSettings?.styles?.strokeOpacity||1"
                [strokePosition]="0"
                [strokeWeight]="(f===selectedFeature)?3:(mp.flattenedSettings?.styles?.strokeWeight||0.5)"
                (circleClick)="circleClicked(mp,f)"
                >
    </agm-circle>
  </ng-container>

  <!--
  -->
</ng-container>

<!-- for map controls -->
<map-control position="TOP_CENTER">
    <ng-content select=".map-control.top-center"></ng-content>
</map-control>

<map-control position="TOP_LEFT">
    <ng-content select=".map-control.top-left"></ng-content>
</map-control>

<map-control position="TOP_RIGHT">
    <ng-content select=".map-control.top-right"></ng-content>
</map-control>

<map-control position="LEFT_TOP">
    <ng-content select=".map-control.left-top"></ng-content>
</map-control>

<map-control position="RIGHT_TOP">
    <ng-content select=".map-control.right-top"></ng-content>
</map-control>

<map-control position="LEFT_CENTER">
    <ng-content select=".map-control.left-center"></ng-content>
</map-control>

<map-control position="RIGHT_CENTER">
    <ng-content select=".map-control.right-center"></ng-content>
</map-control>

<map-control position="LEFT_BOTTOM">
    <ng-content select=".map-control.left-bottom"></ng-content>
</map-control>

<map-control position="RIGHT_BOTTOM">
    <ng-content select=".map-control.right-bottom"></ng-content>
</map-control>

<map-control position="BOTTOM_CENTER">
    <ng-content select=".map-control.bottom-center"></ng-content>
</map-control>

<map-control position="BOTTOM_LEFT">
    <ng-content select=".map-control.bottom-left"></ng-content>
</map-control>

<map-control position="BOTTOM_RIGHT">
    <ng-content select=".map-control.bottom-right"></ng-content>
</map-control>

</agm-map>

`
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone,
        StaticDataService,
        MetadataService])
], LayeredMapComponent);
export { LayeredMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJlZC1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJsYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFDcEUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUEwQixNQUFNLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBRXpFLE9BQU8sRUFBeUIsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBMEh0RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQTRCOUIsWUFBb0IsS0FBWSxFQUNaLFVBQTRCLEVBQzVCLFFBQXdCO1FBRnhCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQTdCbkMsV0FBTSxHQUF1QixFQUFFLENBQUM7UUFDaEMsWUFBTyxHQUF1QixFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFRLFNBQVMsQ0FBQztRQUUxQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQ3RELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXdELENBQUM7UUFDM0Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVDLG9CQUFlLEdBQVUsZUFBZSxDQUFDLFdBQVcsQ0FBQTtRQUNwRCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFLbEMsb0JBQWUsR0FBTyxJQUFJLENBQUM7UUFDM0IseUJBQXlCO1FBQ2hCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsbUJBQWMsR0FBd0I7WUFDcEMsUUFBUSxFQUFDLGVBQWUsQ0FBQyxXQUFXO1NBQ3JDLENBQUM7UUFFRixzQ0FBc0M7UUFDN0IsUUFBRyxHQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3pCLFFBQUcsR0FBVyxVQUFVLENBQUM7SUFPbEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyx3QkFBd0I7UUFDeEIsSUFBRyxPQUFPLENBQUMsZUFBZSxFQUFDO1lBQ3pCLElBQUcsSUFBSSxDQUFDLGVBQWUsS0FBRyxJQUFJLEVBQUM7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRztnQkFDcEIsUUFBUSxFQUFDLElBQUksQ0FBQyxlQUFlO2FBQzlCLENBQUM7U0FDSDtRQUVELElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBQztZQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUcsT0FBTyxDQUFDLE9BQU8sSUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQy9CLG1DQUFtQztZQUNuQyxJQUFHLElBQUksQ0FBQyxXQUFXLEVBQUM7Z0JBQ2hCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFO29CQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsVUFBVSxDQUFDLEdBQUUsRUFBRTtnQkFDYiwwQ0FBMEM7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFO29CQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7d0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztxQkFDNUM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztxQkFDN0M7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBRyxPQUFPLENBQUMsTUFBTSxFQUFDO1lBQ2hCLFVBQVUsQ0FBQyxHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRCxlQUFlO0lBQ2YsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUEyQjtJQUN6QyxDQUFDO0lBRUQsVUFBVSxDQUFDLFNBQXlCO1FBQ2xDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxFQUFFLEVBQUU7WUFDTixPQUFPO1NBQ1I7UUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUUvQixNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFN0IsSUFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDMUYsQ0FBQyxJQUFRLEVBQUMsRUFBRTtnQkFDVixNQUFNLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQW1CLEVBQUUsU0FBeUI7UUFDbEUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBRyxTQUFTLENBQUMsTUFBTSxFQUFDO2dCQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQSxFQUFFLENBQUEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0Q7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDbEI7U0FDRjtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFDO1FBQ1QsS0FBSSxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztZQUN0QyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFHLEtBQUssRUFBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLEVBQUUsQ0FBQztnQkFDbkMsRUFBRSxFQUFFLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQztJQUNELGNBQWMsQ0FBQyxDQUFLO1FBQ2xCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQixHQUFHLEdBQUc7WUFDSixJQUFJLEVBQUMsT0FBTztZQUNaLFdBQVcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2QixDQUFBO1FBRUQsSUFBSSxLQUFLLEdBQXNCLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBTyxFQUFDLElBQVcsRUFBQyxFQUFFLENBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTFELE9BQU87WUFDTCxJQUFJLEVBQUMsU0FBUztZQUNkLFFBQVEsRUFBQyxHQUFHO1lBQ1osVUFBVSxFQUFDLEtBQUs7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxPQUFPLENBQUMsS0FBb0I7UUFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsYUFBYSxDQUFDLEVBQWMsRUFBQyxPQUFXO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVM7UUFDaEIsSUFBSSxNQUFNLEdBQVUsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsWUFBWSxDQUFDLE1BQWE7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQztDQUNGLENBQUE7O1lBMUkyQixNQUFNO1lBQ0QsaUJBQWlCO1lBQ25CLGVBQWU7O0FBN0JuQztJQUFSLEtBQUssRUFBRTtzQ0FBUyxLQUFLO21EQUFtQjtBQUNoQztJQUFSLEtBQUssRUFBRTtzQ0FBUyxLQUFLO29EQUFvQjtBQUNqQztJQUFSLEtBQUssRUFBRTs7c0RBQTRCO0FBRTFCO0lBQVQsTUFBTSxFQUFFOzt5REFBdUQ7QUFDdEQ7SUFBVCxNQUFNLEVBQUU7OzREQUE0RjtBQUMzRjtJQUFULE1BQU0sRUFBRTs7MERBQTRDO0FBQzVDO0lBQVIsS0FBSyxFQUFFOzs0REFBcUQ7QUFDcEQ7SUFBUixLQUFLLEVBQUU7OzhEQUEwQjtBQUVBO0lBQWpDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLENBQUM7c0NBQVEsTUFBTTttREFBQztBQUNuQjtJQUE1QixZQUFZLENBQUMsYUFBYSxDQUFDO3NDQUFhLFNBQVM7d0RBQWdCO0FBSXpEO0lBQVIsS0FBSyxFQUFFOztpREFBa0I7QUFDakI7SUFBUixLQUFLLEVBQUU7O3dEQUFvQjtBQU1uQjtJQUFSLEtBQUssRUFBRTs7Z0RBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOztnREFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7O21EQUFlO0FBekJaLG1CQUFtQjtJQWpIL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQThHWDtLQUFZLENBQUM7NkNBNkJjLE1BQU07UUFDRCxpQkFBaUI7UUFDbkIsZUFBZTtHQTlCakMsbUJBQW1CLENBc0svQjtTQXRLWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyxcbiAgICAgICAgIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4uL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IExheWVyU2VsZWN0aW9uIH0gZnJvbSAnLi4vZGF0YS9hY3Rpb25zJztcbmltcG9ydCB7IFN0YXRpY0RhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vc3RhdGljLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRhTW91c2VFdmVudCwgTGF0TG5nLCBBZ21NYXAsIEFnbUluZm9XaW5kb3d9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBGZWF0dXJlLCBQb2ludCwgR2VvbWV0cnlPYmplY3QgfSBmcm9tICdnZW9qc29uJztcbmltcG9ydCB7IE1hcFR5cGVDb250cm9sT3B0aW9ucywgQ29udHJvbFBvc2l0aW9uIH0gZnJvbSAnQGFnbS9jb3JlL3NlcnZpY2VzL2dvb2dsZS1tYXBzLXR5cGVzJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4uL2RhdGEvYm91bmRzJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4uL21ldGFkYXRhLnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZU1hcmtlciB7XG4gIGxvYzpMYXRMbmc7XG4gIHZhbHVlOnN0cmluZztcbiAgb3Blbjpib29sZWFuO1xuICBpY29uVXJsOnN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGF5ZXJlZC1tYXAnLFxuICB0ZW1wbGF0ZTogYDxhZ20tbWFwICN0aGVNYXBcblsobGF0aXR1ZGUpXT1cImxhdFwiXG5bKGxvbmdpdHVkZSldPVwibG5nXCJcblsoem9vbSldPVwiem9vbVwiXG4oem9vbUNoYW5nZSk9XCJ6b29tQ2hhbmdlZCgpXCJcbltkaXNhYmxlRGVmYXVsdFVJXT1cImZhbHNlXCJcblt6b29tQ29udHJvbF09XCJmYWxzZVwiXG5bbWFwVHlwZUlkXT1cIm1hcFR5cGVJZFwiXG5bbWFwVHlwZUNvbnRyb2xdPVwic2hvd01hcFR5cGVcIlxuW21hcFR5cGVDb250cm9sT3B0aW9uc109XCJtYXBUeXBlT3B0aW9uc1wiXG5bc3RyZWV0Vmlld0NvbnRyb2xdPVwic3RyZWV0Vmlld0NvbnRyb2xcIlxuc2NhbGVDb250cm9sPVwidHJ1ZVwiXG5bZml0Qm91bmRzXT1cIl9ib3VuZHNcIlxuKG1hcENsaWNrKT1cIm1hcENsaWNrKCRldmVudClcIj5cblxuPGFnbS1tYXJrZXIgKm5nRm9yPVwibGV0IG1hcmtlciBvZiBtYXJrZXJzXCJcbiAgICAgICAgICAgIFtsb25naXR1ZGVdPVwibWFya2VyLmxvYy5sbmdcIlxuICAgICAgICAgICAgW2xhdGl0dWRlXT1cIm1hcmtlci5sb2MubGF0XCJcbiAgICAgICAgICAgIFtpY29uVXJsXT1cIm1hcmtlci5pY29uVXJsXCI+XG4gIDxhZ20taW5mby13aW5kb3cgI2luZm9XaW5kb3dzIFtkaXNhYmxlQXV0b1Bhbl09XCJ0cnVlXCI+XG4gICAgPHN0cm9uZz57e21hcmtlci52YWx1ZX19PC9zdHJvbmc+XG4gIDwvYWdtLWluZm8td2luZG93PlxuPC9hZ20tbWFya2VyPlxuXG48bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtcCBvZiBsYXllcnMuc2xpY2UoKXxyZXZlcnNlOyBsZXQgaSA9IGluZGV4XCIgW25nU3dpdGNoXT1cIm1wLmxheWVyVHlwZVwiPlxuICA8d21zLWxheWVyICpuZ1N3aXRjaENhc2U9XCInd21zJ1wiXG4gICAgW3VybF09XCJtcC51cmxcIlxuICAgIFtwYXJhbXNdPVwibXAud21zUGFyYW1ldGVyc1wiXG4gICAgW29wYWNpdHldPVwibXAub3BhY2l0eVwiXG4gICAgW3Bvc2l0aW9uXT1cIm1wLm9wdGlvbnMucG9zaXRpb25cIj5cbiAgPC93bXMtbGF5ZXI+XG4gIDxhZ20tZGF0YS1sYXllciAqbmdTd2l0Y2hDYXNlPVwiJ3ZlY3RvcidcIlxuICAgICAgICAgICAgICAgIFtnZW9Kc29uXT1cIm1wLnN0YXRpY0RhdGFcIlxuICAgICAgICAgICAgICAgIFtzdHlsZV09XCJtcC5fc3R5bGVGdW5jXCJcbiAgICAgICAgICAgICAgICAobGF5ZXJDbGljayk9XCJjbGlja2VkKCRldmVudClcIlxuXG4gICAgICAgICAgICAgICAgPlxuICA8L2FnbS1kYXRhLWxheWVyPlxuXG4gIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidjaXJjbGUnXCI+XG4gICAgPGFnbS1jaXJjbGUgKm5nRm9yPVwibGV0IGYgb2YgbXAuc3RhdGljRGF0YS5mZWF0dXJlczsgbGV0IGo9aW5kZXhcIlxuICAgICAgICAgICAgICAgIFtsYXRpdHVkZV09XCJmLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzFdXCJcbiAgICAgICAgICAgICAgICBbbG9uZ2l0dWRlXT1cImYuZ2VvbWV0cnkuY29vcmRpbmF0ZXNbMF1cIlxuICAgICAgICAgICAgICAgIFtyYWRpdXNdPVwiMTAwMDAwMDAvKHpvb20qem9vbSp6b29tKnpvb20pXCJcbiAgICAgICAgICAgICAgICBbZmlsbENvbG9yXT1cIm1wLmZsYXR0ZW5lZFNldHRpbmdzPy5zdHlsZXM/LmZpbGxDb2xvcnx8J2JsYWNrJ1wiXG4gICAgICAgICAgICAgICAgW2ZpbGxPcGFjaXR5XT1cIm1wLmZsYXR0ZW5lZFNldHRpbmdzPy5zdHlsZXM/LmZpbGxPcGFjaXR5fHwxXCJcbiAgICAgICAgICAgICAgICBbc3Ryb2tlQ29sb3JdPVwibXAuZmxhdHRlbmVkU2V0dGluZ3M/LnN0eWxlcz8uc3Ryb2tlQ29sb3J8fCdibGFjaydcIlxuICAgICAgICAgICAgICAgIFtzdHJva2VPcGFjaXR5XT1cIm1wLmZsYXR0ZW5lZFNldHRpbmdzPy5zdHlsZXM/LnN0cm9rZU9wYWNpdHl8fDFcIlxuICAgICAgICAgICAgICAgIFtzdHJva2VQb3NpdGlvbl09XCIwXCJcbiAgICAgICAgICAgICAgICBbc3Ryb2tlV2VpZ2h0XT1cIihmPT09c2VsZWN0ZWRGZWF0dXJlKT8zOihtcC5mbGF0dGVuZWRTZXR0aW5ncz8uc3R5bGVzPy5zdHJva2VXZWlnaHR8fDAuNSlcIlxuICAgICAgICAgICAgICAgIChjaXJjbGVDbGljayk9XCJjaXJjbGVDbGlja2VkKG1wLGYpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgPC9hZ20tY2lyY2xlPlxuICA8L25nLWNvbnRhaW5lcj5cblxuICA8IS0tXG4gIC0tPlxuPC9uZy1jb250YWluZXI+XG5cbjwhLS0gZm9yIG1hcCBjb250cm9scyAtLT5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlRPUF9DRU5URVJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCIubWFwLWNvbnRyb2wudG9wLWNlbnRlclwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlRPUF9MRUZUXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnRvcC1sZWZ0XCI+PC9uZy1jb250ZW50PlxuPC9tYXAtY29udHJvbD5cblxuPG1hcC1jb250cm9sIHBvc2l0aW9uPVwiVE9QX1JJR0hUXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnRvcC1yaWdodFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkxFRlRfVE9QXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmxlZnQtdG9wXCI+PC9uZy1jb250ZW50PlxuPC9tYXAtY29udHJvbD5cblxuPG1hcC1jb250cm9sIHBvc2l0aW9uPVwiUklHSFRfVE9QXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnJpZ2h0LXRvcFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkxFRlRfQ0VOVEVSXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmxlZnQtY2VudGVyXCI+PC9uZy1jb250ZW50PlxuPC9tYXAtY29udHJvbD5cblxuPG1hcC1jb250cm9sIHBvc2l0aW9uPVwiUklHSFRfQ0VOVEVSXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnJpZ2h0LWNlbnRlclwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkxFRlRfQk9UVE9NXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmxlZnQtYm90dG9tXCI+PC9uZy1jb250ZW50PlxuPC9tYXAtY29udHJvbD5cblxuPG1hcC1jb250cm9sIHBvc2l0aW9uPVwiUklHSFRfQk9UVE9NXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnJpZ2h0LWJvdHRvbVwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkJPVFRPTV9DRU5URVJcIj5cbiAgICA8bmctY29udGVudCBzZWxlY3Q9XCIubWFwLWNvbnRyb2wuYm90dG9tLWNlbnRlclwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkJPVFRPTV9MRUZUXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmJvdHRvbS1sZWZ0XCI+PC9uZy1jb250ZW50PlxuPC9tYXAtY29udHJvbD5cblxuPG1hcC1jb250cm9sIHBvc2l0aW9uPVwiQk9UVE9NX1JJR0hUXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmJvdHRvbS1yaWdodFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjwvYWdtLW1hcD5cblxuYCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBMYXllcmVkTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbGF5ZXJzOiBBcnJheTxNYXBwZWRMYXllcj4gPSBbXTtcbiAgQElucHV0KCkgbWFya2VyczpBcnJheTxTaW1wbGVNYXJrZXI+ID0gW107XG4gIEBJbnB1dCgpIG1hcFR5cGVJZDpzdHJpbmc9J3JvYWRtYXAnO1xuXG4gIEBPdXRwdXQoKSBsYXllcnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PE1hcHBlZExheWVyPj4oKTtcbiAgQE91dHB1dCgpIGZlYXR1cmVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e2ZlYXR1cmU6RmVhdHVyZTxHZW9tZXRyeU9iamVjdD4sbGF5ZXI/Ok1hcHBlZExheWVyfT4oKTtcbiAgQE91dHB1dCgpIHBvaW50U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPExhdExuZz4oKTtcbiAgQElucHV0KCkgbWFwVHlwZVBvc2l0aW9uOm51bWJlciA9IENvbnRyb2xQb3NpdGlvbi5CT1RUT01fTEVGVFxuICBASW5wdXQoKSBzdHJlZXRWaWV3Q29udHJvbCA9IHRydWU7XG5cbiAgQFZpZXdDaGlsZChBZ21NYXAse3N0YXRpYzpmYWxzZX0pIHRoZU1hcDpBZ21NYXA7XG4gIEBWaWV3Q2hpbGRyZW4oJ2luZm9XaW5kb3dzJykgaW5mb1dpbmRvd3M6UXVlcnlMaXN0PEFnbUluZm9XaW5kb3c+O1xuXG4gIHNlbGVjdGVkRmVhdHVyZTphbnkgPSBudWxsO1xuICAvLyBnb29nbGUgbWFwcyB6b29tIGxldmVsXG4gIEBJbnB1dCgpIHpvb206IG51bWJlciA9IDQ7XG4gIEBJbnB1dCgpIHNob3dNYXBUeXBlID0gdHJ1ZTtcbiAgbWFwVHlwZU9wdGlvbnM6IE1hcFR5cGVDb250cm9sT3B0aW9ucz17XG4gICAgcG9zaXRpb246Q29udHJvbFBvc2l0aW9uLkJPVFRPTV9MRUZUXG4gIH07XG5cbiAgLy8gaW5pdGlhbCBjZW50ZXIgcG9zaXRpb24gZm9yIHRoZSBtYXBcbiAgQElucHV0KCkgbGF0OiBudW1iZXIgPSAtMjIuNjczODU4O1xuICBASW5wdXQoKSBsbmc6IG51bWJlciA9IDEyOS44MTU5ODI7XG4gIEBJbnB1dCgpIGJvdW5kczpCb3VuZHM7XG4gIF9ib3VuZHM6Qm91bmRzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3pvbmU6Tmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIHN0YXRpY0RhdGE6U3RhdGljRGF0YVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gaWYgem9vbSBpbiBjaGFuZ2VzLi4uXG4gICAgaWYoY2hhbmdlcy5tYXBUeXBlUG9zaXRpb24pe1xuICAgICAgaWYodGhpcy5tYXBUeXBlUG9zaXRpb249PT1udWxsKXtcbiAgICAgICAgdGhpcy5zaG93TWFwVHlwZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5tYXBUeXBlT3B0aW9ucyA9IHtcbiAgICAgICAgcG9zaXRpb246dGhpcy5tYXBUeXBlUG9zaXRpb25cbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYoY2hhbmdlcy5sYXllcnMpe1xuICAgICAgdGhpcy5zZXRMYXllclBvc2l0aW9ucygpO1xuICAgIH1cblxuICAgIGlmKGNoYW5nZXMubWFya2VycyYmdGhpcy5tYXJrZXJzKXtcbiAgICAgIC8vIGRlYWwgd2l0aCBleGlzdGluZyBpbmZvIHdpbmRvd3M/XG4gICAgICBpZih0aGlzLmluZm9XaW5kb3dzKXtcbiAgICAgICAgICB0aGlzLmluZm9XaW5kb3dzLmZvckVhY2goKHcsaSk9PntcbiAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT53LmNsb3NlKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAvLyBDaGVjayBhbmQgb3BlbiByZWxldmFudCBpbmZvIHdpbmRvd3MuLi5cbiAgICAgICAgdGhpcy5pbmZvV2luZG93cy5mb3JFYWNoKCh3LGkpPT57XG4gICAgICAgICAgbGV0IG0gPSB0aGlzLm1hcmtlcnNbaV07XG4gICAgICAgICAgaWYobS5vcGVuKXtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9Pncub3BlbigpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+dy5jbG9zZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYoY2hhbmdlcy5ib3VuZHMpe1xuICAgICAgc2V0VGltZW91dCgoKT0+dGhpcy5fYm91bmRzPXRoaXMuYm91bmRzKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBsYXllcnNDaGFuZ2VkKGNoYW5nZXM6IEFycmF5PE1hcHBlZExheWVyPikge1xuICB9XG5cbiAgbGF5ZXJBZGRlZChzZWxlY3Rpb246IExheWVyU2VsZWN0aW9uKSB7XG4gICAgdmFyIGV4ID0gdGhpcy5sYXllcnMuZmluZChsID0+IGwubGF5ZXIgPT09IHNlbGVjdGlvbi5sYXllcik7XG4gICAgaWYgKGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1hcHBlZCA9IG5ldyBNYXBwZWRMYXllcigpO1xuICAgIG1hcHBlZC5sYXllciA9IHNlbGVjdGlvbi5sYXllcjtcblxuICAgIG1hcHBlZC5sYXllclR5cGUgPSAnd21zJztcbiAgICBtYXBwZWQub3B0aW9ucy5sZWdlbmQgPSB0cnVlO1xuXG4gICAgaWYoc2VsZWN0aW9uLmxheWVyLm9wdGlvbnMudmVjdG9ycyl7XG4gICAgICB0aGlzLnN0YXRpY0RhdGEuZ2V0KHNlbGVjdGlvbi5sYXllci5vcHRpb25zLmhvc3Qsc2VsZWN0aW9uLmxheWVyLm9wdGlvbnMuZmlsZXBhdGgpLnN1YnNjcmliZShcbiAgICAgICAgKGRhdGE6YW55KT0+e1xuICAgICAgICAgIG1hcHBlZC5zdGF0aWNEYXRhPWRhdGE7XG4gICAgICAgICAgdGhpcy5hY3RpdmF0ZUxheWVyKG1hcHBlZCxzZWxlY3Rpb24pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmF0ZUxheWVyKG1hcHBlZCwgc2VsZWN0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFjdGl2YXRlTGF5ZXIobWFwcGVkOiBNYXBwZWRMYXllciwgc2VsZWN0aW9uOiBMYXllclNlbGVjdGlvbikge1xuICAgIG1hcHBlZC51cGRhdGUoKTtcbiAgICBpZiAoc2VsZWN0aW9uLmFjdGlvbiA9PT0gJ3JlcGxhY2UnKSB7XG4gICAgICBpZihzZWxlY3Rpb24uZmlsdGVyKXtcbiAgICAgICAgdGhpcy5sYXllcnMgPSB0aGlzLmxheWVycy5maWx0ZXIobWw9PiFzZWxlY3Rpb24uZmlsdGVyKG1sKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxheWVycyA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxheWVycyA9IFttYXBwZWRdLmNvbmNhdCh0aGlzLmxheWVycyk7XG4gICAgdGhpcy5zZXRMYXllclBvc2l0aW9ucygpO1xuICAgIHRoaXMubGF5ZXJzQ2hhbmdlLmVtaXQodGhpcy5sYXllcnMpO1xuICB9XG5cbiAgc2V0TGF5ZXJQb3NpdGlvbnMoKXtcbiAgICBsZXQgaXg9MDtcbiAgICBmb3IodmFyIGk9dGhpcy5sYXllcnMubGVuZ3RoLTE7aT49MDtpLS0pe1xuICAgICAgaWYodGhpcy5sYXllcnNbaV0ubGF5ZXJUeXBlPT09J3dtcycpe1xuICAgICAgICB0aGlzLmxheWVyc1tpXS5vcHRpb25zLnBvc2l0aW9uPWl4O1xuICAgICAgICBpeCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBleHRyYWN0RmVhdHVyZShmOmFueSkgOiBGZWF0dXJlPFBvaW50PntcbiAgICB2YXIgZ2VvID0gZi5nZXRHZW9tZXRyeSgpO1xuICAgIGdlbyA9IHtcbiAgICAgIHR5cGU6J1BvaW50JyxcbiAgICAgIGNvb3JkaW5hdGVzOmdlby5nZXQoMClcbiAgICB9XG5cbiAgICB2YXIgcHJvcHM6e1trZXk6c3RyaW5nXTphbnl9ID0ge307XG4gICAgZi5mb3JFYWNoUHJvcGVydHkoKHZhbDphbnkscHJvcDpzdHJpbmcpPT5wcm9wc1twcm9wXT12YWwpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6J0ZlYXR1cmUnLFxuICAgICAgZ2VvbWV0cnk6Z2VvLFxuICAgICAgcHJvcGVydGllczpwcm9wc1xuICAgIH07XG4gIH1cblxuICBjbGlja2VkKGV2ZW50OkRhdGFNb3VzZUV2ZW50KXtcbiAgICB2YXIgZmVhdHVyZSA9IHRoaXMuZXh0cmFjdEZlYXR1cmUoZXZlbnQuZmVhdHVyZSk7XG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgIHRoaXMuZmVhdHVyZVNlbGVjdGVkLmVtaXQoe2ZlYXR1cmU6ZmVhdHVyZX0pO1xuICB9XG5cbiAgY2lyY2xlQ2xpY2tlZChtbDpNYXBwZWRMYXllcixmZWF0dXJlOmFueSl7XG4gICAgdGhpcy5zZWxlY3RlZEZlYXR1cmUgPSBmZWF0dXJlO1xuICAgIHRoaXMuZmVhdHVyZVNlbGVjdGVkLmVtaXQoe2ZlYXR1cmU6ZmVhdHVyZSxsYXllcjptbH0pO1xuICB9XG5cbiAgbWFwQ2xpY2soZXZlbnQ6YW55KXtcbiAgICB2YXIgY29vcmRzOkxhdExuZyA9IGV2ZW50LmNvb3JkcztcbiAgICB0aGlzLnBvaW50U2VsZWN0ZWQuZW1pdChjb29yZHMpO1xuICB9XG5cbiAgem9vbVRvQm91bmRzKGJvdW5kczpCb3VuZHMpe1xuICAgIHRoaXMuX2JvdW5kcyA9IGJvdW5kcztcbiAgfVxuXG4gIHpvb21DaGFuZ2VkKCl7XG4gICAgdGhpcy5sYXllcnMgPSB0aGlzLmxheWVycy5zbGljZSgpO1xuICB9XG59XG4iXX0=