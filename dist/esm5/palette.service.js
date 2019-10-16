"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var colorbrewer_1 = require("./colorbrewer");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var DEFAULT_NUM_COLOURS = 3;
var PaletteService = /** @class */ (function () {
    function PaletteService(_http) {
        this._http = _http;
        this.namedPalettes = {};
        this._source = '';
    }
    Object.defineProperty(PaletteService.prototype, "source", {
        set: function (val) {
            this._source = val;
        },
        enumerable: true,
        configurable: true
    });
    PaletteService.prototype.getPalette = function (name, reverse, numColours) {
        var _this = this;
        var palette = null;
        if (this.namedPalettes[name]) {
            palette = this.namedPalettes[name];
        }
        else if (colorbrewer_1.palettes[name]) {
            palette = colorbrewer_1.palettes[name][numColours || DEFAULT_NUM_COLOURS];
        }
        if (palette) {
            if (reverse) {
                return rxjs_1.of(palette.slice().reverse());
            }
            return rxjs_1.of(palette.slice());
        }
        return this._http.get(this._source + '/' + name + '.pal', { responseType: 'text' }).pipe(operators_1.map(function (text) { return _this.parseNCWMSPalette(text); }));
    };
    PaletteService.prototype.parseNCWMSPalette = function (txt) {
        return txt.split('\n')
            .map(function (ln) { return ln.replace(/\#.*/g, '').trim().replace(/ +/g, ' '); })
            .filter(function (ln) { return ln.length; })
            .map(function (e) { return "rgb(" + e.split(' ').join(',') + ")"; });
    };
    PaletteService.prototype.colourIndex = function (val, min, max, count) {
        var point = (val - min) / (max - min);
        var pos = Math.round(point * (count - 1));
        return pos;
    };
    PaletteService.ctorParameters = function () { return [
        { type: http_1.HttpClient }
    ]; };
    PaletteService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PaletteService);
    return PaletteService;
}());
exports.PaletteService = PaletteService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwYWxldHRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQXVDO0FBQ3ZDLDZDQUFrRDtBQUNsRCw2QkFBc0M7QUFDdEMsNENBQXFDO0FBTXJDLElBQU0sbUJBQW1CLEdBQUMsQ0FBQyxDQUFDO0FBRzVCO0lBR0Usd0JBQW9CLEtBQWdCO1FBQWhCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFGcEMsa0JBQWEsR0FBZ0MsRUFBRSxDQUFDO1FBTXhDLFlBQU8sR0FBUSxFQUFFLENBQUM7SUFGMUIsQ0FBQztJQUdELHNCQUFJLGtDQUFNO2FBQVYsVUFBVyxHQUFVO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxDQUFDO1FBQ25CLENBQUM7OztPQUFBO0lBRUQsbUNBQVUsR0FBVixVQUFXLElBQVcsRUFBQyxPQUFnQixFQUFDLFVBQWtCO1FBQTFELGlCQWlCQztRQWhCQyxJQUFJLE9BQU8sR0FBc0IsSUFBSSxDQUFDO1FBQ3RDLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQzthQUFNLElBQUcsc0JBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN2QixPQUFPLEdBQUcsc0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUcsT0FBTyxFQUFDO1lBQ1QsSUFBRyxPQUFPLEVBQUM7Z0JBQ1QsT0FBTyxTQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLFNBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxHQUFDLE1BQU0sRUFBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0UsZUFBRyxDQUFDLFVBQUMsSUFBVyxJQUFHLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLEdBQVU7UUFDMUIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNuQixHQUFHLENBQUMsVUFBQSxFQUFFLElBQUUsT0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDO2FBQ3pELE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxNQUFNLEVBQVQsQ0FBUyxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRyxPQUFBLFNBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQUcsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksR0FBVSxFQUFDLEdBQVUsRUFBQyxHQUFVLEVBQUMsS0FBWTtRQUN2RCxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBdkN5QixpQkFBVTs7SUFIekIsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUllLGlCQUFVO09BSHpCLGNBQWMsQ0EyQzFCO0lBQUQscUJBQUM7Q0FBQSxBQTNDRCxJQTJDQztBQTNDWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7cGFsZXR0ZXN9IGZyb20gJy4vY29sb3JicmV3ZXInO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCB0eXBlIENvbG91clNwZWNpZmljYXRpb24gPSBzdHJpbmc7XG5leHBvcnQgdHlwZSBDb2xvdXJQYWxldHRlID0gQXJyYXk8Q29sb3VyU3BlY2lmaWNhdGlvbj47XG5cblxuY29uc3QgREVGQVVMVF9OVU1fQ09MT1VSUz0zO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGFsZXR0ZVNlcnZpY2Uge1xuICBuYW1lZFBhbGV0dGVzOntba2V5OnN0cmluZ106Q29sb3VyUGFsZXR0ZX0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHBDbGllbnQpIHtcblxuICB9XG5cbiAgcHJpdmF0ZSBfc291cmNlOnN0cmluZz0nJztcbiAgc2V0IHNvdXJjZSh2YWw6c3RyaW5nKXtcbiAgICB0aGlzLl9zb3VyY2U9dmFsO1xuICB9XG5cbiAgZ2V0UGFsZXR0ZShuYW1lOnN0cmluZyxyZXZlcnNlPzpib29sZWFuLG51bUNvbG91cnM/Om51bWJlcik6T2JzZXJ2YWJsZTxDb2xvdXJQYWxldHRlPntcbiAgICB2YXIgcGFsZXR0ZTooQ29sb3VyUGFsZXR0ZXxudWxsKT1udWxsO1xuICAgIGlmKHRoaXMubmFtZWRQYWxldHRlc1tuYW1lXSl7XG4gICAgICBwYWxldHRlID0gdGhpcy5uYW1lZFBhbGV0dGVzW25hbWVdO1xuICAgIH0gZWxzZSBpZihwYWxldHRlc1tuYW1lXSl7XG4gICAgICBwYWxldHRlID0gcGFsZXR0ZXNbbmFtZV1bbnVtQ29sb3Vyc3x8REVGQVVMVF9OVU1fQ09MT1VSU107XG4gICAgfVxuXG4gICAgaWYocGFsZXR0ZSl7XG4gICAgICBpZihyZXZlcnNlKXtcbiAgICAgICAgcmV0dXJuIG9mKHBhbGV0dGUuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mKHBhbGV0dGUuc2xpY2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHRoaXMuX3NvdXJjZSsnLycrbmFtZSsnLnBhbCcseyByZXNwb25zZVR5cGU6ICd0ZXh0JyB9KS5waXBlKFxuICAgICAgbWFwKCh0ZXh0OnN0cmluZyk9PnRoaXMucGFyc2VOQ1dNU1BhbGV0dGUodGV4dCkpKTtcbiAgfVxuXG4gIHBhcnNlTkNXTVNQYWxldHRlKHR4dDpzdHJpbmcpOkNvbG91clBhbGV0dGV7XG4gICAgcmV0dXJuIHR4dC5zcGxpdCgnXFxuJylcbiAgICAgIC5tYXAobG49PmxuLnJlcGxhY2UoL1xcIy4qL2csJycpLnRyaW0oKS5yZXBsYWNlKC8gKy9nLCcgJykpXG4gICAgICAuZmlsdGVyKGxuID0+IGxuLmxlbmd0aClcbiAgICAgIC5tYXAoZT0+IGByZ2IoJHtlLnNwbGl0KCcgJykuam9pbignLCcpfSlgKTtcbiAgfVxuXG4gIGNvbG91ckluZGV4KHZhbDpudW1iZXIsbWluOm51bWJlcixtYXg6bnVtYmVyLGNvdW50Om51bWJlcik6bnVtYmVye1xuICAgIGxldCBwb2ludCA9ICh2YWwtbWluKS8obWF4LW1pbik7XG4gICAgbGV0IHBvcyA9IE1hdGgucm91bmQocG9pbnQqKGNvdW50LTEpKTtcbiAgICByZXR1cm4gcG9zO1xuICB9XG59XG4iXX0=