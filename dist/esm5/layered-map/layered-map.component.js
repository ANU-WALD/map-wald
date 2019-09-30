import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList, NgZone } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { StaticDataService } from '../static-data.service';
import { AgmMap } from '@agm/core';
import { ControlPosition } from '@agm/core/services/google-maps-types';
import { MetadataService } from '../metadata.service';
var LayeredMapComponent = /** @class */ (function () {
    function LayeredMapComponent(_zone, staticData, metadata) {
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
    LayeredMapComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
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
                this.infoWindows.forEach(function (w, i) {
                    _this._zone.runOutsideAngular(function () { return w.close(); });
                });
            }
            setTimeout(function () {
                // Check and open relevant info windows...
                _this.infoWindows.forEach(function (w, i) {
                    var m = _this.markers[i];
                    if (m.open) {
                        _this._zone.runOutsideAngular(function () { return w.open(); });
                    }
                    else {
                        _this._zone.runOutsideAngular(function () { return w.close(); });
                    }
                });
            });
        }
        if (changes.bounds) {
            setTimeout(function () { return _this._bounds = _this.bounds; });
        }
    };
    LayeredMapComponent.prototype.ngAfterViewInit = function () {
    };
    LayeredMapComponent.prototype.layersChanged = function (changes) {
    };
    LayeredMapComponent.prototype.layerAdded = function (selection) {
        var _this = this;
        var ex = this.layers.find(function (l) { return l.layer === selection.layer; });
        if (ex) {
            return;
        }
        var mapped = new MappedLayer();
        mapped.layer = selection.layer;
        mapped.layerType = 'wms';
        mapped.options.legend = true;
        if (selection.layer.options.vectors) {
            this.staticData.get(selection.layer.options.host, selection.layer.options.filepath).subscribe(function (data) {
                mapped.staticData = data;
                _this.activateLayer(mapped, selection);
            });
        }
        else {
            this.activateLayer(mapped, selection);
        }
    };
    LayeredMapComponent.prototype.activateLayer = function (mapped, selection) {
        mapped.update();
        if (selection.action === 'replace') {
            if (selection.filter) {
                this.layers = this.layers.filter(function (ml) { return !selection.filter(ml); });
            }
            else {
                this.layers = [];
            }
        }
        this.layers = [mapped].concat(this.layers);
        this.setLayerPositions();
        this.layersChange.emit(this.layers);
    };
    LayeredMapComponent.prototype.setLayerPositions = function () {
        var ix = 0;
        for (var i = this.layers.length - 1; i >= 0; i--) {
            if (this.layers[i].layerType === 'wms') {
                this.layers[i].options.position = ix;
                ix++;
            }
        }
    };
    LayeredMapComponent.prototype.extractFeature = function (f) {
        var geo = f.getGeometry();
        geo = {
            type: 'Point',
            coordinates: geo.get(0)
        };
        var props = {};
        f.forEachProperty(function (val, prop) { return props[prop] = val; });
        return {
            type: 'Feature',
            geometry: geo,
            properties: props
        };
    };
    LayeredMapComponent.prototype.clicked = function (event) {
        var feature = this.extractFeature(event.feature);
        this.selectedFeature = feature;
        this.featureSelected.emit({ feature: feature });
    };
    LayeredMapComponent.prototype.circleClicked = function (ml, feature) {
        this.selectedFeature = feature;
        this.featureSelected.emit({ feature: feature, layer: ml });
    };
    LayeredMapComponent.prototype.mapClick = function (event) {
        var coords = event.coords;
        this.pointSelected.emit(coords);
    };
    LayeredMapComponent.prototype.zoomToBounds = function (bounds) {
        this._bounds = bounds;
    };
    LayeredMapComponent.prototype.zoomChanged = function () {
        this.layers = this.layers.slice();
    };
    LayeredMapComponent.ctorParameters = function () { return [
        { type: NgZone },
        { type: StaticDataService },
        { type: MetadataService }
    ]; };
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
            template: "<agm-map #theMap\n[(latitude)]=\"lat\"\n[(longitude)]=\"lng\"\n[(zoom)]=\"zoom\"\n(zoomChange)=\"zoomChanged()\"\n[disableDefaultUI]=\"false\"\n[zoomControl]=\"false\"\n[mapTypeId]=\"mapTypeId\"\n[mapTypeControl]=\"showMapType\"\n[mapTypeControlOptions]=\"mapTypeOptions\"\n[streetViewControl]=\"streetViewControl\"\nscaleControl=\"true\"\n[fitBounds]=\"_bounds\"\n(mapClick)=\"mapClick($event)\">\n\n<agm-marker *ngFor=\"let marker of markers\"\n            [longitude]=\"marker.loc.lng\"\n            [latitude]=\"marker.loc.lat\"\n            [iconUrl]=\"marker.iconUrl\">\n  <agm-info-window #infoWindows [disableAutoPan]=\"true\">\n    <strong>{{marker.value}}</strong>\n  </agm-info-window>\n</agm-marker>\n\n<ng-container *ngFor=\"let mp of layers.slice()|reverse; let i = index\" [ngSwitch]=\"mp.layerType\">\n  <wms-layer *ngSwitchCase=\"'wms'\"\n    [url]=\"mp.url\"\n    [params]=\"mp.wmsParameters\"\n    [opacity]=\"mp.opacity\"\n    [position]=\"mp.options.position\">\n  </wms-layer>\n  <agm-data-layer *ngSwitchCase=\"'vector'\"\n                [geoJson]=\"mp.staticData\"\n                [style]=\"mp._styleFunc\"\n                (layerClick)=\"clicked($event)\"\n\n                >\n  </agm-data-layer>\n\n  <ng-container *ngSwitchCase=\"'circle'\">\n    <agm-circle *ngFor=\"let f of mp.staticData.features; let j=index\"\n                [latitude]=\"f.geometry.coordinates[1]\"\n                [longitude]=\"f.geometry.coordinates[0]\"\n                [radius]=\"10000000/(zoom*zoom*zoom*zoom)\"\n                [fillColor]=\"mp.flattenedSettings?.styles?.fillColor||'black'\"\n                [fillOpacity]=\"mp.flattenedSettings?.styles?.fillOpacity||1\"\n                [strokeColor]=\"mp.flattenedSettings?.styles?.strokeColor||'black'\"\n                [strokeOpacity]=\"mp.flattenedSettings?.styles?.strokeOpacity||1\"\n                [strokePosition]=\"0\"\n                [strokeWeight]=\"(f===selectedFeature)?3:(mp.flattenedSettings?.styles?.strokeWeight||0.5)\"\n                (circleClick)=\"circleClicked(mp,f)\"\n                >\n    </agm-circle>\n  </ng-container>\n\n  <!--\n  -->\n</ng-container>\n\n<!-- for map controls -->\n<map-control position=\"TOP_CENTER\">\n    <ng-content select=\".map-control.top-center\"></ng-content>\n</map-control>\n\n<map-control position=\"TOP_LEFT\">\n    <ng-content select=\".map-control.top-left\"></ng-content>\n</map-control>\n\n<map-control position=\"TOP_RIGHT\">\n    <ng-content select=\".map-control.top-right\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_TOP\">\n    <ng-content select=\".map-control.left-top\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_TOP\">\n    <ng-content select=\".map-control.right-top\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_CENTER\">\n    <ng-content select=\".map-control.left-center\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_CENTER\">\n    <ng-content select=\".map-control.right-center\"></ng-content>\n</map-control>\n\n<map-control position=\"LEFT_BOTTOM\">\n    <ng-content select=\".map-control.left-bottom\"></ng-content>\n</map-control>\n\n<map-control position=\"RIGHT_BOTTOM\">\n    <ng-content select=\".map-control.right-bottom\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_CENTER\">\n    <ng-content select=\".map-control.bottom-center\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_LEFT\">\n    <ng-content select=\".map-control.bottom-left\"></ng-content>\n</map-control>\n\n<map-control position=\"BOTTOM_RIGHT\">\n    <ng-content select=\".map-control.bottom-right\"></ng-content>\n</map-control>\n\n</agm-map>\n\n"
        }),
        tslib_1.__metadata("design:paramtypes", [NgZone,
            StaticDataService,
            MetadataService])
    ], LayeredMapComponent);
    return LayeredMapComponent;
}());
export { LayeredMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXJlZC1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJsYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFDcEUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUEwQixNQUFNLEVBQWdCLE1BQU0sV0FBVyxDQUFDO0FBRXpFLE9BQU8sRUFBeUIsZUFBZSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFOUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBMEh0RDtJQTRCRSw2QkFBb0IsS0FBWSxFQUNaLFVBQTRCLEVBQzVCLFFBQXdCO1FBRnhCLFVBQUssR0FBTCxLQUFLLENBQU87UUFDWixlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM1QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQTdCbkMsV0FBTSxHQUF1QixFQUFFLENBQUM7UUFDaEMsWUFBTyxHQUF1QixFQUFFLENBQUM7UUFDakMsY0FBUyxHQUFRLFNBQVMsQ0FBQztRQUUxQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFzQixDQUFDO1FBQ3RELG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQXdELENBQUM7UUFDM0Ysa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVDLG9CQUFlLEdBQVUsZUFBZSxDQUFDLFdBQVcsQ0FBQTtRQUNwRCxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFLbEMsb0JBQWUsR0FBTyxJQUFJLENBQUM7UUFDM0IseUJBQXlCO1FBQ2hCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDNUIsbUJBQWMsR0FBd0I7WUFDcEMsUUFBUSxFQUFDLGVBQWUsQ0FBQyxXQUFXO1NBQ3JDLENBQUM7UUFFRixzQ0FBc0M7UUFDN0IsUUFBRyxHQUFXLENBQUMsU0FBUyxDQUFDO1FBQ3pCLFFBQUcsR0FBVyxVQUFVLENBQUM7SUFPbEMsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkF1Q0M7UUF0Q0Msd0JBQXdCO1FBQ3hCLElBQUcsT0FBTyxDQUFDLGVBQWUsRUFBQztZQUN6QixJQUFHLElBQUksQ0FBQyxlQUFlLEtBQUcsSUFBSSxFQUFDO2dCQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzthQUMxQjtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ3BCLFFBQVEsRUFBQyxJQUFJLENBQUMsZUFBZTthQUM5QixDQUFDO1NBQ0g7UUFFRCxJQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUM7WUFDaEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUI7UUFFRCxJQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUMvQixtQ0FBbUM7WUFDbkMsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUFDO2dCQUNoQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO29CQUM3QixLQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQVQsQ0FBUyxDQUFDLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxVQUFVLENBQUM7Z0JBQ1QsMENBQTBDO2dCQUMxQyxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDO29CQUMzQixJQUFJLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUM7d0JBQ1IsS0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFDO3FCQUM1Qzt5QkFBTTt3QkFDTCxLQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGNBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQVQsQ0FBUyxDQUFDLENBQUM7cUJBQzdDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUcsT0FBTyxDQUFDLE1BQU0sRUFBQztZQUNoQixVQUFVLENBQUMsY0FBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUMsS0FBSSxDQUFDLE1BQU0sRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVELDZDQUFlLEdBQWY7SUFDQSxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLE9BQTJCO0lBQ3pDLENBQUM7SUFFRCx3Q0FBVSxHQUFWLFVBQVcsU0FBeUI7UUFBcEMsaUJBcUJDO1FBcEJDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDNUQsSUFBSSxFQUFFLEVBQUU7WUFDTixPQUFPO1NBQ1I7UUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUUvQixNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFN0IsSUFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDMUYsVUFBQyxJQUFRO2dCQUNQLE1BQU0sQ0FBQyxVQUFVLEdBQUMsSUFBSSxDQUFDO2dCQUN2QixLQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFTywyQ0FBYSxHQUFyQixVQUFzQixNQUFtQixFQUFFLFNBQXlCO1FBQ2xFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2xDLElBQUcsU0FBUyxDQUFDLE1BQU0sRUFBQztnQkFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBRSxPQUFBLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO2FBQzdEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELCtDQUFpQixHQUFqQjtRQUNFLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQztRQUNULEtBQUksSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7WUFDdEMsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBRyxLQUFLLEVBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxFQUFFLENBQUM7Z0JBQ25DLEVBQUUsRUFBRSxDQUFDO2FBQ047U0FDRjtJQUNILENBQUM7SUFDRCw0Q0FBYyxHQUFkLFVBQWUsQ0FBSztRQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUIsR0FBRyxHQUFHO1lBQ0osSUFBSSxFQUFDLE9BQU87WUFDWixXQUFXLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdkIsQ0FBQTtRQUVELElBQUksS0FBSyxHQUFzQixFQUFFLENBQUM7UUFDbEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFDLEdBQU8sRUFBQyxJQUFXLElBQUcsT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBRTFELE9BQU87WUFDTCxJQUFJLEVBQUMsU0FBUztZQUNkLFFBQVEsRUFBQyxHQUFHO1lBQ1osVUFBVSxFQUFDLEtBQUs7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxxQ0FBTyxHQUFQLFVBQVEsS0FBb0I7UUFDMUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMkNBQWEsR0FBYixVQUFjLEVBQWMsRUFBQyxPQUFXO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsc0NBQVEsR0FBUixVQUFTLEtBQVM7UUFDaEIsSUFBSSxNQUFNLEdBQVUsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLE1BQWE7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Z0JBekl5QixNQUFNO2dCQUNELGlCQUFpQjtnQkFDbkIsZUFBZTs7SUE3Qm5DO1FBQVIsS0FBSyxFQUFFOzBDQUFTLEtBQUs7dURBQW1CO0lBQ2hDO1FBQVIsS0FBSyxFQUFFOzBDQUFTLEtBQUs7d0RBQW9CO0lBQ2pDO1FBQVIsS0FBSyxFQUFFOzswREFBNEI7SUFFMUI7UUFBVCxNQUFNLEVBQUU7OzZEQUF1RDtJQUN0RDtRQUFULE1BQU0sRUFBRTs7Z0VBQTRGO0lBQzNGO1FBQVQsTUFBTSxFQUFFOzs4REFBNEM7SUFDNUM7UUFBUixLQUFLLEVBQUU7O2dFQUFxRDtJQUNwRDtRQUFSLEtBQUssRUFBRTs7a0VBQTBCO0lBRUE7UUFBakMsU0FBUyxDQUFDLE1BQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQzswQ0FBUSxNQUFNO3VEQUFDO0lBQ25CO1FBQTVCLFlBQVksQ0FBQyxhQUFhLENBQUM7MENBQWEsU0FBUzs0REFBZ0I7SUFJekQ7UUFBUixLQUFLLEVBQUU7O3FEQUFrQjtJQUNqQjtRQUFSLEtBQUssRUFBRTs7NERBQW9CO0lBTW5CO1FBQVIsS0FBSyxFQUFFOztvREFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7O29EQUEwQjtJQUN6QjtRQUFSLEtBQUssRUFBRTs7dURBQWU7SUF6QlosbUJBQW1CO1FBakgvQixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixRQUFRLEVBQUUscW1IQThHWDtTQUFZLENBQUM7aURBNkJjLE1BQU07WUFDRCxpQkFBaUI7WUFDbkIsZUFBZTtPQTlCakMsbUJBQW1CLENBc0svQjtJQUFELDBCQUFDO0NBQUEsQUF0S0QsSUFzS0M7U0F0S1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsXG4gICAgICAgICBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBMYXllclNlbGVjdGlvbiB9IGZyb20gJy4uL2RhdGEvYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGF0aWNEYXRhU2VydmljZSB9IGZyb20gJy4uL3N0YXRpYy1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YU1vdXNlRXZlbnQsIExhdExuZywgQWdtTWFwLCBBZ21JbmZvV2luZG93fSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZSwgUG9pbnQsIEdlb21ldHJ5T2JqZWN0IH0gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgeyBNYXBUeXBlQ29udHJvbE9wdGlvbnMsIENvbnRyb2xQb3NpdGlvbiB9IGZyb20gJ0BhZ20vY29yZS9zZXJ2aWNlcy9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBCb3VuZHMgfSBmcm9tICcuLi9kYXRhL2JvdW5kcyc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuLi9tZXRhZGF0YS5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVNYXJrZXIge1xuICBsb2M6TGF0TG5nO1xuICB2YWx1ZTpzdHJpbmc7XG4gIG9wZW46Ym9vbGVhbjtcbiAgaWNvblVybDpzdHJpbmc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xheWVyZWQtbWFwJyxcbiAgdGVtcGxhdGU6IGA8YWdtLW1hcCAjdGhlTWFwXG5bKGxhdGl0dWRlKV09XCJsYXRcIlxuWyhsb25naXR1ZGUpXT1cImxuZ1wiXG5bKHpvb20pXT1cInpvb21cIlxuKHpvb21DaGFuZ2UpPVwiem9vbUNoYW5nZWQoKVwiXG5bZGlzYWJsZURlZmF1bHRVSV09XCJmYWxzZVwiXG5bem9vbUNvbnRyb2xdPVwiZmFsc2VcIlxuW21hcFR5cGVJZF09XCJtYXBUeXBlSWRcIlxuW21hcFR5cGVDb250cm9sXT1cInNob3dNYXBUeXBlXCJcblttYXBUeXBlQ29udHJvbE9wdGlvbnNdPVwibWFwVHlwZU9wdGlvbnNcIlxuW3N0cmVldFZpZXdDb250cm9sXT1cInN0cmVldFZpZXdDb250cm9sXCJcbnNjYWxlQ29udHJvbD1cInRydWVcIlxuW2ZpdEJvdW5kc109XCJfYm91bmRzXCJcbihtYXBDbGljayk9XCJtYXBDbGljaygkZXZlbnQpXCI+XG5cbjxhZ20tbWFya2VyICpuZ0Zvcj1cImxldCBtYXJrZXIgb2YgbWFya2Vyc1wiXG4gICAgICAgICAgICBbbG9uZ2l0dWRlXT1cIm1hcmtlci5sb2MubG5nXCJcbiAgICAgICAgICAgIFtsYXRpdHVkZV09XCJtYXJrZXIubG9jLmxhdFwiXG4gICAgICAgICAgICBbaWNvblVybF09XCJtYXJrZXIuaWNvblVybFwiPlxuICA8YWdtLWluZm8td2luZG93ICNpbmZvV2luZG93cyBbZGlzYWJsZUF1dG9QYW5dPVwidHJ1ZVwiPlxuICAgIDxzdHJvbmc+e3ttYXJrZXIudmFsdWV9fTwvc3Ryb25nPlxuICA8L2FnbS1pbmZvLXdpbmRvdz5cbjwvYWdtLW1hcmtlcj5cblxuPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbXAgb2YgbGF5ZXJzLnNsaWNlKCl8cmV2ZXJzZTsgbGV0IGkgPSBpbmRleFwiIFtuZ1N3aXRjaF09XCJtcC5sYXllclR5cGVcIj5cbiAgPHdtcy1sYXllciAqbmdTd2l0Y2hDYXNlPVwiJ3dtcydcIlxuICAgIFt1cmxdPVwibXAudXJsXCJcbiAgICBbcGFyYW1zXT1cIm1wLndtc1BhcmFtZXRlcnNcIlxuICAgIFtvcGFjaXR5XT1cIm1wLm9wYWNpdHlcIlxuICAgIFtwb3NpdGlvbl09XCJtcC5vcHRpb25zLnBvc2l0aW9uXCI+XG4gIDwvd21zLWxheWVyPlxuICA8YWdtLWRhdGEtbGF5ZXIgKm5nU3dpdGNoQ2FzZT1cIid2ZWN0b3InXCJcbiAgICAgICAgICAgICAgICBbZ2VvSnNvbl09XCJtcC5zdGF0aWNEYXRhXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVdPVwibXAuX3N0eWxlRnVuY1wiXG4gICAgICAgICAgICAgICAgKGxheWVyQ2xpY2spPVwiY2xpY2tlZCgkZXZlbnQpXCJcblxuICAgICAgICAgICAgICAgID5cbiAgPC9hZ20tZGF0YS1sYXllcj5cblxuICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInY2lyY2xlJ1wiPlxuICAgIDxhZ20tY2lyY2xlICpuZ0Zvcj1cImxldCBmIG9mIG1wLnN0YXRpY0RhdGEuZmVhdHVyZXM7IGxldCBqPWluZGV4XCJcbiAgICAgICAgICAgICAgICBbbGF0aXR1ZGVdPVwiZi5nZW9tZXRyeS5jb29yZGluYXRlc1sxXVwiXG4gICAgICAgICAgICAgICAgW2xvbmdpdHVkZV09XCJmLmdlb21ldHJ5LmNvb3JkaW5hdGVzWzBdXCJcbiAgICAgICAgICAgICAgICBbcmFkaXVzXT1cIjEwMDAwMDAwLyh6b29tKnpvb20qem9vbSp6b29tKVwiXG4gICAgICAgICAgICAgICAgW2ZpbGxDb2xvcl09XCJtcC5mbGF0dGVuZWRTZXR0aW5ncz8uc3R5bGVzPy5maWxsQ29sb3J8fCdibGFjaydcIlxuICAgICAgICAgICAgICAgIFtmaWxsT3BhY2l0eV09XCJtcC5mbGF0dGVuZWRTZXR0aW5ncz8uc3R5bGVzPy5maWxsT3BhY2l0eXx8MVwiXG4gICAgICAgICAgICAgICAgW3N0cm9rZUNvbG9yXT1cIm1wLmZsYXR0ZW5lZFNldHRpbmdzPy5zdHlsZXM/LnN0cm9rZUNvbG9yfHwnYmxhY2snXCJcbiAgICAgICAgICAgICAgICBbc3Ryb2tlT3BhY2l0eV09XCJtcC5mbGF0dGVuZWRTZXR0aW5ncz8uc3R5bGVzPy5zdHJva2VPcGFjaXR5fHwxXCJcbiAgICAgICAgICAgICAgICBbc3Ryb2tlUG9zaXRpb25dPVwiMFwiXG4gICAgICAgICAgICAgICAgW3N0cm9rZVdlaWdodF09XCIoZj09PXNlbGVjdGVkRmVhdHVyZSk/MzoobXAuZmxhdHRlbmVkU2V0dGluZ3M/LnN0eWxlcz8uc3Ryb2tlV2VpZ2h0fHwwLjUpXCJcbiAgICAgICAgICAgICAgICAoY2lyY2xlQ2xpY2spPVwiY2lyY2xlQ2xpY2tlZChtcCxmKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgIDwvYWdtLWNpcmNsZT5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPCEtLVxuICAtLT5cbjwvbmctY29udGFpbmVyPlxuXG48IS0tIGZvciBtYXAgY29udHJvbHMgLS0+XG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJUT1BfQ0VOVEVSXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLnRvcC1jZW50ZXJcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJUT1BfTEVGVFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC50b3AtbGVmdFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlRPUF9SSUdIVFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC50b3AtcmlnaHRcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJMRUZUX1RPUFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5sZWZ0LXRvcFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlJJR0hUX1RPUFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5yaWdodC10b3BcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJMRUZUX0NFTlRFUlwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5sZWZ0LWNlbnRlclwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlJJR0hUX0NFTlRFUlwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5yaWdodC1jZW50ZXJcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJMRUZUX0JPVFRPTVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5sZWZ0LWJvdHRvbVwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIlJJR0hUX0JPVFRPTVwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5yaWdodC1ib3R0b21cIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJCT1RUT01fQ0VOVEVSXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLm1hcC1jb250cm9sLmJvdHRvbS1jZW50ZXJcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48bWFwLWNvbnRyb2wgcG9zaXRpb249XCJCT1RUT01fTEVGVFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5ib3R0b20tbGVmdFwiPjwvbmctY29udGVudD5cbjwvbWFwLWNvbnRyb2w+XG5cbjxtYXAtY29udHJvbCBwb3NpdGlvbj1cIkJPVFRPTV9SSUdIVFwiPlxuICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIi5tYXAtY29udHJvbC5ib3R0b20tcmlnaHRcIj48L25nLWNvbnRlbnQ+XG48L21hcC1jb250cm9sPlxuXG48L2FnbS1tYXA+XG5cbmAsc3R5bGVzOiBbXX0pXG5leHBvcnQgY2xhc3MgTGF5ZXJlZE1hcENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxheWVyczogQXJyYXk8TWFwcGVkTGF5ZXI+ID0gW107XG4gIEBJbnB1dCgpIG1hcmtlcnM6QXJyYXk8U2ltcGxlTWFya2VyPiA9IFtdO1xuICBASW5wdXQoKSBtYXBUeXBlSWQ6c3RyaW5nPSdyb2FkbWFwJztcblxuICBAT3V0cHV0KCkgbGF5ZXJzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxNYXBwZWRMYXllcj4+KCk7XG4gIEBPdXRwdXQoKSBmZWF0dXJlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtmZWF0dXJlOkZlYXR1cmU8R2VvbWV0cnlPYmplY3Q+LGxheWVyPzpNYXBwZWRMYXllcn0+KCk7XG4gIEBPdXRwdXQoKSBwb2ludFNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxMYXRMbmc+KCk7XG4gIEBJbnB1dCgpIG1hcFR5cGVQb3NpdGlvbjpudW1iZXIgPSBDb250cm9sUG9zaXRpb24uQk9UVE9NX0xFRlRcbiAgQElucHV0KCkgc3RyZWV0Vmlld0NvbnRyb2wgPSB0cnVlO1xuXG4gIEBWaWV3Q2hpbGQoQWdtTWFwLHtzdGF0aWM6ZmFsc2V9KSB0aGVNYXA6QWdtTWFwO1xuICBAVmlld0NoaWxkcmVuKCdpbmZvV2luZG93cycpIGluZm9XaW5kb3dzOlF1ZXJ5TGlzdDxBZ21JbmZvV2luZG93PjtcblxuICBzZWxlY3RlZEZlYXR1cmU6YW55ID0gbnVsbDtcbiAgLy8gZ29vZ2xlIG1hcHMgem9vbSBsZXZlbFxuICBASW5wdXQoKSB6b29tOiBudW1iZXIgPSA0O1xuICBASW5wdXQoKSBzaG93TWFwVHlwZSA9IHRydWU7XG4gIG1hcFR5cGVPcHRpb25zOiBNYXBUeXBlQ29udHJvbE9wdGlvbnM9e1xuICAgIHBvc2l0aW9uOkNvbnRyb2xQb3NpdGlvbi5CT1RUT01fTEVGVFxuICB9O1xuXG4gIC8vIGluaXRpYWwgY2VudGVyIHBvc2l0aW9uIGZvciB0aGUgbWFwXG4gIEBJbnB1dCgpIGxhdDogbnVtYmVyID0gLTIyLjY3Mzg1ODtcbiAgQElucHV0KCkgbG5nOiBudW1iZXIgPSAxMjkuODE1OTgyO1xuICBASW5wdXQoKSBib3VuZHM6Qm91bmRzO1xuICBfYm91bmRzOkJvdW5kcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF96b25lOk5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzdGF0aWNEYXRhOlN0YXRpY0RhdGFTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIC8vIGlmIHpvb20gaW4gY2hhbmdlcy4uLlxuICAgIGlmKGNoYW5nZXMubWFwVHlwZVBvc2l0aW9uKXtcbiAgICAgIGlmKHRoaXMubWFwVHlwZVBvc2l0aW9uPT09bnVsbCl7XG4gICAgICAgIHRoaXMuc2hvd01hcFR5cGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWFwVHlwZU9wdGlvbnMgPSB7XG4gICAgICAgIHBvc2l0aW9uOnRoaXMubWFwVHlwZVBvc2l0aW9uXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmKGNoYW5nZXMubGF5ZXJzKXtcbiAgICAgIHRoaXMuc2V0TGF5ZXJQb3NpdGlvbnMoKTtcbiAgICB9XG5cbiAgICBpZihjaGFuZ2VzLm1hcmtlcnMmJnRoaXMubWFya2Vycyl7XG4gICAgICAvLyBkZWFsIHdpdGggZXhpc3RpbmcgaW5mbyB3aW5kb3dzP1xuICAgICAgaWYodGhpcy5pbmZvV2luZG93cyl7XG4gICAgICAgICAgdGhpcy5pbmZvV2luZG93cy5mb3JFYWNoKCh3LGkpPT57XG4gICAgICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKT0+dy5jbG9zZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgLy8gQ2hlY2sgYW5kIG9wZW4gcmVsZXZhbnQgaW5mbyB3aW5kb3dzLi4uXG4gICAgICAgIHRoaXMuaW5mb1dpbmRvd3MuZm9yRWFjaCgodyxpKT0+e1xuICAgICAgICAgIGxldCBtID0gdGhpcy5tYXJrZXJzW2ldO1xuICAgICAgICAgIGlmKG0ub3Blbil7XG4gICAgICAgICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpPT53Lm9wZW4oKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCk9PncuY2xvc2UoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKGNoYW5nZXMuYm91bmRzKXtcbiAgICAgIHNldFRpbWVvdXQoKCk9PnRoaXMuX2JvdW5kcz10aGlzLmJvdW5kcyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICB9XG5cbiAgbGF5ZXJzQ2hhbmdlZChjaGFuZ2VzOiBBcnJheTxNYXBwZWRMYXllcj4pIHtcbiAgfVxuXG4gIGxheWVyQWRkZWQoc2VsZWN0aW9uOiBMYXllclNlbGVjdGlvbikge1xuICAgIHZhciBleCA9IHRoaXMubGF5ZXJzLmZpbmQobCA9PiBsLmxheWVyID09PSBzZWxlY3Rpb24ubGF5ZXIpO1xuICAgIGlmIChleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBtYXBwZWQgPSBuZXcgTWFwcGVkTGF5ZXIoKTtcbiAgICBtYXBwZWQubGF5ZXIgPSBzZWxlY3Rpb24ubGF5ZXI7XG5cbiAgICBtYXBwZWQubGF5ZXJUeXBlID0gJ3dtcyc7XG4gICAgbWFwcGVkLm9wdGlvbnMubGVnZW5kID0gdHJ1ZTtcblxuICAgIGlmKHNlbGVjdGlvbi5sYXllci5vcHRpb25zLnZlY3RvcnMpe1xuICAgICAgdGhpcy5zdGF0aWNEYXRhLmdldChzZWxlY3Rpb24ubGF5ZXIub3B0aW9ucy5ob3N0LHNlbGVjdGlvbi5sYXllci5vcHRpb25zLmZpbGVwYXRoKS5zdWJzY3JpYmUoXG4gICAgICAgIChkYXRhOmFueSk9PntcbiAgICAgICAgICBtYXBwZWQuc3RhdGljRGF0YT1kYXRhO1xuICAgICAgICAgIHRoaXMuYWN0aXZhdGVMYXllcihtYXBwZWQsc2VsZWN0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVMYXllcihtYXBwZWQsIHNlbGVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZUxheWVyKG1hcHBlZDogTWFwcGVkTGF5ZXIsIHNlbGVjdGlvbjogTGF5ZXJTZWxlY3Rpb24pIHtcbiAgICBtYXBwZWQudXBkYXRlKCk7XG4gICAgaWYgKHNlbGVjdGlvbi5hY3Rpb24gPT09ICdyZXBsYWNlJykge1xuICAgICAgaWYoc2VsZWN0aW9uLmZpbHRlcil7XG4gICAgICAgIHRoaXMubGF5ZXJzID0gdGhpcy5sYXllcnMuZmlsdGVyKG1sPT4hc2VsZWN0aW9uLmZpbHRlcihtbCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sYXllcnMgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sYXllcnMgPSBbbWFwcGVkXS5jb25jYXQodGhpcy5sYXllcnMpO1xuICAgIHRoaXMuc2V0TGF5ZXJQb3NpdGlvbnMoKTtcbiAgICB0aGlzLmxheWVyc0NoYW5nZS5lbWl0KHRoaXMubGF5ZXJzKTtcbiAgfVxuXG4gIHNldExheWVyUG9zaXRpb25zKCl7XG4gICAgbGV0IGl4PTA7XG4gICAgZm9yKHZhciBpPXRoaXMubGF5ZXJzLmxlbmd0aC0xO2k+PTA7aS0tKXtcbiAgICAgIGlmKHRoaXMubGF5ZXJzW2ldLmxheWVyVHlwZT09PSd3bXMnKXtcbiAgICAgICAgdGhpcy5sYXllcnNbaV0ub3B0aW9ucy5wb3NpdGlvbj1peDtcbiAgICAgICAgaXgrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXh0cmFjdEZlYXR1cmUoZjphbnkpIDogRmVhdHVyZTxQb2ludD57XG4gICAgdmFyIGdlbyA9IGYuZ2V0R2VvbWV0cnkoKTtcbiAgICBnZW8gPSB7XG4gICAgICB0eXBlOidQb2ludCcsXG4gICAgICBjb29yZGluYXRlczpnZW8uZ2V0KDApXG4gICAgfVxuXG4gICAgdmFyIHByb3BzOntba2V5OnN0cmluZ106YW55fSA9IHt9O1xuICAgIGYuZm9yRWFjaFByb3BlcnR5KCh2YWw6YW55LHByb3A6c3RyaW5nKT0+cHJvcHNbcHJvcF09dmFsKTtcblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOidGZWF0dXJlJyxcbiAgICAgIGdlb21ldHJ5OmdlbyxcbiAgICAgIHByb3BlcnRpZXM6cHJvcHNcbiAgICB9O1xuICB9XG5cbiAgY2xpY2tlZChldmVudDpEYXRhTW91c2VFdmVudCl7XG4gICAgdmFyIGZlYXR1cmUgPSB0aGlzLmV4dHJhY3RGZWF0dXJlKGV2ZW50LmZlYXR1cmUpO1xuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gZmVhdHVyZTtcbiAgICB0aGlzLmZlYXR1cmVTZWxlY3RlZC5lbWl0KHtmZWF0dXJlOmZlYXR1cmV9KTtcbiAgfVxuXG4gIGNpcmNsZUNsaWNrZWQobWw6TWFwcGVkTGF5ZXIsZmVhdHVyZTphbnkpe1xuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gZmVhdHVyZTtcbiAgICB0aGlzLmZlYXR1cmVTZWxlY3RlZC5lbWl0KHtmZWF0dXJlOmZlYXR1cmUsbGF5ZXI6bWx9KTtcbiAgfVxuXG4gIG1hcENsaWNrKGV2ZW50OmFueSl7XG4gICAgdmFyIGNvb3JkczpMYXRMbmcgPSBldmVudC5jb29yZHM7XG4gICAgdGhpcy5wb2ludFNlbGVjdGVkLmVtaXQoY29vcmRzKTtcbiAgfVxuXG4gIHpvb21Ub0JvdW5kcyhib3VuZHM6Qm91bmRzKXtcbiAgICB0aGlzLl9ib3VuZHMgPSBib3VuZHM7XG4gIH1cblxuICB6b29tQ2hhbmdlZCgpe1xuICAgIHRoaXMubGF5ZXJzID0gdGhpcy5sYXllcnMuc2xpY2UoKTtcbiAgfVxufVxuIl19