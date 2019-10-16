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
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const interpolation_service_1 = require("./interpolation.service");
const metadata_service_1 = require("./metadata.service");
let AvailableDatesService = class AvailableDatesService {
    constructor(metadata) {
        this.metadata = metadata;
    }
    fnForYear(mapped, year) {
        const publication = mapped.layer.publications[mapped.options.publication];
        return interpolation_service_1.InterpolationService.interpolate(publication.options.filepath, {
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
            res$ = rxjs_1.forkJoin(...[prev$, res$]).pipe(operators_1.map((years) => years[0].concat(years[1])));
        }
        return res$.pipe(operators_1.map(dates => {
            return dates.map(d => {
                let res = new Date(d.getTime());
                res.setUTCDate(d.getUTCDate() - layer.timeshift * layer.timestep);
                return res;
            });
        }), operators_1.map(dates => dates.filter((d, i) => (i >= Math.abs(layer.timeshift)) && (d.getUTCFullYear() === year))));
    }
};
AvailableDatesService.ctorParameters = () => [
    { type: metadata_service_1.MetadataService }
];
AvailableDatesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService])
], AvailableDatesService);
exports.AvailableDatesService = AvailableDatesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImF2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLCtCQUFnRDtBQUdoRCw4Q0FBcUM7QUFDckMsbUVBQStEO0FBQy9ELHlEQUFxRDtBQUlyRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUVoQyxZQUFvQixRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUU1QyxDQUFDO0lBRU8sU0FBUyxDQUFDLE1BQWtCLEVBQUMsSUFBVztRQUM5QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sNENBQW9CLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3BFLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFrQixFQUFDLElBQVk7UUFDNUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUVyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFDO1lBQ2xCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksR0FBQyxDQUFDLENBQUMsRUFBQztZQUN2QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsSUFBSSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRW5DLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFJLEdBQUcsZUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ25DLGVBQUcsQ0FBQyxDQUFDLEtBQWMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQ1osZUFBRyxDQUFDLEtBQUssQ0FBQSxFQUFFO1lBQ1QsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxFQUFFO2dCQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUMsS0FBSyxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFDRixlQUFHLENBQUMsS0FBSyxDQUFBLEVBQUUsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQy9GLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTs7WUF6QzhCLGtDQUFlOztBQUZqQyxxQkFBcUI7SUFEakMsaUJBQVUsRUFBRTtxQ0FHa0Isa0NBQWU7R0FGakMscUJBQXFCLENBMkNqQztBQTNDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgZm9ya0pvaW4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVUQ0RhdGUgfSBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdmFpbGFibGVEYXRlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIHByaXZhdGUgZm5Gb3JZZWFyKG1hcHBlZDpNYXBwZWRMYXllcix5ZWFyOm51bWJlcil7XG4gICAgY29uc3QgcHVibGljYXRpb24gPSBtYXBwZWQubGF5ZXIucHVibGljYXRpb25zW21hcHBlZC5vcHRpb25zLnB1YmxpY2F0aW9uXTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUocHVibGljYXRpb24ub3B0aW9ucy5maWxlcGF0aCwge1xuICAgICAgeWVhcjogeWVhclxuICAgIH0pO1xuICB9XG5cbiAgYXZhaWxhYmxlRGF0ZXMobWFwcGVkOk1hcHBlZExheWVyLHllYXI/Om51bWJlcik6T2JzZXJ2YWJsZTxEYXRlW10+e1xuICAgIGxldCBsYXllciA9IG1hcHBlZC5sYXllcjtcbiAgICBsZXQgZm4gPSB0aGlzLmZuRm9yWWVhcihtYXBwZWQseWVhcik7XG5cbiAgICBsZXQgcmVzJCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5vcHRpb25zLmhvc3QsZm4pO1xuXG4gICAgaWYoIWxheWVyLnRpbWVzaGlmdCl7XG4gICAgICByZXR1cm4gcmVzJDtcbiAgICB9XG5cbiAgICBpZihsYXllci50aW1lUGVyaW9kLmNvbnRhaW5zWWVhcih5ZWFyLTEpKXtcbiAgICAgIGZuID0gdGhpcy5mbkZvclllYXIobWFwcGVkLHllYXItMSk7XG5cbiAgICAgIGxldCBwcmV2JCA9IHRoaXMubWV0YWRhdGEuZ2V0VGltZURpbWVuc2lvbihsYXllci5ob3N0LGZuKTtcblxuICAgICAgcmVzJCA9IGZvcmtKb2luKC4uLltwcmV2JCxyZXMkXSkucGlwZShcbiAgICAgICAgbWFwKCh5ZWFyczpEYXRlW11bXSk9PiB5ZWFyc1swXS5jb25jYXQoeWVhcnNbMV0pKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcyQucGlwZShcbiAgICAgICAgbWFwKGRhdGVzPT57XG4gICAgICAgICAgcmV0dXJuIGRhdGVzLm1hcChkPT57XG4gICAgICAgICAgICBsZXQgcmVzID0gbmV3IERhdGUoZC5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgcmVzLnNldFVUQ0RhdGUoZC5nZXRVVENEYXRlKCktbGF5ZXIudGltZXNoaWZ0KmxheWVyLnRpbWVzdGVwKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZGF0ZXM9PmRhdGVzLmZpbHRlcigoZCxpKT0+KGk+PU1hdGguYWJzKGxheWVyLnRpbWVzaGlmdCkpJiYoZC5nZXRVVENGdWxsWWVhcigpPT09eWVhcikpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==