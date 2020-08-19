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
        enumerable: false,
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
    PaletteService.decorators = [
        { type: Injectable }
    ];
    PaletteService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return PaletteService;
}());
export { PaletteService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsZXR0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJwYWxldHRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU1yQyxJQUFNLG1CQUFtQixHQUFDLENBQUMsQ0FBQztBQUU1QjtJQUlFLHdCQUFvQixLQUFnQjtRQUFoQixVQUFLLEdBQUwsS0FBSyxDQUFXO1FBRnBDLGtCQUFhLEdBQWdDLEVBQUUsQ0FBQztRQU14QyxZQUFPLEdBQVEsRUFBRSxDQUFDO0lBRjFCLENBQUM7SUFHRCxzQkFBSSxrQ0FBTTthQUFWLFVBQVcsR0FBVTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUVELG1DQUFVLEdBQVYsVUFBVyxJQUFXLEVBQUMsT0FBZ0IsRUFBQyxVQUFrQjtRQUExRCxpQkFpQkM7UUFoQkMsSUFBSSxPQUFPLEdBQXNCLElBQUksQ0FBQztRQUN0QyxJQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUM7WUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztZQUN2QixPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBRyxPQUFPLEVBQUM7WUFDVCxJQUFHLE9BQU8sRUFBQztnQkFDVCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzthQUN0QztZQUNELE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxJQUFJLEdBQUMsTUFBTSxFQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRSxHQUFHLENBQUMsVUFBQyxJQUFXLElBQUcsT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsR0FBVTtRQUMxQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ25CLEdBQUcsQ0FBQyxVQUFBLEVBQUUsSUFBRSxPQUFBLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQWhELENBQWdELENBQUM7YUFDekQsTUFBTSxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLE1BQU0sRUFBVCxDQUFTLENBQUM7YUFDdkIsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFHLE9BQUEsU0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBRyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG9DQUFXLEdBQVgsVUFBWSxHQUFVLEVBQUMsR0FBVSxFQUFDLEdBQVUsRUFBQyxLQUFZO1FBQ3ZELElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztnQkF2Q3lCLFVBQVU7OztnQkFKckMsVUFBVTs7O2dCQVZGLFVBQVU7O0lBc0RuQixxQkFBQztDQUFBLEFBNUNELElBNENDO1NBM0NZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3BhbGV0dGVzfSBmcm9tICcuL2NvbG9yYnJld2VyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBDb2xvdXJTcGVjaWZpY2F0aW9uID0gc3RyaW5nO1xuZXhwb3J0IHR5cGUgQ29sb3VyUGFsZXR0ZSA9IEFycmF5PENvbG91clNwZWNpZmljYXRpb24+O1xuXG5cbmNvbnN0IERFRkFVTFRfTlVNX0NPTE9VUlM9MztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhbGV0dGVTZXJ2aWNlIHtcbiAgbmFtZWRQYWxldHRlczp7W2tleTpzdHJpbmddOkNvbG91clBhbGV0dGV9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDpIdHRwQ2xpZW50KSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgX3NvdXJjZTpzdHJpbmc9Jyc7XG4gIHNldCBzb3VyY2UodmFsOnN0cmluZyl7XG4gICAgdGhpcy5fc291cmNlPXZhbDtcbiAgfVxuXG4gIGdldFBhbGV0dGUobmFtZTpzdHJpbmcscmV2ZXJzZT86Ym9vbGVhbixudW1Db2xvdXJzPzpudW1iZXIpOk9ic2VydmFibGU8Q29sb3VyUGFsZXR0ZT57XG4gICAgdmFyIHBhbGV0dGU6KENvbG91clBhbGV0dGV8bnVsbCk9bnVsbDtcbiAgICBpZih0aGlzLm5hbWVkUGFsZXR0ZXNbbmFtZV0pe1xuICAgICAgcGFsZXR0ZSA9IHRoaXMubmFtZWRQYWxldHRlc1tuYW1lXTtcbiAgICB9IGVsc2UgaWYocGFsZXR0ZXNbbmFtZV0pe1xuICAgICAgcGFsZXR0ZSA9IHBhbGV0dGVzW25hbWVdW251bUNvbG91cnN8fERFRkFVTFRfTlVNX0NPTE9VUlNdO1xuICAgIH1cblxuICAgIGlmKHBhbGV0dGUpe1xuICAgICAgaWYocmV2ZXJzZSl7XG4gICAgICAgIHJldHVybiBvZihwYWxldHRlLnNsaWNlKCkucmV2ZXJzZSgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZihwYWxldHRlLnNsaWNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9odHRwLmdldCh0aGlzLl9zb3VyY2UrJy8nK25hbWUrJy5wYWwnLHsgcmVzcG9uc2VUeXBlOiAndGV4dCcgfSkucGlwZShcbiAgICAgIG1hcCgodGV4dDpzdHJpbmcpPT50aGlzLnBhcnNlTkNXTVNQYWxldHRlKHRleHQpKSk7XG4gIH1cblxuICBwYXJzZU5DV01TUGFsZXR0ZSh0eHQ6c3RyaW5nKTpDb2xvdXJQYWxldHRle1xuICAgIHJldHVybiB0eHQuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKGxuPT5sbi5yZXBsYWNlKC9cXCMuKi9nLCcnKS50cmltKCkucmVwbGFjZSgvICsvZywnICcpKVxuICAgICAgLmZpbHRlcihsbiA9PiBsbi5sZW5ndGgpXG4gICAgICAubWFwKGU9PiBgcmdiKCR7ZS5zcGxpdCgnICcpLmpvaW4oJywnKX0pYCk7XG4gIH1cblxuICBjb2xvdXJJbmRleCh2YWw6bnVtYmVyLG1pbjpudW1iZXIsbWF4Om51bWJlcixjb3VudDpudW1iZXIpOm51bWJlcntcbiAgICBsZXQgcG9pbnQgPSAodmFsLW1pbikvKG1heC1taW4pO1xuICAgIGxldCBwb3MgPSBNYXRoLnJvdW5kKHBvaW50Kihjb3VudC0xKSk7XG4gICAgcmV0dXJuIHBvcztcbiAgfVxufVxuIl19