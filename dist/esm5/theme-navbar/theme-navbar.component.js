import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Catalog } from "../data/catalog";
var ThemeNavbarComponent = /** @class */ (function () {
    function ThemeNavbarComponent() {
        this.layerSelected = new EventEmitter();
    }
    ThemeNavbarComponent.prototype.ngAfterViewInit = function () {
    };
    ThemeNavbarComponent.prototype.layerClick = function (event, layer, action) {
        this.stop(event);
        var selection = {
            layer: layer,
            action: action
        };
        this.layerSelected.emit(selection);
    };
    ThemeNavbarComponent.prototype.stop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Catalog)
    ], ThemeNavbarComponent.prototype, "catalog", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], ThemeNavbarComponent.prototype, "includeSearch", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], ThemeNavbarComponent.prototype, "layerSelected", void 0);
    ThemeNavbarComponent = tslib_1.__decorate([
        Component({
            selector: 'theme-navbar',
            template: "<ul class=\"navbar-nav\">\n  <li class=\"nav-item\" ngbDropdown *ngFor=\"let theme of catalog?.themes\">\n    <a class=\"nav-link\" ngbDropdownToggle href=\"#\"><i class=\"fa\" [ngClass]=\"theme.icon\"></i></a>\n    <div ngbDropdownMenu class=\"dropdown-menu\">\n      <a class=\"dropdown-item\" href=\"#\" (click)=\"layerClick($event,layer,'replace')\" *ngFor=\"let layer of theme.layers\">\n        <div>\n          <span>{{layer.name}}</span>\n          <span class=\"float-right layer-select-icons\">\n            <i class=\"fa fa-map layer-select-icon discrete-icon\"\n               (click)=\"layerClick($event,layer,'replace')\"\n               placement=\"right\"\n               ngbTooltip=\"Map this layer. (Replace any existing layers)\"></i>\n            <br/>\n            <i class=\"fa fa-plus layer-select-icon discrete-icon\"\n               (click)=\"layerClick($event,layer,'add')\"\n               placement=\"right\"\n               ngbTooltip=\"Add this layer to the map.\"></i>\n          </span>\n        </div>\n      </a>\n    </div>\n  </li>\n</ul>\n\n<!--\n\n[ng-reflect-ngb-tooltip].yellow + .tooltip {\n    background-color: yellow;\n}\n-->",
            styles: ["\n.layer-select-icons{\n  font-size:0.75em;\n  margin-right:-20px;\n}\n\n/* Annoying... using /deep/ to access the child component\n * but /deep/ (and synonyms) are deprecated. Not clear what\n * we should be doing\n */\n/deep/ .tooltip-inner {\n  width: 400px;\n}\n\n.dropdown-item{\n  border-bottom: 1px solid #aaa;\n  height: 40px;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], ThemeNavbarComponent);
    return ThemeNavbarComponent;
}());
export { ThemeNavbarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidGhlbWUtbmF2YmFyL3RoZW1lLW5hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDVCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sRUFBUyxNQUFNLGlCQUFpQixDQUFDO0FBdURqRDtJQU1FO1FBRlUsa0JBQWEsR0FBZ0MsSUFBSSxZQUFZLEVBQWtCLENBQUM7SUFJMUYsQ0FBQztJQUVELDhDQUFlLEdBQWY7SUFFQSxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLEtBQVMsRUFBQyxLQUFXLEVBQUMsTUFBa0I7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQixJQUFJLFNBQVMsR0FBRztZQUNkLEtBQUssRUFBQyxLQUFLO1lBQ1gsTUFBTSxFQUFDLE1BQU07U0FDZCxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxLQUFTO1FBQ1osS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBMUJRO1FBQVIsS0FBSyxFQUFFOzBDQUFTLE9BQU87eURBQUM7SUFDaEI7UUFBUixLQUFLLEVBQUU7OytEQUF1QjtJQUVyQjtRQUFULE1BQU0sRUFBRTswQ0FBZSxZQUFZOytEQUFzRDtJQUovRSxvQkFBb0I7UUFsRGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxtcENBNkJSO3FCQUFVLHFWQWtCYjtTQUFFLENBQUM7O09BQ1Msb0JBQW9CLENBNEJoQztJQUFELDJCQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0E1Qlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LFxuICAgICAgICAgQWZ0ZXJWaWV3SW5pdCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXRhbG9nLCBMYXllciB9IGZyb20gXCIuLi9kYXRhL2NhdGFsb2dcIjtcbmltcG9ydCB7IExheWVyU2VsZWN0aW9uLCBMYXllckFjdGlvbiB9IGZyb20gJy4uL2RhdGEvYWN0aW9ucyc7XG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aGVtZS1uYXZiYXInLFxuICB0ZW1wbGF0ZTogYDx1bCBjbGFzcz1cIm5hdmJhci1uYXZcIj5cbiAgPGxpIGNsYXNzPVwibmF2LWl0ZW1cIiBuZ2JEcm9wZG93biAqbmdGb3I9XCJsZXQgdGhlbWUgb2YgY2F0YWxvZz8udGhlbWVzXCI+XG4gICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIG5nYkRyb3Bkb3duVG9nZ2xlIGhyZWY9XCIjXCI+PGkgY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cInRoZW1lLmljb25cIj48L2k+PC9hPlxuICAgIDxkaXYgbmdiRHJvcGRvd25NZW51IGNsYXNzPVwiZHJvcGRvd24tbWVudVwiPlxuICAgICAgPGEgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCIgaHJlZj1cIiNcIiAoY2xpY2spPVwibGF5ZXJDbGljaygkZXZlbnQsbGF5ZXIsJ3JlcGxhY2UnKVwiICpuZ0Zvcj1cImxldCBsYXllciBvZiB0aGVtZS5sYXllcnNcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3Bhbj57e2xheWVyLm5hbWV9fTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImZsb2F0LXJpZ2h0IGxheWVyLXNlbGVjdC1pY29uc1wiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1tYXAgbGF5ZXItc2VsZWN0LWljb24gZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwibGF5ZXJDbGljaygkZXZlbnQsbGF5ZXIsJ3JlcGxhY2UnKVwiXG4gICAgICAgICAgICAgICBwbGFjZW1lbnQ9XCJyaWdodFwiXG4gICAgICAgICAgICAgICBuZ2JUb29sdGlwPVwiTWFwIHRoaXMgbGF5ZXIuIChSZXBsYWNlIGFueSBleGlzdGluZyBsYXllcnMpXCI+PC9pPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGx1cyBsYXllci1zZWxlY3QtaWNvbiBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIChjbGljayk9XCJsYXllckNsaWNrKCRldmVudCxsYXllciwnYWRkJylcIlxuICAgICAgICAgICAgICAgcGxhY2VtZW50PVwicmlnaHRcIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIkFkZCB0aGlzIGxheWVyIHRvIHRoZSBtYXAuXCI+PC9pPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2E+XG4gICAgPC9kaXY+XG4gIDwvbGk+XG48L3VsPlxuXG48IS0tXG5cbltuZy1yZWZsZWN0LW5nYi10b29sdGlwXS55ZWxsb3cgKyAudG9vbHRpcCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xufVxuLS0+YCxzdHlsZXM6IFtgXG4ubGF5ZXItc2VsZWN0LWljb25ze1xuICBmb250LXNpemU6MC43NWVtO1xuICBtYXJnaW4tcmlnaHQ6LTIwcHg7XG59XG5cbi8qIEFubm95aW5nLi4uIHVzaW5nIC9kZWVwLyB0byBhY2Nlc3MgdGhlIGNoaWxkIGNvbXBvbmVudFxuICogYnV0IC9kZWVwLyAoYW5kIHN5bm9ueW1zKSBhcmUgZGVwcmVjYXRlZC4gTm90IGNsZWFyIHdoYXRcbiAqIHdlIHNob3VsZCBiZSBkb2luZ1xuICovXG4vZGVlcC8gLnRvb2x0aXAtaW5uZXIge1xuICB3aWR0aDogNDAwcHg7XG59XG5cbi5kcm9wZG93bi1pdGVte1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2FhYTtcbiAgaGVpZ2h0OiA0MHB4O1xufVxuYF19KVxuZXhwb3J0IGNsYXNzIFRoZW1lTmF2YmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCAge1xuICBASW5wdXQoKSBjYXRhbG9nOkNhdGFsb2c7XG4gIEBJbnB1dCgpIGluY2x1ZGVTZWFyY2g6Ym9vbGVhbjtcblxuICBAT3V0cHV0KCkgbGF5ZXJTZWxlY3RlZDpFdmVudEVtaXR0ZXI8TGF5ZXJTZWxlY3Rpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXllclNlbGVjdGlvbj4oKTtcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgbGF5ZXJDbGljayhldmVudDphbnksbGF5ZXI6TGF5ZXIsYWN0aW9uOkxheWVyQWN0aW9uKXtcbiAgICB0aGlzLnN0b3AoZXZlbnQpO1xuICAgIHZhciBzZWxlY3Rpb24gPSB7XG4gICAgICBsYXllcjpsYXllcixcbiAgICAgIGFjdGlvbjphY3Rpb25cbiAgICB9O1xuXG4gICAgdGhpcy5sYXllclNlbGVjdGVkLmVtaXQoc2VsZWN0aW9uKTtcbiAgfVxuXG4gIHN0b3AoZXZlbnQ6YW55KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG59Il19