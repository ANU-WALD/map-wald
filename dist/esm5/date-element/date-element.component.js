import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var DateElementComponent = /** @class */ (function () {
    function DateElementComponent() {
        this.step = 1;
        this.changed = new EventEmitter();
    }
    DateElementComponent.prototype.ngAfterViewInit = function () {
    };
    DateElementComponent.prototype.move = function (n) {
        this.src[this.property] += n;
        this.changed.emit(this.src);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateElementComponent.prototype, "label", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], DateElementComponent.prototype, "property", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DateElementComponent.prototype, "src", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DateElementComponent.prototype, "step", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DateElementComponent.prototype, "changed", void 0);
    DateElementComponent = tslib_1.__decorate([
        Component({
            selector: 'date-element',
            template: "<div class=\"row no-gutters\">\n  <div class=\"col-4\">{{label}}</div>\n  <div class=\"col-2\">\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"move(-step)\">\n      <i class=\"fa fa-angle-left\"></i>\n    </button>\n  </div>\n  <div class=\"col-4\"><button class=\"btn btn-link btn-sm\">{{src[property]}}</button></div>\n  <div class=\"col-2\">\n    <button class=\"btn btn-secondary btn-sm\" (click)=\"move(step)\">\n      <i class=\"fa fa-angle-right\"></i>\n    </button>\n  </div>\n</div>\n"
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DateElementComponent);
    return DateElementComponent;
}());
export { DateElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1lbGVtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiZGF0ZS1lbGVtZW50L2RhdGUtZWxlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0I3RztJQU9FO1FBSFMsU0FBSSxHQUFHLENBQUMsQ0FBQztRQUNSLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBSTVDLENBQUM7SUFFRCw4Q0FBZSxHQUFmO0lBRUEsQ0FBQztJQUVELG1DQUFJLEdBQUosVUFBSyxDQUFRO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBakJRO1FBQVIsS0FBSyxFQUFFOzt1REFBYztJQUNiO1FBQVIsS0FBSyxFQUFFOzswREFBaUI7SUFDaEI7UUFBUixLQUFLLEVBQUU7O3FEQUFTO0lBQ1I7UUFBUixLQUFLLEVBQUU7O3NEQUFVO0lBQ1I7UUFBVCxNQUFNLEVBQUU7O3lEQUFtQztJQUxqQyxvQkFBb0I7UUFqQmhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSwyZkFjWDtTQUFZLENBQUM7O09BQ0Qsb0JBQW9CLENBbUJoQztJQUFELDJCQUFDO0NBQUEsQUFuQkQsSUFtQkM7U0FuQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkYXRlLWVsZW1lbnQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sLTRcIj57e2xhYmVsfX08L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC0yXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIChjbGljayk9XCJtb3ZlKC1zdGVwKVwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1hbmdsZS1sZWZ0XCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC00XCI+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGluayBidG4tc21cIj57e3NyY1twcm9wZXJ0eV19fTwvYnV0dG9uPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29sLTJcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCIgKGNsaWNrKT1cIm1vdmUoc3RlcClcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtcmlnaHRcIj48L2k+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIERhdGVFbGVtZW50Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCAge1xuICBASW5wdXQoKSBsYWJlbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHByb3BlcnR5OnN0cmluZztcbiAgQElucHV0KCkgc3JjOmFueTtcbiAgQElucHV0KCkgc3RlcCA9IDE7XG4gIEBPdXRwdXQoKSBjaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIFxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG5cbiAgbW92ZShuOm51bWJlcil7XG4gICAgdGhpcy5zcmNbdGhpcy5wcm9wZXJ0eV0gKz0gbjtcbiAgICB0aGlzLmNoYW5nZWQuZW1pdCh0aGlzLnNyYyk7XG4gIH1cbn1cbiJdfQ==