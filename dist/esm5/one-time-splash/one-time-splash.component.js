import * as tslib_1 from "tslib";
import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as store from 'store';
var OneTimeSplashComponent = /** @class */ (function () {
    function OneTimeSplashComponent(modalService) {
        this.modalService = modalService;
        this.label = 'About';
        this.hideMessage = 'Understood, I don’t need to see this again';
    }
    OneTimeSplashComponent.prototype.storageKey = function () {
        if (!this.application) {
            return null;
        }
        return this.application + '-splash-skip';
    };
    OneTimeSplashComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var key = _this.storageKey();
            if (key) {
                _this.doNotShow = store.get(key, false);
            }
            if (!_this.doNotShow) {
                _this.show();
            }
        });
    };
    OneTimeSplashComponent.prototype.show = function () {
        this.current = this.modalService.open(this.splashTemplate, {
            size: 'lg',
            windowClass: this.klass
        });
    };
    OneTimeSplashComponent.prototype.close = function () {
        if (!this.current) {
            return;
        }
        this.current.close();
        this.current = null;
    };
    OneTimeSplashComponent.prototype.doNotShowClicked = function () {
        var key = this.storageKey();
        if (!key) {
            return;
        }
        store.set(key, this.doNotShow);
    };
    OneTimeSplashComponent.ctorParameters = function () { return [
        { type: NgbModal }
    ]; };
    tslib_1.__decorate([
        ViewChild('splashTemplate', { static: false }),
        tslib_1.__metadata("design:type", Object)
    ], OneTimeSplashComponent.prototype, "splashTemplate", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], OneTimeSplashComponent.prototype, "application", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OneTimeSplashComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], OneTimeSplashComponent.prototype, "hideMessage", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], OneTimeSplashComponent.prototype, "klass", void 0);
    OneTimeSplashComponent = tslib_1.__decorate([
        Component({
            selector: 'one-time-splash',
            template: "<ng-template #splashTemplate let-c=\"close\" let-d=\"dismiss\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">\n      {{label}}</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"d('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <ng-content></ng-content>\n  </div>\n  <div class=\"modal-footer\">\n    <label *ngIf=\"application\">\n      <input type=\"checkbox\" [(ngModel)]=\"doNotShow\" (ngModelChange)=\"doNotShowClicked()\">\n      &nbsp; {{hideMessage}}\n    </label>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"c('Close click')\">Close</button>\n  </div>\n  </ng-template>\n",
            styles: [""]
        }),
        tslib_1.__metadata("design:paramtypes", [NgbModal])
    ], OneTimeSplashComponent);
    return OneTimeSplashComponent;
}());
export { OneTimeSplashComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25lLXRpbWUtc3BsYXNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsib25lLXRpbWUtc3BsYXNoL29uZS10aW1lLXNwbGFzaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBNkIsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQTZCL0I7SUFTRSxnQ0FBb0IsWUFBc0I7UUFBdEIsaUJBQVksR0FBWixZQUFZLENBQVU7UUFOakMsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUNoQixnQkFBVyxHQUFHLDRDQUE0QyxDQUFDO0lBT3BFLENBQUM7SUFFRCwyQ0FBVSxHQUFWO1FBQ0UsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUM7WUFDbkIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBSSxjQUFjLENBQUM7SUFDNUMsQ0FBQztJQUVELGdEQUFlLEdBQWY7UUFBQSxpQkFXQztRQVZDLFVBQVUsQ0FBQztZQUNULElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM5QixJQUFHLEdBQUcsRUFBQztnQkFDTCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDO1lBRUQsSUFBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUM7Z0JBQ2pCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscUNBQUksR0FBSjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQztZQUN4RCxJQUFJLEVBQUMsSUFBSTtZQUNULFdBQVcsRUFBQyxJQUFJLENBQUMsS0FBSztTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQUssR0FBTDtRQUNFLElBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDO1lBQ2YsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0lBRUQsaURBQWdCLEdBQWhCO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlCLElBQUcsQ0FBQyxHQUFHLEVBQUM7WUFDTixPQUFPO1NBQ1I7UUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Z0JBaERpQyxRQUFROztJQVJFO1FBQTNDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQzs7a0VBQW9CO0lBQ3REO1FBQVIsS0FBSyxFQUFFOzsrREFBb0I7SUFDbkI7UUFBUixLQUFLLEVBQUU7O3lEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7K0RBQTREO0lBQzNEO1FBQVIsS0FBSyxFQUFFOzt5REFBZTtJQUxaLHNCQUFzQjtRQXhCbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsNHRCQW1CWDtxQkFDVSxFQUFFO1NBQ1osQ0FBQztpREFVa0MsUUFBUTtPQVQvQixzQkFBc0IsQ0EwRGxDO0lBQUQsNkJBQUM7Q0FBQSxBQTFERCxJQTBEQztTQTFEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nYk1vZGFsLCBOZ2JNb2RhbFJlZiB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcbmltcG9ydCAqIGFzIHN0b3JlIGZyb20gJ3N0b3JlJztcblxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnb25lLXRpbWUtc3BsYXNoJyxcbiAgdGVtcGxhdGU6IGA8bmctdGVtcGxhdGUgI3NwbGFzaFRlbXBsYXRlIGxldC1jPVwiY2xvc2VcIiBsZXQtZD1cImRpc21pc3NcIj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgIDxoNCBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+XG4gICAgICB7e2xhYmVsfX08L2g0PlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwiZCgnQ3Jvc3MgY2xpY2snKVwiPlxuICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgIDxsYWJlbCAqbmdJZj1cImFwcGxpY2F0aW9uXCI+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJkb05vdFNob3dcIiAobmdNb2RlbENoYW5nZSk9XCJkb05vdFNob3dDbGlja2VkKClcIj5cbiAgICAgICZuYnNwOyB7e2hpZGVNZXNzYWdlfX1cbiAgICA8L2xhYmVsPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwiYygnQ2xvc2UgY2xpY2snKVwiPkNsb3NlPC9idXR0b24+XG4gIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIE9uZVRpbWVTcGxhc2hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0ICB7XG4gIEBWaWV3Q2hpbGQoJ3NwbGFzaFRlbXBsYXRlJyx7c3RhdGljOmZhbHNlfSkgc3BsYXNoVGVtcGxhdGU6YW55O1xuICBASW5wdXQoKSBhcHBsaWNhdGlvbjpzdHJpbmc7XG4gIEBJbnB1dCgpIGxhYmVsID0gJ0Fib3V0JztcbiAgQElucHV0KCkgaGlkZU1lc3NhZ2UgPSAnVW5kZXJzdG9vZCwgSSBkb27igJl0IG5lZWQgdG8gc2VlIHRoaXMgYWdhaW4nO1xuICBASW5wdXQoKSBrbGFzczogc3RyaW5nO1xuICBkb05vdFNob3c6IGJvb2xlYW47XG4gIGN1cnJlbnQ6TmdiTW9kYWxSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBtb2RhbFNlcnZpY2U6IE5nYk1vZGFsKXtcblxuICB9XG5cbiAgc3RvcmFnZUtleSgpe1xuICAgIGlmKCF0aGlzLmFwcGxpY2F0aW9uKXtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFwcGxpY2F0aW9uICArICctc3BsYXNoLXNraXAnO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgY29uc3Qga2V5ID0gdGhpcy5zdG9yYWdlS2V5KCk7XG4gICAgICBpZihrZXkpe1xuICAgICAgICB0aGlzLmRvTm90U2hvdyA9IHN0b3JlLmdldChrZXksZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICBpZighdGhpcy5kb05vdFNob3cpe1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNob3coKXtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLm1vZGFsU2VydmljZS5vcGVuKHRoaXMuc3BsYXNoVGVtcGxhdGUse1xuICAgICAgc2l6ZTonbGcnLFxuICAgICAgd2luZG93Q2xhc3M6dGhpcy5rbGFzc1xuICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoKXtcbiAgICBpZighdGhpcy5jdXJyZW50KXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnQuY2xvc2UoKTtcbiAgICB0aGlzLmN1cnJlbnQ9bnVsbDtcbiAgfVxuXG4gIGRvTm90U2hvd0NsaWNrZWQoKXtcbiAgICBjb25zdCBrZXkgPSB0aGlzLnN0b3JhZ2VLZXkoKTtcbiAgICBpZigha2V5KXtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdG9yZS5zZXQoa2V5LHRoaXMuZG9Ob3RTaG93KTtcbiAgfVxufVxuIl19