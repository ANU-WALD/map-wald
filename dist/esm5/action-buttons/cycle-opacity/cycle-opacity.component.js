import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
var CycleOpacityComponent = /** @class */ (function () {
    function CycleOpacityComponent() {
        this.maxZoom = 32;
        this.tooltip = 'Adjust transparency of grid layer';
        this.layerOpacity = 1.0;
        this.step = 0.4;
    }
    CycleOpacityComponent.prototype.ngAfterViewInit = function () {
    };
    CycleOpacityComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.map) {
            this.map.layersChange.subscribe(function () { return _this.updateLayers(); });
        }
    };
    CycleOpacityComponent.prototype.cycleTransparency = function () {
        this.layerOpacity -= this.step;
        if (this.layerOpacity < 0) {
            this.layerOpacity = 1.0;
        }
        this.updateLayers();
    };
    CycleOpacityComponent.prototype.updateLayers = function () {
        var _this = this;
        this.map.layers.forEach(function (l) { return l.opacity = _this.layerOpacity; });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", LayeredMapComponent)
    ], CycleOpacityComponent.prototype, "map", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleOpacityComponent.prototype, "maxZoom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleOpacityComponent.prototype, "tooltip", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleOpacityComponent.prototype, "layerOpacity", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], CycleOpacityComponent.prototype, "step", void 0);
    CycleOpacityComponent = tslib_1.__decorate([
        Component({
            selector: 'cycle-opacity',
            template: "<button class=\"btn btn-secondary btn-sm\"\n                     (click)=\"cycleTransparency()\"\n                     [ngbTooltip]=\"tooltip\"\n                     placement=\"right\">\n<i class=\"fa\" [ngClass]=\"(layerOpacity<0.5)?'fa-circle-o':((layerOpacity<0.9)?'fa-adjust':'fa-circle')\"></i>\n</button>"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], CycleOpacityComponent);
    return CycleOpacityComponent;
}());
export { CycleOpacityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtb3BhY2l0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImFjdGlvbi1idXR0b25zL2N5Y2xlLW9wYWNpdHkvY3ljbGUtb3BhY2l0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWE5RTtJQU9FO1FBTFMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLFlBQU8sR0FBRyxtQ0FBbUMsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLEdBQUcsQ0FBQztRQUNuQixTQUFJLEdBQUcsR0FBRyxDQUFDO0lBSXBCLENBQUM7SUFFRCwrQ0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUFsQyxpQkFJQztRQUhDLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUcsSUFBSSxDQUFDLFlBQVksR0FBQyxDQUFDLEVBQUM7WUFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLDRDQUFZLEdBQXBCO1FBQUEsaUJBRUM7UUFEQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQTdCLENBQTZCLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBOUJRO1FBQVIsS0FBSyxFQUFFOzBDQUFLLG1CQUFtQjtzREFBQztJQUN4QjtRQUFSLEtBQUssRUFBRTs7MERBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7MERBQStDO0lBQzlDO1FBQVIsS0FBSyxFQUFFOzsrREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3VEQUFZO0lBTFQscUJBQXFCO1FBUmpDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSx5VEFLRjtTQUFZLENBQUM7O09BQ1YscUJBQXFCLENBZ0NqQztJQUFELDRCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7U0FoQ1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi8uLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeWNsZS1vcGFjaXR5JyxcbiAgdGVtcGxhdGU6IGA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCJcbiAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjeWNsZVRyYW5zcGFyZW5jeSgpXCJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ2JUb29sdGlwXT1cInRvb2x0aXBcIlxuICAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PVwicmlnaHRcIj5cbjxpIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCIobGF5ZXJPcGFjaXR5PDAuNSk/J2ZhLWNpcmNsZS1vJzooKGxheWVyT3BhY2l0eTwwLjkpPydmYS1hZGp1c3QnOidmYS1jaXJjbGUnKVwiPjwvaT5cbjwvYnV0dG9uPmAsc3R5bGVzOiBbXX0pXG5leHBvcnQgY2xhc3MgQ3ljbGVPcGFjaXR5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XG4gIEBJbnB1dCgpIG1hcDpMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBtYXhab29tID0gMzI7XG4gIEBJbnB1dCgpIHRvb2x0aXAgPSAnQWRqdXN0IHRyYW5zcGFyZW5jeSBvZiBncmlkIGxheWVyJztcbiAgQElucHV0KCkgbGF5ZXJPcGFjaXR5ID0gMS4wO1xuICBASW5wdXQoKSBzdGVwID0gMC40O1xuXG4gIGNvbnN0cnVjdG9yKCl7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYodGhpcy5tYXApe1xuICAgICAgdGhpcy5tYXAubGF5ZXJzQ2hhbmdlLnN1YnNjcmliZSgoKT0+dGhpcy51cGRhdGVMYXllcnMoKSk7XG4gICAgfVxuICB9XG5cbiAgY3ljbGVUcmFuc3BhcmVuY3koKXtcbiAgICB0aGlzLmxheWVyT3BhY2l0eSAtPSB0aGlzLnN0ZXA7XG4gICAgaWYodGhpcy5sYXllck9wYWNpdHk8MCl7XG4gICAgICB0aGlzLmxheWVyT3BhY2l0eSA9IDEuMDtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVMYXllcnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTGF5ZXJzKCkge1xuICAgIHRoaXMubWFwLmxheWVycy5mb3JFYWNoKGwgPT4gbC5vcGFjaXR5ID0gdGhpcy5sYXllck9wYWNpdHkpO1xuICB9XG59XG4iXX0=