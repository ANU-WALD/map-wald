import { Injectable } from '@angular/core';
import { OpendapService } from './opendap.service';
import { MetadataService, LAT_NAMES, LNG_NAMES, TIME_NAMES } from './metadata.service';
import { forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
;
export class TimeseriesService {
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
        return forkJoin(ddx$, das$, this.metadata.getGrid(host, file)).pipe(switchMap(([ddx, das, latsAndLngs]) => {
            const lats = latsAndLngs[0];
            const lngs = latsAndLngs[1];
            var latIndex = this.indexInDimension(pt.lat, lats);
            var lngIndex = this.indexInDimension(pt.lng, lngs);
            if (fillValue === undefined) {
                fillValue = +ddx.variables[variable]._FillValue;
            }
            var query = this.makeTimeQuery(ddx, variable, latIndex, lngIndex, additionalIndices);
            return this.dap.getData(`${url}.ascii?${variable}${query}`, das);
        }), map((data) => {
            let vals = data[variable];
            if (!vals.length) {
                vals = [data[variable]];
            }
            let dates = (data.time || data.t);
            if (dates && !dates.length) {
                dates = [data.time || data.t];
            }
            return {
                dates: dates,
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
            if (TIME_NAMES.indexOf(dName) >= 0) {
                query += this.dapRangeQuery(0, +(dim.size) - 1);
            }
            else if (LAT_NAMES.indexOf(dName) >= 0) {
                query += this.dapRangeQuery(latIndex);
            }
            else if (LNG_NAMES.indexOf(dName) >= 0) {
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
}
TimeseriesService.decorators = [
    { type: Injectable }
];
TimeseriesService.ctorParameters = () => [
    { type: MetadataService },
    { type: OpendapService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3RpbWVzZXJpZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHdkYsT0FBTyxFQUFFLFFBQVEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM1QyxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBMEIvQyxDQUFDO0FBR0YsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixZQUFvQixRQUF3QixFQUFTLEdBQWtCO1FBQW5ELGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQVMsUUFBRyxHQUFILEdBQUcsQ0FBZTtJQUV2RSxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWdCLEVBQUMsSUFBVyxFQUFDLFFBQWUsRUFDNUMsRUFBd0IsRUFBQyxpQkFBcUIsRUFDOUMsU0FBaUI7UUFDN0IsaUJBQWlCLEdBQUcsaUJBQWlCLElBQUksRUFBRSxDQUFDO1FBQzVDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDeEIsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksRUFB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L0I7cUJBQU07b0JBQ0gsUUFBUSxHQUFHLFlBQVksQ0FBQztpQkFDM0I7YUFDRjtTQUNGO1FBQ0QsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUFBLENBQUM7OztZQTNISCxVQUFVOzs7WUFoQ0YsZUFBZTtZQURmLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgT3BlbmRhcFNlcnZpY2UgfSBmcm9tICcuL29wZW5kYXAuc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UsIExBVF9OQU1FUywgTE5HX05BTUVTLCBUSU1FX05BTUVTIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IERhcEREWCwgRGFwREFTLCBEYXBEYXRhIH0gZnJvbSAnZGFwLXF1ZXJ5LWpzL2Rpc3QvZGFwLXF1ZXJ5JztcbmltcG9ydCB7IENhdGFsb2dIb3N0IH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgZm9ya0pvaW4sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVVRDRGF0ZSB9IGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBMYXRMbmcge1xuICAvLyBnb29nbGUgbWFwc1xuICBsYXQoKTogbnVtYmVyO1xuICBsbmcoKTogbnVtYmVyO1xuICB0b0pTT04oKTogYW55O1xuICB0b1N0cmluZygpOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGltZVNlcmllc3tcbiAgZGF0ZXM6QXJyYXk8VVRDRGF0ZT47XG4gIHZhbHVlczpBcnJheTxudW1iZXI+O1xuICBsYWJlbD86c3RyaW5nO1xuICB0YWdzPzp7XG4gICAgW2tleTpzdHJpbmddOmFueVxuICB9O1xuICBzdHlsZT86c3RyaW5nO1xuICB1bml0cz86c3RyaW5nO1xuICBba2V5OnN0cmluZ106YW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpbXBsZUxhdExuZ3tcbiAgbGF0Om51bWJlcixcbiAgbG5nOm51bWJlclxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRpbWVzZXJpZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSxwcml2YXRlIGRhcDpPcGVuZGFwU2VydmljZSkge1xuXG4gIH1cblxuICBnZXRUaW1lc2VyaWVzKGhvc3Q6Q2F0YWxvZ0hvc3QsZmlsZTpzdHJpbmcsdmFyaWFibGU6c3RyaW5nLFxuICAgICAgICAgICAgICAgIHB0OihMYXRMbmd8U2ltcGxlTGF0TG5nKSxhZGRpdGlvbmFsSW5kaWNlczphbnksXG4gICAgICAgICAgICAgICAgZmlsbFZhbHVlPzpudW1iZXIpOk9ic2VydmFibGU8VGltZVNlcmllcz57XG4gICAgYWRkaXRpb25hbEluZGljZXMgPSBhZGRpdGlvbmFsSW5kaWNlcyB8fCB7fTtcbiAgICB2YXIgdXJsID0gdGhpcy5kYXAubWFrZVVSTChob3N0LGZpbGUpO1xuICAgIHZhciBkZHgkID0gdGhpcy5tZXRhZGF0YS5kZHhGb3JVcmwodXJsKTtcbiAgICB2YXIgZGFzJCA9IHRoaXMubWV0YWRhdGEuZGFzRm9yVXJsKHVybCk7XG4gICAgdmFyIHZhcmlhYmxlID0gdmFyaWFibGU7XG4gICAgcmV0dXJuIGZvcmtKb2luKGRkeCQsZGFzJCx0aGlzLm1ldGFkYXRhLmdldEdyaWQoaG9zdCxmaWxlKSkucGlwZShzd2l0Y2hNYXAoXG4gICAgICAoW2RkeCxkYXMsbGF0c0FuZExuZ3NdKT0+e1xuICAgICAgICBjb25zdCBsYXRzOm51bWJlcltdID0gKDxudW1iZXJbXVtdPmxhdHNBbmRMbmdzKVswXTtcbiAgICAgICAgY29uc3QgbG5nczpudW1iZXJbXSA9ICg8bnVtYmVyW11bXT5sYXRzQW5kTG5ncylbMV07XG4gICAgICB2YXIgbGF0SW5kZXggPSB0aGlzLmluZGV4SW5EaW1lbnNpb24oKDxhbnk+cHQpLmxhdCxsYXRzKTtcbiAgICAgIHZhciBsbmdJbmRleCA9IHRoaXMuaW5kZXhJbkRpbWVuc2lvbigoPGFueT5wdCkubG5nLGxuZ3MpO1xuICAgICAgaWYoZmlsbFZhbHVlPT09dW5kZWZpbmVkKXtcbiAgICAgICAgZmlsbFZhbHVlID0gKyg8RGFwRERYPmRkeCkudmFyaWFibGVzW3ZhcmlhYmxlXS5fRmlsbFZhbHVlO1xuICAgICAgfVxuICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5tYWtlVGltZVF1ZXJ5KDxEYXBERFg+ZGR4LHZhcmlhYmxlLGxhdEluZGV4LGxuZ0luZGV4LGFkZGl0aW9uYWxJbmRpY2VzKTtcbiAgICAgIHJldHVybiB0aGlzLmRhcC5nZXREYXRhKGAke3VybH0uYXNjaWk/JHt2YXJpYWJsZX0ke3F1ZXJ5fWAsPERhcERBUz5kYXMpXG4gICAgfSksbWFwKChkYXRhOkRhcERhdGEpPT57XG4gICAgICBsZXQgdmFscyA9ICg8bnVtYmVyW10+IGRhdGFbdmFyaWFibGVdKTtcbiAgICAgIGlmKCF2YWxzLmxlbmd0aCl7XG4gICAgICAgIHZhbHMgPSBbPG51bWJlcj5kYXRhW3ZhcmlhYmxlXV07XG4gICAgICB9XG4gICAgICBsZXQgZGF0ZXMgPSA8VVRDRGF0ZVtdPihkYXRhLnRpbWV8fGRhdGEudCk7XG4gICAgICBpZihkYXRlcyYmIWRhdGVzLmxlbmd0aCl7XG4gICAgICAgIGRhdGVzID0gPFVUQ0RhdGVbXT5bZGF0YS50aW1lfHxkYXRhLnRdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0ZXM6ZGF0ZXMsXG4gICAgICAgIHZhbHVlczp2YWxzLm1hcCh2PT4odj09PWZpbGxWYWx1ZSk/TmFOOnYpXG4gICAgICB9O1xuICAgIH0pKTtcbiAgfVxuXG4gIGdldFRpbWVzZXJpZXNGb3JMYXllcihtbDpNYXBwZWRMYXllcixwdDpMYXRMbmcpOk9ic2VydmFibGU8VGltZVNlcmllcz57XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGltZXNlcmllcyhtbC5mbGF0dGVuZWRTZXR0aW5ncy5ob3N0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWwuaW50ZXJwb2xhdGVkRmlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sLmZsYXR0ZW5lZFNldHRpbmdzLmxheWVyfHxtbC5mbGF0dGVuZWRTZXR0aW5ncy52YXJpYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1sLmZsYXR0ZW5lZFNldHRpbmdzLmZpbGxWYWx1ZSk7XG4gIH1cblxuXG4gIG1ha2VUaW1lUXVlcnkoZGR4OkRhcEREWCx2YXJpYWJsZTpzdHJpbmcsbGF0SW5kZXg6bnVtYmVyLGxuZ0luZGV4Om51bWJlcixhZGRpdGlvbmFsSW5kaWNlczphbnkpOnN0cmluZ3tcbiAgICB2YXIgbWV0YWRhdGEgPSBkZHgudmFyaWFibGVzW3ZhcmlhYmxlXTtcbiAgICB2YXIgcXVlcnk9Jyc7XG5cbiAgICBtZXRhZGF0YS5kaW1lbnNpb25zLmZvckVhY2goKGRpbTphbnkpPT57XG4gICAgICB2YXIgZE5hbWU6c3RyaW5nID0gZGltLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmKFRJTUVfTkFNRVMuaW5kZXhPZihkTmFtZSk+PTApe1xuICAgICAgICBxdWVyeSArPSB0aGlzLmRhcFJhbmdlUXVlcnkoMCwrKGRpbS5zaXplKS0xKTtcbiAgICAgIH0gZWxzZSBpZihMQVRfTkFNRVMuaW5kZXhPZihkTmFtZSk+PTApe1xuICAgICAgICAgIHF1ZXJ5ICs9IHRoaXMuZGFwUmFuZ2VRdWVyeShsYXRJbmRleCk7XG4gICAgICB9IGVsc2UgaWYoTE5HX05BTUVTLmluZGV4T2YoZE5hbWUpPj0wKXtcbiAgICAgICAgcXVlcnkgKz0gdGhpcy5kYXBSYW5nZVF1ZXJ5KGxuZ0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5ICs9IHRoaXMuZGFwUmFuZ2VRdWVyeShhZGRpdGlvbmFsSW5kaWNlc1tkTmFtZV18fDApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBxdWVyeTtcbiAgfVxuXG4gIGRhcFJhbmdlUXVlcnkoZnJvbTpudW1iZXIsdG8/Om51bWJlcixzdGVwPzpudW1iZXIpOnN0cmluZ3tcbiAgICBzdGVwID0gc3RlcCB8fCAxO1xuICAgIGlmKHRvPT09dW5kZWZpbmVkKXtcbiAgICAgIHRvID0gZnJvbTtcbiAgICB9XG4gICAgcmV0dXJuICdbJytmcm9tKyc6JytzdGVwKyc6Jyt0bysnXSc7XG4gIH1cblxuICBpbmRleEluRGltZW5zaW9uKGM6bnVtYmVyLGRpbTpBcnJheTxudW1iZXI+LHRyaW0/Om51bWJlcik6bnVtYmVye1xuICAgIHZhciBtaW5JbmRleCA9IDA7XG4gICAgdmFyIG1heEluZGV4ID0gZGltLmxlbmd0aC0xO1xuXG4gICAgaWYodHJpbSl7XG4gICAgICBtYXhJbmRleC09dHJpbTtcbiAgICB9XG5cbiAgICBjb25zdCByZXYgPSBkaW1bMF0gPiBkaW1bZGltLmxlbmd0aC0xXTtcbiAgICBpZihyZXYpe1xuICAgICAgbWluSW5kZXggPSBtYXhJbmRleDtcbiAgICAgIG1heEluZGV4ID0gMDtcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRJbmRleDtcblxuICAgIHdoaWxlKChtaW5JbmRleDw9bWF4SW5kZXgpfHwocmV2JiYobWF4SW5kZXg8PW1pbkluZGV4KSkpe1xuICAgICAgaWYoYzw9ZGltW21pbkluZGV4XSl7XG4gICAgICAgIHJldHVybiBtaW5JbmRleDtcbiAgICAgIH1cblxuICAgICAgaWYoYz49ZGltW21heEluZGV4XSl7XG4gICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudEluZGV4ID0gTWF0aC5mbG9vcigobWluSW5kZXggKyBtYXhJbmRleCkgLyAyKTtcblxuICAgICAgdmFyIGQxID0gTWF0aC5hYnMoZGltW2N1cnJlbnRJbmRleF0tYyk7XG4gICAgICB2YXIgZDIgPSBNYXRoLmFicyhkaW1bY3VycmVudEluZGV4KzFdLWMpO1xuXG4gICAgICBpZihyZXYpe1xuICAgICAgICBpZiAoZDIgPD0gZDEpIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZDIgPD0gZDEpIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjdXJyZW50SW5kZXg7XG4gIH07XG5cbn1cbiJdfQ==