import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PaletteService } from '../palette.service';
var MapLegendComponent = /** @class */ (function () {
    function MapLegendComponent(_palettes) {
        this._palettes = _palettes;
        this.colours = ['red', 'white', 'blue'];
        this.labels = []; //['-','-','-'];
        this.title = 'the title';
        this.mapUnits = '';
        this.helpText = 'No comment';
        this.tooltipPlacement = 'right';
        this.generatedLabels = [];
        this.formatValue = function (val, decimalPlaces) {
            if (!val) {
                if (val === 0) {
                    return '0';
                }
                return '-';
            }
            // Add thousand's separator. Source: http://stackoverflow.com/a/2901298
            var parts = val.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (decimalPlaces === 0) {
                return parts[0];
            }
            if ((decimalPlaces !== null) && (decimalPlaces !== undefined) && (parts.length === 2)) {
                parts[1] = parts[1].substr(0, decimalPlaces);
                parts[1] = parts[1].replace(/0+$/, '');
            }
            return parts.join('.');
        };
    }
    Object.defineProperty(MapLegendComponent.prototype, "cbPalette", {
        get: function () { return this._cbPalette; },
        set: function (cbp) {
            this._cbPalette = cbp;
            this.generatePalette();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegendComponent.prototype, "cbCount", {
        get: function () { return this._cbCount; },
        set: function (cbc) {
            this._cbCount = cbc;
            this.generatePalette();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegendComponent.prototype, "cbReverse", {
        get: function () { return this._cbReverse; },
        set: function (cbr) {
            this._cbReverse = cbr;
            this.generatePalette();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapLegendComponent.prototype, "cbRange", {
        get: function () { return this._cbRange; },
        set: function (cbr) {
            this._cbRange = cbr;
            this.generatePalette();
        },
        enumerable: true,
        configurable: true
    });
    MapLegendComponent.prototype.generateLabels = function (count) {
        if (!this._cbRange || !count) {
            return null;
        }
        var delta = (this._cbRange[1] - this._cbRange[0]) / (count - 1);
        var result = [];
        var lower = this._cbRange[0];
        var decimalPlaces = Math.max(0, 2 - (+Math.log10(this._cbRange[1] - this._cbRange[0]).toFixed()));
        decimalPlaces = Math.min(decimalPlaces, 10);
        var upper;
        for (var i = 1; i < count; i++) {
            upper = this._cbRange[0] + i * delta;
            result.push(this.formatValue(lower, decimalPlaces) + "-" + this.formatValue(upper, decimalPlaces));
            lower = upper;
        }
        result.push('&ge;' + this._cbRange[1]);
        result.reverse();
        return result;
    };
    MapLegendComponent.prototype.generatePalette = function () {
        var _this = this;
        if (!this._cbPalette || !this._cbCount) {
            return;
        }
        this._palettes.getPalette(this._cbPalette, this._cbReverse, this._cbCount)
            .subscribe(function (palette) {
            _this.colours = palette.slice().reverse();
            _this.generatedLabels = _this.labels || _this.generateLabels(_this.colours.length) || palette;
        });
    };
    MapLegendComponent.prototype.ngOnInit = function () { };
    MapLegendComponent.ctorParameters = function () { return [
        { type: PaletteService }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "imageURL", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], MapLegendComponent.prototype, "colours", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], MapLegendComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "mapUnits", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "helpText", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "tooltipPlacement", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "attribution", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], MapLegendComponent.prototype, "attributionLink", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], MapLegendComponent.prototype, "cbPalette", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number),
        tslib_1.__metadata("design:paramtypes", [Number])
    ], MapLegendComponent.prototype, "cbCount", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean),
        tslib_1.__metadata("design:paramtypes", [Boolean])
    ], MapLegendComponent.prototype, "cbReverse", null);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array),
        tslib_1.__metadata("design:paramtypes", [Array])
    ], MapLegendComponent.prototype, "cbRange", null);
    MapLegendComponent = tslib_1.__decorate([
        Component({
            selector: 'map-legend',
            template: "<div class=\"map-legend panel panel-group\">\n\n<strong>{{title}} <span *ngIf=\"mapUnits\" [innerHTML]=\"'('+mapUnits+')'\"></span>\n        <span *ngIf=\"helpText\"\n              [ngbTooltip]=\"helpText\"\n              [placement]=\"tooltipPlacement\"\n              container=\"body\">\n          <i class=\"fa fa-info-circle\"></i>\n        </span>\n</strong>\n\n  <div *ngIf=\"!imageURL\">\n    <div style=\"display:table;line-height:15px\">\n      <div style=\"display:table-row;padding:0;\"\n          *ngFor=\"let colour of colours; let i=index\">\n        <div class=\"legend-colour\">\n          <i class=\"legend-entry\" [ngStyle]=\"{background:colour}\"></i>\n        </div>\n        <div class=\"legend-label\">\n          <span [innerHTML]=\"generatedLabels[i]\"></span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div *ngIf=\"imageURL\">\n    <img [src]=\"imageURL\">\n  </div>\n  <p *ngIf=\"attributionLink\">Source: <a [href]=\"attributionLink\">{{attribution || 'details'}}</a></p>\n  <p *ngIf=\"attribution&&!attributionLink\">Source: {{attribution}}</p>\n</div>\n",
            styles: ["\n.map-legend{\n  display:block;\n  background: white;\n}\n\n.legend-colour{\n  display:table-cell;\n  padding:0px;\n}\n\n.legend-label{\n  display:table-cell;\n  padding:0px 4px 2px 2px;\n  font-size:10px;\n  vertical-align:middle;\n}\n\n.legend-entry {\n  float: left;\n  width: 15px !important;\n  height: 15px !important;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [PaletteService])
    ], MapLegendComponent);
    return MapLegendComponent;
}());
export { MapLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxlZ2VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbIm1hcC1sZWdlbmQvbWFwLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUEyRHBEO0lBb0dFLDRCQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBbEduQyxZQUFPLEdBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxXQUFNLEdBQWtCLEVBQUUsQ0FBQyxDQUFBLGdCQUFnQjtRQUMzQyxVQUFLLEdBQVcsV0FBVyxDQUFDO1FBQzVCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFRLFlBQVksQ0FBQztRQUM3QixxQkFBZ0IsR0FBUSxPQUFPLENBQUM7UUFJekMsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFtRS9CLGdCQUFXLEdBQUcsVUFBUyxHQUFVLEVBQUMsYUFBb0I7WUFDcEQsSUFBRyxDQUFDLEdBQUcsRUFBQztnQkFDTixJQUFHLEdBQUcsS0FBRyxDQUFDLEVBQUM7b0JBQ1QsT0FBTyxHQUFHLENBQUM7aUJBQ1o7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELHVFQUF1RTtZQUN2RSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFELElBQUcsYUFBYSxLQUFHLENBQUMsRUFBQztnQkFDbkIsT0FBTyxLQUFLLENB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QVIsS0FBSyxFQUFFOzt3REFBdUI7SUFDdEI7UUFBUixLQUFLLEVBQUU7O3dEQUE4QjtJQUM3QjtRQUFSLEtBQUssRUFBRTs7Z0VBQWlDO0lBQ2hDO1FBQVIsS0FBSyxFQUFFOzsyREFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7OytEQUF5QjtJQVF4QjtRQUFSLEtBQUssRUFBRTs7O3VEQUdQO0lBSVE7UUFBUixLQUFLLEVBQUU7OztxREFHUDtJQUlRO1FBQVIsS0FBSyxFQUFFOzs7dURBR1A7SUFJUTtRQUFSLEtBQUssRUFBRTswQ0FBaUIsS0FBSztpREFBTCxLQUFLO3FEQUc3QjtJQXpDVSxrQkFBa0I7UUF6RDlCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSw0a0NBK0JYO3FCQUFVLDRVQXVCVjtTQUFFLENBQUM7aURBcUc0QixjQUFjO09BcEdqQyxrQkFBa0IsQ0F3RzlCO0lBQUQseUJBQUM7Q0FBQSxBQXhHRCxJQXdHQztTQXhHWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhbGV0dGVTZXJ2aWNlIH0gZnJvbSAnLi4vcGFsZXR0ZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWFwLWxlZ2VuZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm1hcC1sZWdlbmQgcGFuZWwgcGFuZWwtZ3JvdXBcIj5cblxuPHN0cm9uZz57e3RpdGxlfX0gPHNwYW4gKm5nSWY9XCJtYXBVbml0c1wiIFtpbm5lckhUTUxdPVwiJygnK21hcFVuaXRzKycpJ1wiPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJoZWxwVGV4dFwiXG4gICAgICAgICAgICAgIFtuZ2JUb29sdGlwXT1cImhlbHBUZXh0XCJcbiAgICAgICAgICAgICAgW3BsYWNlbWVudF09XCJ0b29sdGlwUGxhY2VtZW50XCJcbiAgICAgICAgICAgICAgY29udGFpbmVyPVwiYm9keVwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+XG4gICAgICAgIDwvc3Bhbj5cbjwvc3Ryb25nPlxuXG4gIDxkaXYgKm5nSWY9XCIhaW1hZ2VVUkxcIj5cbiAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTp0YWJsZTtsaW5lLWhlaWdodDoxNXB4XCI+XG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTp0YWJsZS1yb3c7cGFkZGluZzowO1wiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNvbG91ciBvZiBjb2xvdXJzOyBsZXQgaT1pbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGVnZW5kLWNvbG91clwiPlxuICAgICAgICAgIDxpIGNsYXNzPVwibGVnZW5kLWVudHJ5XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6Y29sb3VyfVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtbGFiZWxcIj5cbiAgICAgICAgICA8c3BhbiBbaW5uZXJIVE1MXT1cImdlbmVyYXRlZExhYmVsc1tpXVwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cImltYWdlVVJMXCI+XG4gICAgPGltZyBbc3JjXT1cImltYWdlVVJMXCI+XG4gIDwvZGl2PlxuICA8cCAqbmdJZj1cImF0dHJpYnV0aW9uTGlua1wiPlNvdXJjZTogPGEgW2hyZWZdPVwiYXR0cmlidXRpb25MaW5rXCI+e3thdHRyaWJ1dGlvbiB8fCAnZGV0YWlscyd9fTwvYT48L3A+XG4gIDxwICpuZ0lmPVwiYXR0cmlidXRpb24mJiFhdHRyaWJ1dGlvbkxpbmtcIj5Tb3VyY2U6IHt7YXR0cmlidXRpb259fTwvcD5cbjwvZGl2PlxuYCxzdHlsZXM6IFtgXG4ubWFwLWxlZ2VuZHtcbiAgZGlzcGxheTpibG9jaztcbiAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5sZWdlbmQtY29sb3Vye1xuICBkaXNwbGF5OnRhYmxlLWNlbGw7XG4gIHBhZGRpbmc6MHB4O1xufVxuXG4ubGVnZW5kLWxhYmVse1xuICBkaXNwbGF5OnRhYmxlLWNlbGw7XG4gIHBhZGRpbmc6MHB4IDRweCAycHggMnB4O1xuICBmb250LXNpemU6MTBweDtcbiAgdmVydGljYWwtYWxpZ246bWlkZGxlO1xufVxuXG4ubGVnZW5kLWVudHJ5IHtcbiAgZmxvYXQ6IGxlZnQ7XG4gIHdpZHRoOiAxNXB4ICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMTVweCAhaW1wb3J0YW50O1xufVxuYF19KVxuZXhwb3J0IGNsYXNzIE1hcExlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGltYWdlVVJMOiBzdHJpbmdcbiAgQElucHV0KCkgY29sb3VyczogQXJyYXk8c3RyaW5nPiA9IFsncmVkJywgJ3doaXRlJywgJ2JsdWUnXTtcbiAgQElucHV0KCkgbGFiZWxzOiBBcnJheTxzdHJpbmc+ID0gW107Ly9bJy0nLCctJywnLSddO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJ3RoZSB0aXRsZSc7XG4gIEBJbnB1dCgpIG1hcFVuaXRzIDpzdHJpbmcgPSAnJztcbiAgQElucHV0KCkgaGVscFRleHQ6c3RyaW5nPSdObyBjb21tZW50JztcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDpzdHJpbmc9J3JpZ2h0JztcbiAgQElucHV0KCkgYXR0cmlidXRpb246IHN0cmluZztcbiAgQElucHV0KCkgYXR0cmlidXRpb25MaW5rOiBzdHJpbmc7XG5cbiAgZ2VuZXJhdGVkTGFiZWxzOiBzdHJpbmdbXSA9IFtdO1xuICBfY2JQYWxldHRlOnN0cmluZ1xuICBfY2JDb3VudDpudW1iZXI7XG4gIF9jYlJldmVyc2U6Ym9vbGVhbjtcbiAgX2NiUmFuZ2U6QXJyYXk8bnVtYmVyPjtcblxuICBASW5wdXQoKSBzZXQgY2JQYWxldHRlKGNicDpzdHJpbmcpe1xuICAgIHRoaXMuX2NiUGFsZXR0ZSA9IGNicDtcbiAgICB0aGlzLmdlbmVyYXRlUGFsZXR0ZSgpO1xuICB9XG5cbiAgZ2V0IGNiUGFsZXR0ZSgpOnN0cmluZ3tyZXR1cm4gdGhpcy5fY2JQYWxldHRlO31cblxuICBASW5wdXQoKSBzZXQgY2JDb3VudChjYmM6bnVtYmVyKXtcbiAgICB0aGlzLl9jYkNvdW50PWNiYztcbiAgICB0aGlzLmdlbmVyYXRlUGFsZXR0ZSgpO1xuICB9XG5cbiAgZ2V0IGNiQ291bnQoKTpudW1iZXJ7cmV0dXJuIHRoaXMuX2NiQ291bnQ7fVxuXG4gIEBJbnB1dCgpIHNldCBjYlJldmVyc2UoY2JyOmJvb2xlYW4pe1xuICAgIHRoaXMuX2NiUmV2ZXJzZT1jYnI7XG4gICAgdGhpcy5nZW5lcmF0ZVBhbGV0dGUoKTtcbiAgfVxuXG4gIGdldCBjYlJldmVyc2UoKTpib29sZWFue3JldHVybiB0aGlzLl9jYlJldmVyc2U7fVxuXG4gIEBJbnB1dCgpIHNldCBjYlJhbmdlKGNicjpBcnJheTxudW1iZXI+KXtcbiAgICB0aGlzLl9jYlJhbmdlID0gY2JyO1xuICAgIHRoaXMuZ2VuZXJhdGVQYWxldHRlKCk7XG4gIH1cblxuICBnZXQgY2JSYW5nZSgpOkFycmF5PG51bWJlcj57cmV0dXJuIHRoaXMuX2NiUmFuZ2U7fVxuXG4gIGdlbmVyYXRlTGFiZWxzKGNvdW50Om51bWJlcik6QXJyYXk8c3RyaW5nPnxudWxse1xuICAgIGlmKCF0aGlzLl9jYlJhbmdlfHwhY291bnQpe1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhID0gKHRoaXMuX2NiUmFuZ2VbMV0tdGhpcy5fY2JSYW5nZVswXSkvKGNvdW50LTEpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgbG93ZXI9dGhpcy5fY2JSYW5nZVswXTtcbiAgICBsZXQgIGRlY2ltYWxQbGFjZXMgPSBNYXRoLm1heCgwLDItKCtNYXRoLmxvZzEwKHRoaXMuX2NiUmFuZ2VbMV0tdGhpcy5fY2JSYW5nZVswXSkudG9GaXhlZCgpKSk7XG4gICAgZGVjaW1hbFBsYWNlcyA9IE1hdGgubWluKGRlY2ltYWxQbGFjZXMsMTApO1xuICAgIHZhciB1cHBlcjtcbiAgICBmb3IobGV0IGk9MTtpPGNvdW50O2krKyl7XG4gICAgICB1cHBlciA9IHRoaXMuX2NiUmFuZ2VbMF0raSpkZWx0YTtcbiAgICAgIHJlc3VsdC5wdXNoKGAke3RoaXMuZm9ybWF0VmFsdWUobG93ZXIsZGVjaW1hbFBsYWNlcyl9LSR7dGhpcy5mb3JtYXRWYWx1ZSh1cHBlcixkZWNpbWFsUGxhY2VzKX1gKTtcbiAgICAgIGxvd2VyID0gdXBwZXI7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKCcmZ2U7Jyt0aGlzLl9jYlJhbmdlWzFdKTtcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZW5lcmF0ZVBhbGV0dGUoKXtcbiAgICBpZighdGhpcy5fY2JQYWxldHRlfHwhdGhpcy5fY2JDb3VudCl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGFsZXR0ZXMuZ2V0UGFsZXR0ZSh0aGlzLl9jYlBhbGV0dGUsdGhpcy5fY2JSZXZlcnNlLHRoaXMuX2NiQ291bnQpXG4gICAgICAuc3Vic2NyaWJlKHBhbGV0dGU9PntcbiAgICAgICAgdGhpcy5jb2xvdXJzID0gcGFsZXR0ZS5zbGljZSgpLnJldmVyc2UoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRMYWJlbHMgPSB0aGlzLmxhYmVscyB8fCB0aGlzLmdlbmVyYXRlTGFiZWxzKHRoaXMuY29sb3Vycy5sZW5ndGgpIHx8IHBhbGV0dGU7XG4gICAgfSk7XG4gIH1cblxuICBmb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKHZhbDpudW1iZXIsZGVjaW1hbFBsYWNlczpudW1iZXIpOnN0cmluZ3tcbiAgICBpZighdmFsKXtcbiAgICAgIGlmKHZhbD09PTApe1xuICAgICAgICByZXR1cm4gJzAnO1xuICAgICAgfVxuICAgICAgcmV0dXJuICctJztcbiAgICB9XG4gICAgLy8gQWRkIHRob3VzYW5kJ3Mgc2VwYXJhdG9yLiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5MDEyOThcbiAgICB2YXIgcGFydHMgPSB2YWwudG9TdHJpbmcoKS5zcGxpdChcIi5cIik7XG4gICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG5cbiAgICBpZihkZWNpbWFsUGxhY2VzPT09MCl7XG4gICAgICByZXR1cm4gcGFydHNbMF07XG4gICAgfVxuXG4gICAgaWYoKGRlY2ltYWxQbGFjZXMhPT1udWxsKSAmJihkZWNpbWFsUGxhY2VzIT09dW5kZWZpbmVkKSAmJiAocGFydHMubGVuZ3RoPT09Mikpe1xuICAgICAgcGFydHNbMV0gPSBwYXJ0c1sxXS5zdWJzdHIoMCxkZWNpbWFsUGxhY2VzKTtcbiAgICAgIHBhcnRzWzFdID0gcGFydHNbMV0ucmVwbGFjZSgvMCskLywgJycpO1xuICAgIH1cbiAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhbGV0dGVzOlBhbGV0dGVTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHsgfVxuXG59XG4iXX0=