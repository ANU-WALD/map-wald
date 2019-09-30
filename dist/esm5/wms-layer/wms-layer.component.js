import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { WMSService } from '../wms.service';
var WMSLayerComponent = /** @class */ (function () {
    function WMSLayerComponent(_wmsService, _wrapper) {
        this._wmsService = _wmsService;
        this._wrapper = _wrapper;
        this.opacity = 1.0;
        this.position = 0;
        this.zoom = 4;
        this.building = false;
    }
    WMSLayerComponent.prototype.buildMap = function () {
        var _this = this;
        if (this.building)
            return;
        this.building = true;
        this._wrapper.getNativeMap().then(function (theMap) {
            _this.building = false;
            _this.map = theMap;
            _this.overlay = _this._wmsService.buildImageMap(function () { return _this.map; }, function (z) { return _this.url + '?'; }, function (z) { return _this.params; }, function () { return _this.opacity; });
            if (_this.map.overlayMapTypes.length > _this.position) {
                _this.map.overlayMapTypes.removeAt(_this.position);
                _this.map.overlayMapTypes.insertAt(_this.position, _this.overlay);
            }
            else {
                while (_this.map.overlayMapTypes.length <= _this.position) {
                    // Temporarily add replicate layers.
                    // These should be replaced by other wms-layer components
                    _this.map.overlayMapTypes.push(_this.overlay);
                }
            }
        }).catch(function (e) { return console.log(e); });
    };
    WMSLayerComponent.prototype.ngOnInit = function () {
        if (this.url) {
            this.buildMap();
        }
    };
    WMSLayerComponent.prototype.ngOnChanges = function (changes) {
        if (this.url) {
            this.buildMap();
        }
        // let currentOpacity: number = changes.opacity.currentValue;
        // let previousOpacity: number = changes.opacity.previousValue;
        // if (currentOpacity !== previousOpacity) {
        //   console.log('building a map off my own bat');
        //   this.buildMap();
        // }
    };
    WMSLayerComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this._wrapper.getNativeMap().then(function (theMap) {
            if (_this.map.overlayMapTypes.length > _this.position) {
                _this.map.overlayMapTypes.removeAt(_this.position);
            }
        });
    };
    WMSLayerComponent.ctorParameters = function () { return [
        { type: WMSService },
        { type: GoogleMapsAPIWrapper }
    ]; };
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
    return WMSLayerComponent;
}());
export { WMSLayerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid21zLWxheWVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsid21zLWxheWVyL3dtcy1sYXllci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLEtBQUssRUFDRixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBTTFDO0lBTUUsMkJBQW9CLFdBQXNCLEVBQ3ZCLFFBQTZCO1FBRDVCLGdCQUFXLEdBQVgsV0FBVyxDQUFXO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQXFCO1FBSnZDLFlBQU8sR0FBUSxHQUFHLENBQUM7UUFDbkIsYUFBUSxHQUFRLENBQUMsQ0FBQztRQU0zQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRVQsYUFBUSxHQUFTLEtBQUssQ0FBQztJQUxvQixDQUFDO0lBTXBELG9DQUFRLEdBQVI7UUFBQSxpQkEwQkM7UUF6QkMsSUFBRyxJQUFJLENBQUMsUUFBUTtZQUNkLE9BQU87UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQztRQUVuQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBQyxLQUFLLENBQUM7WUFDcEIsS0FBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDbEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDekMsY0FBSSxPQUFBLEtBQUksQ0FBQyxHQUFHLEVBQVIsQ0FBUSxFQUNaLFVBQUMsQ0FBQyxJQUFHLE9BQUEsS0FBSSxDQUFDLEdBQUcsR0FBQyxHQUFHLEVBQVosQ0FBWSxFQUNqQixVQUFDLENBQUMsSUFBRyxPQUFBLEtBQUksQ0FBQyxNQUFNLEVBQVgsQ0FBVyxFQUNoQixjQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sRUFBWixDQUFZLENBQ2pCLENBQUM7WUFFSixJQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBQyxLQUFJLENBQUMsUUFBUSxFQUFDO2dCQUMvQyxLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0Q7aUJBQU07Z0JBQ0wsT0FBTSxLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUUsS0FBSSxDQUFDLFFBQVEsRUFBQztvQkFDbkQsb0NBQW9DO29CQUNwQyx5REFBeUQ7b0JBQ3pELEtBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDLElBQUcsT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0UsSUFBRyxJQUFJLENBQUMsR0FBRyxFQUFDO1lBQ1YsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFHLElBQUksQ0FBQyxHQUFHLEVBQUM7WUFDVixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFDRCw2REFBNkQ7UUFDN0QsK0RBQStEO1FBRS9ELDRDQUE0QztRQUM1QyxrREFBa0Q7UUFDbEQscUJBQXFCO1FBQ3JCLElBQUk7SUFDTixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ3ZDLElBQUcsS0FBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUM7Z0JBQy9DLEtBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTVEK0IsVUFBVTtnQkFDZCxvQkFBb0I7O0lBTnZDO1FBQVIsS0FBSyxFQUFFOztrREFBYTtJQUNaO1FBQVIsS0FBSyxFQUFFOztxREFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFOztzREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3VEQUFtQjtJQUpoQixpQkFBaUI7UUFKN0IsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFDLEVBQUU7U0FDWixDQUFDO2lEQU9nQyxVQUFVO1lBQ2Qsb0JBQW9CO09BUHJDLGlCQUFpQixDQW1FN0I7SUFBRCx3QkFBQztDQUFBLEFBbkVELElBbUVDO1NBbkVZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCxcbiAgICAgICAgIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0dvb2dsZU1hcHNBUElXcmFwcGVyfSBmcm9tICdAYWdtL2NvcmUnO1xuaW1wb3J0IHtXTVNTZXJ2aWNlfSBmcm9tICcuLi93bXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dtcy1sYXllcicsXG4gIHRlbXBsYXRlOicnLFxufSlcbmV4cG9ydCBjbGFzcyBXTVNMYXllckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95e1xuICBASW5wdXQoKSB1cmw6IHN0cmluZztcbiAgQElucHV0KCkgcGFyYW1zOmFueTtcbiAgQElucHV0KCkgb3BhY2l0eTpudW1iZXI9MS4wO1xuICBASW5wdXQoKSBwb3NpdGlvbjpudW1iZXI9MDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93bXNTZXJ2aWNlOldNU1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyBfd3JhcHBlcjpHb29nbGVNYXBzQVBJV3JhcHBlcikge31cbiAgbWFwOiBhbnk7XG4gIG92ZXJsYXk6YW55O1xuICB6b29tOiBudW1iZXIgPSA0O1xuXG4gIHByaXZhdGUgYnVpbGRpbmc6Ym9vbGVhbj1mYWxzZTtcbiAgYnVpbGRNYXAoKXtcbiAgICBpZih0aGlzLmJ1aWxkaW5nKVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMuYnVpbGRpbmc9dHJ1ZTtcblxuICAgIHRoaXMuX3dyYXBwZXIuZ2V0TmF0aXZlTWFwKCkudGhlbigodGhlTWFwKT0+e1xuICAgICAgdGhpcy5idWlsZGluZz1mYWxzZTtcbiAgICAgIHRoaXMubWFwID0gdGhlTWFwO1xuICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5fd21zU2VydmljZS5idWlsZEltYWdlTWFwKFxuICAgICAgICAgICgpPT50aGlzLm1hcCxcbiAgICAgICAgICAoeik9PnRoaXMudXJsKyc/JyxcbiAgICAgICAgICAoeik9PnRoaXMucGFyYW1zLFxuICAgICAgICAgICgpPT50aGlzLm9wYWNpdHlcbiAgICAgICAgKTtcblxuICAgICAgaWYodGhpcy5tYXAub3ZlcmxheU1hcFR5cGVzLmxlbmd0aD50aGlzLnBvc2l0aW9uKXtcbiAgICAgICAgdGhpcy5tYXAub3ZlcmxheU1hcFR5cGVzLnJlbW92ZUF0KHRoaXMucG9zaXRpb24pO1xuICAgICAgICB0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMuaW5zZXJ0QXQodGhpcy5wb3NpdGlvbix0aGlzLm92ZXJsYXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUodGhpcy5tYXAub3ZlcmxheU1hcFR5cGVzLmxlbmd0aDw9dGhpcy5wb3NpdGlvbil7XG4gICAgICAgICAgLy8gVGVtcG9yYXJpbHkgYWRkIHJlcGxpY2F0ZSBsYXllcnMuXG4gICAgICAgICAgLy8gVGhlc2XCoHNob3VsZCBiZSByZXBsYWNlZCBieSBvdGhlciB3bXMtbGF5ZXIgY29tcG9uZW50c1xuICAgICAgICAgIHRoaXMubWFwLm92ZXJsYXlNYXBUeXBlcy5wdXNoKHRoaXMub3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZSk9PmNvbnNvbGUubG9nKGUpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmKHRoaXMudXJsKXtcbiAgICAgIHRoaXMuYnVpbGRNYXAoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYodGhpcy51cmwpe1xuICAgICAgdGhpcy5idWlsZE1hcCgpO1xuICAgIH1cbiAgICAvLyBsZXQgY3VycmVudE9wYWNpdHk6IG51bWJlciA9IGNoYW5nZXMub3BhY2l0eS5jdXJyZW50VmFsdWU7XG4gICAgLy8gbGV0IHByZXZpb3VzT3BhY2l0eTogbnVtYmVyID0gY2hhbmdlcy5vcGFjaXR5LnByZXZpb3VzVmFsdWU7XG5cbiAgICAvLyBpZiAoY3VycmVudE9wYWNpdHkgIT09IHByZXZpb3VzT3BhY2l0eSkge1xuICAgIC8vICAgY29uc29sZS5sb2coJ2J1aWxkaW5nIGEgbWFwIG9mZiBteSBvd24gYmF0Jyk7XG4gICAgLy8gICB0aGlzLmJ1aWxkTWFwKCk7XG4gICAgLy8gfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKCh0aGVNYXApPT57XG4gICAgICBpZih0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMubGVuZ3RoPnRoaXMucG9zaXRpb24pe1xuICAgICAgICB0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMucmVtb3ZlQXQodGhpcy5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==