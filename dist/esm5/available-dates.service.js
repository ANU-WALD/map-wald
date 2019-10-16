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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var interpolation_service_1 = require("./interpolation.service");
var metadata_service_1 = require("./metadata.service");
var AvailableDatesService = /** @class */ (function () {
    function AvailableDatesService(metadata) {
        this.metadata = metadata;
    }
    AvailableDatesService.prototype.fnForYear = function (mapped, year) {
        var publication = mapped.layer.publications[mapped.options.publication];
        return interpolation_service_1.InterpolationService.interpolate(publication.options.filepath, {
            year: year
        });
    };
    AvailableDatesService.prototype.availableDates = function (mapped, year) {
        var layer = mapped.layer;
        var fn = this.fnForYear(mapped, year);
        var res$ = this.metadata.getTimeDimension(layer.options.host, fn);
        if (!layer.timeshift) {
            return res$;
        }
        if (layer.timePeriod.containsYear(year - 1)) {
            fn = this.fnForYear(mapped, year - 1);
            var prev$ = this.metadata.getTimeDimension(layer.host, fn);
            res$ = rxjs_1.forkJoin.apply(void 0, __spread([prev$, res$])).pipe(operators_1.map(function (years) { return years[0].concat(years[1]); }));
        }
        return res$.pipe(operators_1.map(function (dates) {
            return dates.map(function (d) {
                var res = new Date(d.getTime());
                res.setUTCDate(d.getUTCDate() - layer.timeshift * layer.timestep);
                return res;
            });
        }), operators_1.map(function (dates) { return dates.filter(function (d, i) { return (i >= Math.abs(layer.timeshift)) && (d.getUTCFullYear() === year); }); }));
    };
    AvailableDatesService.ctorParameters = function () { return [
        { type: metadata_service_1.MetadataService }
    ]; };
    AvailableDatesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [metadata_service_1.MetadataService])
    ], AvailableDatesService);
    return AvailableDatesService;
}());
exports.AvailableDatesService = AvailableDatesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImF2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkJBQWdEO0FBR2hELDRDQUFxQztBQUNyQyxpRUFBK0Q7QUFDL0QsdURBQXFEO0FBSXJEO0lBRUUsK0JBQW9CLFFBQXdCO1FBQXhCLGFBQVEsR0FBUixRQUFRLENBQWdCO0lBRTVDLENBQUM7SUFFTyx5Q0FBUyxHQUFqQixVQUFrQixNQUFrQixFQUFDLElBQVc7UUFDOUMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRSxPQUFPLDRDQUFvQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwRSxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw4Q0FBYyxHQUFkLFVBQWUsTUFBa0IsRUFBQyxJQUFZO1FBQzVDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEVBQUM7WUFDdkMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUQsSUFBSSxHQUFHLGVBQVEsd0JBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLEdBQUUsSUFBSSxDQUNuQyxlQUFHLENBQUMsVUFBQyxLQUFjLElBQUksT0FBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUMsQ0FBQztTQUN0RDtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDWixlQUFHLENBQUMsVUFBQSxLQUFLO1lBQ1AsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztnQkFDaEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsZUFBRyxDQUFDLFVBQUEsS0FBSyxJQUFFLE9BQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBQyxDQUFDLElBQUcsT0FBQSxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxLQUFHLElBQUksQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLEVBQWhGLENBQWdGLENBQUMsQ0FDL0YsQ0FBQztJQUNKLENBQUM7O2dCQXhDNEIsa0NBQWU7O0lBRmpDLHFCQUFxQjtRQURqQyxpQkFBVSxFQUFFO3lDQUdrQixrQ0FBZTtPQUZqQyxxQkFBcUIsQ0EyQ2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTNDRCxJQTJDQztBQTNDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVUQ0RhdGUgfSBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVEYXRlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgZm5Gb3JZZWFyKG1hcHBlZDpNYXBwZWRMYXllcix5ZWFyOm51bWJlcil7XG4gICAgY29uc3QgcHVibGljYXRpb24gPSBtYXBwZWQubGF5ZXIucHVibGljYXRpb25zW21hcHBlZC5vcHRpb25zLnB1YmxpY2F0aW9uXTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUocHVibGljYXRpb24ub3B0aW9ucy5maWxlcGF0aCwge1xuICAgICAgeWVhcjogeWVhclxuICAgIH0pO1xuICB9XG5cbiAgYXZhaWxhYmxlRGF0ZXMobWFwcGVkOk1hcHBlZExheWVyLHllYXI/Om51bWJlcik6T2JzZXJ2YWJsZTxEYXRlW10+e1xuICAgIGxldCBsYXllciA9IG1hcHBlZC5sYXllcjtcbiAgICBsZXQgZm4gPSB0aGlzLmZuRm9yWWVhcihtYXBwZWQseWVhcik7XG5cbiAgICBsZXQgcmVzJCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5vcHRpb25zLmhvc3QsZm4pO1xuXG4gICAgaWYoIWxheWVyLnRpbWVzaGlmdCl7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgICB9XG5cbiAgICBpZihsYXllci50aW1lUGVyaW9kLmNvbnRhaW5zWWVhcih5ZWFyLTEpKXtcbiAgICAgIGZuID0gdGhpcy5mbkZvclllYXIobWFwcGVkLHllYXItMSk7XG5cbiAgICAgIGxldCBwcmV2JCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5ob3N0LGZuKTtcblxuICAgICAgcmVzJCA9IGZvcmtKb2luKC4uLltwcmV2JCxyZXMkXSkucGlwZShcbiAgICAgICAgbWFwKCh5ZWFyczpEYXRlW11bXSk9PiB5ZWFyc1swXS5jb25jYXQoeWVhcnNbMV0pKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcyQucGlwZShcbiAgICAgICAgbWFwKGRhdGVzPT57XG4gICAgICAgICAgcmV0dXJuIGRhdGVzLm1hcChkPT57XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmVzLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCktbGF5ZXIudGltZXNoaWZ0KmxheWVyLnRpbWVzdGVwKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0ZXM9PmRhdGVzLmZpbHRlcigoZCxpKT0+KGk+PU1hdGguYWJzKGxheWVyLnRpbWVzaGlmdCkpJiYoZC5nZXRVVENGdWxsWWVhcigpPT09eWVhcikpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==