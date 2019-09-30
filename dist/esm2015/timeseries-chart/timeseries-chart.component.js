import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
//import * as Plotly from 'plotly.js/dist/plotly-basic';
//declare var Plotly: any;
//const Plotly = require('plotly.js/dist/plotly-basic');
import * as Plotly from 'plotly.js/dist/plotly-basic';
let TimeseriesChartComponent = class TimeseriesChartComponent {
    constructor(_element) {
        this._element = _element;
        this.timeSeries = [];
        this.marginLeft = 40;
        this.marginRight = 10;
        this.marginTop = 0;
        this.marginBottom = 20;
        this.titlefont = undefined;
    }
    ngAfterViewInit() {
        this.draw();
    }
    ngOnChanges(changes) {
        this.draw();
    }
    draw() {
        var node = this._element.nativeElement.querySelector('.our-chart');
        Plotly.purge(node);
        if (!this.timeSeries || !this.timeSeries.length) {
            return;
        }
        const seriesUnits = this.timeSeries.map(ts => ts.units);
        let commonUnits;
        if (seriesUnits.every(u => u === seriesUnits[0])) {
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
        Plotly.plot(node, this.timeSeries.map(ts => {
            const nonNullCount = ts.values.filter(v => !isNaN(v)).length;
            const mode = ((ts.style !== 'bar') && (nonNullCount < 365)) ?
                'lines+markers' :
                undefined;
            const suffix = commonUnits ? '' : ` (${ts.units})`;
            return {
                type: (ts.style === 'bar') ? 'bar' : undefined,
                mode: mode,
                x: ts.dates,
                y: ts.values,
                name: ts.label + suffix
            };
        }), layout);
    }
};
TimeseriesChartComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `<div class="our-chart">
</div>
`
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], TimeseriesChartComponent);
export { TimeseriesChartComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNlcmllcy1jaGFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInRpbWVzZXJpZXMtY2hhcnQvdGltZXNlcmllcy1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakgsd0RBQXdEO0FBRXhELDBCQUEwQjtBQUMxQix3REFBd0Q7QUFDeEQsT0FBTyxLQUFLLE1BQU0sTUFBTSw2QkFBNkIsQ0FBQztBQU90RCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtJQVNuQyxZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBUDlCLGVBQVUsR0FBc0IsRUFBRSxDQUFDO1FBQ25DLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBVSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFVLENBQUMsQ0FBQztRQUNyQixpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQU8sU0FBUyxDQUFDO0lBSW5DLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWYsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFB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dCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaW1lU2VyaWVzIH0gZnJvbSAnLi4vdGltZXNlcmllcy5zZXJ2aWNlJztcbi8vaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcy9kaXN0L3Bsb3RseS1iYXNpYyc7XG5cbi8vZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG4vL2NvbnN0IFBsb3RseSA9IHJlcXVpcmUoJ3Bsb3RseS5qcy9kaXN0L3Bsb3RseS1iYXNpYycpO1xuaW1wb3J0ICogYXMgUGxvdGx5IGZyb20gJ3Bsb3RseS5qcy9kaXN0L3Bsb3RseS1iYXNpYyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RpbWVzZXJpZXMtY2hhcnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJvdXItY2hhcnRcIj5cbjwvZGl2PlxuYCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBUaW1lc2VyaWVzQ2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMgIHtcbiAgQElucHV0KCkgdGl0bGU6c3RyaW5nO1xuICBASW5wdXQoKSB0aW1lU2VyaWVzOiBBcnJheTxUaW1lU2VyaWVzPiA9IFtdO1xuICBASW5wdXQoKSBtYXJnaW5MZWZ0Om51bWJlciA9IDQwO1xuICBASW5wdXQoKSBtYXJnaW5SaWdodDpudW1iZXIgPSAxMDtcbiAgQElucHV0KCkgbWFyZ2luVG9wOm51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG1hcmdpbkJvdHRvbTpudW1iZXIgPSAyMDtcbiAgQElucHV0KCkgdGl0bGVmb250OmFueSA9IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLmRyYXcoKTtcbiAgfVxuXG4gIGRyYXcoKXtcbiAgICB2YXIgbm9kZSA9IHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcub3VyLWNoYXJ0Jyk7XG5cbiAgICBQbG90bHkucHVyZ2Uobm9kZSk7XG5cbiAgICAgICAgaWYoIXRoaXMudGltZVNlcmllcyB8fCAhdGhpcy50aW1lU2VyaWVzLmxlbmd0aCl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VyaWVzVW5pdHMgPSB0aGlzLnRpbWVTZXJpZXMubWFwKHRzPT50cy51bml0cyk7XG4gICAgbGV0IGNvbW1vblVuaXRzOnN0cmluZztcbiAgICBpZihzZXJpZXNVbml0cy5ldmVyeSh1PT51PT09c2VyaWVzVW5pdHNbMF0pKXtcbiAgICAgIGNvbW1vblVuaXRzID0gc2VyaWVzVW5pdHNbMF07XG4gICAgfVxuXG4gICAgdmFyIGxheW91dDphbnkgPSB7XG4gICAgICBtYXJnaW46IHtcbiAgICAgICAgdDogdGhpcy5tYXJnaW5Ub3AgKyAodGhpcy50aXRsZT8zMDowKSxcbiAgICAgICAgbDp0aGlzLm1hcmdpbkxlZnQsXG4gICAgICAgIHI6dGhpcy5tYXJnaW5SaWdodCxcbiAgICAgICAgYjp0aGlzLm1hcmdpbkJvdHRvbVxuICAgICAgfSxcbiAgICAgIHlheGlzOntcbiAgICAgICAgZml4ZWRyYW5nZTogdHJ1ZSxcbiAgICAgICAgdGl0bGU6Y29tbW9uVW5pdHNcbiAgICAgIH0sXG4gICAgICB3aWR0aDozMjAsXG4gICAgICBoZWlnaHQ6MjAwLFxuICAgICAgdGl0bGU6dGhpcy50aXRsZSB8fCB1bmRlZmluZWQsXG4gICAgICB0aXRsZWZvbnQ6dGhpcy50aXRsZWZvbnRcbiAgICB9O1xuXG4gICAgUGxvdGx5LnBsb3QoIG5vZGUsIHRoaXMudGltZVNlcmllcy5tYXAodHM9PntcbiAgICAgIGNvbnN0IG5vbk51bGxDb3VudCA9IHRzLnZhbHVlcy5maWx0ZXIodj0+IWlzTmFOKHYpKS5sZW5ndGg7XG4gICAgICBjb25zdCBtb2RlID0gKCh0cy5zdHlsZSE9PSdiYXInKSYmKG5vbk51bGxDb3VudDwzNjUpKSA/XG4gICAgICAgICAgICAgICAgICAgJ2xpbmVzK21hcmtlcnMnIDpcbiAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb21tb25Vbml0cz8nJzpgICgke3RzLnVuaXRzfSlgO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZToodHMuc3R5bGU9PT0nYmFyJyk/J2Jhcic6dW5kZWZpbmVkLFxuICAgICAgICBtb2RlOm1vZGUsXG4gICAgICAgIHg6dHMuZGF0ZXMsXG4gICAgICAgIHk6dHMudmFsdWVzLFxuICAgICAgICBuYW1lOnRzLmxhYmVsK3N1ZmZpeFxuICAgICAgfTtcbiAgICB9KSwgbGF5b3V0ICk7XG4gIH1cbn0iXX0=