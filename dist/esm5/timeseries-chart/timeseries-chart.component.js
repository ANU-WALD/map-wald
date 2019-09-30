import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
//import * as Plotly from 'plotly.js/dist/plotly-basic';
//declare var Plotly: any;
//const Plotly = require('plotly.js/dist/plotly-basic');
import * as Plotly from 'plotly.js/dist/plotly-basic';
var TimeseriesChartComponent = /** @class */ (function () {
    function TimeseriesChartComponent(_element) {
        this._element = _element;
        this.timeSeries = [];
        this.marginLeft = 40;
        this.marginRight = 10;
        this.marginTop = 0;
        this.marginBottom = 20;
        this.titlefont = undefined;
    }
    TimeseriesChartComponent.prototype.ngAfterViewInit = function () {
        this.draw();
    };
    TimeseriesChartComponent.prototype.ngOnChanges = function (changes) {
        this.draw();
    };
    TimeseriesChartComponent.prototype.draw = function () {
        var node = this._element.nativeElement.querySelector('.our-chart');
        Plotly.purge(node);
        if (!this.timeSeries || !this.timeSeries.length) {
            return;
        }
        var seriesUnits = this.timeSeries.map(function (ts) { return ts.units; });
        var commonUnits;
        if (seriesUnits.every(function (u) { return u === seriesUnits[0]; })) {
            commonUnits = seriesUnits[0];
        }
        var layout = {
            margin: {
                t: this.marginTop + (this.title ? 30 : 0),
                l: this.marginLeft,
                r: this.marginRight,
                b: this.marginBottom
            },
            yaxis: {
                fixedrange: true,
                title: commonUnits
            },
            width: 320,
            height: 200,
            title: this.title || undefined,
            titlefont: this.titlefont
        };
        Plotly.plot(node, this.timeSeries.map(function (ts) {
            var nonNullCount = ts.values.filter(function (v) { return !isNaN(v); }).length;
            var mode = ((ts.style !== 'bar') && (nonNullCount < 365)) ?
                'lines+markers' :
                undefined;
            var suffix = commonUnits ? '' : " (" + ts.units + ")";
            return {
                type: (ts.style === 'bar') ? 'bar' : undefined,
                mode: mode,
                x: ts.dates,
                y: ts.values,
                name: ts.label + suffix
            };
        }), layout);
    };
    TimeseriesChartComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], TimeseriesChartComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], TimeseriesChartComponent.prototype, "timeSeries", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TimeseriesChartComponent.prototype, "marginLeft", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TimeseriesChartComponent.prototype, "marginRight", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TimeseriesChartComponent.prototype, "marginTop", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], TimeseriesChartComponent.prototype, "marginBottom", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TimeseriesChartComponent.prototype, "titlefont", void 0);
    TimeseriesChartComponent = tslib_1.__decorate([
        Component({
            selector: 'timeseries-chart',
            template: "<div class=\"our-chart\">\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], TimeseriesChartComponent);
    return TimeseriesChartComponent;
}());
export { TimeseriesChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInRpbWVzZXJpZXMtY2hhcnQvdGltZXNlcmllcy1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakgsd0RBQXdEO0FBRXhELDBCQUEwQjtBQUMxQix3REFBd0Q7QUFDeEQsT0FBTyxLQUFLLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQU90RDtJQVNFLGtDQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUDlCLGVBQVUsR0FBc0IsRUFBRSxDQUFDO1FBQ25DLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFVLENBQUMsQ0FBQztRQUNyQixpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQU8sU0FBUyxDQUFDO0lBSW5DLENBQUM7SUFFRCxrREFBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELDhDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsdUNBQUksR0FBSjtRQUNFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWYsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQztZQUNqRCxPQUFP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WSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZVNlcmllcyB9IGZyb20gJy4uL3RpbWVzZXJpZXMuc2VydmljZSc7XG4vL2ltcG9ydCAqIGFzIFBsb3RseSBmcm9tICdwbG90bHkuanMvZGlzdC9wbG90bHktYmFzaWMnO1xuXG4vL2RlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuLy9jb25zdCBQbG90bHkgPSByZXF1aXJlKCdwbG90bHkuanMvZGlzdC9wbG90bHktYmFzaWMnKTtcbmltcG9ydCAqIGFzIFBsb3RseSBmcm9tICdwbG90bHkuanMvZGlzdC9wbG90bHktYmFzaWMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aW1lc2VyaWVzLWNoYXJ0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwib3VyLWNoYXJ0XCI+XG48L2Rpdj5cbmAsc3R5bGVzOiBbXX0pXG5leHBvcnQgY2xhc3MgVGltZXNlcmllc0NoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzICB7XG4gIEBJbnB1dCgpIHRpdGxlOnN0cmluZztcbiAgQElucHV0KCkgdGltZVNlcmllczogQXJyYXk8VGltZVNlcmllcz4gPSBbXTtcbiAgQElucHV0KCkgbWFyZ2luTGVmdDpudW1iZXIgPSA0MDtcbiAgQElucHV0KCkgbWFyZ2luUmlnaHQ6bnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIG1hcmdpblRvcDpudW1iZXIgPSAwO1xuICBASW5wdXQoKSBtYXJnaW5Cb3R0b206bnVtYmVyID0gMjA7XG4gIEBJbnB1dCgpIHRpdGxlZm9udDphbnkgPSB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudDpFbGVtZW50UmVmKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICBkcmF3KCl7XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm91ci1jaGFydCcpO1xuXG4gICAgUGxvdGx5LnB1cmdlKG5vZGUpO1xuXG4gICAgICAgIGlmKCF0aGlzLnRpbWVTZXJpZXMgfHwgIXRoaXMudGltZVNlcmllcy5sZW5ndGgpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNlcmllc1VuaXRzID0gdGhpcy50aW1lU2VyaWVzLm1hcCh0cz0+dHMudW5pdHMpO1xuICAgIGxldCBjb21tb25Vbml0czpzdHJpbmc7XG4gICAgaWYoc2VyaWVzVW5pdHMuZXZlcnkodT0+dT09PXNlcmllc1VuaXRzWzBdKSl7XG4gICAgICBjb21tb25Vbml0cyA9IHNlcmllc1VuaXRzWzBdO1xuICAgIH1cblxuICAgIHZhciBsYXlvdXQ6YW55ID0ge1xuICAgICAgbWFyZ2luOiB7XG4gICAgICAgIHQ6IHRoaXMubWFyZ2luVG9wICsgKHRoaXMudGl0bGU/MzA6MCksXG4gICAgICAgIGw6dGhpcy5tYXJnaW5MZWZ0LFxuICAgICAgICByOnRoaXMubWFyZ2luUmlnaHQsXG4gICAgICAgIGI6dGhpcy5tYXJnaW5Cb3R0b21cbiAgICAgIH0sXG4gICAgICB5YXhpczp7XG4gICAgICAgIGZpeGVkcmFuZ2U6IHRydWUsXG4gICAgICAgIHRpdGxlOmNvbW1vblVuaXRzXG4gICAgICB9LFxuICAgICAgd2lkdGg6MzIwLFxuICAgICAgaGVpZ2h0OjIwMCxcbiAgICAgIHRpdGxlOnRoaXMudGl0bGUgfHwgdW5kZWZpbmVkLFxuICAgICAgdGl0bGVmb250OnRoaXMudGl0bGVmb250XG4gICAgfTtcblxuICAgIFBsb3RseS5wbG90KCBub2RlLCB0aGlzLnRpbWVTZXJpZXMubWFwKHRzPT57XG4gICAgICBjb25zdCBub25OdWxsQ291bnQgPSB0cy52YWx1ZXMuZmlsdGVyKHY9PiFpc05hTih2KSkubGVuZ3RoO1xuICAgICAgY29uc3QgbW9kZSA9ICgodHMuc3R5bGUhPT0nYmFyJykmJihub25OdWxsQ291bnQ8MzY1KSkgP1xuICAgICAgICAgICAgICAgICAgICdsaW5lcyttYXJrZXJzJyA6XG4gICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29tbW9uVW5pdHM/Jyc6YCAoJHt0cy51bml0c30pYDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6KHRzLnN0eWxlPT09J2JhcicpPydiYXInOnVuZGVmaW5lZCxcbiAgICAgICAgbW9kZTptb2RlLFxuICAgICAgICB4OnRzLmRhdGVzLFxuICAgICAgICB5OnRzLnZhbHVlcyxcbiAgICAgICAgbmFtZTp0cy5sYWJlbCtzdWZmaXhcbiAgICAgIH07XG4gICAgfSksIGxheW91dCApO1xuICB9XG59Il19