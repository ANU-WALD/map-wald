import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MappedLayer } from '../data/mapped-layer';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { PointSelectionService, PointSelection } from '../point-selection.service';
var LayerPropertiesComponent = /** @class */ (function () {
    function LayerPropertiesComponent(pointSelectionService) {
        this.pointSelectionService = pointSelectionService;
        this.getKeys = Object.keys;
        this.propertyChanged = new EventEmitter();
        this.tooltipPlacement = 'right';
        this.availableTags = null;
        this.tags = {};
        this.pointVariables = [];
    }
    Object.defineProperty(LayerPropertiesComponent.prototype, "publication", {
        get: function () {
            if (!this.layer || !this.layer.layer || !this.layer.layer.publications) {
                return null;
            }
            return this.layer.layer.publications[this.layer.options.publication || 0];
        },
        enumerable: true,
        configurable: true
    });
    LayerPropertiesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
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
                this.map.featureSelected.subscribe(function (evt) { return _this.featureSelected(evt); });
        }
        if (this.layer) {
            setTimeout(function () {
                _this.findTags();
            });
        }
    };
    LayerPropertiesComponent.prototype.ngOnDestroy = function () {
        if (this.selectedFeatureSubscription) {
            this.selectedFeatureSubscription.unsubscribe();
        }
    };
    LayerPropertiesComponent.prototype.featureSelected = function (evt) {
        if (!this.publication || !this.publication.pointdata) {
            return;
        }
        this.selectedFeature = evt.feature;
        // No guarantee that this is from the same layer!!!!
        this.queryPointData();
    };
    LayerPropertiesComponent.prototype.publicationSelected = function (idx) {
        this.layer.options.publication = idx;
        // this.publication=this.layer.layer.publications[idx];
        if (this.publication.pointdata) {
            this.pointSelectionChanged();
            this.updateVariables();
        }
        this.update(idx);
    };
    LayerPropertiesComponent.prototype.updateLayer = function () {
        this.layer.options.tags = this.tags;
        this.layer.update();
        this.propertyChanged.emit(this.layer);
    };
    LayerPropertiesComponent.prototype.update = function (event) {
        var _this = this;
        this.updateLayer();
        setTimeout(function () {
            _this.findTags();
        });
    };
    LayerPropertiesComponent.prototype.processTags = function (tags) {
        if (!tags) {
            return null;
        }
        var result = {};
        Object.keys(tags).forEach(function (k) {
            var values = tags[k];
            result[k] = values.map(function (v) {
                var vAsTag = v;
                if (vAsTag.value && vAsTag.label) {
                    return vAsTag;
                }
                var vAsString = v;
                return {
                    value: vAsString,
                    label: vAsString
                };
            });
        });
        return result;
    };
    LayerPropertiesComponent.prototype.findTags = function () {
        if (this.publication.pointdata) {
            this.availableTags = this.processTags(this.publication.pointdata.tags);
        }
        else {
            this.availableTags = this.processTags(this.layer.flattenedSettings.options.tags);
        }
        this.setDefaultTags();
    };
    LayerPropertiesComponent.prototype.tagChanged = function (t) {
        this.queryPointData();
        this.update(null);
    };
    LayerPropertiesComponent.prototype.setDefaultTags = function () {
        var _this = this;
        if (!this.availableTags) {
            return;
        }
        Object.keys(this.availableTags).forEach(function (tag) {
            if (_this.tags[tag] === undefined) {
                _this.tags[tag] = _this.availableTags[tag][0].value;
            }
        });
        this.updateLayer();
    };
    LayerPropertiesComponent.prototype.zoomToExtent = function () {
        if (!this.map) {
            console.log('NO MAP!');
            return;
        }
        this.map.lat = this.layer.layer.lat;
        this.map.lng = this.layer.layer.lon;
        this.map.zoom = this.layer.layer.zoom || 13;
    };
    LayerPropertiesComponent.prototype.pointSelection = function () {
        return {
            catalog: this.publication.pointdata,
            variable: this.selectedVariable,
            feature: this.selectedFeature,
            tags: this.tags
        };
    };
    LayerPropertiesComponent.prototype.queryPointData = function () {
        var pointdata = this.publication && this.publication.pointdata;
        if (!this.publication || !this.publication.pointdata) {
            return;
        }
        this.pointSelectionChanged();
        this.updateVariables();
    };
    LayerPropertiesComponent.prototype.updateVariables = function () {
        var _this = this;
        var sel = this.pointSelection();
        this.pointSelectionService.timeseriesVariables(sel).subscribe(function (variables) {
            _this.pointVariables = variables.slice();
            if (_this.publication.pointdata.exclude) {
                _this.pointVariables = _this.pointVariables.filter(function (v) {
                    return !_this.publication.pointdata.exclude.some(function (pattern) {
                        return !!v.value.match(pattern);
                    });
                });
            }
            if (!_this.pointVariables.length) {
                _this.selectedVariable = null;
            }
            else if (_this.pointVariables.findIndex(function (t) { return t.value === _this.selectedVariable; }) < 0) {
                if (_this.pointVariables.findIndex(function (t) { return t.value === _this.publication.pointdata.defaultVariable; }) >= 0) {
                    _this.selectedVariable = _this.publication.pointdata.defaultVariable;
                }
                else {
                    _this.selectedVariable = _this.pointVariables[0].value;
                }
            }
            _this.pointSelectionChanged();
        });
    };
    LayerPropertiesComponent.prototype.pointSelectionChanged = function () {
        this.pointSelectionService.pointSelection(this.pointSelection());
    };
    LayerPropertiesComponent.ctorParameters = function () { return [
        { type: PointSelectionService }
    ]; };
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
            template: "<div class=\"container-fluid\">\n  <p><strong>{{layer?.title}}</strong>\n    <span *ngIf=\"layer.description()\" \n    [ngbTooltip]=\"layer.description()\"\n    [placement]=\"tooltipPlacement\"\n    class=\"layer-info-target\"\n    container=\"body\">\n  &nbsp;<i class=\"fa fa-info-circle\"></i>\n  </span>\n  &nbsp;<span *ngIf=\"layer.interpolatedDownloadURL\">\n    <small><a target=\"_blank\" \n              [href]=\"layer.interpolatedDownloadURL\"\n              [ngbTooltip]=\"'Download data'\"\n              container=\"body\">\n      <i class=\"fa fa-download\"></i>\n    </a></small>\n  </span>\n  </p>\n\n  <div *ngIf=\"layer?.layer.publications.length>1\">\n    <span *ngIf=\"layer.layer.publications[0].timestep\">Timestep </span>\n    <span *ngIf=\"!layer.layer.publications[0].timestep\">{{ layer.layer.options.publicationLabel || 'Variable' }} </span>\n    <select [(ngModel)]=\"layer.options.publication\" (ngModelChange)=\"publicationSelected($event)\">\n      <option *ngFor=\"let p of layer.layer.publications; let i=index\" [ngValue]=\"i\">{{p.label || p.timestep}}</option>\n    </select>\n  </div>\n  <div *ngIf=\"layer?.layer.publications.length===1\">\n    {{publication?.label}}\n  </div>\n\n  <div *ngIf=\"publication&&publication.timestep\">\n    <hr/>\n    <date-selection [(date)]=\"layer.options.date\"\n      (dateChange)=\"update($event)\"\n      [timestep]=\"publication.timestep\"\n      [stepDays]=\"publication.timestepMultiplier||1\"\n      [referenceDate]=\"publication.timestepReference\"\n      [minDate]=\"publication.options.start\"\n      [maxDate]=\"publication.options.end\"></date-selection>\n  </div>\n\n  <div *ngIf=\"layer.layer.options.smallExtent\">\n    <hr/>\n    <button class=\"btn btn-sm btn-primary\" (click)=\"zoomToExtent()\">Zoom to Extent</button>\n  </div>\n\n<!--\n  <div *ngIf=\"layer.layer.options.vectors\">\n    <p>Lets filter those {{layer.layer.options.vectors}}s, eh?</p>\n  </div>\n-->\n\n  <div *ngIf=\"availableTags\">\n    <div *ngFor=\"let tag of getKeys(availableTags)\">\n      {{tag}}\n      <select [(ngModel)]=\"tags[tag]\" (ngModelChange)=\"tagChanged(tag)\">\n        <option *ngFor=\"let val of availableTags[tag]\" [ngValue]=\"val.value\">{{val.label}}</option>\n      </select> \n    </div>\n  </div>\n\n  <div *ngIf=\"publication?.pointdata\">\n    Variable:\n    <select [(ngModel)]=\"selectedVariable\" (ngModelChange)=\"queryPointData()\">\n      <option *ngFor=\"let v of pointVariables\" [ngValue]=\"v.value\">{{v.label}}</option>\n    </select>\n  </div>\n  <!--\n  <div *ngIf=\"publication\">\n    <p>Start: {{publication.options.start}}</p>\n    <p>End: {{publication.options.end}}</p>\n    <p>{{publication|json}}</p>\n  </div>\n  <button (click)=\"update()\">Force update...</button>\n  -->\n</div>"
        }),
        tslib_1.__metadata("design:paramtypes", [PointSelectionService])
    ], LayerPropertiesComponent);
    return LayerPropertiesComponent;
}());
export { LayerPropertiesComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItcHJvcGVydGllcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImxheWVyLXByb3BlcnRpZXMvbGF5ZXItcHJvcGVydGllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQUUsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUzRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFtRm5GO0lBYUUsa0NBQW9CLHFCQUE0QztRQUE1QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBWmhFLFlBQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBR1osb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RDLHFCQUFnQixHQUFXLE9BQU8sQ0FBQztRQUM1QyxrQkFBYSxHQUFnQixJQUFJLENBQUM7UUFDbEMsU0FBSSxHQUE4QixFQUFFLENBQUE7UUFDcEMsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO0lBT3JDLENBQUM7SUFFRCxzQkFBSSxpREFBVzthQUFmO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtnQkFDdEUsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FB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LENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztpQkFDdEQ7YUFDRjtZQUNELEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHdEQUFxQixHQUFyQjtRQUNFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7Z0JBdEwwQyxxQkFBcUI7O0lBWHZEO1FBQVIsS0FBSyxFQUFFOzBDQUFRLFdBQVc7MkRBQUM7SUFDbkI7UUFBUixLQUFLLEVBQUU7MENBQU0sbUJBQW1CO3lEQUFDO0lBQ3hCO1FBQVQsTUFBTSxFQUFFOztxRUFBc0M7SUFDdEM7UUFBUixLQUFLLEVBQUU7O3NFQUFvQztJQUxqQyx3QkFBd0I7UUEvRXBDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLDh1RkEyRUw7U0FDTixDQUFDO2lEQWMyQyxxQkFBcUI7T0FickQsd0JBQXdCLENBb01wQztJQUFELCtCQUFDO0NBQUEsQUFwTUQsSUFvTUM7U0FwTVksd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4uL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IFB1YmxpY2F0aW9uLCBMYXllclRhZ1ZhbHVlLCBMYXllclRhZ01hcCB9IGZyb20gJy4uL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBMYXllcmVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5ZXJlZC1tYXAvbGF5ZXJlZC1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb21ldHJ5T2JqZWN0LCBGZWF0dXJlIH0gZnJvbSAnZ2VvanNvbic7XG5pbXBvcnQgeyBQb2ludFNlbGVjdGlvblNlcnZpY2UsIFBvaW50U2VsZWN0aW9uIH0gZnJvbSAnLi4vcG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UnO1xuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGF5ZXItcHJvcGVydGllcycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1mbHVpZFwiPlxuICA8cD48c3Ryb25nPnt7bGF5ZXI/LnRpdGxlfX08L3N0cm9uZz5cbiAgICA8c3BhbiAqbmdJZj1cImxheWVyLmRlc2NyaXB0aW9uKClcIiBcbiAgICBbbmdiVG9vbHRpcF09XCJsYXllci5kZXNjcmlwdGlvbigpXCJcbiAgICBbcGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgIGNsYXNzPVwibGF5ZXItaW5mby10YXJnZXRcIlxuICAgIGNvbnRhaW5lcj1cImJvZHlcIj5cbiAgJm5ic3A7PGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiPjwvaT5cbiAgPC9zcGFuPlxuICAmbmJzcDs8c3BhbiAqbmdJZj1cImxheWVyLmludGVycG9sYXRlZERvd25sb2FkVVJMXCI+XG4gICAgPHNtYWxsPjxhIHRhcmdldD1cIl9ibGFua1wiIFxuICAgICAgICAgICAgICBbaHJlZl09XCJsYXllci5pbnRlcnBvbGF0ZWREb3dubG9hZFVSTFwiXG4gICAgICAgICAgICAgIFtuZ2JUb29sdGlwXT1cIidEb3dubG9hZCBkYXRhJ1wiXG4gICAgICAgICAgICAgIGNvbnRhaW5lcj1cImJvZHlcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZG93bmxvYWRcIj48L2k+XG4gICAgPC9hPjwvc21hbGw+XG4gIDwvc3Bhbj5cbiAgPC9wPlxuXG4gIDxkaXYgKm5nSWY9XCJsYXllcj8ubGF5ZXIucHVibGljYXRpb25zLmxlbmd0aD4xXCI+XG4gICAgPHNwYW4gKm5nSWY9XCJsYXllci5sYXllci5wdWJsaWNhdGlvbnNbMF0udGltZXN0ZXBcIj5UaW1lc3RlcCA8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCIhbGF5ZXIubGF5ZXIucHVibGljYXRpb25zWzBdLnRpbWVzdGVwXCI+e3sgbGF5ZXIubGF5ZXIub3B0aW9ucy5wdWJsaWNhdGlvbkxhYmVsIHx8ICdWYXJpYWJsZScgfX0gPC9zcGFuPlxuICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJsYXllci5vcHRpb25zLnB1YmxpY2F0aW9uXCIgKG5nTW9kZWxDaGFuZ2UpPVwicHVibGljYXRpb25TZWxlY3RlZCgkZXZlbnQpXCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBwIG9mIGxheWVyLmxheWVyLnB1YmxpY2F0aW9uczsgbGV0IGk9aW5kZXhcIiBbbmdWYWx1ZV09XCJpXCI+e3twLmxhYmVsIHx8IHAudGltZXN0ZXB9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbiAgPGRpdiAqbmdJZj1cImxheWVyPy5sYXllci5wdWJsaWNhdGlvbnMubGVuZ3RoPT09MVwiPlxuICAgIHt7cHVibGljYXRpb24/LmxhYmVsfX1cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cInB1YmxpY2F0aW9uJiZwdWJsaWNhdGlvbi50aW1lc3RlcFwiPlxuICAgIDxoci8+XG4gICAgPGRhdGUtc2VsZWN0aW9uIFsoZGF0ZSldPVwibGF5ZXIub3B0aW9ucy5kYXRlXCJcbiAgICAgIChkYXRlQ2hhbmdlKT1cInVwZGF0ZSgkZXZlbnQpXCJcbiAgICAgIFt0aW1lc3RlcF09XCJwdWJsaWNhdGlvbi50aW1lc3RlcFwiXG4gICAgICBbc3RlcERheXNdPVwicHVibGljYXRpb24udGltZXN0ZXBNdWx0aXBsaWVyfHwxXCJcbiAgICAgIFtyZWZlcmVuY2VEYXRlXT1cInB1YmxpY2F0aW9uLnRpbWVzdGVwUmVmZXJlbmNlXCJcbiAgICAgIFttaW5EYXRlXT1cInB1YmxpY2F0aW9uLm9wdGlvbnMuc3RhcnRcIlxuICAgICAgW21heERhdGVdPVwicHVibGljYXRpb24ub3B0aW9ucy5lbmRcIj48L2RhdGUtc2VsZWN0aW9uPlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwibGF5ZXIubGF5ZXIub3B0aW9ucy5zbWFsbEV4dGVudFwiPlxuICAgIDxoci8+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc20gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwiem9vbVRvRXh0ZW50KClcIj5ab29tIHRvIEV4dGVudDwvYnV0dG9uPlxuICA8L2Rpdj5cblxuPCEtLVxuICA8ZGl2ICpuZ0lmPVwibGF5ZXIubGF5ZXIub3B0aW9ucy52ZWN0b3JzXCI+XG4gICAgPHA+TGV0cyBmaWx0ZXIgdGhvc2Uge3tsYXllci5sYXllci5vcHRpb25zLnZlY3RvcnN9fXMsIGVoPzwvcD5cbiAgPC9kaXY+XG4tLT5cblxuICA8ZGl2ICpuZ0lmPVwiYXZhaWxhYmxlVGFnc1wiPlxuICAgIDxkaXYgKm5nRm9yPVwibGV0IHRhZyBvZiBnZXRLZXlzKGF2YWlsYWJsZVRhZ3MpXCI+XG4gICAgICB7e3RhZ319XG4gICAgICA8c2VsZWN0IFsobmdNb2RlbCldPVwidGFnc1t0YWddXCIgKG5nTW9kZWxDaGFuZ2UpPVwidGFnQ2hhbmdlZCh0YWcpXCI+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHZhbCBvZiBhdmFpbGFibGVUYWdzW3RhZ11cIiBbbmdWYWx1ZV09XCJ2YWwudmFsdWVcIj57e3ZhbC5sYWJlbH19PC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD4gXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJwdWJsaWNhdGlvbj8ucG9pbnRkYXRhXCI+XG4gICAgVmFyaWFibGU6XG4gICAgPHNlbGVjdCBbKG5nTW9kZWwpXT1cInNlbGVjdGVkVmFyaWFibGVcIiAobmdNb2RlbENoYW5nZSk9XCJxdWVyeVBvaW50RGF0YSgpXCI+XG4gICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCB2IG9mIHBvaW50VmFyaWFibGVzXCIgW25nVmFsdWVdPVwidi52YWx1ZVwiPnt7di5sYWJlbH19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuICA8IS0tXG4gIDxkaXYgKm5nSWY9XCJwdWJsaWNhdGlvblwiPlxuICAgIDxwPlN0YXJ0OiB7e3B1YmxpY2F0aW9uLm9wdGlvbnMuc3RhcnR9fTwvcD5cbiAgICA8cD5FbmQ6IHt7cHVibGljYXRpb24ub3B0aW9ucy5lbmR9fTwvcD5cbiAgICA8cD57e3B1YmxpY2F0aW9ufGpzb259fTwvcD5cbiAgPC9kaXY+XG4gIDxidXR0b24gKGNsaWNrKT1cInVwZGF0ZSgpXCI+Rm9yY2UgdXBkYXRlLi4uPC9idXR0b24+XG4gIC0tPlxuPC9kaXY+YCwgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBMYXllclByb3BlcnRpZXNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBnZXRLZXlzID0gT2JqZWN0LmtleXM7XG4gIEBJbnB1dCgpIGxheWVyOiBNYXBwZWRMYXllcjtcbiAgQElucHV0KCkgbWFwOiBMYXllcmVkTWFwQ29tcG9uZW50O1xuICBAT3V0cHV0KCkgcHJvcGVydHlDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OiBzdHJpbmcgPSAncmlnaHQnO1xuICBhdmFpbGFibGVUYWdzOiBMYXllclRhZ01hcCA9IG51bGw7XG4gIHRhZ3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fVxuICBwb2ludFZhcmlhYmxlczogTGF5ZXJUYWdWYWx1ZVtdID0gW107XG4gIHNlbGVjdGVkVmFyaWFibGU6IHN0cmluZztcbiAgc2VsZWN0ZWRGZWF0dXJlOiBGZWF0dXJlPEdlb21ldHJ5T2JqZWN0PjtcbiAgc2VsZWN0ZWRGZWF0dXJlU3Vic2NyaXB0aW9uOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwb2ludFNlbGVjdGlvblNlcnZpY2U6IFBvaW50U2VsZWN0aW9uU2VydmljZSkge1xuXG4gIH1cblxuICBnZXQgcHVibGljYXRpb24oKTogKFB1YmxpY2F0aW9uIHwgbnVsbCkge1xuICAgIGlmICghdGhpcy5sYXllciB8fCAhdGhpcy5sYXllci5sYXllciB8fCAhdGhpcy5sYXllci5sYXllci5wdWJsaWNhdGlvbnMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sYXllci5sYXllci5wdWJsaWNhdGlvbnNbdGhpcy5sYXllci5vcHRpb25zLnB1YmxpY2F0aW9uIHx8IDBdO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIGlmKHRoaXMubGF5ZXIpe1xuICAgIC8vICAgdGhpcy5wdWJsaWNhdGlvbj10aGlzLmxheWVyLmxheWVyLnB1YmxpY2F0aW9uc1t0aGlzLmxheWVyLm9wdGlvbnMucHVibGljYXRpb258fDBdO1xuICAgIC8vIH1cbiAgICAvLyBpZiAodGhpcy5sYXllciAmJlxuICAgIC8vICAgdGhpcy5sYXllci5sYXllci5vcHRpb25zLnNtYWxsRXh0ZW50ICYmXG4gICAgLy8gICAhdGhpcy5sYXllci5zcGF0aWFsRXh0ZW50KSB7XG4gICAgLy8gICB0aGlzLmxvYWRFeHRlbnQoKTtcbiAgICAvLyB9XG4gICAgaWYgKHRoaXMubWFwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRmVhdHVyZVN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMubWFwLmZlYXR1cmVTZWxlY3RlZC5zdWJzY3JpYmUoKGV2dDogeyBmZWF0dXJlOiBGZWF0dXJlPEdlb21ldHJ5T2JqZWN0PiwgbGF5ZXI/OiBNYXBwZWRMYXllciB9KSA9PiB0aGlzLmZlYXR1cmVTZWxlY3RlZChldnQpKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sYXllcikge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZmluZFRhZ3MoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkRmVhdHVyZVN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZEZlYXR1cmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBmZWF0dXJlU2VsZWN0ZWQoZXZ0OiB7IGZlYXR1cmU6IEZlYXR1cmU8R2VvbWV0cnlPYmplY3Q+LCBsYXllcj86IE1hcHBlZExheWVyIH0pIHtcbiAgICBpZiAoIXRoaXMucHVibGljYXRpb24gfHwgIXRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRGZWF0dXJlID0gZXZ0LmZlYXR1cmU7XG4gICAgLy8gTm8gZ3VhcmFudGVlIHRoYXQgdGhpcyBpcyBmcm9tIHRoZSBzYW1lIGxheWVyISEhIVxuICAgIHRoaXMucXVlcnlQb2ludERhdGEoKTtcbiAgfVxuXG4gIHB1YmxpY2F0aW9uU2VsZWN0ZWQoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmxheWVyLm9wdGlvbnMucHVibGljYXRpb24gPSBpZHg7XG4gICAgLy8gdGhpcy5wdWJsaWNhdGlvbj10aGlzLmxheWVyLmxheWVyLnB1YmxpY2F0aW9uc1tpZHhdO1xuICAgIGlmICh0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YSkge1xuICAgICAgdGhpcy5wb2ludFNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgIHRoaXMudXBkYXRlVmFyaWFibGVzKCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGUoaWR4KTtcbiAgfVxuXG4gIHVwZGF0ZUxheWVyKCkge1xuICAgIHRoaXMubGF5ZXIub3B0aW9ucy50YWdzID0gdGhpcy50YWdzO1xuICAgIHRoaXMubGF5ZXIudXBkYXRlKCk7XG4gICAgdGhpcy5wcm9wZXJ0eUNoYW5nZWQuZW1pdCh0aGlzLmxheWVyKTtcbiAgfVxuXG4gIHVwZGF0ZShldmVudDogYW55KSB7XG4gICAgdGhpcy51cGRhdGVMYXllcigpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmZpbmRUYWdzKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm9jZXNzVGFncyh0YWdzOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PHN0cmluZyB8IExheWVyVGFnVmFsdWU+IH0pOiBMYXllclRhZ01hcCB7XG4gICAgaWYgKCF0YWdzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiBMYXllclRhZ01hcCA9IHt9O1xuXG4gICAgT2JqZWN0LmtleXModGFncykuZm9yRWFjaChrID0+IHtcbiAgICAgIGxldCB2YWx1ZXM6IEFycmF5PHN0cmluZyB8IExheWVyVGFnVmFsdWU+ID0gdGFnc1trXTtcbiAgICAgIHJlc3VsdFtrXSA9IHZhbHVlcy5tYXAodiA9PiB7XG4gICAgICAgIGxldCB2QXNUYWcgPSA8TGF5ZXJUYWdWYWx1ZT52O1xuICAgICAgICBpZiAodkFzVGFnLnZhbHVlICYmIHZBc1RhZy5sYWJlbCkge1xuICAgICAgICAgIHJldHVybiB2QXNUYWc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZBc1N0cmluZyA9IDxzdHJpbmc+djtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogdkFzU3RyaW5nLFxuICAgICAgICAgIGxhYmVsOiB2QXNTdHJpbmdcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZmluZFRhZ3MoKSB7XG4gICAgaWYgKHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhKSB7XG4gICAgICB0aGlzLmF2YWlsYWJsZVRhZ3MgPSB0aGlzLnByb2Nlc3NUYWdzKHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLnRhZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmF2YWlsYWJsZVRhZ3MgPSB0aGlzLnByb2Nlc3NUYWdzKHRoaXMubGF5ZXIuZmxhdHRlbmVkU2V0dGluZ3Mub3B0aW9ucy50YWdzKTtcbiAgICB9XG4gICAgdGhpcy5zZXREZWZhdWx0VGFncygpO1xuICB9XG5cbiAgdGFnQ2hhbmdlZCh0OiBzdHJpbmcpIHtcbiAgICB0aGlzLnF1ZXJ5UG9pbnREYXRhKCk7XG4gICAgdGhpcy51cGRhdGUobnVsbCk7XG4gIH1cblxuICBzZXREZWZhdWx0VGFncygpIHtcbiAgICBpZiAoIXRoaXMuYXZhaWxhYmxlVGFncykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHRoaXMuYXZhaWxhYmxlVGFncykuZm9yRWFjaCh0YWcgPT4ge1xuICAgICAgaWYgKHRoaXMudGFnc1t0YWddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy50YWdzW3RhZ10gPSB0aGlzLmF2YWlsYWJsZVRhZ3NbdGFnXVswXS52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlTGF5ZXIoKTtcbiAgfVxuXG4gIHpvb21Ub0V4dGVudCgpIHtcbiAgICBpZiAoIXRoaXMubWFwKSB7XG4gICAgICBjb25zb2xlLmxvZygnTk8gTUFQIScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubWFwLmxhdCA9IHRoaXMubGF5ZXIubGF5ZXIubGF0O1xuICAgIHRoaXMubWFwLmxuZyA9IHRoaXMubGF5ZXIubGF5ZXIubG9uO1xuICAgIHRoaXMubWFwLnpvb20gPSB0aGlzLmxheWVyLmxheWVyLnpvb20gfHwgMTM7XG4gIH1cblxuICBwb2ludFNlbGVjdGlvbigpOiBQb2ludFNlbGVjdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNhdGFsb2c6IHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLFxuICAgICAgdmFyaWFibGU6IHRoaXMuc2VsZWN0ZWRWYXJpYWJsZSxcbiAgICAgIGZlYXR1cmU6IHRoaXMuc2VsZWN0ZWRGZWF0dXJlLFxuICAgICAgdGFnczogdGhpcy50YWdzXG4gICAgfTtcbiAgfVxuXG4gIHF1ZXJ5UG9pbnREYXRhKCkge1xuICAgIGxldCBwb2ludGRhdGEgPSB0aGlzLnB1YmxpY2F0aW9uICYmIHRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhO1xuXG4gICAgaWYgKCF0aGlzLnB1YmxpY2F0aW9uIHx8ICF0aGlzLnB1YmxpY2F0aW9uLnBvaW50ZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucG9pbnRTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgdGhpcy51cGRhdGVWYXJpYWJsZXMoKTtcbiAgfVxuXG4gIHVwZGF0ZVZhcmlhYmxlcygpe1xuICAgIGxldCBzZWwgPSB0aGlzLnBvaW50U2VsZWN0aW9uKCk7XG4gICAgdGhpcy5wb2ludFNlbGVjdGlvblNlcnZpY2UudGltZXNlcmllc1ZhcmlhYmxlcyhcbiAgICAgIHNlbCkuc3Vic2NyaWJlKHZhcmlhYmxlcyA9PiB7XG4gICAgICAgIHRoaXMucG9pbnRWYXJpYWJsZXMgPSB2YXJpYWJsZXMuc2xpY2UoKTtcbiAgICAgICAgaWYodGhpcy5wdWJsaWNhdGlvbi5wb2ludGRhdGEuZXhjbHVkZSl7XG4gICAgICAgICAgdGhpcy5wb2ludFZhcmlhYmxlcyA9IHRoaXMucG9pbnRWYXJpYWJsZXMuZmlsdGVyKHY9PntcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5wdWJsaWNhdGlvbi5wb2ludGRhdGEuZXhjbHVkZS5zb21lKHBhdHRlcm49PntcbiAgICAgICAgICAgICAgcmV0dXJuICEhdi52YWx1ZS5tYXRjaChwYXR0ZXJuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnBvaW50VmFyaWFibGVzLmxlbmd0aCl7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFZhcmlhYmxlID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBvaW50VmFyaWFibGVzLmZpbmRJbmRleCh0PT50LnZhbHVlPT09dGhpcy5zZWxlY3RlZFZhcmlhYmxlKSA8IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5wb2ludFZhcmlhYmxlcy5maW5kSW5kZXgodD0+dC52YWx1ZT09PXRoaXMucHVibGljYXRpb24ucG9pbnRkYXRhLmRlZmF1bHRWYXJpYWJsZSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFZhcmlhYmxlID0gdGhpcy5wdWJsaWNhdGlvbi5wb2ludGRhdGEuZGVmYXVsdFZhcmlhYmxlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkVmFyaWFibGUgPSB0aGlzLnBvaW50VmFyaWFibGVzWzBdLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvaW50U2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwb2ludFNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgdGhpcy5wb2ludFNlbGVjdGlvblNlcnZpY2UucG9pbnRTZWxlY3Rpb24odGhpcy5wb2ludFNlbGVjdGlvbigpKTtcbiAgfVxufSJdfQ==