import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PaletteService } from '../palette.service';
let MapLegendComponent = class MapLegendComponent {
    constructor(_palettes) {
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
    set cbPalette(cbp) {
        this._cbPalette = cbp;
        this.generatePalette();
    }
    get cbPalette() { return this._cbPalette; }
    set cbCount(cbc) {
        this._cbCount = cbc;
        this.generatePalette();
    }
    get cbCount() { return this._cbCount; }
    set cbReverse(cbr) {
        this._cbReverse = cbr;
        this.generatePalette();
    }
    get cbReverse() { return this._cbReverse; }
    set cbRange(cbr) {
        this._cbRange = cbr;
        this.generatePalette();
    }
    get cbRange() { return this._cbRange; }
    generateLabels(count) {
        if (!this._cbRange || !count) {
            return null;
        }
        var delta = (this._cbRange[1] - this._cbRange[0]) / (count - 1);
        var result = [];
        var lower = this._cbRange[0];
        let decimalPlaces = Math.max(0, 2 - (+Math.log10(this._cbRange[1] - this._cbRange[0]).toFixed()));
        decimalPlaces = Math.min(decimalPlaces, 10);
        var upper;
        for (let i = 1; i < count; i++) {
            upper = this._cbRange[0] + i * delta;
            result.push(`${this.formatValue(lower, decimalPlaces)}-${this.formatValue(upper, decimalPlaces)}`);
            lower = upper;
        }
        result.push('&ge;' + this._cbRange[1]);
        result.reverse();
        return result;
    }
    generatePalette() {
        if (!this._cbPalette || !this._cbCount) {
            return;
        }
        this._palettes.getPalette(this._cbPalette, this._cbReverse, this._cbCount)
            .subscribe(palette => {
            this.colours = palette.slice().reverse();
            this.generatedLabels = this.labels || this.generateLabels(this.colours.length) || palette;
        });
    }
    ngOnInit() { }
};
MapLegendComponent.ctorParameters = () => [
    { type: PaletteService }
];
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
        template: `<div class="map-legend panel panel-group">

<strong>{{title}} <span *ngIf="mapUnits" [innerHTML]="'('+mapUnits+')'"></span>
        <span *ngIf="helpText"
              [ngbTooltip]="helpText"
              [placement]="tooltipPlacement"
              container="body">
          <i class="fa fa-info-circle"></i>
        </span>
</strong>

  <div *ngIf="!imageURL">
    <div style="display:table;line-height:15px">
      <div style="display:table-row;padding:0;"
          *ngFor="let colour of colours; let i=index">
        <div class="legend-colour">
          <i class="legend-entry" [ngStyle]="{background:colour}"></i>
        </div>
        <div class="legend-label">
          <span [innerHTML]="generatedLabels[i]"></span>
        </div>
      </div>
    </div>
  </div>

  <div *ngIf="imageURL">
    <img [src]="imageURL">
  </div>
  <p *ngIf="attributionLink">Source: <a [href]="attributionLink">{{attribution || 'details'}}</a></p>
  <p *ngIf="attribution&&!attributionLink">Source: {{attribution}}</p>
</div>
`,
        styles: [`
.map-legend{
  display:block;
  background: white;
}

.legend-colour{
  display:table-cell;
  padding:0px;
}

.legend-label{
  display:table-cell;
  padding:0px 4px 2px 2px;
  font-size:10px;
  vertical-align:middle;
}

.legend-entry {
  float: left;
  width: 15px !important;
  height: 15px !important;
}
`]
    }),
    tslib_1.__metadata("design:paramtypes", [PaletteService])
], MapLegendComponent);
export { MapLegendComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWxlZ2VuZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbIm1hcC1sZWdlbmQvbWFwLWxlZ2VuZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXlCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUEyRHBELElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBb0c3QixZQUFvQixTQUF3QjtRQUF4QixjQUFTLEdBQVQsU0FBUyxDQUFlO1FBbEduQyxZQUFPLEdBQWtCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxXQUFNLEdBQWtCLEVBQUUsQ0FBQyxDQUFBLGdCQUFnQjtRQUMzQyxVQUFLLEdBQVcsV0FBVyxDQUFDO1FBQzVCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFDdEIsYUFBUSxHQUFRLFlBQVksQ0FBQztRQUM3QixxQkFBZ0IsR0FBUSxPQUFPLENBQUM7UUFJekMsb0JBQWUsR0FBYSxFQUFFLENBQUM7UUFtRS9CLGdCQUFXLEdBQUcsVUFBUyxHQUFVLEVBQUMsYUFBb0I7WUFDcEQsSUFBRyxDQUFDLEdBQUcsRUFBQztnQkFDTixJQUFHLEdBQUcsS0FBRyxDQUFDLEVBQUM7b0JBQ1QsT0FBTyxHQUFHLENBQUM7aUJBQ1o7Z0JBQ0QsT0FBTyxHQUFHLENBQUM7YUFDWjtZQUNELHVFQUF1RTtZQUN2RSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFELElBQUcsYUFBYSxLQUFH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SUFBUixLQUFLLEVBQUU7O29EQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7b0RBQThCO0FBQzdCO0lBQVIsS0FBSyxFQUFFOzs0REFBaUM7QUFDaEM7SUFBUixLQUFLLEVBQUU7O3VEQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTs7MkRBQXlCO0FBUXhCO0lBQVIsS0FBSyxFQUFFOzs7bURBR1A7QUFJUTtJQUFSLEtBQUssRUFBRTs7O2lEQUdQO0FBSVE7SUFBUixLQUFLLEVBQUU7OzttREFHUDtBQUlRO0lBQVIsS0FBSyxFQUFFO3NDQUFpQixLQUFLOzZDQUFMLEtBQUs7aURBRzdCO0FBekNVLGtCQUFrQjtJQXpEOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0JYO2lCQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXVCVjtLQUFFLENBQUM7NkNBcUc0QixjQUFjO0dBcEdqQyxrQkFBa0IsQ0F3RzlCO1NBeEdZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFsZXR0ZVNlcnZpY2UgfSBmcm9tICcuLi9wYWxldHRlLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXAtbGVnZW5kJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibWFwLWxlZ2VuZCBwYW5lbCBwYW5lbC1ncm91cFwiPlxuXG48c3Ryb25nPnt7dGl0bGV9fSA8c3BhbiAqbmdJZj1cIm1hcFVuaXRzXCIgW2lubmVySFRNTF09XCInKCcrbWFwVW5pdHMrJyknXCI+PC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImhlbHBUZXh0XCJcbiAgICAgICAgICAgICAgW25nYlRvb2x0aXBdPVwiaGVscFRleHRcIlxuICAgICAgICAgICAgICBbcGxhY2VtZW50XT1cInRvb2x0aXBQbGFjZW1lbnRcIlxuICAgICAgICAgICAgICBjb250YWluZXI9XCJib2R5XCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiPjwvaT5cbiAgICAgICAgPC9zcGFuPlxuPC9zdHJvbmc+XG5cbiAgPGRpdiAqbmdJZj1cIiFpbWFnZVVSTFwiPlxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OnRhYmxlO2xpbmUtaGVpZ2h0OjE1cHhcIj5cbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OnRhYmxlLXJvdztwYWRkaW5nOjA7XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY29sb3VyIG9mIGNvbG91cnM7IGxldCBpPWluZGV4XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtY29sb3VyXCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJsZWdlbmQtZW50cnlcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDpjb2xvdXJ9XCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZ2VuZC1sYWJlbFwiPlxuICAgICAgICAgIDxzcGFuIFtpbm5lckhUTUxdPVwiZ2VuZXJhdGVkTGFiZWxzW2ldXCI+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwiaW1hZ2VVUkxcIj5cbiAgICA8aW1nIFtzcmNdPVwiaW1hZ2VVUkxcIj5cbiAgPC9kaXY+XG4gIDxwICpuZ0lmPVwiYXR0cmlidXRpb25MaW5rXCI+U291cmNlOiA8YSBbaHJlZl09XCJhdHRyaWJ1dGlvbkxpbmtcIj57e2F0dHJpYnV0aW9uIHx8ICdkZXRhaWxzJ319PC9hPjwvcD5cbiAgPHAgKm5nSWY9XCJhdHRyaWJ1dGlvbiYmIWF0dHJpYnV0aW9uTGlua1wiPlNvdXJjZToge3thdHRyaWJ1dGlvbn19PC9wPlxuPC9kaXY+XG5gLHN0eWxlczogW2Bcbi5tYXAtbGVnZW5ke1xuICBkaXNwbGF5OmJsb2NrO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cblxuLmxlZ2VuZC1jb2xvdXJ7XG4gIGRpc3BsYXk6dGFibGUtY2VsbDtcbiAgcGFkZGluZzowcHg7XG59XG5cbi5sZWdlbmQtbGFiZWx7XG4gIGRpc3BsYXk6dGFibGUtY2VsbDtcbiAgcGFkZGluZzowcHggNHB4IDJweCAycHg7XG4gIGZvbnQtc2l6ZToxMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7XG59XG5cbi5sZWdlbmQtZW50cnkge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDE1cHggIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxNXB4ICFpbXBvcnRhbnQ7XG59XG5gXX0pXG5leHBvcnQgY2xhc3MgTWFwTGVnZW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaW1hZ2VVUkw6IHN0cmluZ1xuICBASW5wdXQoKSBjb2xvdXJzOiBBcnJheTxzdHJpbmc+ID0gWydyZWQnLCAnd2hpdGUnLCAnYmx1ZSddO1xuICBASW5wdXQoKSBsYWJlbHM6IEFycmF5PHN0cmluZz4gPSBbXTsvL1snLScsJy0nLCctJ107XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSAndGhlIHRpdGxlJztcbiAgQElucHV0KCkgbWFwVW5pdHMgOnN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBoZWxwVGV4dDpzdHJpbmc9J05vIGNvbW1lbnQnO1xuICBASW5wdXQoKSB0b29sdGlwUGxhY2VtZW50OnN0cmluZz0ncmlnaHQnO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBhdHRyaWJ1dGlvbkxpbms6IHN0cmluZztcblxuICBnZW5lcmF0ZWRMYWJlbHM6IHN0cmluZ1tdID0gW107XG4gIF9jYlBhbGV0dGU6c3RyaW5nXG4gIF9jYkNvdW50Om51bWJlcjtcbiAgX2NiUmV2ZXJzZTpib29sZWFuO1xuICBfY2JSYW5nZTpBcnJheTxudW1iZXI+O1xuXG4gIEBJbnB1dCgpIHNldCBjYlBhbGV0dGUoY2JwOnN0cmluZyl7XG4gICAgdGhpcy5fY2JQYWxldHRlID0gY2JwO1xuICAgIHRoaXMuZ2VuZXJhdGVQYWxldHRlKCk7XG4gIH1cblxuICBnZXQgY2JQYWxldHRlKCk6c3RyaW5ne3JldHVybiB0aGlzLl9jYlBhbGV0dGU7fVxuXG4gIEBJbnB1dCgpIHNldCBjYkNvdW50KGNiYzpudW1iZXIpe1xuICAgIHRoaXMuX2NiQ291bnQ9Y2JjO1xuICAgIHRoaXMuZ2VuZXJhdGVQYWxldHRlKCk7XG4gIH1cblxuICBnZXQgY2JDb3VudCgpOm51bWJlcntyZXR1cm4gdGhpcy5fY2JDb3VudDt9XG5cbiAgQElucHV0KCkgc2V0IGNiUmV2ZXJzZShjYnI6Ym9vbGVhbil7XG4gICAgdGhpcy5fY2JSZXZlcnNlPWNicjtcbiAgICB0aGlzLmdlbmVyYXRlUGFsZXR0ZSgpO1xuICB9XG5cbiAgZ2V0IGNiUmV2ZXJzZSgpOmJvb2xlYW57cmV0dXJuIHRoaXMuX2NiUmV2ZXJzZTt9XG5cbiAgQElucHV0KCkgc2V0IGNiUmFuZ2UoY2JyOkFycmF5PG51bWJlcj4pe1xuICAgIHRoaXMuX2NiUmFuZ2UgPSBjYnI7XG4gICAgdGhpcy5nZW5lcmF0ZVBhbGV0dGUoKTtcbiAgfVxuXG4gIGdldCBjYlJhbmdlKCk6QXJyYXk8bnVtYmVyPntyZXR1cm4gdGhpcy5fY2JSYW5nZTt9XG5cbiAgZ2VuZXJhdGVMYWJlbHMoY291bnQ6bnVtYmVyKTpBcnJheTxzdHJpbmc+fG51bGx7XG4gICAgaWYoIXRoaXMuX2NiUmFuZ2V8fCFjb3VudCl7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZGVsdGEgPSAodGhpcy5fY2JSYW5nZVsxXS10aGlzLl9jYlJhbmdlWzBdKS8oY291bnQtMSk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBsb3dlcj10aGlzLl9jYlJhbmdlWzBdO1xuICAgIGxldCAgZGVjaW1hbFBsYWNlcyA9IE1hdGgubWF4KDAsMi0oK01hdGgubG9nMTAodGhpcy5fY2JSYW5nZVsxXS10aGlzLl9jYlJhbmdlWzBdKS50b0ZpeGVkKCkpKTtcbiAgICBkZWNpbWFsUGxhY2VzID0gTWF0aC5taW4oZGVjaW1hbFBsYWNlcywxMCk7XG4gICAgdmFyIHVwcGVyO1xuICAgIGZvcihsZXQgaT0xO2k8Y291bnQ7aSsrKXtcbiAgICAgIHVwcGVyID0gdGhpcy5fY2JSYW5nZVswXStpKmRlbHRhO1xuICAgICAgcmVzdWx0LnB1c2goYCR7dGhpcy5mb3JtYXRWYWx1ZShsb3dlcixkZWNpbWFsUGxhY2VzKX0tJHt0aGlzLmZvcm1hdFZhbHVlKHVwcGVyLGRlY2ltYWxQbGFjZXMpfWApO1xuICAgICAgbG93ZXIgPSB1cHBlcjtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2goJyZnZTsnK3RoaXMuX2NiUmFuZ2VbMV0pO1xuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdlbmVyYXRlUGFsZXR0ZSgpe1xuICAgIGlmKCF0aGlzLl9jYlBhbGV0dGV8fCF0aGlzLl9jYkNvdW50KXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wYWxldHRlcy5nZXRQYWxldHRlKHRoaXMuX2NiUGFsZXR0ZSx0aGlzLl9jYlJldmVyc2UsdGhpcy5fY2JDb3VudClcbiAgICAgIC5zdWJzY3JpYmUocGFsZXR0ZT0+e1xuICAgICAgICB0aGlzLmNvbG91cnMgPSBwYWxldHRlLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgICB0aGlzLmdlbmVyYXRlZExhYmVscyA9IHRoaXMubGFiZWxzIHx8IHRoaXMuZ2VuZXJhdGVMYWJlbHModGhpcy5jb2xvdXJzLmxlbmd0aCkgfHwgcGFsZXR0ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvcm1hdFZhbHVlID0gZnVuY3Rpb24odmFsOm51bWJlcixkZWNpbWFsUGxhY2VzOm51bWJlcik6c3RyaW5ne1xuICAgIGlmKCF2YWwpe1xuICAgICAgaWYodmFsPT09MCl7XG4gICAgICAgIHJldHVybiAnMCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gJy0nO1xuICAgIH1cbiAgICAvLyBBZGQgdGhvdXNhbmQncyBzZXBhcmF0b3IuIFNvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjkwMTI5OFxuICAgIHZhciBwYXJ0cyA9IHZhbC50b1N0cmluZygpLnNwbGl0KFwiLlwiKTtcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiLFwiKTtcblxuICAgIGlmKGRlY2ltYWxQbGFjZXM9PT0wKXtcbiAgICAgIHJldHVybiBwYXJ0c1swXTtcbiAgICB9XG5cbiAgICBpZigoZGVjaW1hbFBsYWNlcyE9PW51bGwpICYmKGRlY2ltYWxQbGFjZXMhPT11bmRlZmluZWQpICYmIChwYXJ0cy5sZW5ndGg9PT0yKSl7XG4gICAgICBwYXJ0c1sxXSA9IHBhcnRzWzFdLnN1YnN0cigwLGRlY2ltYWxQbGFjZXMpO1xuICAgICAgcGFydHNbMV0gPSBwYXJ0c1sxXS5yZXBsYWNlKC8wKyQvLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcuJyk7XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFsZXR0ZXM6UGFsZXR0ZVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbn1cbiJdfQ==