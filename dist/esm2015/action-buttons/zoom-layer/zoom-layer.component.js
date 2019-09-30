import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
import { MappedLayer } from '../../data/mapped-layer';
let ZoomLayerComponent = class ZoomLayerComponent {
    constructor() {
    }
    ngAfterViewInit() {
    }
    zoomToLayer() {
        if (this.layer.layer.spatialExtent) {
            console.log('Zoom to layer');
            this.layer.layer.spatialExtent.subscribe(b => {
                this.map.zoomToBounds(Object.assign({}, b));
            });
        }
        else {
            console.log('Zoom full');
            this.map.zoomToBounds(Object.assign({}, this.fullBounds));
        }
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
        template: `<button type="button" [disabled]="!layer" class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom to selected layer"
        placement="right"
        (click)="zoomToLayer()"
><i class="fa fa-compress"></i>
</button>
`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ZoomLayerComponent);
export { ZoomLayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1sYXllci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImFjdGlvbi1idXR0b25zL3pvb20tbGF5ZXIvem9vbS1sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFldEQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFLN0I7SUFFQSxDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUM7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXZCVTtJQUFSLEtBQUssRUFBRTtzQ0FBTSxtQkFBbUI7K0NBQUM7QUFDekI7SUFBUixLQUFLLEVBQUU7c0NBQVEsV0FBVztpREFBQztBQUNuQjtJQUFSLEtBQUssRUFBRTs7c0RBQW9CO0FBSGpCLGtCQUFrQjtJQVQ5QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUU7Ozs7OztDQU1YO0tBQVksQ0FBQzs7R0FDRCxrQkFBa0IsQ0F3QjlCO1NBeEJZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xheWVyZWQtbWFwL2xheWVyZWQtbWFwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4uLy4uL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4uLy4uL2RhdGEvYm91bmRzJztcblxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnem9vbS1sYXllcicsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiFsYXllclwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCJcbiAgICAgICAgbmdiVG9vbHRpcD1cIlpvb20gdG8gc2VsZWN0ZWQgbGF5ZXJcIlxuICAgICAgICBwbGFjZW1lbnQ9XCJyaWdodFwiXG4gICAgICAgIChjbGljayk9XCJ6b29tVG9MYXllcigpXCJcbj48aSBjbGFzcz1cImZhIGZhLWNvbXByZXNzXCI+PC9pPlxuPC9idXR0b24+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIFpvb21MYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtYXA6IExheWVyZWRNYXBDb21wb25lbnQ7XG4gIEBJbnB1dCgpIGxheWVyOiBNYXBwZWRMYXllcjtcbiAgQElucHV0KCkgZnVsbEJvdW5kczogQm91bmRzO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgfVxuXG4gIHpvb21Ub0xheWVyKCkge1xuICAgIGlmKHRoaXMubGF5ZXIubGF5ZXIuc3BhdGlhbEV4dGVudCl7XG4gICAgICBjb25zb2xlLmxvZygnWm9vbSB0byBsYXllcicpO1xuICAgICAgdGhpcy5sYXllci5sYXllci5zcGF0aWFsRXh0ZW50LnN1YnNjcmliZShiPT57XG4gICAgICAgIHRoaXMubWFwLnpvb21Ub0JvdW5kcyhPYmplY3QuYXNzaWduKHt9LGIpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnWm9vbSBmdWxsJyk7XG4gICAgICB0aGlzLm1hcC56b29tVG9Cb3VuZHMoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5mdWxsQm91bmRzKSk7XG4gICAgfVxuICB9XG59XG4iXX0=