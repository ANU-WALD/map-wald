import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
let ZoomInComponent = class ZoomInComponent {
    constructor() {
        this.maxZoom = 32;
    }
    ngAfterViewInit() {
    }
    zoomIn() {
        if (!this.map) {
            return;
        }
        this.map.zoom = Math.min(this.maxZoom, this.map.zoom + 1);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", LayeredMapComponent)
], ZoomInComponent.prototype, "map", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], ZoomInComponent.prototype, "maxZoom", void 0);
ZoomInComponent = tslib_1.__decorate([
    Component({
        selector: 'zoom-in',
        template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom in"
        placement="right"
        (click)="zoomIn()"
><i class="fa fa-plus"></i></button>`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ZoomInComponent);
export { ZoomInComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1pbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImFjdGlvbi1idXR0b25zL3pvb20taW4vem9vbS1pbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVk5RSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSTFCO1FBRlMsWUFBTyxHQUFVLEVBQUUsQ0FBQztJQUk3QixDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUM7WUFDWCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUE7QUFqQlU7SUFBUixLQUFLLEVBQUU7c0NBQUssbUJBQW1COzRDQUFDO0FBQ3hCO0lBQVIsS0FBSyxFQUFFOztnREFBcUI7QUFGbEIsZUFBZTtJQVAzQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsU0FBUztRQUNuQixRQUFRLEVBQUU7Ozs7cUNBSXlCO0tBQVksQ0FBQzs7R0FDckMsZUFBZSxDQWtCM0I7U0FsQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xheWVyZWQtbWFwL2xheWVyZWQtbWFwLmNvbXBvbmVudCc7XG5cblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3pvb20taW4nLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIlxuICAgICAgICBuZ2JUb29sdGlwPVwiWm9vbSBpblwiXG4gICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICAgKGNsaWNrKT1cInpvb21JbigpXCJcbj48aSBjbGFzcz1cImZhIGZhLXBsdXNcIj48L2k+PC9idXR0b24+YCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBab29tSW5Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0ICB7XG4gIEBJbnB1dCgpIG1hcDpMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBtYXhab29tOm51bWJlciA9IDMyO1xuXG4gIGNvbnN0cnVjdG9yKCl7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuXG4gIH1cblxuICB6b29tSW4oKXtcbiAgICBpZighdGhpcy5tYXApe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm1hcC56b29tID0gTWF0aC5taW4odGhpcy5tYXhab29tLHRoaXMubWFwLnpvb20rMSk7XG4gIH1cbn1cbiJdfQ==