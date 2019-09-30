import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let FeatureTableComponent = class FeatureTableComponent {
    constructor() {
        this.styles = {};
        this._keys = Object.keys;
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if (!this.styles) {
            this.styles = {};
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FeatureTableComponent.prototype, "feature", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], FeatureTableComponent.prototype, "styles", void 0);
FeatureTableComponent = tslib_1.__decorate([
    Component({
        selector: 'feature-table',
        template: `<table *ngIf="feature" class="table table-striped table-sm feature-table">
  <thead>
    <tr>
      <td><strong>Property</strong></td>
      <td><strong>Value</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Geometry</strong></td>
      <td>{{feature.geometry.type}}</td>
    </tr>
    <tr *ngFor="let prop of _keys(feature.properties)">
      <td><strong>{{prop}}</strong></td>
      <td *ngIf="!styles||!styles[prop]">{{feature.properties[prop]}}</td>
      <td *ngIf="styles&&styles[prop]">
        <a *ngIf="styles[prop].hyperlink" target="_blank" [href]="feature.properties[prop]">
          {{feature.properties[prop]}}
        </a>
      </td>
    </tr>
  </tbody>
</table>`,
        styles: [`.feature-table{
  max-width:300px;
}`]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], FeatureTableComponent);
export { FeatureTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImZlYXR1cmUtdGFibGUvZmVhdHVyZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQThCMUYsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFLaEM7UUFIUyxXQUFNLEdBQXNDLEVBQUUsQ0FBQTtRQUN2RCxVQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUlwQixDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBakJVO0lBQVIsS0FBSyxFQUFFOztzREFBYztBQUNiO0lBQVIsS0FBSyxFQUFFOztxREFBK0M7QUFGNUMscUJBQXFCO0lBM0JqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQkg7aUJBQVU7O0VBRWpCO0tBQUUsQ0FBQzs7R0FDUSxxQkFBcUIsQ0FrQmpDO1NBbEJZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJQcm9wZXJ0eVN0eWxlIH0gZnJvbSAnLi4vZGF0YS9jYXRhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZmVhdHVyZS10YWJsZScsXG4gIHRlbXBsYXRlOiBgPHRhYmxlICpuZ0lmPVwiZmVhdHVyZVwiIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1zbSBmZWF0dXJlLXRhYmxlXCI+XG4gIDx0aGVhZD5cbiAgICA8dHI+XG4gICAgICA8dGQ+PHN0cm9uZz5Qcm9wZXJ0eTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8dGQ+PHN0cm9uZz5WYWx1ZTwvc3Ryb25nPjwvdGQ+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5PlxuICAgIDx0cj5cbiAgICAgIDx0ZD48c3Ryb25nPkdlb21ldHJ5PC9zdHJvbmc+PC90ZD5cbiAgICAgIDx0ZD57e2ZlYXR1cmUuZ2VvbWV0cnkudHlwZX19PC90ZD5cbiAgICA8L3RyPlxuICAgIDx0ciAqbmdGb3I9XCJsZXQgcHJvcCBvZiBfa2V5cyhmZWF0dXJlLnByb3BlcnRpZXMpXCI+XG4gICAgICA8dGQ+PHN0cm9uZz57e3Byb3B9fTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8dGQgKm5nSWY9XCIhc3R5bGVzfHwhc3R5bGVzW3Byb3BdXCI+e3tmZWF0dXJlLnByb3BlcnRpZXNbcHJvcF19fTwvdGQ+XG4gICAgICA8dGQgKm5nSWY9XCJzdHlsZXMmJnN0eWxlc1twcm9wXVwiPlxuICAgICAgICA8YSAqbmdJZj1cInN0eWxlc1twcm9wXS5oeXBlcmxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBbaHJlZl09XCJmZWF0dXJlLnByb3BlcnRpZXNbcHJvcF1cIj5cbiAgICAgICAgICB7e2ZlYXR1cmUucHJvcGVydGllc1twcm9wXX19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGFibGU+YCxzdHlsZXM6IFtgLmZlYXR1cmUtdGFibGV7XG4gIG1heC13aWR0aDozMDBweDtcbn1gXX0pXG5leHBvcnQgY2xhc3MgRmVhdHVyZVRhYmxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZmVhdHVyZTogYW55O1xuICBASW5wdXQoKSBzdHlsZXM6IHtba2V5OnN0cmluZ106TGF5ZXJQcm9wZXJ0eVN0eWxlfSA9IHt9XG4gIF9rZXlzID0gT2JqZWN0LmtleXM7XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZighdGhpcy5zdHlsZXMpe1xuICAgICAgdGhpcy5zdHlsZXMgPSB7fTtcbiAgICB9XG4gIH1cbn0iXX0=