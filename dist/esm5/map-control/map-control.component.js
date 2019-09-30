import * as tslib_1 from "tslib";
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
var MapControlComponent = /** @class */ (function () {
    function MapControlComponent(_el, _wrapper) {
        this._el = _el;
        this._wrapper = _wrapper;
        this.position = 'TOP_RIGHT';
    }
    MapControlComponent.prototype.ngOnInit = function () {
    };
    MapControlComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._wrapper.getNativeMap().then(function (m) {
            var content = _this._el.nativeElement.querySelector('.map-control-content');
            // If content of the map control is not already wrapped in a div, do it
            // now.
            if (content.nodeName !== "DIV") {
                var controlDiv = document.createElement('div');
                controlDiv.appendChild(content);
                content = controlDiv;
            }
            m.controls[window.google.maps.ControlPosition[_this.position]].push(content);
        });
    };
    MapControlComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: GoogleMapsAPIWrapper }
    ]; };
    tslib_1.__decorate([
        ViewChild('mapControl', { static: false }),
        tslib_1.__metadata("design:type", Component)
    ], MapControlComponent.prototype, "mapControl", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapControlComponent.prototype, "position", void 0);
    MapControlComponent = tslib_1.__decorate([
        Component({
            selector: 'map-control',
            template: "<div #mapControl class=\"map-control-content\">\n  <ng-content></ng-content>\n</div>\n",
            styles: [".map-control-content{\n  background: transparent;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef, GoogleMapsAPIWrapper])
    ], MapControlComponent);
    return MapControlComponent;
}());
export { MapControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJtYXAtY29udHJvbC9tYXAtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFZL0M7SUFJRSw2QkFBb0IsR0FBYyxFQUFTLFFBQTZCO1FBQXBELFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUYvRCxhQUFRLEdBQVUsV0FBVyxDQUFDO0lBRXFDLENBQUM7SUFFN0Usc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQWdCLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRXhGLHVFQUF1RTtZQUN2RSxPQUFPO1lBQ1AsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDOUIsSUFBSSxVQUFVLEdBQWdCLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVELFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sR0FBRyxVQUFVLENBQUM7YUFDdEI7WUFFSyxDQUFFLENBQUMsUUFBUSxDQUFPLE1BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkFuQnVCLFVBQVU7Z0JBQWtCLG9CQUFvQjs7SUFIaEM7UUFBdkMsU0FBUyxDQUFDLFlBQVksRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQzswQ0FBYSxTQUFTOzJEQUFDO0lBQ3JEO1FBQVIsS0FBSyxFQUFFOzt5REFBK0I7SUFGNUIsbUJBQW1CO1FBVi9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSx3RkFHWDtxQkFBVSx3REFHVjtTQUNBLENBQUM7aURBS3dCLFVBQVUsRUFBa0Isb0JBQW9CO09BSjdELG1CQUFtQixDQXlCL0I7SUFBRCwwQkFBQztDQUFBLEFBekJELElBeUJDO1NBekJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dvb2dsZU1hcHNBUElXcmFwcGVyfSBmcm9tICdAYWdtL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXAtY29udHJvbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiAjbWFwQ29udHJvbCBjbGFzcz1cIm1hcC1jb250cm9sLWNvbnRlbnRcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuPC9kaXY+XG5gLHN0eWxlczogW2AubWFwLWNvbnRyb2wtY29udGVudHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5gXSxcbn0pXG5leHBvcnQgY2xhc3MgTWFwQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnbWFwQ29udHJvbCcse3N0YXRpYzpmYWxzZX0pIG1hcENvbnRyb2w6IENvbXBvbmVudDtcbiAgQElucHV0KCkgcG9zaXRpb246c3RyaW5nID0gJ1RPUF9SSUdIVCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6RWxlbWVudFJlZiwgcHVibGljIF93cmFwcGVyOkdvb2dsZU1hcHNBUElXcmFwcGVyKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuICAgIHRoaXMuX3dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigobSk9PntcbiAgICAgIGxldCBjb250ZW50OiBIVE1MRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1hcC1jb250cm9sLWNvbnRlbnQnKTtcblxuICAgICAgLy8gSWYgY29udGVudCBvZiB0aGUgbWFwIGNvbnRyb2wgaXMgbm90IGFscmVhZHkgd3JhcHBlZCBpbiBhIGRpdiwgZG8gaXRcbiAgICAgIC8vIG5vdy5cbiAgICAgIGlmIChjb250ZW50Lm5vZGVOYW1lICE9PSBcIkRJVlwiKSB7XG4gICAgICAgIGxldCBjb250cm9sRGl2OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250cm9sRGl2LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICBjb250ZW50ID0gY29udHJvbERpdjtcbiAgICAgIH1cblxuICAgICAgKDxhbnk+bSkuY29udHJvbHNbKDxhbnk+d2luZG93KS5nb29nbGUubWFwcy5Db250cm9sUG9zaXRpb25bdGhpcy5wb3NpdGlvbl1dLnB1c2goY29udGVudCk7XG4gICAgfSk7XG4gIH1cblxufVxuIl19