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
const interpolation_service_1 = require("./interpolation.service");
const metadata_service_1 = require("./metadata.service");
const operators_1 = require("rxjs/operators");
let PointSelectionService = class PointSelectionService {
    constructor(meta) {
        this.meta = meta;
        this.latestPointSelectionSource = new rxjs_1.BehaviorSubject(null);
        this.latestPointSelection = this.latestPointSelectionSource.asObservable();
    }
    unchanged(current, updated) {
        if (!current && !updated) {
            return true;
        }
        if (!current || !updated) {
            return false;
        }
        if (current.variable !== updated.variable) {
            return false;
        }
        if (!Object.keys(current.tags).every(t => current.tags[t] === updated.tags[t])) {
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
    }
    pointSelection(sel) {
        let current = this.latestPointSelectionSource.getValue();
        if (this.unchanged(current, sel)) {
            return;
        }
        let url = this.fullUrl(sel);
        if (!this.validUrl(url)) {
            return; // Not a complete selection
        }
        if (!sel.variable) {
            return; // Not a complete selection
        }
        this.latestPointSelectionSource.next(sel);
    }
    fullUrl(sel) {
        let params = Object.assign({}, sel.feature ? sel.feature.properties : {}, sel.tags);
        return interpolation_service_1.InterpolationService.interpolate(sel.catalog.url, params);
    }
    validUrl(url) {
        return url.indexOf('{{') < 0;
    }
    timeseriesVariables(sel) {
        let coords = sel.catalog.coordinates || {};
        let url = this.fullUrl(sel);
        if (!this.validUrl(url)) {
            return rxjs_1.of([]);
        }
        return this.meta.ddxForUrl(url).pipe(operators_1.map(ddx => {
            let variables = ddx.variables;
            let variableNames = Object.keys(variables).filter(v => {
                let dims = ddx.variables[v].dimensions;
                return Object.keys(coords).every(coord => {
                    return dims.find(dim => dim.name === coord);
                });
            });
            return variableNames.map(v => {
                if (sel.catalog && sel.catalog.displayFormat) {
                    let fmt = Object.assign({ variable: v }, ddx.variables[v]);
                    return {
                        value: v,
                        label: interpolation_service_1.InterpolationService.interpolate(sel.catalog.displayFormat, fmt)
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
    }
};
PointSelectionService.ctorParameters = () => [
    { type: metadata_service_1.MetadataService }
];
PointSelectionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService])
], PointSelectionService);
exports.PointSelectionService = PointSelectionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInBvaW50LXNlbGVjdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLCtCQUF1RDtBQUd2RCxtRUFBK0Q7QUFDL0QseURBQXFEO0FBQ3JELDhDQUFxQztBQVVyQyxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUloQyxZQUFvQixJQUFxQjtRQUFyQixTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUhqQywrQkFBMEIsR0FBRyxJQUFJLHNCQUFlLENBQWlCLElBQUksQ0FBQyxDQUFDO1FBQy9FLHlCQUFvQixHQUE4QixJQUFJLENBQUMsMEJBQTBCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFJakcsQ0FBQztJQUNPLFNBQVMsQ0FBQyxPQUFzQixFQUFDLE9BQXNCO1FBQzdELElBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELElBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDdEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUSxFQUFDO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7WUFDeEUsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUcsT0FBTyxDQUFDLE9B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RUFBQyxDQUFDLEVBQUMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE9BQU87d0JBQ0wsS0FBSyxFQUFDLENBQUM7d0JBQ1AsS0FBSyxFQUFDLDRDQUFvQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUM7cUJBQ3RFLENBQUE7aUJBQ0Y7Z0JBQ0QsSUFBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQztvQkFDNUIsT0FBTzt3QkFDTCxLQUFLLEVBQUMsQ0FBQzt3QkFDUCxLQUFLLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO3FCQUNqQyxDQUFDO2lCQUNIO2dCQUNELE9BQU87b0JBQ0wsS0FBSyxFQUFDLENBQUM7b0JBQ1AsS0FBSyxFQUFDLENBQUM7aUJBQ1IsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Q0FDRixDQUFBOztZQW5HMkIsa0NBQWU7O0FBSjlCLHFCQUFxQjtJQURqQyxpQkFBVSxFQUFFO3FDQUtlLGtDQUFlO0dBSjlCLHFCQUFxQixDQXVHakM7QUF2R1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9pbnREYXRhLCBDYXRhbG9nLCBMYXllclRhZ1ZhbHVlIH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgRmVhdHVyZSwgR2VvbWV0cnlPYmplY3QgfSBmcm9tICdnZW9qc29uJztcbmltcG9ydCB7IEludGVycG9sYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbnRlcnBvbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBQb2ludFNlbGVjdGlvbiB7XG4gIGNhdGFsb2c6IFBvaW50RGF0YSxcbiAgdmFyaWFibGU6c3RyaW5nLFxuICBmZWF0dXJlOkZlYXR1cmU8R2VvbWV0cnlPYmplY3Q+LFxuICB0YWdzOiB7W2tleTpzdHJpbmddOnN0cmluZ31cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvaW50U2VsZWN0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgbGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBvaW50U2VsZWN0aW9uPihudWxsKTtcbiAgbGF0ZXN0UG9pbnRTZWxlY3Rpb246T2JzZXJ2YWJsZTxQb2ludFNlbGVjdGlvbj4gPSB0aGlzLmxhdGVzdFBvaW50U2VsZWN0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YTogTWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuICBwcml2YXRlIHVuY2hhbmdlZChjdXJyZW50OlBvaW50U2VsZWN0aW9uLHVwZGF0ZWQ6UG9pbnRTZWxlY3Rpb24pe1xuICAgIGlmKCFjdXJyZW50ICYmICF1cGRhdGVkKXtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmKCFjdXJyZW50IHx8ICF1cGRhdGVkKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50LnZhcmlhYmxlICE9PSB1cGRhdGVkLnZhcmlhYmxlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZighT2JqZWN0LmtleXMoY3VycmVudC50YWdzKS5ldmVyeSh0PT5jdXJyZW50LnRhZ3NbdF09PT11cGRhdGVkLnRhZ3NbdF0pKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihjdXJyZW50LmNhdGFsb2cudXJsIT09dXBkYXRlZC5jYXRhbG9nLnVybCl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoY3VycmVudC5mZWF0dXJlIT09dXBkYXRlZC5mZWF0dXJlKXtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyByZXR1cm4gZmFsc2U7IC8vIFRPRE9cbiAgfVxuXG4gIHBvaW50U2VsZWN0aW9uKHNlbDogUG9pbnRTZWxlY3Rpb24pIHtcbiAgICBsZXQgY3VycmVudCA9IHRoaXMubGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UuZ2V0VmFsdWUoKTtcbiAgICBpZih0aGlzLnVuY2hhbmdlZChjdXJyZW50LHNlbCkpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB1cmwgPSB0aGlzLmZ1bGxVcmwoc2VsKTtcbiAgICBpZighdGhpcy52YWxpZFVybCh1cmwpKXtcbiAgICAgIHJldHVybjsgLy8gTm90IGEgY29tcGxldGUgc2VsZWN0aW9uXG4gICAgfVxuXG4gICAgaWYoIXNlbC52YXJpYWJsZSl7XG4gICAgICByZXR1cm47IC8vIE5vdCBhIGNvbXBsZXRlIHNlbGVjdGlvblxuICAgIH1cblxuICAgIHRoaXMubGF0ZXN0UG9pbnRTZWxlY3Rpb25Tb3VyY2UubmV4dChzZWwpO1xuICB9XG5cbiAgZnVsbFVybChzZWw6UG9pbnRTZWxlY3Rpb24pIHtcbiAgICBsZXQgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWwuZmVhdHVyZT9zZWwuZmVhdHVyZS5wcm9wZXJ0aWVzOnt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbC50YWdzKTtcbiAgICByZXR1cm4gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUoc2VsLmNhdGFsb2cudXJsLHBhcmFtcyk7XG4gIH1cblxuICB2YWxpZFVybCh1cmw6c3RyaW5nKTpib29sZWFue1xuICAgIHJldHVybiB1cmwuaW5kZXhPZigne3snKTwwO1xuICB9XG5cbiAgdGltZXNlcmllc1ZhcmlhYmxlcyhzZWw6UG9pbnRTZWxlY3Rpb24pOk9ic2VydmFibGU8TGF5ZXJUYWdWYWx1ZVtdPntcbiAgICBsZXQgY29vcmRzID0gc2VsLmNhdGFsb2cuY29vcmRpbmF0ZXMgfHwge307XG4gICAgbGV0IHVybCA9IHRoaXMuZnVsbFVybChzZWwpO1xuICAgIGlmKCF0aGlzLnZhbGlkVXJsKHVybCkpe1xuICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZXRhLmRkeEZvclVybCh1cmwpLnBpcGUoXG4gICAgICBtYXAoZGR4PT57XG4gICAgICAgIGxldCB2YXJpYWJsZXMgPSBkZHgudmFyaWFibGVzO1xuICAgICAgICBsZXQgdmFyaWFibGVOYW1lcyA9IE9iamVjdC5rZXlzKHZhcmlhYmxlcykuZmlsdGVyKHY9PntcbiAgICAgICAgICBsZXQgZGltczphbnlbXSA9IGRkeC52YXJpYWJsZXNbdl0uZGltZW5zaW9ucztcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoY29vcmRzKS5ldmVyeShjb29yZD0+e1xuICAgICAgICAgICAgcmV0dXJuIGRpbXMuZmluZChkaW09PmRpbS5uYW1lPT09Y29vcmQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdmFyaWFibGVOYW1lcy5tYXAodj0+e1xuICAgICAgICAgIGlmKHNlbC5jYXRhbG9nJiZzZWwuY2F0YWxvZy5kaXNwbGF5Rm9ybWF0KXtcbiAgICAgICAgICAgIGxldCBmbXQgPSBPYmplY3QuYXNzaWduKHt2YXJpYWJsZTp2fSxkZHgudmFyaWFibGVzW3ZdKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHZhbHVlOnYsXG4gICAgICAgICAgICAgIGxhYmVsOkludGVycG9sYXRpb25TZXJ2aWNlLmludGVycG9sYXRlKHNlbC5jYXRhbG9nLmRpc3BsYXlGb3JtYXQsZm10KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihkZHgudmFyaWFibGVzW3ZdLmxvbmdfbmFtZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB2YWx1ZTp2LFxuICAgICAgICAgICAgICBsYWJlbDpkZHgudmFyaWFibGVzW3ZdLmxvbmdfbmFtZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOnYsXG4gICAgICAgICAgICBsYWJlbDp2XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gIH1cbn1cbiJdfQ==