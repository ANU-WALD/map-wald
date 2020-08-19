import { __read, __spread } from "tslib";
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
            res$ = forkJoin.apply(void 0, __spread([prev$, res$])).pipe(map(function (years) { return years[0].concat(years[1]); }));
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
    AvailableDatesService.decorators = [
        { type: Injectable }
    ];
    AvailableDatesService.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    return AvailableDatesService;
}());
export { AvailableDatesService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImF2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBa0IsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR2hELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQ7SUFHRSwrQkFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFFNUMsQ0FBQztJQUVPLHlDQUFTLEdBQWpCLFVBQWtCLE1BQWtCLEVBQUMsSUFBVztRQUM5QyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sb0JBQW9CLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BFLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxNQUFrQixFQUFDLElBQVk7UUFDNUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsRUFBQztZQUN2QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLEdBQUcsUUFBUSx3QkFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsR0FBRSxJQUFJLENBQ25DLEdBQUcsQ0FBQyxVQUFDLEtBQWMsSUFBSSxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsQ0FBQyxVQUFBLEtBQUs7WUFDUCxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQSxLQUFLLElBQUUsT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRyxPQUFBLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUcsSUFBSSxDQUFDLEVBQTNELENBQTJELENBQUMsRUFBaEYsQ0FBZ0YsQ0FBQyxDQUMvRixDQUFDO0lBQ0osQ0FBQzs7Z0JBeEM0QixlQUFlOzs7Z0JBSDdDLFVBQVU7OztnQkFIRixlQUFlOztJQStDeEIsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTNDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVUQ0RhdGUgfSBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVEYXRlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgZm5Gb3JZZWFyKG1hcHBlZDpNYXBwZWRMYXllcix5ZWFyOm51bWJlcil7XG4gICAgY29uc3QgcHVibGljYXRpb24gPSBtYXBwZWQubGF5ZXIucHVibGljYXRpb25zW21hcHBlZC5vcHRpb25zLnB1YmxpY2F0aW9uXTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUocHVibGljYXRpb24ub3B0aW9ucy5maWxlcGF0aCwge1xuICAgICAgeWVhcjogeWVhclxuICAgIH0pO1xuICB9XG5cbiAgYXZhaWxhYmxlRGF0ZXMobWFwcGVkOk1hcHBlZExheWVyLHllYXI/Om51bWJlcik6T2JzZXJ2YWJsZTxEYXRlW10+e1xuICAgIGxldCBsYXllciA9IG1hcHBlZC5sYXllcjtcbiAgICBsZXQgZm4gPSB0aGlzLmZuRm9yWWVhcihtYXBwZWQseWVhcik7XG5cbiAgICBsZXQgcmVzJCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5vcHRpb25zLmhvc3QsZm4pO1xuXG4gICAgaWYoIWxheWVyLnRpbWVzaGlmdCl7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgICB9XG5cbiAgICBpZihsYXllci50aW1lUGVyaW9kLmNvbnRhaW5zWWVhcih5ZWFyLTEpKXtcbiAgICAgIGZuID0gdGhpcy5mbkZvclllYXIobWFwcGVkLHllYXItMSk7XG5cbiAgICAgIGxldCBwcmV2JCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5ob3N0LGZuKTtcblxuICAgICAgcmVzJCA9IGZvcmtKb2luKC4uLltwcmV2JCxyZXMkXSkucGlwZShcbiAgICAgICAgbWFwKCh5ZWFyczpEYXRlW11bXSk9PiB5ZWFyc1swXS5jb25jYXQoeWVhcnNbMV0pKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcyQucGlwZShcbiAgICAgICAgbWFwKGRhdGVzPT57XG4gICAgICAgICAgcmV0dXJuIGRhdGVzLm1hcChkPT57XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmVzLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCktbGF5ZXIudGltZXNoaWZ0KmxheWVyLnRpbWVzdGVwKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0ZXM9PmRhdGVzLmZpbHRlcigoZCxpKT0+KGk+PU1hdGguYWJzKGxheWVyLnRpbWVzaGlmdCkpJiYoZC5nZXRVVENGdWxsWWVhcigpPT09eWVhcikpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==