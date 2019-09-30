import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
let ZoomFullComponent = class ZoomFullComponent {
    constructor() {
    }
    ngAfterViewInit() {
    }
    zoomToBounds() {
        this.map.zoomToBounds(Object.assign({}, this.bounds));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", LayeredMapComponent)
], ZoomFullComponent.prototype, "map", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ZoomFullComponent.prototype, "bounds", void 0);
ZoomFullComponent = tslib_1.__decorate([
    Component({
        selector: 'zoom-full',
        template: `<button class="btn btn-secondary btn-sm"
        ngbTooltip="Zoom to full extent"
        placement="right"
        (click)="zoomToBounds()"
><i class="fa fa-arrows-alt"></i></button>
`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ZoomFullComponent);
export { ZoomFullComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1mdWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiYWN0aW9uLWJ1dHRvbnMvem9vbS1mdWxsL3pvb20tZnVsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWM5RSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUk1QjtJQUVBLENBQUM7SUFFRCxlQUFlO0lBRWYsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0YsQ0FBQTtBQWRVO0lBQVIsS0FBSyxFQUFFO3NDQUFLLG1CQUFtQjs4Q0FBQztBQUN4QjtJQUFSLEtBQUssRUFBRTs7aURBQWU7QUFGWixpQkFBaUI7SUFSN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7OztDQUtYO0tBQVksQ0FBQzs7R0FDRCxpQkFBaUIsQ0FlN0I7U0FmWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi4vLi4vZGF0YS9ib3VuZHMnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd6b29tLWZ1bGwnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIlxuICAgICAgICBuZ2JUb29sdGlwPVwiWm9vbSB0byBmdWxsIGV4dGVudFwiXG4gICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICAgKGNsaWNrKT1cInpvb21Ub0JvdW5kcygpXCJcbj48aSBjbGFzcz1cImZhIGZhLWFycm93cy1hbHRcIj48L2k+PC9idXR0b24+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIFpvb21GdWxsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCAge1xuICBASW5wdXQoKSBtYXA6TGF5ZXJlZE1hcENvbXBvbmVudDtcbiAgQElucHV0KCkgYm91bmRzOkJvdW5kcztcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgem9vbVRvQm91bmRzKCl7XG4gICAgdGhpcy5tYXAuem9vbVRvQm91bmRzKE9iamVjdC5hc3NpZ24oe30sdGhpcy5ib3VuZHMpKTtcbiAgfVxufVxuIl19