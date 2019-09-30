import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LayeredMapComponent } from '../../layered-map/layered-map.component';
let CycleOpacityComponent = class CycleOpacityComponent {
    constructor() {
        this.maxZoom = 32;
        this.tooltip = 'Adjust transparency of grid layer';
        this.layerOpacity = 1.0;
        this.step = 0.4;
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if (this.map) {
            this.map.layersChange.subscribe(() => this.updateLayers());
        }
    }
    cycleTransparency() {
        this.layerOpacity -= this.step;
        if (this.layerOpacity < 0) {
            this.layerOpacity = 1.0;
        }
        this.updateLayers();
    }
    updateLayers() {
        this.map.layers.forEach(l => l.opacity = this.layerOpacity);
    }
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
        template: `<button class="btn btn-secondary btn-sm"
                     (click)="cycleTransparency()"
                     [ngbTooltip]="tooltip"
                     placement="right">
<i class="fa" [ngClass]="(layerOpacity<0.5)?'fa-circle-o':((layerOpacity<0.9)?'fa-adjust':'fa-circle')"></i>
</button>`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CycleOpacityComponent);
export { CycleOpacityComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3ljbGUtb3BhY2l0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImFjdGlvbi1idXR0b25zL2N5Y2xlLW9wYWNpdHkvY3ljbGUtb3BhY2l0eS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWE5RSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQU9oQztRQUxTLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixZQUFPLEdBQUcsbUNBQW1DLENBQUM7UUFDOUMsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFDbkIsU0FBSSxHQUFHLEdBQUcsQ0FBQztJQUlwQixDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBRyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUUsRUFBRSxDQUFBLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFHLElBQUksQ0FBQyxZQUFZLEdBQUMsQ0FBQyxFQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBL0JVO0lBQVIsS0FBSyxFQUFFO3NDQUFLLG1CQUFtQjtrREFBQztBQUN4QjtJQUFSLEtBQUssRUFBRTs7c0RBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7c0RBQStDO0FBQzlDO0lBQVIsS0FBSyxFQUFFOzsyREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O21EQUFZO0FBTFQscUJBQXFCO0lBUmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFFBQVEsRUFBRTs7Ozs7VUFLRjtLQUFZLENBQUM7O0dBQ1YscUJBQXFCLENBZ0NqQztTQWhDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJlZE1hcENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2xheWVyZWQtbWFwL2xheWVyZWQtbWFwLmNvbXBvbmVudCc7XG5cblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N5Y2xlLW9wYWNpdHknLFxuICB0ZW1wbGF0ZTogYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIlxuICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImN5Y2xlVHJhbnNwYXJlbmN5KClcIlxuICAgICAgICAgICAgICAgICAgICAgW25nYlRvb2x0aXBdPVwidG9vbHRpcFwiXG4gICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ9XCJyaWdodFwiPlxuPGkgY2xhc3M9XCJmYVwiIFtuZ0NsYXNzXT1cIihsYXllck9wYWNpdHk8MC41KT8nZmEtY2lyY2xlLW8nOigobGF5ZXJPcGFjaXR5PDAuOSk/J2ZhLWFkanVzdCc6J2ZhLWNpcmNsZScpXCI+PC9pPlxuPC9idXR0b24+YCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBDeWNsZU9wYWNpdHlDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMgIHtcbiAgQElucHV0KCkgbWFwOkxheWVyZWRNYXBDb21wb25lbnQ7XG4gIEBJbnB1dCgpIG1heFpvb20gPSAzMjtcbiAgQElucHV0KCkgdG9vbHRpcCA9ICdBZGp1c3QgdHJhbnNwYXJlbmN5IG9mIGdyaWQgbGF5ZXInO1xuICBASW5wdXQoKSBsYXllck9wYWNpdHkgPSAxLjA7XG4gIEBJbnB1dCgpIHN0ZXAgPSAwLjQ7XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZih0aGlzLm1hcCl7XG4gICAgICB0aGlzLm1hcC5sYXllcnNDaGFuZ2Uuc3Vic2NyaWJlKCgpPT50aGlzLnVwZGF0ZUxheWVycygpKTtcbiAgICB9XG4gIH1cblxuICBjeWNsZVRyYW5zcGFyZW5jeSgpe1xuICAgIHRoaXMubGF5ZXJPcGFjaXR5IC09IHRoaXMuc3RlcDtcbiAgICBpZih0aGlzLmxheWVyT3BhY2l0eTwwKXtcbiAgICAgIHRoaXMubGF5ZXJPcGFjaXR5ID0gMS4wO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZUxheWVycygpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVMYXllcnMoKSB7XG4gICAgdGhpcy5tYXAubGF5ZXJzLmZvckVhY2gobCA9PiBsLm9wYWNpdHkgPSB0aGlzLmxheWVyT3BhY2l0eSk7XG4gIH1cbn1cbiJdfQ==