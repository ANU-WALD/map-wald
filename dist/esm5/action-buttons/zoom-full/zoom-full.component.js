import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
var ZoomFullComponent = /** @class */ (function () {
    function ZoomFullComponent() {
    }
    ZoomFullComponent.prototype.ngAfterViewInit = function () {
    };
    ZoomFullComponent.prototype.zoomToBounds = function () {
        this.map.zoomToBounds(Object.assign({}, this.bounds));
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
            template: "<button class=\"btn btn-secondary btn-sm\"\n        ngbTooltip=\"Zoom to full extent\"\n        placement=\"right\"\n        (click)=\"zoomToBounds()\"\n><i class=\"fa fa-arrows-alt\"></i></button>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ZoomFullComponent);
    return ZoomFullComponent;
}());
export { ZoomFullComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9vbS1mdWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiYWN0aW9uLWJ1dHRvbnMvem9vbS1mdWxsL3pvb20tZnVsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWM5RTtJQUlFO0lBRUEsQ0FBQztJQUVELDJDQUFlLEdBQWY7SUFFQSxDQUFDO0lBRUQsd0NBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFiUTtRQUFSLEtBQUssRUFBRTswQ0FBSyxtQkFBbUI7a0RBQUM7SUFDeEI7UUFBUixLQUFLLEVBQUU7O3FEQUFlO0lBRlosaUJBQWlCO1FBUjdCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSx5TUFLWDtTQUFZLENBQUM7O09BQ0QsaUJBQWlCLENBZTdCO0lBQUQsd0JBQUM7Q0FBQSxBQWZELElBZUM7U0FmWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi4vLi4vZGF0YS9ib3VuZHMnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd6b29tLWZ1bGwnLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIlxuICAgICAgICBuZ2JUb29sdGlwPVwiWm9vbSB0byBmdWxsIGV4dGVudFwiXG4gICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICAgKGNsaWNrKT1cInpvb21Ub0JvdW5kcygpXCJcbj48aSBjbGFzcz1cImZhIGZhLWFycm93cy1hbHRcIj48L2k+PC9idXR0b24+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIFpvb21GdWxsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCAge1xuICBASW5wdXQoKSBtYXA6TGF5ZXJlZE1hcENvbXBvbmVudDtcbiAgQElucHV0KCkgYm91bmRzOkJvdW5kcztcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgem9vbVRvQm91bmRzKCl7XG4gICAgdGhpcy5tYXAuem9vbVRvQm91bmRzKE9iamVjdC5hc3NpZ24oe30sdGhpcy5ib3VuZHMpKTtcbiAgfVxufVxuIl19