import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
let ZoomOutComponent = class ZoomOutComponent {
    constructor() {
        this.minZoom = 1;
    }
    ngAfterViewInit() {
    }
    zoomOut() {
        if (!this.map) {
            return;
        }
        this.map.zoom = Math.max(this.minZoom, this.map.zoom - 1);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", LayeredMapComponent)
], ZoomOutComponent.prototype, "map", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], ZoomOutComponent.prototype, "minZoom", void 0);
ZoomOutComponent = tslib_1.__decorate([
    Component({
        selector: 'zoom-out',
        template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom out"
        placement="right"
        (click)="zoomOut()"
><i class="fa fa-minus"></i></button>`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ZoomOutComponent);
export { ZoomOutComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1vdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJhY3Rpb24tYnV0dG9ucy96b29tLW91dC96b29tLW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQVk5RSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUczQjtRQURTLFlBQU8sR0FBVSxDQUFDLENBQUM7SUFHNUIsQ0FBQztJQUVELGVBQWU7SUFFZixDQUFDO0lBRUQsT0FBTztRQUNMLElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ1gsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRixDQUFBO0FBaEJVO0lBQVIsS0FBSyxFQUFFO3NDQUFLLG1CQUFtQjs2Q0FBQztBQUN4QjtJQUFSLEtBQUssRUFBRTs7aURBQW9CO0FBRmpCLGdCQUFnQjtJQVA1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUU7Ozs7c0NBSTBCO0tBQVksQ0FBQzs7R0FDdEMsZ0JBQWdCLENBaUI1QjtTQWpCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd6b29tLW91dCcsXG4gIHRlbXBsYXRlOiBgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiXG4gICAgICAgIG5nYlRvb2x0aXA9XCJab29tIG91dFwiXG4gICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICAgKGNsaWNrKT1cInpvb21PdXQoKVwiXG4+PGkgY2xhc3M9XCJmYSBmYS1taW51c1wiPjwvaT48L2J1dHRvbj5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIFpvb21PdXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0ICB7XG4gIEBJbnB1dCgpIG1hcDpMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBtaW5ab29tOm51bWJlciA9IDE7XG4gIGNvbnN0cnVjdG9yKCl7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuXG4gIH1cblxuICB6b29tT3V0KCl7XG4gICAgaWYoIXRoaXMubWFwKXtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5tYXAuem9vbSA9IE1hdGgubWF4KHRoaXMubWluWm9vbSwgdGhpcy5tYXAuem9vbSAtIDEpO1xuICB9XG59XG4iXX0=