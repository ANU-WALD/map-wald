import * as tslib_1 from "tslib";
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
let MapControlComponent = class MapControlComponent {
    constructor(_el, _wrapper) {
        this._el = _el;
        this._wrapper = _wrapper;
        this.position = 'TOP_RIGHT';
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this._wrapper.getNativeMap().then((m) => {
            let content = this._el.nativeElement.querySelector('.map-control-content');
            // If content of the map control is not already wrapped in a div, do it
            // now.
            if (content.nodeName !== "DIV") {
                let controlDiv = document.createElement('div');
                controlDiv.appendChild(content);
                content = controlDiv;
            }
            m.controls[window.google.maps.ControlPosition[this.position]].push(content);
        });
    }
};
MapControlComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: GoogleMapsAPIWrapper }
];
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
        template: `<div #mapControl class="map-control-content">
  <ng-content></ng-content>
</div>
`,
        styles: [`.map-control-content{
  background: transparent;
}
`]
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef, GoogleMapsAPIWrapper])
], MapControlComponent);
export { MapControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJtYXAtY29udHJvbC9tYXAtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFZL0MsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFJOUIsWUFBb0IsR0FBYyxFQUFTLFFBQTZCO1FBQXBELFFBQUcsR0FBSCxHQUFHLENBQVc7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFxQjtRQUYvRCxhQUFRLEdBQVUsV0FBVyxDQUFDO0lBRXFDLENBQUM7SUFFN0UsUUFBUTtJQUNSLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRTtZQUNyQyxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFeEYsdUVBQXVFO1lBQ3ZFLE9BQU87WUFDUCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUM5QixJQUFJLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxHQUFHLFVBQVUsQ0FBQzthQUN0QjtZQUVLLENBQUUsQ0FBQyxRQUFRLENBQU8sTUFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRixDQUFBOztZQXJCeUIsVUFBVTtZQUFrQixvQkFBb0I7O0FBSGhDO0lBQXZDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLENBQUM7c0NBQWEsU0FBUzt1REFBQztBQUNyRDtJQUFSLEtBQUssRUFBRTs7cURBQStCO0FBRjVCLG1CQUFtQjtJQVYvQixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7OztDQUdYO2lCQUFVOzs7Q0FHVjtLQUNBLENBQUM7NkNBS3dCLFVBQVUsRUFBa0Isb0JBQW9CO0dBSjdELG1CQUFtQixDQXlCL0I7U0F6QlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R29vZ2xlTWFwc0FQSVdyYXBwZXJ9IGZyb20gJ0BhZ20vY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hcC1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICNtYXBDb250cm9sIGNsYXNzPVwibWFwLWNvbnRyb2wtY29udGVudFwiPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cbmAsc3R5bGVzOiBbYC5tYXAtY29udHJvbC1jb250ZW50e1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbmBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYXBDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCdtYXBDb250cm9sJyx7c3RhdGljOmZhbHNlfSkgbWFwQ29udHJvbDogQ29tcG9uZW50O1xuICBASW5wdXQoKSBwb3NpdGlvbjpzdHJpbmcgPSAnVE9QX1JJR0hUJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDpFbGVtZW50UmVmLCBwdWJsaWMgX3dyYXBwZXI6R29vZ2xlTWFwc0FQSVdyYXBwZXIpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKChtKT0+e1xuICAgICAgbGV0IGNvbnRlbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWFwLWNvbnRyb2wtY29udGVudCcpO1xuXG4gICAgICAvLyBJZiBjb250ZW50IG9mIHRoZSBtYXAgY29udHJvbCBpcyBub3QgYWxyZWFkeSB3cmFwcGVkIGluIGEgZGl2LCBkbyBpdFxuICAgICAgLy8gbm93LlxuICAgICAgaWYgKGNvbnRlbnQubm9kZU5hbWUgIT09IFwiRElWXCIpIHtcbiAgICAgICAgbGV0IGNvbnRyb2xEaXY6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xEaXYuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICAgIGNvbnRlbnQgPSBjb250cm9sRGl2O1xuICAgICAgfVxuXG4gICAgICAoPGFueT5tKS5jb250cm9sc1soPGFueT53aW5kb3cpLmdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvblt0aGlzLnBvc2l0aW9uXV0ucHVzaChjb250ZW50KTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=