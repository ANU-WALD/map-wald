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
const opendap_service_1 = require("./opendap.service");
const metadata_service_1 = require("./metadata.service");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
;
let TimeseriesService = class TimeseriesService {
    constructor(metadata, dap) {
        this.metadata = metadata;
        this.dap = dap;
    }
    getTimeseries(host, file, variable, pt, additionalIndices, fillValue) {
        additionalIndices = additionalIndices || {};
        var url = this.dap.makeURL(host, file);
        var ddx$ = this.metadata.ddxForUrl(url);
        var das$ = this.metadata.dasForUrl(url);
        var variable = variable;
        return rxjs_1.forkJoin(ddx$, das$, this.metadata.getGrid(host, file)).pipe(operators_1.switchMap(([ddx, das, latsAndLngs]) => {
            const lats = latsAndLngs[0];
            const lngs = latsAndLngs[1];
            var latIndex = this.indexInDimension(pt.lat, lats);
            var lngIndex = this.indexInDimension(pt.lng, lngs);
            if (fillValue === undefined) {
                fillValue = +ddx.variables[variable]._FillValue;
            }
            var query = this.makeTimeQuery(ddx, variable, latIndex, lngIndex, additionalIndices);
            return this.dap.getData(`${url}.ascii?${variable}${query}`, das);
        }), operators_1.map((data) => {
            let vals = data[variable];
            if (!vals.length) {
                vals = [data[variable]];
            }
            return {
                dates: (data.time || data.t),
                values: vals.map(v => (v === fillValue) ? NaN : v)
            };
        }));
    }
    getTimeseriesForLayer(ml, pt) {
        return this.getTimeseries(ml.flattenedSettings.host, ml.interpolatedFile, ml.flattenedSettings.layer || ml.flattenedSettings.variable, pt, null, ml.flattenedSettings.fillValue);
    }
    makeTimeQuery(ddx, variable, latIndex, lngIndex, additionalIndices) {
        var metadata = ddx.variables[variable];
        var query = '';
        metadata.dimensions.forEach((dim) => {
            var dName = dim.name.toLowerCase();
            if (metadata_service_1.TIME_NAMES.indexOf(dName) >= 0) {
                query += this.dapRangeQuery(0, +(dim.size) - 1);
            }
            else if (metadata_service_1.LAT_NAMES.indexOf(dName) >= 0) {
                query += this.dapRangeQuery(latIndex);
            }
            else if (metadata_service_1.LNG_NAMES.indexOf(dName) >= 0) {
                query += this.dapRangeQuery(lngIndex);
            }
            else {
                query += this.dapRangeQuery(additionalIndices[dName] || 0);
            }
        });
        return query;
    }
    dapRangeQuery(from, to, step) {
        step = step || 1;
        if (to === undefined) {
            to = from;
        }
        return '[' + from + ':' + step + ':' + to + ']';
    }
    indexInDimension(c, dim, trim) {
        var minIndex = 0;
        var maxIndex = dim.length - 1;
        if (trim) {
            maxIndex -= trim;
        }
        const rev = dim[0] > dim[dim.length - 1];
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
    }
    ;
};
TimeseriesService.ctorParameters = () => [
    { type: metadata_service_1.MetadataService },
    { type: opendap_service_1.OpendapService }
];
TimeseriesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService, opendap_service_1.OpendapService])
], TimeseriesService);
exports.TimeseriesService = TimeseriesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJ0aW1lc2VyaWVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFHM0MsdURBQW1EO0FBQ25ELHlEQUF1RjtBQUd2RiwrQkFBNEM7QUFDNUMsOENBQWdEO0FBaUIvQyxDQUFDO0FBR0YsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsWUFBb0IsUUFBd0IsRUFBUyxHQUFrQjtRQUFuRCxhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQWU7SUFFdkUsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFnQixFQUFDLElBQVcsRUFBQyxRQUFlLEVBQzVDLEVBQXdCLEVBQUMsaUJBQXFCLEVBQzlDLFNBQWlCO1FBQzdCLGlCQUFpQixHQUFHLGlCQUFpQixJQUFJLEVBQUUsQ0FBQztRQUM1QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLE9BQU8sZUFBUSxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQ3hFLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLFdBQVcsQ0FBQyxFQUFDLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQXlCLFdB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QUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBQztnQkFDbEIsT0FBTyxRQUFRLENBQUM7YUFDakI7WUFFRCxJQUFHLENBQUMsSUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUM7Z0JBQ2xCLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1lBRUQsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFckQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpDLElBQUcsR0FBRyxFQUFDO2dCQUNMLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtvQkFDVixRQUFRLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztpQkFDL0I7cUJBQU07b0JBQ0gsUUFBUSxHQUFHLFlBQVksQ0FBQztpQkFDM0I7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7aUJBQy9CO3FCQUFNO29CQUNILFFBQVEsR0FBRyxZQUFZLENBQUM7aUJBQzNCO2FBQ0Y7U0FDRjtRQUNELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFBQSxDQUFDO0NBRUgsQ0FBQTs7WUF0SDhCLGtDQUFlO1lBQWEsZ0NBQWM7O0FBRjVELGlCQUFpQjtJQUQ3QixpQkFBVSxFQUFFO3FDQUdrQixrQ0FBZSxFQUFhLGdDQUFjO0dBRjVELGlCQUFpQixDQXdIN0I7QUF4SFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IExhdExuZyB9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSwgTEFUX05BTUVTLCBMTkdfTkFNRVMsIFRJTUVfTkFNRVMgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFwRERYLCBEYXBEQVMsIERhcERhdGEgfSBmcm9tICdkYXAtcXVlcnktanMvZGlzdC9kYXAtcXVlcnknO1xuaW1wb3J0IHsgQ2F0YWxvZ0hvc3QsIExheWVyIH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRpbWVTZXJpZXN7XG4gIGRhdGVzOkFycmF5PERhdGU+O1xuICB2YWx1ZXM6QXJyYXk8bnVtYmVyPjtcbiAgbGFiZWw/OnN0cmluZztcbiAgdGFncz86e1xuICAgIFtrZXk6c3RyaW5nXTphbnlcbiAgfTtcbiAgc3R5bGU/OnN0cmluZztcbiAgdW5pdHM/OnN0cmluZztcbiAgW2tleTpzdHJpbmddOmFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTaW1wbGVMYXRMbmd7XG4gIGxhdDpudW1iZXIsXG4gIGxuZzpudW1iZXJcbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2UscHJpdmF0ZSBkYXA6T3BlbmRhcFNlcnZpY2UpIHtcblxuICB9XG5cbiAgZ2V0VGltZXNlcmllcyhob3N0OkNhdGFsb2dIb3N0LGZpbGU6c3RyaW5nLHZhcmlhYmxlOnN0cmluZyxcbiAgICAgICAgICAgICAgICBwdDooTGF0TG5nfFNpbXBsZUxhdExuZyksYWRkaXRpb25hbEluZGljZXM6YW55LFxuICAgICAgICAgICAgICAgIGZpbGxWYWx1ZT86bnVtYmVyKTpPYnNlcnZhYmxlPFRpbWVTZXJpZXM+e1xuICAgIGFkZGl0aW9uYWxJbmRpY2VzID0gYWRkaXRpb25hbEluZGljZXMgfHwge307XG4gICAgdmFyIHVybCA9IHRoaXMuZGFwLm1ha2VVUkwoaG9zdCxmaWxlKTtcbiAgICB2YXIgZGR4JCA9IHRoaXMubWV0YWRhdGEuZGR4Rm9yVXJsKHVybCk7XG4gICAgdmFyIGRhcyQgPSB0aGlzLm1ldGFkYXRhLmRhc0ZvclVybCh1cmwpO1xuICAgIHZhciB2YXJpYWJsZSA9IHZhcmlhYmxlO1xuICAgIHJldHVybiBmb3JrSm9pbihkZHgkLGRhcyQsdGhpcy5tZXRhZGF0YS5nZXRHcmlkKGhvc3QsZmlsZSkpLnBpcGUoc3dpdGNoTWFwKFxuICAgICAgKFtkZHgsZGFzLGxhdHNBbmRMbmdzXSk9PntcbiAgICAgICAgY29uc3QgbGF0czpudW1iZXJbXSA9ICg8bnVtYmVyW11bXT5sYXRzQW5kTG5ncylbMF07XG4gICAgICAgIGNvbnN0IGxuZ3M6bnVtYmVyW10gPSAoPG51bWJlcltdW10+bGF0c0FuZExuZ3MpWzFdO1xuICAgICAgdmFyIGxhdEluZGV4ID0gdGhpcy5pbmRleEluRGltZW5zaW9uKCg8YW55PnB0KS5sYXQsbGF0cyk7XG4gICAgICB2YXIgbG5nSW5kZXggPSB0aGlzLmluZGV4SW5EaW1lbnNpb24oKDxhbnk+cHQpLmxuZyxsbmdzKTtcbiAgICAgIGlmKGZpbGxWYWx1ZT09PXVuZGVmaW5lZCl7XG4gICAgICAgIGZpbGxWYWx1ZSA9ICsoPERhcEREWD5kZHgpLnZhcmlhYmxlc1t2YXJpYWJsZV0uX0ZpbGxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBxdWVyeSA9IHRoaXMubWFrZVRpbWVRdWVyeSg8RGFwRERYPmRkeCx2YXJpYWJsZSxsYXRJbmRleCxsbmdJbmRleCxhZGRpdGlvbmFsSW5kaWNlcyk7XG4gICAgICByZXR1cm4gdGhpcy5kYXAuZ2V0RGF0YShgJHt1cmx9LmFzY2lpPyR7dmFyaWFibGV9JHtxdWVyeX1gLDxEYXBEQVM+ZGFzKVxuICAgIH0pLG1hcCgoZGF0YTpEYXBEYXRhKT0+e1xuICAgICAgbGV0IHZhbHMgPSAoPG51bWJlcltdPiBkYXRhW3ZhcmlhYmxlXSk7XG4gICAgICBpZighdmFscy5sZW5ndGgpe1xuICAgICAgICB2YWxzID0gWzxudW1iZXI+ZGF0YVt2YXJpYWJsZV1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0ZXM6PEFycmF5PERhdGU+PiAoZGF0YS50aW1lfHxkYXRhLnQpLFxuICAgICAgICB2YWx1ZXM6dmFscy5tYXAodj0+KHY9PT1maWxsVmFsdWUpP05hTjp2KVxuICAgICAgfTtcbiAgICB9KSk7XG4gIH1cblxuICBnZXRUaW1lc2VyaWVzRm9yTGF5ZXIobWw6TWFwcGVkTGF5ZXIscHQ6TGF0TG5nKTpPYnNlcnZhYmxlPFRpbWVTZXJpZXM+e1xuICAgIHJldHVybiB0aGlzLmdldFRpbWVzZXJpZXMobWwuZmxhdHRlbmVkU2V0dGluZ3MuaG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sLmludGVycG9sYXRlZEZpbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtbC5mbGF0dGVuZWRTZXR0aW5ncy5sYXllcnx8bWwuZmxhdHRlbmVkU2V0dGluZ3MudmFyaWFibGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtbC5mbGF0dGVuZWRTZXR0aW5ncy5maWxsVmFsdWUpO1xuICB9XG5cblxuICBtYWtlVGltZVF1ZXJ5KGRkeDpEYXBERFgsdmFyaWFibGU6c3RyaW5nLGxhdEluZGV4Om51bWJlcixsbmdJbmRleDpudW1iZXIsYWRkaXRpb25hbEluZGljZXM6YW55KTpzdHJpbmd7XG4gICAgdmFyIG1ldGFkYXRhID0gZGR4LnZhcmlhYmxlc1t2YXJpYWJsZV07XG4gICAgdmFyIHF1ZXJ5PScnO1xuXG4gICAgbWV0YWRhdGEuZGltZW5zaW9ucy5mb3JFYWNoKChkaW06YW55KT0+e1xuICAgICAgdmFyIGROYW1lOnN0cmluZyA9IGRpbS5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZihUSU1FX05BTUVTLmluZGV4T2YoZE5hbWUpPj0wKXtcbiAgICAgICAgcXVlcnkgKz0gdGhpcy5kYXBSYW5nZVF1ZXJ5KDAsKyhkaW0uc2l6ZSktMSk7XG4gICAgICB9IGVsc2UgaWYoTEFUX05BTUVTLmluZGV4T2YoZE5hbWUpPj0wKXtcbiAgICAgICAgICBxdWVyeSArPSB0aGlzLmRhcFJhbmdlUXVlcnkobGF0SW5kZXgpO1xuICAgICAgfSBlbHNlIGlmKExOR19OQU1FUy5pbmRleE9mKGROYW1lKT49MCl7XG4gICAgICAgIHF1ZXJ5ICs9IHRoaXMuZGFwUmFuZ2VRdWVyeShsbmdJbmRleCk7XG4gICAgICB9IGVsc2UgeyBcbiAgICAgICAgcXVlcnkgKz0gdGhpcy5kYXBSYW5nZVF1ZXJ5KGFkZGl0aW9uYWxJbmRpY2VzW2ROYW1lXXx8MCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9XG5cbiAgZGFwUmFuZ2VRdWVyeShmcm9tOm51bWJlcix0bz86bnVtYmVyLHN0ZXA/Om51bWJlcik6c3RyaW5ne1xuICAgIHN0ZXAgPSBzdGVwIHx8IDE7XG4gICAgaWYodG89PT11bmRlZmluZWQpe1xuICAgICAgdG8gPSBmcm9tO1xuICAgIH1cbiAgICByZXR1cm4gJ1snK2Zyb20rJzonK3N0ZXArJzonK3RvKyddJztcbiAgfVxuXG4gIGluZGV4SW5EaW1lbnNpb24oYzpudW1iZXIsZGltOkFycmF5PG51bWJlcj4sdHJpbT86bnVtYmVyKTpudW1iZXJ7XG4gICAgdmFyIG1pbkluZGV4ID0gMDtcbiAgICB2YXIgbWF4SW5kZXggPSBkaW0ubGVuZ3RoLTE7XG5cbiAgICBpZih0cmltKXtcbiAgICAgIG1heEluZGV4LT10cmltO1xuICAgIH1cblxuICAgIGNvbnN0IHJldiA9IGRpbVswXSA+IGRpbVtkaW0ubGVuZ3RoLTFdO1xuICAgIGlmKHJldil7XG4gICAgICBtaW5JbmRleCA9IG1heEluZGV4O1xuICAgICAgbWF4SW5kZXggPSAwO1xuICAgIH1cbiAgICB2YXIgY3VycmVudEluZGV4O1xuXG4gICAgd2hpbGUoKG1pbkluZGV4PD1tYXhJbmRleCl8fChyZXYmJihtYXhJbmRleDw9bWluSW5kZXgpKSl7XG4gICAgICBpZihjPD1kaW1bbWluSW5kZXhdKXtcbiAgICAgICAgcmV0dXJuIG1pbkluZGV4O1xuICAgICAgfVxuXG4gICAgICBpZihjPj1kaW1bbWF4SW5kZXhdKXtcbiAgICAgICAgcmV0dXJuIG1heEluZGV4O1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpO1xuXG4gICAgICB2YXIgZDEgPSBNYXRoLmFicyhkaW1bY3VycmVudEluZGV4XS1jKTtcbiAgICAgIHZhciBkMiA9IE1hdGguYWJzKGRpbVtjdXJyZW50SW5kZXgrMV0tYyk7XG5cbiAgICAgIGlmKHJldil7XG4gICAgICAgIGlmIChkMiA8PSBkMSkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkMiA8PSBkMSkge1xuICAgICAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgfTtcblxufVxuIl19