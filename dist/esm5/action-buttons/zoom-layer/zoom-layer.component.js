import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
import { MappedLayer } from '../../data/mapped-layer';
var ZoomLayerComponent = /** @class */ (function () {
    function ZoomLayerComponent() {
    }
    ZoomLayerComponent.prototype.ngAfterViewInit = function () {
    };
    ZoomLayerComponent.prototype.zoomToLayer = function () {
        var _this = this;
        if (this.layer.layer.spatialExtent) {
            console.log('Zoom to layer');
            this.layer.layer.spatialExtent.subscribe(function (b) {
                _this.map.zoomToBounds(Object.assign({}, b));
            });
        }
        else {
            console.log('Zoom full');
            this.map.zoomToBounds(Object.assign({}, this.fullBounds));
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", LayeredMapComponent)
    ], ZoomLayerComponent.prototype, "map", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", MappedLayer)
    ], ZoomLayerComponent.prototype, "layer", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], ZoomLayerComponent.prototype, "fullBounds", void 0);
    ZoomLayerComponent = tslib_1.__decorate([
        Component({
            selector: 'zoom-layer',
            template: "<button type=\"button\" [disabled]=\"!layer\" class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom to selected layer\"\n        placement=\"right\"\n        (click)=\"zoomToLayer()\"\n><i class=\"fa fa-compress\"></i>\n</button>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ZoomLayerComponent);
    return ZoomLayerComponent;
}());
export { ZoomLayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1sYXllci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImFjdGlvbi1idXR0b25zL3pvb20tbGF5ZXIvem9vbS1sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFldEQ7SUFLRTtJQUVBLENBQUM7SUFFRCw0Q0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFBQSxpQkFVQztRQVRDLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUF0QlE7UUFBUixLQUFLLEVBQUU7MENBQU0sbUJBQW1CO21EQUFDO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOzBDQUFRLFdBQVc7cURBQUM7SUFDbkI7UUFBUixLQUFLLEVBQUU7OzBEQUFvQjtJQUhqQixrQkFBa0I7UUFUOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLGlQQU1YO1NBQVksQ0FBQzs7T0FDRCxrQkFBa0IsQ0F3QjlCO0lBQUQseUJBQUM7Q0FBQSxBQXhCRCxJQXdCQztTQXhCWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuLi8uLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBCb3VuZHMgfSBmcm9tICcuLi8uLi9kYXRhL2JvdW5kcyc7XG5cblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3pvb20tbGF5ZXInLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhbGF5ZXJcIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiXG4gICAgICAgIG5nYlRvb2x0aXA9XCJab29tIHRvIHNlbGVjdGVkIGxheWVyXCJcbiAgICAgICAgcGxhY2VtZW50PVwicmlnaHRcIlxuICAgICAgICAoY2xpY2spPVwiem9vbVRvTGF5ZXIoKVwiXG4+PGkgY2xhc3M9XCJmYSBmYS1jb21wcmVzc1wiPjwvaT5cbjwvYnV0dG9uPlxuYCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBab29tTGF5ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgbWFwOiBMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBsYXllcjogTWFwcGVkTGF5ZXI7XG4gIEBJbnB1dCgpIGZ1bGxCb3VuZHM6IEJvdW5kcztcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gIH1cblxuICB6b29tVG9MYXllcigpIHtcbiAgICBpZih0aGlzLmxheWVyLmxheWVyLnNwYXRpYWxFeHRlbnQpe1xuICAgICAgY29uc29sZS5sb2coJ1pvb20gdG8gbGF5ZXInKTtcbiAgICAgIHRoaXMubGF5ZXIubGF5ZXIuc3BhdGlhbEV4dGVudC5zdWJzY3JpYmUoYj0+e1xuICAgICAgICB0aGlzLm1hcC56b29tVG9Cb3VuZHMoT2JqZWN0LmFzc2lnbih7fSxiKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ1pvb20gZnVsbCcpO1xuICAgICAgdGhpcy5tYXAuem9vbVRvQm91bmRzKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZnVsbEJvdW5kcykpO1xuICAgIH1cbiAgfVxufVxuIl19