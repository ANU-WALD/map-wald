import * as tslib_1 from "tslib";
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
    PointSelectionService = tslib_1.__decorate([
        Injectable()
    ], PointSelectionService);
    return PointSelectionService;
}());
export { PointSelectionService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInBvaW50LXNlbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVckM7SUFJRSwrQkFBb0IsSUFBcUI7UUFBckIsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFIakMsK0JBQTBCLEdBQUcsSUFBSSxlQUFlLENBQWlCLElBQUksQ0FBQyxDQUFDO1FBQy9FLHlCQUFvQixHQUE4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFJakcsQ0FBQztJQUNPLHlDQUFTLEdBQWpCLFVBQWtCLE9BQXNCLEVBQUMsT0FBc0I7UUFDN0QsSUFBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBQztZQUN0QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBQztZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBRyxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQUM7WUFDdkMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FB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WUFFSCxPQUFPLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUN4QixJQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUM7b0JBQ3hDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxPQUFPO3dCQUNMLEtBQUssRUFBQyxDQUFDO3dCQUNQLEtBQUssRUFBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDO3FCQUN0RSxDQUFBO2lCQUNGO2dCQUNELElBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUM7b0JBQzVCLE9BQU87d0JBQ0wsS0FBSyxFQUFDLENBQUM7d0JBQ1AsS0FBSyxFQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztxQkFDakMsQ0FBQztpQkFDSDtnQkFDRCxPQUFPO29CQUNMLEtBQUssRUFBQyxDQUFDO29CQUNQLEtBQUssRUFBQyxDQUFDO2lCQUNSLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOztnQkFsR3lCLGVBQWU7O0lBSjlCLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7T0FDQSxxQkFBcUIsQ0F1R2pDO0lBQUQsNEJBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXZHWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb2ludERhdGEsIENhdGFsb2csIExheWVyVGFnVmFsdWUgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBGZWF0dXJlLCBHZW9tZXRyeU9iamVjdCB9IGZyb20gJ2dlb2pzb24nO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBvaW50U2VsZWN0aW9uIHtcbiAgY2F0YWxvZzogUG9pbnREYXRhLFxuICB2YXJpYWJsZTpzdHJpbmcsXG4gIGZlYXR1cmU6RmVhdHVyZTxHZW9tZXRyeU9iamVjdD4sXG4gIHRhZ3M6IHtba2V5OnN0cmluZ106c3RyaW5nfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBsYXRlc3RQb2ludFNlbGVjdGlvblNvdXJjZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UG9pbnRTZWxlY3Rpb24+KG51bGwpO1xuICBsYXRlc3RQb2ludFNlbGVjdGlvbjpPYnNlcnZhYmxlPFBvaW50U2VsZWN0aW9uPiA9IHRoaXMubGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXRhOiBNZXRhZGF0YVNlcnZpY2UpIHtcblxuICB9XG4gIHByaXZhdGUgdW5jaGFuZ2VkKGN1cnJlbnQ6UG9pbnRTZWxlY3Rpb24sdXBkYXRlZDpQb2ludFNlbGVjdGlvbil7XG4gICAgaWYoIWN1cnJlbnQgJiYgIXVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYoIWN1cnJlbnQgfHwgIXVwZGF0ZWQpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKGN1cnJlbnQudmFyaWFibGUgIT09IHVwZGF0ZWQudmFyaWFibGUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCFPYmplY3Qua2V5cyhjdXJyZW50LnRhZ3MpLmV2ZXJ5KHQ9PmN1cnJlbnQudGFnc1t0XT09PXVwZGF0ZWQudGFnc1t0XSkpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKGN1cnJlbnQuY2F0YWxvZy51cmwhPT11cGRhdGVkLmNhdGFsb2cudXJsKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50LmZlYXR1cmUhPT11cGRhdGVkLmZlYXR1cmUpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICAgIC8vIHJldHVybiBmYWxzZTsgLy8gVE9ET1xuICB9XG5cbiAgcG9pbnRTZWxlY3Rpb24oc2VsOiBQb2ludFNlbGVjdGlvbikge1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5sYXRlc3RQb2ludFNlbGVjdGlvblNvdXJjZS5nZXRWYWx1ZSgpO1xuICAgIGlmKHRoaXMudW5jaGFuZ2VkKGN1cnJlbnQsc2VsKSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHVybCA9IHRoaXMuZnVsbFVybChzZWwpO1xuICAgIGlmKCF0aGlzLnZhbGlkVXJsKHVybCkpe1xuICAgICAgcmV0dXJuOyAvLyBOb3QgYSBjb21wbGV0ZSBzZWxlY3Rpb25cbiAgICB9XG5cbiAgICBpZighc2VsLnZhcmlhYmxlKXtcbiAgICAgIHJldHVybjsgLy8gTm90IGEgY29tcGxldGUgc2VsZWN0aW9uXG4gICAgfVxuXG4gICAgdGhpcy5sYXRlc3RQb2ludFNlbGVjdGlvblNvdXJjZS5uZXh0KHNlbCk7XG4gIH1cblxuICBmdWxsVXJsKHNlbDpQb2ludFNlbGVjdGlvbikge1xuICAgIGxldCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbC5mZWF0dXJlP3NlbC5mZWF0dXJlLnByb3BlcnRpZXM6e30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsLnRhZ3MpO1xuICAgIHJldHVybiBJbnRlcnBvbGF0aW9uU2VydmljZS5pbnRlcnBvbGF0ZShzZWwuY2F0YWxvZy51cmwscGFyYW1zKTtcbiAgfVxuXG4gIHZhbGlkVXJsKHVybDpzdHJpbmcpOmJvb2xlYW57XG4gICAgcmV0dXJuIHVybC5pbmRleE9mKCd7eycpPDA7XG4gIH1cblxuICB0aW1lc2VyaWVzVmFyaWFibGVzKHNlbDpQb2ludFNlbGVjdGlvbik6T2JzZXJ2YWJsZTxMYXllclRhZ1ZhbHVlW10+e1xuICAgIGxldCBjb29yZHMgPSBzZWwuY2F0YWxvZy5jb29yZGluYXRlcyB8fCB7fTtcbiAgICBsZXQgdXJsID0gdGhpcy5mdWxsVXJsKHNlbCk7XG4gICAgaWYoIXRoaXMudmFsaWRVcmwodXJsKSl7XG4gICAgICByZXR1cm4gb2YoW10pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1ldGEuZGR4Rm9yVXJsKHVybCkucGlwZShcbiAgICAgIG1hcChkZHg9PntcbiAgICAgICAgbGV0IHZhcmlhYmxlcyA9IGRkeC52YXJpYWJsZXM7XG4gICAgICAgIGxldCB2YXJpYWJsZU5hbWVzID0gT2JqZWN0LmtleXModmFyaWFibGVzKS5maWx0ZXIodj0+e1xuICAgICAgICAgIGxldCBkaW1zOmFueVtdID0gZGR4LnZhcmlhYmxlc1t2XS5kaW1lbnNpb25zO1xuICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhjb29yZHMpLmV2ZXJ5KGNvb3JkPT57XG4gICAgICAgICAgICByZXR1cm4gZGltcy5maW5kKGRpbT0+ZGltLm5hbWU9PT1jb29yZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB2YXJpYWJsZU5hbWVzLm1hcCh2PT57XG4gICAgICAgICAgaWYoc2VsLmNhdGFsb2cmJnNlbC5jYXRhbG9nLmRpc3BsYXlGb3JtYXQpe1xuICAgICAgICAgICAgbGV0IGZtdCA9IE9iamVjdC5hc3NpZ24oe3ZhcmlhYmxlOnZ9LGRkeC52YXJpYWJsZXNbdl0pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdmFsdWU6dixcbiAgICAgICAgICAgICAgbGFiZWw6SW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoc2VsLmNhdGFsb2cuZGlzcGxheUZvcm1hdCxmbXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGRkeC52YXJpYWJsZXNbdl0ubG9uZ19uYW1lKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOnYsXG4gICAgICAgICAgICAgIGxhYmVsOmRkeC52YXJpYWJsZXNbdl0ubG9uZ19uYW1lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6dixcbiAgICAgICAgICAgIGxhYmVsOnZcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgfVxufVxuIl19