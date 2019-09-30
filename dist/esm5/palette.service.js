import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { palettes } from './colorbrewer';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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
        else if (palettes[name]) {
            palette = palettes[name][numColours || DEFAULT_NUM_COLOURS];
        }
        if (palette) {
            if (reverse) {
                return of(palette.slice().reverse());
            }
            return of(palette.slice());
        }
        return this._http.get(this._source + '/' + name + '.pal', { responseType: 'text' }).pipe(map(function (text) { return _this.parseNCWMSPalette(text); }));
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
        { type: HttpClient }
    ]; };
    PaletteService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], PaletteService);
    return PaletteService;
}());
export { PaletteService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwYWxldHRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckMsSUFBTSxtQkFBbUIsR0FBQyxDQUFDLENBQUM7QUFHNUI7SUFHRSx3QkFBb0IsS0FBZ0I7UUFBaEIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUZwQyxrQkFBYSxHQUFnQyxFQUFFLENBQUM7UUFNeEMsWUFBTyxHQUFRLEVBQUUsQ0FBQztJQUYxQixDQUFDO0lBR0Qsc0JBQUksa0NBQU07YUFBVixVQUFXLEdBQVU7WUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsSUFBVyxFQUFDLE9BQWdCLEVBQUMsVUFBa0I7UUFBMUQsaUJBaUJDO1FBaEJDLElBQUksT0FBTyxHQUFzQixJQUFJLENBQUM7UUFDdEMsSUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDO1lBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BDO2FBQU0sSUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDdkIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUcsT0FBTyxFQUFDO1lBQ1QsSUFBRyxPQUFPLEVBQUM7Z0JBQ1QsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7YUFDdEM7WUFDRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1QjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxHQUFDLE1BQU0sRUFBQyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0UsR0FBRyxDQUFDLFVBQUMsSUFBVyxJQUFHLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMENBQWlCLEdBQWpCLFVBQWtCLEdBQVU7UUFDMUIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNuQixHQUFHLENBQUMsVUFBQSxFQUFFLElBQUUsT0FBQSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDO2FBQ3pELE1BQU0sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxNQUFNLEVBQVQsQ0FBUyxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRyxPQUFBLFNBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQUcsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxvQ0FBVyxHQUFYLFVBQVksR0FBVSxFQUFDLEdBQVUsRUFBQyxHQUFVLEVBQUMsS0FBWTtRQUN2RCxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUcsR0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBdkN5QixVQUFVOztJQUh6QixjQUFjO1FBRDFCLFVBQVUsRUFBRTtpREFJZSxVQUFVO09BSHpCLGNBQWMsQ0EyQzFCO0lBQUQscUJBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTNDWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtwYWxldHRlc30gZnJvbSAnLi9jb2xvcmJyZXdlcic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IHR5cGUgQ29sb3VyU3BlY2lmaWNhdGlvbiA9IHN0cmluZztcbmV4cG9ydCB0eXBlIENvbG91clBhbGV0dGUgPSBBcnJheTxDb2xvdXJTcGVjaWZpY2F0aW9uPjtcblxuXG5jb25zdCBERUZBVUxUX05VTV9DT0xPVVJTPTM7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWxldHRlU2VydmljZSB7XG4gIG5hbWVkUGFsZXR0ZXM6e1trZXk6c3RyaW5nXTpDb2xvdXJQYWxldHRlfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cENsaWVudCkge1xuXG4gIH1cblxuICBwcml2YXRlIF9zb3VyY2U6c3RyaW5nPScnO1xuICBzZXQgc291cmNlKHZhbDpzdHJpbmcpe1xuICAgIHRoaXMuX3NvdXJjZT12YWw7XG4gIH1cblxuICBnZXRQYWxldHRlKG5hbWU6c3RyaW5nLHJldmVyc2U/OmJvb2xlYW4sbnVtQ29sb3Vycz86bnVtYmVyKTpPYnNlcnZhYmxlPENvbG91clBhbGV0dGU+e1xuICAgIHZhciBwYWxldHRlOihDb2xvdXJQYWxldHRlfG51bGwpPW51bGw7XG4gICAgaWYodGhpcy5uYW1lZFBhbGV0dGVzW25hbWVdKXtcbiAgICAgIHBhbGV0dGUgPSB0aGlzLm5hbWVkUGFsZXR0ZXNbbmFtZV07XG4gICAgfSBlbHNlIGlmKHBhbGV0dGVzW25hbWVdKXtcbiAgICAgIHBhbGV0dGUgPSBwYWxldHRlc1tuYW1lXVtudW1Db2xvdXJzfHxERUZBVUxUX05VTV9DT0xPVVJTXTtcbiAgICB9XG5cbiAgICBpZihwYWxldHRlKXtcbiAgICAgIGlmKHJldmVyc2Upe1xuICAgICAgICByZXR1cm4gb2YocGFsZXR0ZS5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2YocGFsZXR0ZS5zbGljZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQodGhpcy5fc291cmNlKycvJytuYW1lKycucGFsJyx7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pLnBpcGUoXG4gICAgICBtYXAoKHRleHQ6c3RyaW5nKT0+dGhpcy5wYXJzZU5DV01TUGFsZXR0ZSh0ZXh0KSkpO1xuICB9XG5cbiAgcGFyc2VOQ1dNU1BhbGV0dGUodHh0OnN0cmluZyk6Q29sb3VyUGFsZXR0ZXtcbiAgICByZXR1cm4gdHh0LnNwbGl0KCdcXG4nKVxuICAgICAgLm1hcChsbj0+bG4ucmVwbGFjZSgvXFwjLiovZywnJykudHJpbSgpLnJlcGxhY2UoLyArL2csJyAnKSlcbiAgICAgIC5maWx0ZXIobG4gPT4gbG4ubGVuZ3RoKVxuICAgICAgLm1hcChlPT4gYHJnYigke2Uuc3BsaXQoJyAnKS5qb2luKCcsJyl9KWApO1xuICB9XG5cbiAgY29sb3VySW5kZXgodmFsOm51bWJlcixtaW46bnVtYmVyLG1heDpudW1iZXIsY291bnQ6bnVtYmVyKTpudW1iZXJ7XG4gICAgbGV0IHBvaW50ID0gKHZhbC1taW4pLyhtYXgtbWluKTtcbiAgICBsZXQgcG9zID0gTWF0aC5yb3VuZChwb2ludCooY291bnQtMSkpO1xuICAgIHJldHVybiBwb3M7XG4gIH1cbn1cbiJdfQ==