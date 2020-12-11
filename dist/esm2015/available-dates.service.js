import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { InterpolationService } from './interpolation.service';
import { MetadataService } from './metadata.service';
export class AvailableDatesService {
    constructor(metadata) {
        this.metadata = metadata;
    }
    fnForYear(mapped, year) {
        const publication = mapped.layer.publications[mapped.options.publication];
        return InterpolationService.interpolate(publication.options.filepath, {
            year: year
        });
    }
    availableDates(mapped, year) {
        let layer = mapped.layer;
        let fn = this.fnForYear(mapped, year);
        let res$ = this.metadata.getTimeDimension(layer.options.host, fn);
        if (!layer.timeshift) {
            return res$;
        }
        if (layer.timePeriod.containsYear(year - 1)) {
            fn = this.fnForYear(mapped, year - 1);
            let prev$ = this.metadata.getTimeDimension(layer.host, fn);
            res$ = forkJoin(...[prev$, res$]).pipe(map((years) => years[0].concat(years[1])));
        }
        return res$.pipe(map(dates => {
            return dates.map(d => {
                let res = new Date(d.getTime());
                res.setUTCDate(d.getUTCDate() - layer.timeshift * layer.timestep);
                return res;
            });
        }), map(dates => dates.filter((d, i) => (i >= Math.abs(layer.timeshift)) && (d.getUTCFullYear() === year))));
    }
}
AvailableDatesService.decorators = [
    { type: Injectable }
];
AvailableDatesService.ctorParameters = () => [
    { type: MetadataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWtCLFFBQVEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSXJELE1BQU0sT0FBTyxxQkFBcUI7SUFFaEMsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFFNUMsQ0FBQztJQUVPLFNBQVMsQ0FBQyxNQUFrQixFQUFDLElBQVc7UUFDOUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxRSxPQUFPLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwRSxJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBa0IsRUFBQyxJQUFZO1FBQzVDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDLEVBQUM7WUFDdkMsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUQsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNuQyxHQUFHLENBQUMsQ0FBQyxLQUFjLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUEsRUFBRTtZQUNULE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRTtnQkFDbEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxHQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLEdBQUcsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLEtBQUssQ0FBQSxFQUFFLENBQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUMvRixDQUFDO0lBQ0osQ0FBQzs7O1lBM0NGLFVBQVU7OztZQUhGLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVUQ0RhdGUgfSBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVEYXRlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgZm5Gb3JZZWFyKG1hcHBlZDpNYXBwZWRMYXllcix5ZWFyOm51bWJlcil7XG4gICAgY29uc3QgcHVibGljYXRpb24gPSBtYXBwZWQubGF5ZXIucHVibGljYXRpb25zW21hcHBlZC5vcHRpb25zLnB1YmxpY2F0aW9uXTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUocHVibGljYXRpb24ub3B0aW9ucy5maWxlcGF0aCwge1xuICAgICAgeWVhcjogeWVhclxuICAgIH0pO1xuICB9XG5cbiAgYXZhaWxhYmxlRGF0ZXMobWFwcGVkOk1hcHBlZExheWVyLHllYXI/Om51bWJlcik6T2JzZXJ2YWJsZTxVVENEYXRlW10+e1xuICAgIGxldCBsYXllciA9IG1hcHBlZC5sYXllcjtcbiAgICBsZXQgZm4gPSB0aGlzLmZuRm9yWWVhcihtYXBwZWQseWVhcik7XG5cbiAgICBsZXQgcmVzJCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5vcHRpb25zLmhvc3QsZm4pO1xuXG4gICAgaWYoIWxheWVyLnRpbWVzaGlmdCl7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgICB9XG5cbiAgICBpZihsYXllci50aW1lUGVyaW9kLmNvbnRhaW5zWWVhcih5ZWFyLTEpKXtcbiAgICAgIGZuID0gdGhpcy5mbkZvclllYXIobWFwcGVkLHllYXItMSk7XG5cbiAgICAgIGxldCBwcmV2JCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5ob3N0LGZuKTtcblxuICAgICAgcmVzJCA9IGZvcmtKb2luKC4uLltwcmV2JCxyZXMkXSkucGlwZShcbiAgICAgICAgbWFwKCh5ZWFyczpEYXRlW11bXSk9PiB5ZWFyc1swXS5jb25jYXQoeWVhcnNbMV0pKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcyQucGlwZShcbiAgICAgICAgbWFwKGRhdGVzPT57XG4gICAgICAgICAgcmV0dXJuIGRhdGVzLm1hcChkPT57XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmVzLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCktbGF5ZXIudGltZXNoaWZ0KmxheWVyLnRpbWVzdGVwKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0ZXM9PmRhdGVzLmZpbHRlcigoZCxpKT0+KGk+PU1hdGguYWJzKGxheWVyLnRpbWVzaGlmdCkpJiYoZC5nZXRVVENGdWxsWWVhcigpPT09eWVhcikpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==