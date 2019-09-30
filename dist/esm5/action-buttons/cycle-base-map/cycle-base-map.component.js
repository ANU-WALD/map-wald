import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
var CycleBaseMapComponent = /** @class */ (function () {
    function CycleBaseMapComponent() {
        this.maxZoom = 32;
        this.baseLayers = [
            {
                map_type_id: 'roadmap',
                label: 'Road Map'
            },
            {
                map_type_id: 'satellite',
                label: 'Satellite'
            }
        ];
        this.tooltip = 'Toggle base layer';
    }
    CycleBaseMapComponent.prototype.ngAfterViewInit = function () {
    };
    CycleBaseMapComponent.prototype.ngOnChanges = function (changes) {
        if (this.baseLayers && !this.baseLayer) {
            this.baseLayer = this.baseLayers[0];
        }
    };
    CycleBaseMapComponent.prototype.toggleBaseLayer = function () {
        var _this = this;
        if (!this.map) {
            return;
        }
        var current = this.baseLayers.findIndex(function (l) { return l.map_type_id === _this.baseLayer.map_type_id; });
        var next = (current + 1) % this.baseLayers.length;
        this.baseLayer = this.baseLayers[next];
        this.map.mapTypeId = this.baseLayer ?
            this.baseLayer.map_type_id :
            null;
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", LayeredMapComponent)
    ], CycleBaseMapComponent.prototype, "map", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], CycleBaseMapComponent.prototype, "maxZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], CycleBaseMapComponent.prototype, "baseLayers", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleBaseMapComponent.prototype, "baseLayer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleBaseMapComponent.prototype, "tooltip", void 0);
    CycleBaseMapComponent = tslib_1.__decorate([
        Component({
            selector: 'cycle-base-map',
            template: "<button class=\"btn btn-secondary btn-sm\" (click)=\"toggleBaseLayer()\" [ngbTooltip]=\"tooltip\"\n                     placement=\"right\">\n  <i class=\"fa\" [ngClass]=\"baseLayer?.label==='Road Map'?'fa-road':'fa-globe'\"></i>\n</button>"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CycleBaseMapComponent);
    return CycleBaseMapComponent;
}());
export { CycleBaseMapComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtYmFzZS1tYXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJhY3Rpb24tYnV0dG9ucy9jeWNsZS1iYXNlLW1hcC9jeWNsZS1iYXNlLW1hcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWdCOUU7SUFnQkU7UUFkUyxZQUFPLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLGVBQVUsR0FBZTtZQUNoQztnQkFDRSxXQUFXLEVBQUcsU0FBUztnQkFDdkIsS0FBSyxFQUFHLFVBQVU7YUFDbkI7WUFDRDtnQkFDRSxXQUFXLEVBQUcsV0FBVztnQkFDekIsS0FBSyxFQUFHLFdBQVc7YUFDcEI7U0FDRixDQUFBO1FBRVEsWUFBTyxHQUFHLG1CQUFtQixDQUFDO0lBSXZDLENBQUM7SUFFRCwrQ0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCwrQ0FBZSxHQUFmO1FBQUEsaUJBWUM7UUFYQyxJQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNYLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFFLE9BQUEsQ0FBQyxDQUFDLFdBQVcsS0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQSxDQUFDO1lBQzNCLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBekNRO1FBQVIsS0FBSyxFQUFFOzBDQUFLLG1CQUFtQjtzREFBQztJQUN4QjtRQUFSLEtBQUssRUFBRTs7MERBQXFCO0lBQ3BCO1FBQVIsS0FBSyxFQUFFOzs2REFTUDtJQUNRO1FBQVIsS0FBSyxFQUFFOzs0REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7OzBEQUErQjtJQWQ1QixxQkFBcUI7UUFOakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsa1BBR0Y7U0FBWSxDQUFDOztPQUNWLHFCQUFxQixDQTJDakM7SUFBRCw0QkFBQztDQUFBLEFBM0NELElBMkNDO1NBM0NZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMYXllcmVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbGF5ZXJlZC1tYXAvbGF5ZXJlZC1tYXAuY29tcG9uZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlTGF5ZXIge1xuICBtYXBfdHlwZV9pZDogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xufVxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3ljbGUtYmFzZS1tYXAnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiAoY2xpY2spPVwidG9nZ2xlQmFzZUxheWVyKClcIiBbbmdiVG9vbHRpcF09XCJ0b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCI+XG4gIDxpIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJiYXNlTGF5ZXI/LmxhYmVsPT09J1JvYWQgTWFwJz8nZmEtcm9hZCc6J2ZhLWdsb2JlJ1wiPjwvaT5cbjwvYnV0dG9uPmAsc3R5bGVzOiBbXX0pXG5leHBvcnQgY2xhc3MgQ3ljbGVCYXNlTWFwQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XG4gIEBJbnB1dCgpIG1hcDpMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBtYXhab29tOm51bWJlciA9IDMyO1xuICBASW5wdXQoKSBiYXNlTGF5ZXJzOkJhc2VMYXllcltdID0gW1xuICAgIHtcbiAgICAgIG1hcF90eXBlX2lkIDogJ3JvYWRtYXAnLFxuICAgICAgbGFiZWwgOiAnUm9hZCBNYXAnXG4gICAgfSxcbiAgICB7XG4gICAgICBtYXBfdHlwZV9pZCA6ICdzYXRlbGxpdGUnLFxuICAgICAgbGFiZWwgOiAnU2F0ZWxsaXRlJ1xuICAgIH1cbiAgXVxuICBASW5wdXQoKSBiYXNlTGF5ZXI6QmFzZUxheWVyO1xuICBASW5wdXQoKSB0b29sdGlwID0gJ1RvZ2dsZSBiYXNlIGxheWVyJztcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmKHRoaXMuYmFzZUxheWVycyAmJiAhdGhpcy5iYXNlTGF5ZXIpe1xuICAgICAgdGhpcy5iYXNlTGF5ZXIgPSB0aGlzLmJhc2VMYXllcnNbMF07XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQmFzZUxheWVyKCl7XG4gICAgaWYoIXRoaXMubWFwKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY3VycmVudCA9IHRoaXMuYmFzZUxheWVycy5maW5kSW5kZXgobD0+bC5tYXBfdHlwZV9pZD09PXRoaXMuYmFzZUxheWVyLm1hcF90eXBlX2lkKTtcbiAgICBsZXQgbmV4dCA9IChjdXJyZW50KzEpJXRoaXMuYmFzZUxheWVycy5sZW5ndGg7XG4gICAgdGhpcy5iYXNlTGF5ZXIgPSB0aGlzLmJhc2VMYXllcnNbbmV4dF07XG5cbiAgICB0aGlzLm1hcC5tYXBUeXBlSWQgPSB0aGlzLmJhc2VMYXllciA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmFzZUxheWVyLm1hcF90eXBlX2lkOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuICB9XG59XG4iXX0=