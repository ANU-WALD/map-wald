import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var CollapsibleMapControlComponent = /** @class */ (function () {
    function CollapsibleMapControlComponent() {
    }
    CollapsibleMapControlComponent.prototype.ngAfterViewInit = function () {
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], CollapsibleMapControlComponent.prototype, "isCollapsed", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CollapsibleMapControlComponent.prototype, "heading", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], CollapsibleMapControlComponent.prototype, "direction", void 0);
    CollapsibleMapControlComponent = tslib_1.__decorate([
        Component({
            selector: 'collapsible-map-control',
            template: "<div class=\"card map-control collapsible-control\">\n    <a (click)=\"isCollapsed = !isCollapsed\">\n      <div class=\"card-header\">\n        <h6 class=\"mb-0\">\n          {{heading}}\n          <span *ngIf=\"isCollapsed\" class=\"float-right fa fa-caret-up\n            collapse-arrow\" aria-hidden=\"true\"></span>\n          <span *ngIf=\"!isCollapsed\" class=\"float-right fa fa-caret-down\n            collapse-arrow\" aria-hidden=\"true\"></span>\n        </h6>\n      </div>\n    </a>\n\n    <div class=\"ngbCollapse\" [ngbCollapse]=\"isCollapsed\">\n      <ng-content></ng-content>\n    </div>\n  </div>\n",
            styles: [".collapsible-control{\n  margin:3px;\n}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CollapsibleMapControlComponent);
    return CollapsibleMapControlComponent;
}());
export { CollapsibleMapControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2libGUtbWFwLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjb2xsYXBzaWJsZS1tYXAtY29udHJvbC9jb2xsYXBzaWJsZS1tYXAtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQTJCdkY7SUFLRTtJQUVBLENBQUM7SUFFRCx3REFBZSxHQUFmO0lBRUEsQ0FBQztJQVZRO1FBQVIsS0FBSyxFQUFFOzt1RUFBc0I7SUFDckI7UUFBUixLQUFLLEVBQUU7O21FQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7cUVBQW1CO0lBSGhCLDhCQUE4QjtRQXRCMUMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxRQUFRLEVBQUUsMm1CQWlCWDtxQkFBVSx5Q0FFVDtTQUFFLENBQUM7O09BQ1EsOEJBQThCLENBWTFDO0lBQUQscUNBQUM7Q0FBQSxBQVpELElBWUM7U0FaWSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29sbGFwc2libGUtbWFwLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjYXJkIG1hcC1jb250cm9sIGNvbGxhcHNpYmxlLWNvbnRyb2xcIj5cbiAgICA8YSAoY2xpY2spPVwiaXNDb2xsYXBzZWQgPSAhaXNDb2xsYXBzZWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPlxuICAgICAgICA8aDYgY2xhc3M9XCJtYi0wXCI+XG4gICAgICAgICAge3toZWFkaW5nfX1cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzQ29sbGFwc2VkXCIgY2xhc3M9XCJmbG9hdC1yaWdodCBmYSBmYS1jYXJldC11cFxuICAgICAgICAgICAgY29sbGFwc2UtYXJyb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNDb2xsYXBzZWRcIiBjbGFzcz1cImZsb2F0LXJpZ2h0IGZhIGZhLWNhcmV0LWRvd25cbiAgICAgICAgICAgIGNvbGxhcHNlLWFycm93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgICAgICA8L2g2PlxuICAgICAgPC9kaXY+XG4gICAgPC9hPlxuXG4gICAgPGRpdiBjbGFzcz1cIm5nYkNvbGxhcHNlXCIgW25nYkNvbGxhcHNlXT1cImlzQ29sbGFwc2VkXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuYCxzdHlsZXM6IFtgLmNvbGxhcHNpYmxlLWNvbnRyb2x7XG4gIG1hcmdpbjozcHg7XG59YF19KVxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlTWFwQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQgIHtcbiAgQElucHV0KCkgaXNDb2xsYXBzZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGhlYWRpbmc6IHN0cmluZztcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG5cbiAgfVxufSJdfQ==