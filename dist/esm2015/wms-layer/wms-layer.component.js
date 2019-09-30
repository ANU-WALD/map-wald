import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { WMSService } from '../wms.service';
let WMSLayerComponent = class WMSLayerComponent {
    constructor(_wmsService, _wrapper) {
        this._wmsService = _wmsService;
        this._wrapper = _wrapper;
        this.opacity = 1.0;
        this.position = 0;
        this.zoom = 4;
        this.building = false;
    }
    buildMap() {
        if (this.building)
            return;
        this.building = true;
        this._wrapper.getNativeMap().then((theMap) => {
            this.building = false;
            this.map = theMap;
            this.overlay = this._wmsService.buildImageMap(() => this.map, (z) => this.url + '?', (z) => this.params, () => this.opacity);
            if (this.map.overlayMapTypes.length > this.position) {
                this.map.overlayMapTypes.removeAt(this.position);
                this.map.overlayMapTypes.insertAt(this.position, this.overlay);
            }
            else {
                while (this.map.overlayMapTypes.length <= this.position) {
                    // Temporarily add replicate layers.
                    // These should be replaced by other wms-layer components
                    this.map.overlayMapTypes.push(this.overlay);
                }
            }
        }).catch((e) => console.log(e));
    }
    ngOnInit() {
        if (this.url) {
            this.buildMap();
        }
    }
    ngOnChanges(changes) {
        if (this.url) {
            this.buildMap();
        }
        // let currentOpacity: number = changes.opacity.currentValue;
        // let previousOpacity: number = changes.opacity.previousValue;
        // if (currentOpacity !== previousOpacity) {
        //   console.log('building a map off my own bat');
        //   this.buildMap();
        // }
    }
    ngOnDestroy() {
        this._wrapper.getNativeMap().then((theMap) => {
            if (this.map.overlayMapTypes.length > this.position) {
                this.map.overlayMapTypes.removeAt(this.position);
            }
        });
    }
};
WMSLayerComponent.ctorParameters = () => [
    { type: WMSService },
    { type: GoogleMapsAPIWrapper }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], WMSLayerComponent.prototype, "url", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], WMSLayerComponent.prototype, "params", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], WMSLayerComponent.prototype, "opacity", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], WMSLayerComponent.prototype, "position", void 0);
WMSLayerComponent = tslib_1.__decorate([
    Component({
        selector: 'wms-layer',
        template: ''
    }),
    tslib_1.__metadata("design:paramtypes", [WMSService,
        GoogleMapsAPIWrapper])
], WMSLayerComponent);
export { WMSLayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsid21zLWxheWVyL3dtcy1sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLEtBQUssRUFDRixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTTFDLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBTTVCLFlBQW9CLFdBQXNCLEVBQ3ZCLFFBQTZCO1FBRDVCLGdCQUFXLEdBQVgsV0FBVyxDQUFXO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBSnZDLFlBQU8sR0FBUSxHQUFHLENBQUM7UUFDbkIsYUFBUSxHQUFRLENBQUMsQ0FBQztRQU0zQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRVQsYUFBUSxHQUFTLEtBQUssQ0FBQztJQUxvQixDQUFDO0lBTXBELFFBQVE7UUFDTixJQUFHLElBQUksQ0FBQyxRQUFRO1lBQ2QsT0FBTztRQUNULElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO1FBRW5CLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBQyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDekMsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLEdBQUcsRUFDWixDQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsSUFBSSxDQUFDLEdBQUcsR0FBQyxHQUFHLEVBQ2pCLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxJQUFJLENBQUMsTUFBTSxFQUNoQixHQUFFLEVBQUUsQ0FBQSxJQUFJLENBQUMsT0FBTyxDQUNqQixDQUFDO1lBRUosSUFBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztnQkFDL0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9EO2lCQUFNO2dCQUNMLE9BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxRQUFRLEVBQUM7b0JBQ25ELG9DQUFvQztvQkFDcEMseURBQXlEO29CQUN6RCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUM7WUFDVixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQztZQUNWLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtRQUNELDZEQUE2RDtRQUM3RCwrREFBK0Q7UUFFL0QsNENBQTRDO1FBQzVDLGtEQUFrRDtRQUNsRCxxQkFBcUI7UUFDckIsSUFBSTtJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRTtZQUMxQyxJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDO2dCQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTs7WUE3RGlDLFVBQVU7WUFDZCxvQkFBb0I7O0FBTnZDO0lBQVIsS0FBSyxFQUFFOzs4Q0FBYTtBQUNaO0lBQVIsS0FBSyxFQUFFOztpREFBWTtBQUNYO0lBQVIsS0FBSyxFQUFFOztrREFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7O21EQUFtQjtBQUpoQixpQkFBaUI7SUFKN0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFDLEVBQUU7S0FDWixDQUFDOzZDQU9nQyxVQUFVO1FBQ2Qsb0JBQW9CO0dBUHJDLGlCQUFpQixDQW1FN0I7U0FuRVksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQsIElucHV0LFxuICAgICAgICAgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7R29vZ2xlTWFwc0FQSVdyYXBwZXJ9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQge1dNU1NlcnZpY2V9IGZyb20gJy4uL3dtcy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd21zLWxheWVyJyxcbiAgdGVtcGxhdGU6JycsXG59KVxuZXhwb3J0IGNsYXNzIFdNU0xheWVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3l7XG4gIEBJbnB1dCgpIHVybDogc3RyaW5nO1xuICBASW5wdXQoKSBwYXJhbXM6YW55O1xuICBASW5wdXQoKSBvcGFjaXR5Om51bWJlcj0xLjA7XG4gIEBJbnB1dCgpIHBvc2l0aW9uOm51bWJlcj0wO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3dtc1NlcnZpY2U6V01TU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIF93cmFwcGVyOkdvb2dsZU1hcHNBUElXcmFwcGVyKSB7fVxuICBtYXA6IGFueTtcbiAgb3ZlcmxheTphbnk7XG4gIHpvb206IG51bWJlciA9IDQ7XG5cbiAgcHJpdmF0ZSBidWlsZGluZzpib29sZWFuPWZhbHNlO1xuICBidWlsZE1hcCgpe1xuICAgIGlmKHRoaXMuYnVpbGRpbmcpXG4gICAgICByZXR1cm47XG4gICAgdGhpcy5idWlsZGluZz10cnVlO1xuXG4gICAgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKCh0aGVNYXApPT57XG4gICAgICB0aGlzLmJ1aWxkaW5nPWZhbHNlO1xuICAgICAgdGhpcy5tYXAgPSB0aGVNYXA7XG4gICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLl93bXNTZXJ2aWNlLmJ1aWxkSW1hZ2VNYXAoXG4gICAgICAgICAgKCk9PnRoaXMubWFwLFxuICAgICAgICAgICh6KT0+dGhpcy51cmwrJz8nLFxuICAgICAgICAgICh6KT0+dGhpcy5wYXJhbXMsXG4gICAgICAgICAgKCk9PnRoaXMub3BhY2l0eVxuICAgICAgICApO1xuXG4gICAgICBpZih0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMubGVuZ3RoPnRoaXMucG9zaXRpb24pe1xuICAgICAgICB0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMucmVtb3ZlQXQodGhpcy5wb3NpdGlvbik7XG4gICAgICAgIHRoaXMubWFwLm92ZXJsYXlNYXBUeXBlcy5pbnNlcnRBdCh0aGlzLnBvc2l0aW9uLHRoaXMub3ZlcmxheSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSh0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMubGVuZ3RoPD10aGlzLnBvc2l0aW9uKXtcbiAgICAgICAgICAvLyBUZW1wb3JhcmlseSBhZGQgcmVwbGljYXRlIGxheWVycy5cbiAgICAgICAgICAvLyBUaGVzZcKgc2hvdWxkIGJlIHJlcGxhY2VkIGJ5IG90aGVyIHdtcy1sYXllciBjb21wb25lbnRzXG4gICAgICAgICAgdGhpcy5tYXAub3ZlcmxheU1hcFR5cGVzLnB1c2godGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pLmNhdGNoKChlKT0+Y29uc29sZS5sb2coZSkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYodGhpcy51cmwpe1xuICAgICAgdGhpcy5idWlsZE1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZih0aGlzLnVybCl7XG4gICAgICB0aGlzLmJ1aWxkTWFwKCk7XG4gICAgfVxuICAgIC8vIGxldCBjdXJyZW50T3BhY2l0eTogbnVtYmVyID0gY2hhbmdlcy5vcGFjaXR5LmN1cnJlbnRWYWx1ZTtcbiAgICAvLyBsZXQgcHJldmlvdXNPcGFjaXR5OiBudW1iZXIgPSBjaGFuZ2VzLm9wYWNpdHkucHJldmlvdXNWYWx1ZTtcblxuICAgIC8vIGlmIChjdXJyZW50T3BhY2l0eSAhPT0gcHJldmlvdXNPcGFjaXR5KSB7XG4gICAgLy8gICBjb25zb2xlLmxvZygnYnVpbGRpbmcgYSBtYXAgb2ZmIG15IG93biBiYXQnKTtcbiAgICAvLyAgIHRoaXMuYnVpbGRNYXAoKTtcbiAgICAvLyB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oKHRoZU1hcCk9PntcbiAgICAgIGlmKHRoaXMubWFwLm92ZXJsYXlNYXBUeXBlcy5sZW5ndGg+dGhpcy5wb3NpdGlvbil7XG4gICAgICAgIHRoaXMubWFwLm92ZXJsYXlNYXBUeXBlcy5yZW1vdmVBdCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19