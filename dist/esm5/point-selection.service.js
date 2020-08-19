import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { InterpolationService } from './interpolation.service';
import { MetadataService } from './metadata.service';
import { map } from 'rxjs/operators';
var PointSelectionService = /** @class */ (function () {
    function PointSelectionService(meta) {
        this.meta = meta;
        this.latestPointSelectionSource = new BehaviorSubject(null);
        this.latestPointSelection = this.latestPointSelectionSource.asObservable();
    }
    PointSelectionService.prototype.unchanged = function (current, updated) {
        if (!current && !updated) {
            return true;
        }
        if (!current || !updated) {
            return false;
        }
        if (current.variable !== updated.variable) {
            return false;
        }
        if (!Object.keys(current.tags).every(function (t) { return current.tags[t] === updated.tags[t]; })) {
            return false;
        }
        if (current.catalog.url !== updated.catalog.url) {
            return false;
        }
        if (current.feature !== updated.feature) {
            return false;
        }
        return true;
        // return false; // TODO
    };
    PointSelectionService.prototype.pointSelection = function (sel) {
        var current = this.latestPointSelectionSource.getValue();
        if (this.unchanged(current, sel)) {
            return;
        }
        var url = this.fullUrl(sel);
        if (!this.validUrl(url)) {
            return; // Not a complete selection
        }
        if (!sel.variable) {
            return; // Not a complete selection
        }
        this.latestPointSelectionSource.next(sel);
    };
    PointSelectionService.prototype.fullUrl = function (sel) {
        var params = Object.assign({}, sel.feature ? sel.feature.properties : {}, sel.tags);
        return InterpolationService.interpolate(sel.catalog.url, params);
    };
    PointSelectionService.prototype.validUrl = function (url) {
        return url.indexOf('{{') < 0;
    };
    PointSelectionService.prototype.timeseriesVariables = function (sel) {
        var coords = sel.catalog.coordinates || {};
        var url = this.fullUrl(sel);
        if (!this.validUrl(url)) {
            return of([]);
        }
        return this.meta.ddxForUrl(url).pipe(map(function (ddx) {
            var variables = ddx.variables;
            var variableNames = Object.keys(variables).filter(function (v) {
                var dims = ddx.variables[v].dimensions;
                return Object.keys(coords).every(function (coord) {
                    return dims.find(function (dim) { return dim.name === coord; });
                });
            });
            return variableNames.map(function (v) {
                if (sel.catalog && sel.catalog.displayFormat) {
                    var fmt = Object.assign({ variable: v }, ddx.variables[v]);
                    return {
                        value: v,
                        label: InterpolationService.interpolate(sel.catalog.displayFormat, fmt)
                    };
                }
                if (ddx.variables[v].long_name) {
                    return {
                        value: v,
                        label: ddx.variables[v].long_name
                    };
                }
                return {
                    value: v,
                    label: v
                };
            });
        }));
    };
    PointSelectionService.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    PointSelectionService.decorators = [
        { type: Injectable }
    ];
    PointSelectionService.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    return PointSelectionService;
}());
export { PointSelectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInBvaW50LXNlbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGVBQWUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVNyQztJQUtFLCtCQUFvQixJQUFxQjtRQUFyQixTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUhqQywrQkFBMEIsR0FBRyxJQUFJLGVBQWUsQ0FBaUIsSUFBSSxDQUFDLENBQUM7UUFDL0UseUJBQW9CLEdBQThCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUlqRyxDQUFDO0lBQ08seUNBQVMsR0FBakIsVUFBa0IsT0FBc0IsRUFBQyxPQUFzQjtRQUM3RCxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBQztZQUN2QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFD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QUVILE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7Z0JBQ3hCLElBQUcsR0FBRyxDQUFDLE9BQU8sSUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQztvQkFDeEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE9BQU87d0JBQ0wsS0FBSyxFQUFDLENBQUM7d0JBQ1AsS0FBSyxFQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUM7cUJBQ3RFLENBQUE7aUJBQ0Y7Z0JBQ0QsSUFBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQztvQkFDNUIsT0FBTzt3QkFDTCxLQUFLLEVBQUMsQ0FBQzt3QkFDUCxLQUFLLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO3FCQUNqQyxDQUFDO2lCQUNIO2dCQUNELE9BQU87b0JBQ0wsS0FBSyxFQUFDLENBQUM7b0JBQ1AsS0FBSyxFQUFDLENBQUM7aUJBQ1IsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7O2dCQWxHeUIsZUFBZTs7O2dCQUwxQyxVQUFVOzs7Z0JBVkYsZUFBZTs7SUFrSHhCLDRCQUFDO0NBQUEsQUF4R0QsSUF3R0M7U0F2R1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9pbnREYXRhLCBDYXRhbG9nLCBMYXllclRhZ1ZhbHVlIH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgRmVhdHVyZSwgR2VvbWV0cnlPYmplY3QgfSBmcm9tICdnZW9qc29uJztcbmltcG9ydCB7IEludGVycG9sYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbnRlcnBvbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBQb2ludFNlbGVjdGlvbiB7XG4gIGNhdGFsb2c6IFBvaW50RGF0YSxcbiAgdmFyaWFibGU6c3RyaW5nLFxuICBmZWF0dXJlOkZlYXR1cmU8R2VvbWV0cnlPYmplY3Q+LFxuICB0YWdzOiB7W2tleTpzdHJpbmddOnN0cmluZ31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvaW50U2VsZWN0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgbGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvaW50U2VsZWN0aW9uPihudWxsKTtcbiAgbGF0ZXN0UG9pbnRTZWxlY3Rpb246T2JzZXJ2YWJsZTxQb2ludFNlbGVjdGlvbj4gPSB0aGlzLmxhdGVzdFBvaW50U2VsZWN0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YTogTWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuICBwcml2YXRlIHVuY2hhbmdlZChjdXJyZW50OlBvaW50U2VsZWN0aW9uLHVwZGF0ZWQ6UG9pbnRTZWxlY3Rpb24pe1xuICAgIGlmKCFjdXJyZW50ICYmICF1cGRhdGVkKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmKCFjdXJyZW50IHx8ICF1cGRhdGVkKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50LnZhcmlhYmxlICE9PSB1cGRhdGVkLnZhcmlhYmxlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZighT2JqZWN0LmtleXMoY3VycmVudC50YWdzKS5ldmVyeSh0PT5jdXJyZW50LnRhZ3NbdF09PT11cGRhdGVkLnRhZ3NbdF0pKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50LmNhdGFsb2cudXJsIT09dXBkYXRlZC5jYXRhbG9nLnVybCl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoY3VycmVudC5mZWF0dXJlIT09dXBkYXRlZC5mZWF0dXJlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyByZXR1cm4gZmFsc2U7IC8vIFRPRE9cbiAgfVxuXG4gIHBvaW50U2VsZWN0aW9uKHNlbDogUG9pbnRTZWxlY3Rpb24pIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMubGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UuZ2V0VmFsdWUoKTtcbiAgICBpZih0aGlzLnVuY2hhbmdlZChjdXJyZW50LHNlbCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSB0aGlzLmZ1bGxVcmwoc2VsKTtcbiAgICBpZighdGhpcy52YWxpZFVybCh1cmwpKXtcbiAgICAgIHJldHVybjsgLy8gTm90IGEgY29tcGxldGUgc2VsZWN0aW9uXG4gICAgfVxuXG4gICAgaWYoIXNlbC52YXJpYWJsZSl7XG4gICAgICByZXR1cm47IC8vIE5vdCBhIGNvbXBsZXRlIHNlbGVjdGlvblxuICAgIH1cblxuICAgIHRoaXMubGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UubmV4dChzZWwpO1xuICB9XG5cbiAgZnVsbFVybChzZWw6UG9pbnRTZWxlY3Rpb24pIHtcbiAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWwuZmVhdHVyZT9zZWwuZmVhdHVyZS5wcm9wZXJ0aWVzOnt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbC50YWdzKTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoc2VsLmNhdGFsb2cudXJsLHBhcmFtcyk7XG4gIH1cblxuICB2YWxpZFVybCh1cmw6c3RyaW5nKTpib29sZWFue1xuICAgIHJldHVybiB1cmwuaW5kZXhPZigne3snKTwwO1xuICB9XG5cbiAgdGltZXNlcmllc1ZhcmlhYmxlcyhzZWw6UG9pbnRTZWxlY3Rpb24pOk9ic2VydmFibGU8TGF5ZXJUYWdWYWx1ZVtdPntcbiAgICBsZXQgY29vcmRzID0gc2VsLmNhdGFsb2cuY29vcmRpbmF0ZXMgfHwge307XG4gICAgbGV0IHVybCA9IHRoaXMuZnVsbFVybChzZWwpO1xuICAgIGlmKCF0aGlzLnZhbGlkVXJsKHVybCkpe1xuICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZXRhLmRkeEZvclVybCh1cmwpLnBpcGUoXG4gICAgICBtYXAoZGR4PT57XG4gICAgICAgIGxldCB2YXJpYWJsZXMgPSBkZHgudmFyaWFibGVzO1xuICAgICAgICBsZXQgdmFyaWFibGVOYW1lcyA9IE9iamVjdC5rZXlzKHZhcmlhYmxlcykuZmlsdGVyKHY9PntcbiAgICAgICAgICBsZXQgZGltczphbnlbXSA9IGRkeC52YXJpYWJsZXNbdl0uZGltZW5zaW9ucztcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29vcmRzKS5ldmVyeShjb29yZD0+e1xuICAgICAgICAgICAgcmV0dXJuIGRpbXMuZmluZChkaW09PmRpbS5uYW1lPT09Y29vcmQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFyaWFibGVOYW1lcy5tYXAodj0+e1xuICAgICAgICAgIGlmKHNlbC5jYXRhbG9nJiZzZWwuY2F0YWxvZy5kaXNwbGF5Rm9ybWF0KXtcbiAgICAgICAgICAgIGxldCBmbXQgPSBPYmplY3QuYXNzaWduKHt2YXJpYWJsZTp2fSxkZHgudmFyaWFibGVzW3ZdKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOnYsXG4gICAgICAgICAgICAgIGxhYmVsOkludGVycG9sYXRpb25TZXJ2aWNlLmludGVycG9sYXRlKHNlbC5jYXRhbG9nLmRpc3BsYXlGb3JtYXQsZm10KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihkZHgudmFyaWFibGVzW3ZdLmxvbmdfbmFtZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTp2LFxuICAgICAgICAgICAgICBsYWJlbDpkZHgudmFyaWFibGVzW3ZdLmxvbmdfbmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOnYsXG4gICAgICAgICAgICBsYWJlbDp2XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cbn1cbiJdfQ==