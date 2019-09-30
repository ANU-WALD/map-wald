import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { OpendapService } from './opendap.service';
import { forkJoin, of } from 'rxjs';
import { publishReplay, refCount, map, switchAll, shareReplay } from 'rxjs/operators';
export var LAT_NAMES = ['latitude', 'lat'];
export var LNG_NAMES = ['longitude', 'lng', 'lon'];
export var TIME_NAMES = ['time', 't'];
var MetadataService = /** @class */ (function () {
    function MetadataService(dap) {
        this.dap = dap;
        this.ddxCache = {};
        this.dasCache = {};
        this.timeCache = {};
    }
    MetadataService.prototype.identifyCoordinate = function (ddx) {
        var e_1, _a;
        var possibleNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            possibleNames[_i - 1] = arguments[_i];
        }
        try {
            for (var possibleNames_1 = tslib_1.__values(possibleNames), possibleNames_1_1 = possibleNames_1.next(); !possibleNames_1_1.done; possibleNames_1_1 = possibleNames_1.next()) {
                var n = possibleNames_1_1.value;
                if (ddx.variables[n]) {
                    return n;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (possibleNames_1_1 && !possibleNames_1_1.done && (_a = possibleNames_1.return)) _a.call(possibleNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    MetadataService.prototype.getDDX = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.ddxForUrl(url);
    };
    MetadataService.prototype.ddxForUrl = function (url) {
        if (!this.ddxCache[url]) {
            this.ddxCache[url] =
                this.dap.getDDX(url).pipe(publishReplay(), refCount());
        }
        return this.ddxCache[url];
    };
    MetadataService.prototype.getDDXForLayer = function (ml) {
        return this.getDDX(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getDAS = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.dasForUrl(url);
    };
    MetadataService.prototype.dasForUrl = function (url) {
        if (!this.dasCache[url]) {
            this.dasCache[url] =
                this.dap.getDAS(url).pipe(publishReplay(), refCount());
        }
        return this.dasCache[url];
    };
    MetadataService.prototype.getDASForLayer = function (ml) {
        return this.getDAS(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getMetadata = function (ml) {
        if (ml.flattenedSettings.host.software !== 'tds') {
            return of({});
        }
        return forkJoin([this.getDASForLayer(ml), this.getDDXForLayer(ml)]).pipe(map(function (meta) {
            return {
                das: meta[0],
                ddx: meta[1]
            };
        }), map(function (meta) {
            return Object.assign({}, meta.das.attr || {}, meta.ddx.variables[ml.flattenedSettings.layer || ml.flattenedSettings.variable] || {});
        }));
    };
    MetadataService.prototype.populateMetadata = function (ml) {
        this.getMetadata(ml).subscribe(function (entry) {
            setTimeout(function () {
                ml.retrievedMetadata = entry;
            });
        });
    };
    MetadataService.prototype.getGrid = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.getGridForURL(url);
    };
    MetadataService.prototype.getGridForURL = function (url) {
        var _this = this;
        var ddx$ = this.ddxForUrl(url);
        var das$ = this.dasForUrl(url);
        var res$ = forkJoin([ddx$, das$]).pipe(map(function (metadata) {
            var ddx = metadata[0];
            var das = metadata[1];
            var latCoord = _this.identifyCoordinate.apply(_this, tslib_1.__spread([ddx], LAT_NAMES));
            var lngCoord = _this.identifyCoordinate.apply(_this, tslib_1.__spread([ddx], LNG_NAMES));
            var lat$ = _this.dap.getData(url + ".ascii?" + latCoord, das).pipe(map(function (dd) { return dd[latCoord]; }));
            var lng$ = _this.dap.getData(url + ".ascii?" + lngCoord, das).pipe(map(function (dd) { return dd[lngCoord]; }));
            return forkJoin(lat$, lng$);
        }), switchAll(), publishReplay(), refCount());
        return res$;
    };
    MetadataService.prototype.getGridForLayer = function (ml) {
        return this.getGrid(ml.flattenedSettings.host, ml.interpolatedFile);
    };
    MetadataService.prototype.getSpatialExtent = function (ml) {
        return this.getGridForLayer(ml).pipe(map(function (_a) {
            var _b = tslib_1.__read(_a, 2), lats = _b[0], lngs = _b[1];
            var result = {
                east: Math.max.apply(Math, tslib_1.__spread(lngs)),
                west: Math.min.apply(Math, tslib_1.__spread(lngs)),
                north: Math.max.apply(Math, tslib_1.__spread(lats)),
                south: Math.min.apply(Math, tslib_1.__spread(lats))
            };
            return result;
        })).pipe(publishReplay(), refCount());
    };
    MetadataService.prototype.getTimeDimension = function (host, file) {
        var url = this.dap.makeURL(host, file);
        return this.getTimeDimensionForURL(url);
    };
    MetadataService.prototype.getTimeDimensionForURL = function (url) {
        var _this = this;
        if (!this.timeCache[url]) {
            var ddx$ = this.ddxForUrl(url);
            var das$ = this.dasForUrl(url);
            var res$ = forkJoin([ddx$, das$]).pipe(map(function (metadata) {
                var ddx = metadata[0];
                var das = metadata[1];
                var timeCoord = _this.identifyCoordinate.apply(_this, tslib_1.__spread([ddx], TIME_NAMES));
                var time$ = _this.dap.getData(url + ".ascii?" + timeCoord, das).pipe(map(function (dd) { return dd[timeCoord]; }));
                return time$;
            }), switchAll(), shareReplay());
            this.timeCache[url] = res$;
        }
        return this.timeCache[url];
    };
    MetadataService.ctorParameters = function () { return [
        { type: OpendapService }
    ]; };
    MetadataService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [OpendapService])
    ], MetadataService);
    return MetadataService;
}());
export { MetadataService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsibWV0YWRhdGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJbkQsT0FBTyxFQUFFLFFBQVEsRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFhLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBTyxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RyxNQUFNLENBQUMsSUFBTSxTQUFTLEdBQUMsQ0FBQyxVQUFVLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLElBQU0sU0FBUyxHQUFDLENBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNqRCxNQUFNLENBQUMsSUFBTSxVQUFVLEdBQUMsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFHckM7SUFJRSx5QkFBb0IsR0FBa0I7UUFBbEIsUUFBRyxHQUFILEdBQUcsQ0FBZTtRQUh0QyxhQUFRLEdBQW1DLEVBQUUsQ0FBQTtRQUM3QyxhQUFRLEdBQW1DLEVBQUUsQ0FBQTtRQWdJN0MsY0FBUyxHQUFtQyxFQUFFLENBQUM7SUE1SC9DLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVTs7UUFBQyx1QkFBOEI7YUFBOUIsVUFBOEIsRUFBOUIscUJBQThCLEVBQTlCLElBQThCO1lBQTlCLHNDQUE4Qjs7O1lBQzFELEtBQWEsSUFBQSxrQkFBQSxpQkFBQSxhQUFhLENBQUEsNENBQUEsdUVBQUM7Z0JBQXZCLElBQUksQ0FBQywwQkFBQTtnQkFDUCxJQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7b0JB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S0FBSyxHQUNULEtBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFJLEdBQUcsZUFBVSxTQUFXLEVBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNwRCxHQUFHLENBQUMsVUFBQyxFQUFVLElBQUcsT0FBUSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUU5QyxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBRSxFQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0JBcEp1QixjQUFjOztJQUozQixlQUFlO1FBRDNCLFVBQVUsRUFBRTtpREFLYSxjQUFjO09BSjNCLGVBQWUsQ0F5SjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXpKRCxJQXlKQztTQXpKWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IERhcEREWCwgRGFwREFTLCBEYXBEYXRhIH0gZnJvbSAnZGFwLXF1ZXJ5LWpzL2Rpc3QvZGFwLXF1ZXJ5JztcbmltcG9ydCB7IE9wZW5kYXBTZXJ2aWNlIH0gZnJvbSAnLi9vcGVuZGFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5cbmltcG9ydCB7IENhdGFsb2dIb3N0IH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAsIHB1Ymxpc2hSZXBsYXksIHJlZkNvdW50LCBtYXAsIHN3aXRjaEFsbCwgdGFwLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IExBVF9OQU1FUz1bJ2xhdGl0dWRlJywnbGF0J107XG5leHBvcnQgY29uc3QgTE5HX05BTUVTPVsnbG9uZ2l0dWRlJywnbG5nJywnbG9uJ107XG5leHBvcnQgY29uc3QgVElNRV9OQU1FUz1bJ3RpbWUnLCd0J107XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXRhZGF0YVNlcnZpY2Uge1xuICBkZHhDYWNoZTp7W2tleTpzdHJpbmddOk9ic2VydmFibGU8RGFwRERYPn09e31cbiAgZGFzQ2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPERhcERBUz59PXt9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXA6T3BlbmRhcFNlcnZpY2UpIHtcblxuICB9XG5cbiAgaWRlbnRpZnlDb29yZGluYXRlKGRkeDpEYXBERFgsLi4ucG9zc2libGVOYW1lczpBcnJheTxzdHJpbmc+KTpzdHJpbmd7XG4gICAgZm9yKGxldCBuIG9mIHBvc3NpYmxlTmFtZXMpe1xuICAgICAgaWYoZGR4LnZhcmlhYmxlc1tuXSl7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0RERYKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8RGFwRERYPntcbiAgICB2YXIgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuXG4gICAgcmV0dXJuIHRoaXMuZGR4Rm9yVXJsKHVybCk7XG4gIH1cblxuICBkZHhGb3JVcmwodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxEYXBERFg+e1xuICAgIGlmKCF0aGlzLmRkeENhY2hlW3VybF0pe1xuICAgICAgdGhpcy5kZHhDYWNoZVt1cmxdID1cbiAgICAgICAgdGhpcy5kYXAuZ2V0RERYKHVybCkucGlwZShwdWJsaXNoUmVwbGF5KCkscmVmQ291bnQoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGR4Q2FjaGVbdXJsXTtcbn1cblxuICBnZXRERFhGb3JMYXllcihtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxEYXBERFg+e1xuICAgIHJldHVybiB0aGlzLmdldEREWChtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LG1sLmludGVycG9sYXRlZEZpbGUpO1xuICB9XG5cbiAgZ2V0REFTKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcpOk9ic2VydmFibGU8RGFwREFTPntcbiAgICB2YXIgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuICAgIHJldHVybiB0aGlzLmRhc0ZvclVybCh1cmwpO1xuICB9XG5cbiAgZGFzRm9yVXJsKHVybDpzdHJpbmcpOk9ic2VydmFibGU8RGFwREFTPntcbiAgICBpZighdGhpcy5kYXNDYWNoZVt1cmxdKXtcbiAgICAgIHRoaXMuZGFzQ2FjaGVbdXJsXSA9XG4gICAgICAgIHRoaXMuZGFwLmdldERBUyh1cmwpLnBpcGUocHVibGlzaFJlcGxheSgpLHJlZkNvdW50KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhc0NhY2hlW3VybF07XG4gIH1cblxuICBnZXREQVNGb3JMYXllcihtbDpNYXBwZWRMYXllcik6T2JzZXJ2YWJsZTxEYXBEQVM+e1xuICAgIHJldHVybiB0aGlzLmdldERBUyhtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LG1sLmludGVycG9sYXRlZEZpbGUpO1xuICB9XG5cbiAgZ2V0TWV0YWRhdGEobWw6TWFwcGVkTGF5ZXIpOk9ic2VydmFibGU8YW55PntcbiAgICBpZihtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LnNvZnR3YXJlICE9PSd0ZHMnKXtcbiAgICAgIHJldHVybiBvZih7fSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcmtKb2luKFt0aGlzLmdldERBU0ZvckxheWVyKG1sKSx0aGlzLmdldEREWEZvckxheWVyKG1sKV0pLnBpcGUoXG4gICAgICBtYXAobWV0YT0+e1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRhczogPERhcERBUz5tZXRhWzBdLFxuICAgICAgICAgIGRkeDogPERhcEREWD5tZXRhWzFdXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIG1hcChtZXRhPT57XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhLmRhcy5hdHRyfHx7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YS5kZHgudmFyaWFibGVzW21sLmZsYXR0ZW5lZFNldHRpbmdzLmxheWVyfHxtbC5mbGF0dGVuZWRTZXR0aW5ncy52YXJpYWJsZV18fHt9KTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIHBvcHVsYXRlTWV0YWRhdGEobWw6TWFwcGVkTGF5ZXIpe1xuICAgIHRoaXMuZ2V0TWV0YWRhdGEobWwpLnN1YnNjcmliZShlbnRyeT0+e1xuICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICBtbC5yZXRyaWV2ZWRNZXRhZGF0YSA9IGVudHJ5O1xuICAgICAgfSlcbiAgICB9KTtcbiAgfVxuXG4gIGdldEdyaWQoaG9zdDpDYXRhbG9nSG9zdCxmaWxlOnN0cmluZyk6T2JzZXJ2YWJsZTxudW1iZXJbXVtdPntcbiAgICBjb25zdCB1cmwgPSB0aGlzLmRhcC5tYWtlVVJMKGhvc3QsZmlsZSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JpZEZvclVSTCh1cmwpO1xuICB9XG5cbiAgZ2V0R3JpZEZvclVSTCh1cmw6c3RyaW5nKTpPYnNlcnZhYmxlPG51bWJlcltdW10+e1xuICAgIGNvbnN0IGRkeCQgPSB0aGlzLmRkeEZvclVybCh1cmwpO1xuICAgIGNvbnN0IGRhcyQgPSB0aGlzLmRhc0ZvclVybCh1cmwpO1xuICAgIGNvbnN0IHJlcyQgPSA8T2JzZXJ2YWJsZTxudW1iZXJbXVtdPj5mb3JrSm9pbihbZGR4JCxkYXMkXSkucGlwZShcbiAgICAgIG1hcCgobWV0YWRhdGE6YW55W10pPT57XG4gICAgICAgIGNvbnN0IGRkeDpEYXBERFggPSBtZXRhZGF0YVswXTtcbiAgICAgICAgY29uc3QgZGFzOkRhcERBUyA9IG1ldGFkYXRhWzFdO1xuXG4gICAgICAgIGNvbnN0IGxhdENvb3JkID0gdGhpcy5pZGVudGlmeUNvb3JkaW5hdGUoZGR4LC4uLkxBVF9OQU1FUyk7XG4gICAgICAgIGNvbnN0IGxuZ0Nvb3JkID0gdGhpcy5pZGVudGlmeUNvb3JkaW5hdGUoZGR4LC4uLkxOR19OQU1FUyk7XG5cbiAgICAgICAgY29uc3QgbGF0JCA9XG4gICAgICAgICAgdGhpcy5kYXAuZ2V0RGF0YShgJHt1cmx9LmFzY2lpPyR7bGF0Q29vcmR9YCxkYXMpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGRkOkRhcERhdGEpPT48bnVtYmVyW10+ZGRbbGF0Q29vcmRdKSk7XG4gICAgICAgIGNvbnN0IGxuZyQgPVxuICAgICAgICAgIHRoaXMuZGFwLmdldERhdGEoYCR7dXJsfS5hc2NpaT8ke2xuZ0Nvb3JkfWAsZGFzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChkZDpEYXBEYXRhKT0+PG51bWJlcltdPmRkW2xuZ0Nvb3JkXSkpO1xuXG4gICAgICAgIHJldHVybiBmb3JrSm9pbjxudW1iZXJbXT4obGF0JCxsbmckKTtcbiAgICAgIH0pLHN3aXRjaEFsbCgpLHB1Ymxpc2hSZXBsYXkoKSxyZWZDb3VudCgpKTtcbiAgICAgIHJldHVybiByZXMkO1xuICB9XG5cbiAgZ2V0R3JpZEZvckxheWVyKG1sOk1hcHBlZExheWVyKTpPYnNlcnZhYmxlPEFycmF5PEFycmF5PG51bWJlcj4+PntcbiAgICByZXR1cm4gdGhpcy5nZXRHcmlkKG1sLmZsYXR0ZW5lZFNldHRpbmdzLmhvc3QsbWwuaW50ZXJwb2xhdGVkRmlsZSk7XG4gIH1cblxuICBnZXRTcGF0aWFsRXh0ZW50KG1sOk1hcHBlZExheWVyKTpPYnNlcnZhYmxlPEJvdW5kcz57XG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JpZEZvckxheWVyKG1sKS5waXBlKG1hcCgoW2xhdHMsbG5nc10pPT57XG4gICAgICB2YXIgcmVzdWx0OkJvdW5kcyA9IHtcbiAgICAgICAgZWFzdDogTWF0aC5tYXgoLi4ubG5ncyksXG4gICAgICAgIHdlc3Q6IE1hdGgubWluKC4uLmxuZ3MpLFxuICAgICAgICBub3J0aDogTWF0aC5tYXgoLi4ubGF0cyksXG4gICAgICAgIHNvdXRoOiBNYXRoLm1pbiguLi5sYXRzKVxuICAgICAgfTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkpLnBpcGUocHVibGlzaFJlcGxheSgpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIGdldFRpbWVEaW1lbnNpb24oaG9zdDpDYXRhbG9nSG9zdCxmaWxlOnN0cmluZyk6T2JzZXJ2YWJsZTxEYXRlW10+e1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcbiAgICByZXR1cm4gdGhpcy5nZXRUaW1lRGltZW5zaW9uRm9yVVJMKHVybCk7XG4gIH1cblxuICB0aW1lQ2FjaGU6e1trZXk6c3RyaW5nXTpPYnNlcnZhYmxlPERhdGVbXT59PXt9O1xuXG4gIGdldFRpbWVEaW1lbnNpb25Gb3JVUkwodXJsOnN0cmluZyk6T2JzZXJ2YWJsZTxEYXRlW10+e1xuICAgIGlmKCF0aGlzLnRpbWVDYWNoZVt1cmxdKXtcbiAgICAgIGNvbnN0IGRkeCQgPSB0aGlzLmRkeEZvclVybCh1cmwpO1xuICAgICAgY29uc3QgZGFzJCA9IHRoaXMuZGFzRm9yVXJsKHVybCk7XG4gICAgICBjb25zdCByZXMkID0gPE9ic2VydmFibGU8RGF0ZVtdPj5mb3JrSm9pbihbZGR4JCxkYXMkXSkucGlwZShcbiAgICAgICAgbWFwKChtZXRhZGF0YTphbnlbXSk9PntcbiAgICAgICAgICBjb25zdCBkZHg6RGFwRERYID0gbWV0YWRhdGFbMF07XG4gICAgICAgICAgY29uc3QgZGFzOkRhcERBUyA9IG1ldGFkYXRhWzFdO1xuXG4gICAgICAgICAgY29uc3QgdGltZUNvb3JkID0gdGhpcy5pZGVudGlmeUNvb3JkaW5hdGUoZGR4LC4uLlRJTUVfTkFNRVMpO1xuXG4gICAgICAgICAgY29uc3QgdGltZSQgPVxuICAgICAgICAgICAgdGhpcy5kYXAuZ2V0RGF0YShgJHt1cmx9LmFzY2lpPyR7dGltZUNvb3JkfWAsZGFzKS5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGRkOkRhcERhdGEpPT48RGF0ZVtdPmRkW3RpbWVDb29yZF0pKTtcblxuICAgICAgICAgIHJldHVybiB0aW1lJDtcbiAgICAgICAgfSksc3dpdGNoQWxsKCksc2hhcmVSZXBsYXkoKSk7XG4gICAgICB0aGlzLnRpbWVDYWNoZVt1cmxdID0gcmVzJDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGltZUNhY2hlW3VybF07XG4gIH1cbn1cbiJdfQ==