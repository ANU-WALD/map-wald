import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterpolationService } from './interpolation.service';
import { MetadataService } from './metadata.service';
var AvailableDatesService = /** @class */ (function () {
    function AvailableDatesService(metadata) {
        this.metadata = metadata;
    }
    AvailableDatesService.prototype.fnForYear = function (mapped, year) {
        var publication = mapped.layer.publications[mapped.options.publication];
        return InterpolationService.interpolate(publication.options.filepath, {
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
            res$ = forkJoin.apply(void 0, tslib_1.__spread([prev$, res$])).pipe(map(function (years) { return years[0].concat(years[1]); }));
        }
        return res$.pipe(map(function (dates) {
            return dates.map(function (d) {
                var res = new Date(d.getTime());
                res.setUTCDate(d.getUTCDate() - layer.timeshift * layer.timestep);
                return res;
            });
        }), map(function (dates) { return dates.filter(function (d, i) { return (i >= Math.abs(layer.timeshift)) && (d.getUTCFullYear() === year); }); }));
    };
    AvailableDatesService.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    AvailableDatesService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MetadataService])
    ], AvailableDatesService);
    return AvailableDatesService;
}());
export { AvailableDatesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImF2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBa0IsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFJckQ7SUFFRSwrQkFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFFNUMsQ0FBQztJQUVPLHlDQUFTLEdBQWpCLFVBQWtCLE1BQWtCLEVBQUMsSUFBVztRQUM5QyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sb0JBQW9CLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BFLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxNQUFrQixFQUFDLElBQVk7UUFDNUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsRUFBQztZQUN2QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLEdBQUcsUUFBUSxnQ0FBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsR0FBRSxJQUFJLENBQ25DLEdBQUcsQ0FBQyxVQUFDLEtBQWMsSUFBSSxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsQ0FBQyxVQUFBLEtBQUs7WUFDUCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQSxLQUFLLElBQUUsT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRyxPQUFBLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUcsSUFBSSxDQUFDLEVBQTNELENBQTJELENBQUMsRUFBaEYsQ0FBZ0YsQ0FBQyxDQUMvRixDQUFDO0lBQ0osQ0FBQzs7Z0JBeEM0QixlQUFlOztJQUZqQyxxQkFBcUI7UUFEakMsVUFBVSxFQUFFO2lEQUdrQixlQUFlO09BRmpDLHFCQUFxQixDQTJDakM7SUFBRCw0QkFBQztDQUFBLEFBM0NELElBMkNDO1NBM0NZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBmb3JrSm9pbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVVRDRGF0ZSB9IGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcHBlZExheWVyIH0gZnJvbSAnLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJbnRlcnBvbGF0aW9uU2VydmljZSB9IGZyb20gJy4vaW50ZXJwb2xhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF2YWlsYWJsZURhdGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2UpIHtcblxuICB9XG5cbiAgcHJpdmF0ZSBmbkZvclllYXIobWFwcGVkOk1hcHBlZExheWVyLHllYXI6bnVtYmVyKXtcbiAgICBjb25zdCBwdWJsaWNhdGlvbiA9IG1hcHBlZC5sYXllci5wdWJsaWNhdGlvbnNbbWFwcGVkLm9wdGlvbnMucHVibGljYXRpb25dO1xuICAgIHJldHVybiBJbnRlcnBvbGF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZShwdWJsaWNhdGlvbi5vcHRpb25zLmZpbGVwYXRoLCB7XG4gICAgICB5ZWFyOiB5ZWFyXG4gICAgfSk7XG4gIH1cblxuICBhdmFpbGFibGVEYXRlcyhtYXBwZWQ6TWFwcGVkTGF5ZXIseWVhcj86bnVtYmVyKTpPYnNlcnZhYmxlPERhdGVbXT57XG4gICAgbGV0IGxheWVyID0gbWFwcGVkLmxheWVyO1xuICAgIGxldCBmbiA9IHRoaXMuZm5Gb3JZZWFyKG1hcHBlZCx5ZWFyKTtcblxuICAgIGxldCByZXMkID0gdGhpcy5tZXRhZGF0YS5nZXRUaW1lRGltZW5zaW9uKGxheWVyLm9wdGlvbnMuaG9zdCxmbik7XG5cbiAgICBpZighbGF5ZXIudGltZXNoaWZ0KXtcbiAgICAgIHJldHVybiByZXMkO1xuICAgIH1cblxuICAgIGlmKGxheWVyLnRpbWVQZXJpb2QuY29udGFpbnNZZWFyKHllYXItMSkpe1xuICAgICAgZm4gPSB0aGlzLmZuRm9yWWVhcihtYXBwZWQseWVhci0xKTtcblxuICAgICAgbGV0IHByZXYkID0gdGhpcy5tZXRhZGF0YS5nZXRUaW1lRGltZW5zaW9uKGxheWVyLmhvc3QsZm4pO1xuXG4gICAgICByZXMkID0gZm9ya0pvaW4oLi4uW3ByZXYkLHJlcyRdKS5waXBlKFxuICAgICAgICBtYXAoKHllYXJzOkRhdGVbXVtdKT0+IHllYXJzWzBdLmNvbmNhdCh5ZWFyc1sxXSkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzJC5waXBlKFxuICAgICAgICBtYXAoZGF0ZXM9PntcbiAgICAgICAgICByZXR1cm4gZGF0ZXMubWFwKGQ9PntcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgRGF0ZShkLmdldFRpbWUoKSk7XG4gICAgICAgICAgICByZXMuc2V0VVRDRGF0ZShkLmdldFVUQ0RhdGUoKS1sYXllci50aW1lc2hpZnQqbGF5ZXIudGltZXN0ZXApO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChkYXRlcz0+ZGF0ZXMuZmlsdGVyKChkLGkpPT4oaT49TWF0aC5hYnMobGF5ZXIudGltZXNoaWZ0KSkmJihkLmdldFVUQ0Z1bGxZZWFyKCk9PT15ZWFyKSkpXG4gICAgKTtcbiAgfVxufVxuIl19