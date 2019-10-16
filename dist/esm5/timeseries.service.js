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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var opendap_service_1 = require("./opendap.service");
var metadata_service_1 = require("./metadata.service");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
;
var TimeseriesService = /** @class */ (function () {
    function TimeseriesService(metadata, dap) {
        this.metadata = metadata;
        this.dap = dap;
    }
    TimeseriesService.prototype.getTimeseries = function (host, file, variable, pt, additionalIndices, fillValue) {
        var _this = this;
        additionalIndices = additionalIndices || {};
        var url = this.dap.makeURL(host, file);
        var ddx$ = this.metadata.ddxForUrl(url);
        var das$ = this.metadata.dasForUrl(url);
        var variable = variable;
        return rxjs_1.forkJoin(ddx$, das$, this.metadata.getGrid(host, file)).pipe(operators_1.switchMap(function (_a) {
            var _b = __read(_a, 3), ddx = _b[0], das = _b[1], latsAndLngs = _b[2];
            var lats = latsAndLngs[0];
            var lngs = latsAndLngs[1];
            var latIndex = _this.indexInDimension(pt.lat, lats);
            var lngIndex = _this.indexInDimension(pt.lng, lngs);
            if (fillValue === undefined) {
                fillValue = +ddx.variables[variable]._FillValue;
            }
            var query = _this.makeTimeQuery(ddx, variable, latIndex, lngIndex, additionalIndices);
            return _this.dap.getData(url + ".ascii?" + variable + query, das);
        }), operators_1.map(function (data) {
            var vals = data[variable];
            if (!vals.length) {
                vals = [data[variable]];
            }
            return {
                dates: (data.time || data.t),
                values: vals.map(function (v) { return (v === fillValue) ? NaN : v; })
            };
        }));
    };
    TimeseriesService.prototype.getTimeseriesForLayer = function (ml, pt) {
        return this.getTimeseries(ml.flattenedSettings.host, ml.interpolatedFile, ml.flattenedSettings.layer || ml.flattenedSettings.variable, pt, null, ml.flattenedSettings.fillValue);
    };
    TimeseriesService.prototype.makeTimeQuery = function (ddx, variable, latIndex, lngIndex, additionalIndices) {
        var _this = this;
        var metadata = ddx.variables[variable];
        var query = '';
        metadata.dimensions.forEach(function (dim) {
            var dName = dim.name.toLowerCase();
            if (metadata_service_1.TIME_NAMES.indexOf(dName) >= 0) {
                query += _this.dapRangeQuery(0, +(dim.size) - 1);
            }
            else if (metadata_service_1.LAT_NAMES.indexOf(dName) >= 0) {
                query += _this.dapRangeQuery(latIndex);
            }
            else if (metadata_service_1.LNG_NAMES.indexOf(dName) >= 0) {
                query += _this.dapRangeQuery(lngIndex);
            }
            else {
                query += _this.dapRangeQuery(additionalIndices[dName] || 0);
            }
        });
        return query;
    };
    TimeseriesService.prototype.dapRangeQuery = function (from, to, step) {
        step = step || 1;
        if (to === undefined) {
            to = from;
        }
        return '[' + from + ':' + step + ':' + to + ']';
    };
    TimeseriesService.prototype.indexInDimension = function (c, dim, trim) {
        var minIndex = 0;
        var maxIndex = dim.length - 1;
        if (trim) {
            maxIndex -= trim;
        }
        var rev = dim[0] > dim[dim.length - 1];
        if (rev) {
            minIndex = maxIndex;
            maxIndex = 0;
        }
        var currentIndex;
        while ((minIndex <= maxIndex) || (rev && (maxIndex <= minIndex))) {
            if (c <= dim[minIndex]) {
                return minIndex;
            }
            if (c >= dim[maxIndex]) {
                return maxIndex;
            }
            currentIndex = Math.floor((minIndex + maxIndex) / 2);
            var d1 = Math.abs(dim[currentIndex] - c);
            var d2 = Math.abs(dim[currentIndex + 1] - c);
            if (rev) {
                if (d2 <= d1) {
                    maxIndex = currentIndex + 1;
                }
                else {
                    minIndex = currentIndex;
                }
            }
            else {
                if (d2 <= d1) {
                    minIndex = currentIndex + 1;
                }
                else {
                    maxIndex = currentIndex;
                }
            }
        }
        return currentIndex;
    };
    ;
    TimeseriesService.ctorParameters = function () { return [
        { type: metadata_service_1.MetadataService },
        { type: opendap_service_1.OpendapService }
    ]; };
    TimeseriesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [metadata_service_1.MetadataService, opendap_service_1.OpendapService])
    ], TimeseriesService);
    return TimeseriesService;
}());
exports.TimeseriesService = TimeseriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJ0aW1lc2VyaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDLHFEQUFtRDtBQUNuRCx1REFBdUY7QUFHdkYsNkJBQTRDO0FBQzVDLDRDQUFnRDtBQWlCL0MsQ0FBQztBQUdGO0lBRUUsMkJBQW9CLFFBQXdCLEVBQVMsR0FBa0I7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFlO0lBRXZFLENBQUM7SUFFRCx5Q0FBYSxHQUFiLFVBQWMsSUFBZ0IsRUFBQyxJQUFXLEVBQUMsUUFBZSxFQUM1QyxFQUF3QixFQUFDLGlCQUFxQixFQUM5QyxTQUFpQjtRQUYvQixpQkE2QkM7UUExQkMsaUJBQWlCLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFDO1FBQzVDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDeEIsT0FBTyxlQUFRLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FDeEUsVUFBQyxFQUFxQjtnQkFBckIsa0JBQXFCLEVBQXBCLFdBQUcsRUFBQyxXQUFHLEVBQUMsbUJBQVc7WUFDbkIsSUFBTSxJ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Y3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgTGF0TG5nIH0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7IE9wZW5kYXBTZXJ2aWNlIH0gZnJvbSAnLi9vcGVuZGFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlLCBMQVRfTkFNRVMsIExOR19OQU1FUywgVElNRV9OQU1FUyB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBEYXBERFgsIERhcERBUywgRGFwRGF0YSB9IGZyb20gJ2RhcC1xdWVyeS1qcy9kaXN0L2RhcC1xdWVyeSc7XG5pbXBvcnQgeyBDYXRhbG9nSG9zdCwgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBmb3JrSm9pbiwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNlcmllc3tcbiAgZGF0ZXM6QXJyYXk8RGF0ZT47XG4gIHZhbHVlczpBcnJheTxudW1iZXI+O1xuICBsYWJlbD86c3RyaW5nO1xuICB0YWdzPzp7XG4gICAgW2tleTpzdHJpbmddOmFueVxuICB9O1xuICBzdHlsZT86c3RyaW5nO1xuICB1bml0cz86c3RyaW5nO1xuICBba2V5OnN0cmluZ106YW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZUxhdExuZ3tcbiAgbGF0Om51bWJlcixcbiAgbG5nOm51bWJlclxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSxwcml2YXRlIGRhcDpPcGVuZGFwU2VydmljZSkge1xuXG4gIH1cblxuICBnZXRUaW1lc2VyaWVzKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcsdmFyaWFibGU6c3RyaW5nLFxuICAgICAgICAgICAgICAgIHB0OihMYXRMbmd8U2ltcGxlTGF0TG5nKSxhZGRpdGlvbmFsSW5kaWNlczphbnksXG4gICAgICAgICAgICAgICAgZmlsbFZhbHVlPzpudW1iZXIpOk9ic2VydmFibGU8VGltZVNlcmllcz57XG4gICAgYWRkaXRpb25hbEluZGljZXMgPSBhZGRpdGlvbmFsSW5kaWNlcyB8fCB7fTtcbiAgICB2YXIgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuICAgIHZhciBkZHgkID0gdGhpcy5tZXRhZGF0YS5kZHhGb3JVcmwodXJsKTtcbiAgICB2YXIgZGFzJCA9IHRoaXMubWV0YWRhdGEuZGFzRm9yVXJsKHVybCk7XG4gICAgdmFyIHZhcmlhYmxlID0gdmFyaWFibGU7XG4gICAgcmV0dXJuIGZvcmtKb2luKGRkeCQsZGFzJCx0aGlzLm1ldGFkYXRhLmdldEdyaWQoaG9zdCxmaWxlKSkucGlwZShzd2l0Y2hNYXAoXG4gICAgICAoW2RkeCxkYXMsbGF0c0FuZExuZ3NdKT0+e1xuICAgICAgICBjb25zdCBsYXRzOm51bWJlcltdID0gKDxudW1iZXJbXVtdPmxhdHNBbmRMbmdzKVswXTtcbiAgICAgICAgY29uc3QgbG5nczpudW1iZXJbXSA9ICg8bnVtYmVyW11bXT5sYXRzQW5kTG5ncylbMV07XG4gICAgICB2YXIgbGF0SW5kZXggPSB0aGlzLmluZGV4SW5EaW1lbnNpb24oKDxhbnk+cHQpLmxhdCxsYXRzKTtcbiAgICAgIHZhciBsbmdJbmRleCA9IHRoaXMuaW5kZXhJbkRpbWVuc2lvbigoPGFueT5wdCkubG5nLGxuZ3MpO1xuICAgICAgaWYoZmlsbFZhbHVlPT09dW5kZWZpbmVkKXtcbiAgICAgICAgZmlsbFZhbHVlID0gKyg8RGFwRERYPmRkeCkudmFyaWFibGVzW3ZhcmlhYmxlXS5fRmlsbFZhbHVlO1xuICAgICAgfVxuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5tYWtlVGltZVF1ZXJ5KDxEYXBERFg+ZGR4LHZhcmlhYmxlLGxhdEluZGV4LGxuZ0luZGV4LGFkZGl0aW9uYWxJbmRpY2VzKTtcbiAgICAgIHJldHVybiB0aGlzLmRhcC5nZXREYXRhKGAke3VybH0uYXNjaWk/JHt2YXJpYWJsZX0ke3F1ZXJ5fWAsPERhcERBUz5kYXMpXG4gICAgfSksbWFwKChkYXRhOkRhcERhdGEpPT57XG4gICAgICBsZXQgdmFscyA9ICg8bnVtYmVyW10+IGRhdGFbdmFyaWFibGVdKTtcbiAgICAgIGlmKCF2YWxzLmxlbmd0aCl7XG4gICAgICAgIHZhbHMgPSBbPG51bWJlcj5kYXRhW3ZhcmlhYmxlXV07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRlczo8QXJyYXk8RGF0ZT4+IChkYXRhLnRpbWV8fGRhdGEudCksXG4gICAgICAgIHZhbHVlczp2YWxzLm1hcCh2PT4odj09PWZpbGxWYWx1ZSk/TmFOOnYpXG4gICAgICB9O1xuICAgIH0pKTtcbiAgfVxuXG4gIGdldFRpbWVzZXJpZXNGb3JMYXllcihtbDpNYXBwZWRMYXllcixwdDpMYXRMbmcpOk9ic2VydmFibGU8VGltZVNlcmllcz57XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZXNlcmllcyhtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWwuaW50ZXJwb2xhdGVkRmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sLmZsYXR0ZW5lZFNldHRpbmdzLmxheWVyfHxtbC5mbGF0dGVuZWRTZXR0aW5ncy52YXJpYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sLmZsYXR0ZW5lZFNldHRpbmdzLmZpbGxWYWx1ZSk7XG4gIH1cblxuXG4gIG1ha2VUaW1lUXVlcnkoZGR4OkRhcEREWCx2YXJpYWJsZTpzdHJpbmcsbGF0SW5kZXg6bnVtYmVyLGxuZ0luZGV4Om51bWJlcixhZGRpdGlvbmFsSW5kaWNlczphbnkpOnN0cmluZ3tcbiAgICB2YXIgbWV0YWRhdGEgPSBkZHgudmFyaWFibGVzW3ZhcmlhYmxlXTtcbiAgICB2YXIgcXVlcnk9Jyc7XG5cbiAgICBtZXRhZGF0YS5kaW1lbnNpb25zLmZvckVhY2goKGRpbTphbnkpPT57XG4gICAgICB2YXIgZE5hbWU6c3RyaW5nID0gZGltLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmKFRJTUVfTkFNRVMuaW5kZXhPZihkTmFtZSk+PTApe1xuICAgICAgICBxdWVyeSArPSB0aGlzLmRhcFJhbmdlUXVlcnkoMCwrKGRpbS5zaXplKS0xKTtcbiAgICAgIH0gZWxzZSBpZihMQVRfTkFNRVMuaW5kZXhPZihkTmFtZSk+PTApe1xuICAgICAgICAgIHF1ZXJ5ICs9IHRoaXMuZGFwUmFuZ2VRdWVyeShsYXRJbmRleCk7XG4gICAgICB9IGVsc2UgaWYoTE5HX05BTUVTLmluZGV4T2YoZE5hbWUpPj0wKXtcbiAgICAgICAgcXVlcnkgKz0gdGhpcy5kYXBSYW5nZVF1ZXJ5KGxuZ0luZGV4KTtcbiAgICAgIH0gZWxzZSB7IFxuICAgICAgICBxdWVyeSArPSB0aGlzLmRhcFJhbmdlUXVlcnkoYWRkaXRpb25hbEluZGljZXNbZE5hbWVdfHwwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICBkYXBSYW5nZVF1ZXJ5KGZyb206bnVtYmVyLHRvPzpudW1iZXIsc3RlcD86bnVtYmVyKTpzdHJpbmd7XG4gICAgc3RlcCA9IHN0ZXAgfHwgMTtcbiAgICBpZih0bz09PXVuZGVmaW5lZCl7XG4gICAgICB0byA9IGZyb207XG4gICAgfVxuICAgIHJldHVybiAnWycrZnJvbSsnOicrc3RlcCsnOicrdG8rJ10nO1xuICB9XG5cbiAgaW5kZXhJbkRpbWVuc2lvbihjOm51bWJlcixkaW06QXJyYXk8bnVtYmVyPix0cmltPzpudW1iZXIpOm51bWJlcntcbiAgICB2YXIgbWluSW5kZXggPSAwO1xuICAgIHZhciBtYXhJbmRleCA9IGRpbS5sZW5ndGgtMTtcblxuICAgIGlmKHRyaW0pe1xuICAgICAgbWF4SW5kZXgtPXRyaW07XG4gICAgfVxuXG4gICAgY29uc3QgcmV2ID0gZGltWzBdID4gZGltW2RpbS5sZW5ndGgtMV07XG4gICAgaWYocmV2KXtcbiAgICAgIG1pbkluZGV4ID0gbWF4SW5kZXg7XG4gICAgICBtYXhJbmRleCA9IDA7XG4gICAgfVxuICAgIHZhciBjdXJyZW50SW5kZXg7XG5cbiAgICB3aGlsZSgobWluSW5kZXg8PW1heEluZGV4KXx8KHJldiYmKG1heEluZGV4PD1taW5JbmRleCkpKXtcbiAgICAgIGlmKGM8PWRpbVttaW5JbmRleF0pe1xuICAgICAgICByZXR1cm4gbWluSW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGlmKGM+PWRpbVttYXhJbmRleF0pe1xuICAgICAgICByZXR1cm4gbWF4SW5kZXg7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRJbmRleCA9IE1hdGguZmxvb3IoKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMik7XG5cbiAgICAgIHZhciBkMSA9IE1hdGguYWJzKGRpbVtjdXJyZW50SW5kZXhdLWMpO1xuICAgICAgdmFyIGQyID0gTWF0aC5hYnMoZGltW2N1cnJlbnRJbmRleCsxXS1jKTtcblxuICAgICAgaWYocmV2KXtcbiAgICAgICAgaWYgKGQyIDw9IGQxKSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5JbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGQyIDw9IGQxKSB7XG4gICAgICAgICAgICBtaW5JbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEluZGV4O1xuICB9O1xuXG59XG4iXX0=