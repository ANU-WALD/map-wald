import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var FeatureTableComponent = /** @class */ (function () {
    function FeatureTableComponent() {
        this.styles = {};
        this._keys = Object.keys;
    }
    FeatureTableComponent.prototype.ngAfterViewInit = function () {
    };
    FeatureTableComponent.prototype.ngOnChanges = function (changes) {
        if (!this.styles) {
            this.styles = {};
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
            template: "<table *ngIf=\"feature\" class=\"table table-striped table-sm feature-table\">\n  <thead>\n    <tr>\n      <td><strong>Property</strong></td>\n      <td><strong>Value</strong></td>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><strong>Geometry</strong></td>\n      <td>{{feature.geometry.type}}</td>\n    </tr>\n    <tr *ngFor=\"let prop of _keys(feature.properties)\">\n      <td><strong>{{prop}}</strong></td>\n      <td *ngIf=\"!styles||!styles[prop]\">{{feature.properties[prop]}}</td>\n      <td *ngIf=\"styles&&styles[prop]\">\n        <a *ngIf=\"styles[prop].hyperlink\" target=\"_blank\" [href]=\"feature.properties[prop]\">\n          {{feature.properties[prop]}}\n        </a>\n      </td>\n    </tr>\n  </tbody>\n</table>",
            styles: [".feature-table{\n  max-width:300px;\n}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FeatureTableComponent);
    return FeatureTableComponent;
}());
export { FeatureTableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImZlYXR1cmUtdGFibGUvZmVhdHVyZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQThCMUY7SUFLRTtRQUhTLFdBQU0sR0FBc0MsRUFBRSxDQUFBO1FBQ3ZELFVBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBSXBCLENBQUM7SUFFRCwrQ0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQztZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQWhCUTtRQUFSLEtBQUssRUFBRTs7MERBQWM7SUFDYjtRQUFSLEtBQUssRUFBRTs7eURBQStDO0lBRjVDLHFCQUFxQjtRQTNCakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLHV1QkFzQkg7cUJBQVUsd0NBRWpCO1NBQUUsQ0FBQzs7T0FDUSxxQkFBcUIsQ0FrQmpDO0lBQUQsNEJBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyUHJvcGVydHlTdHlsZSB9IGZyb20gJy4uL2RhdGEvY2F0YWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2ZlYXR1cmUtdGFibGUnLFxuICB0ZW1wbGF0ZTogYDx0YWJsZSAqbmdJZj1cImZlYXR1cmVcIiBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtc20gZmVhdHVyZS10YWJsZVwiPlxuICA8dGhlYWQ+XG4gICAgPHRyPlxuICAgICAgPHRkPjxzdHJvbmc+UHJvcGVydHk8L3N0cm9uZz48L3RkPlxuICAgICAgPHRkPjxzdHJvbmc+VmFsdWU8L3N0cm9uZz48L3RkPlxuICAgIDwvdHI+XG4gIDwvdGhlYWQ+XG4gIDx0Ym9keT5cbiAgICA8dHI+XG4gICAgICA8dGQ+PHN0cm9uZz5HZW9tZXRyeTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8dGQ+e3tmZWF0dXJlLmdlb21ldHJ5LnR5cGV9fTwvdGQ+XG4gICAgPC90cj5cbiAgICA8dHIgKm5nRm9yPVwibGV0IHByb3Agb2YgX2tleXMoZmVhdHVyZS5wcm9wZXJ0aWVzKVwiPlxuICAgICAgPHRkPjxzdHJvbmc+e3twcm9wfX08L3N0cm9uZz48L3RkPlxuICAgICAgPHRkICpuZ0lmPVwiIXN0eWxlc3x8IXN0eWxlc1twcm9wXVwiPnt7ZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BdfX08L3RkPlxuICAgICAgPHRkICpuZ0lmPVwic3R5bGVzJiZzdHlsZXNbcHJvcF1cIj5cbiAgICAgICAgPGEgKm5nSWY9XCJzdHlsZXNbcHJvcF0uaHlwZXJsaW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgW2hyZWZdPVwiZmVhdHVyZS5wcm9wZXJ0aWVzW3Byb3BdXCI+XG4gICAgICAgICAge3tmZWF0dXJlLnByb3BlcnRpZXNbcHJvcF19fVxuICAgICAgICA8L2E+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPmAsc3R5bGVzOiBbYC5mZWF0dXJlLXRhYmxle1xuICBtYXgtd2lkdGg6MzAwcHg7XG59YF19KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGZlYXR1cmU6IGFueTtcbiAgQElucHV0KCkgc3R5bGVzOiB7W2tleTpzdHJpbmddOkxheWVyUHJvcGVydHlTdHlsZX0gPSB7fVxuICBfa2V5cyA9IE9iamVjdC5rZXlzO1xuXG4gIGNvbnN0cnVjdG9yKCl7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYoIXRoaXMuc3R5bGVzKXtcbiAgICAgIHRoaXMuc3R5bGVzID0ge307XG4gICAgfVxuICB9XG59Il19