import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let DateElementComponent = class DateElementComponent {
    constructor() {
        this.step = 1;
        this.changed = new EventEmitter();
    }
    ngAfterViewInit() {
    }
    move(n) {
        this.src[this.property] += n;
        this.changed.emit(this.src);
    }
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
        template: `<div class="row no-gutters">
  <div class="col-4">{{label}}</div>
  <div class="col-2">
    <button class="btn btn-secondary btn-sm" (click)="move(-step)">
      <i class="fa fa-angle-left"></i>
    </button>
  </div>
  <div class="col-4"><button class="btn btn-link btn-sm">{{src[property]}}</button></div>
  <div class="col-2">
    <button class="btn btn-secondary btn-sm" (click)="move(step)">
      <i class="fa fa-angle-right"></i>
    </button>
  </div>
</div>
`
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DateElementComponent);
export { DateElementComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1lbGVtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiZGF0ZS1lbGVtZW50L2RhdGUtZWxlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0I3RyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQU8vQjtRQUhTLFNBQUksR0FBRyxDQUFDLENBQUM7UUFDUixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUk1QyxDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7SUFFRCxJQUFJLENBQUMsQ0FBUTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNGLENBQUE7QUFsQlU7SUFBUixLQUFLLEVBQUU7O21EQUFjO0FBQ2I7SUFBUixLQUFLLEVBQUU7O3NEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7aURBQVM7QUFDUjtJQUFSLEtBQUssRUFBRTs7a0RBQVU7QUFDUjtJQUFULE1BQU0sRUFBRTs7cURBQW1DO0FBTGpDLG9CQUFvQjtJQWpCaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztDQWNYO0tBQVksQ0FBQzs7R0FDRCxvQkFBb0IsQ0FtQmhDO1NBbkJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1lbGVtZW50JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cbiAgPGRpdiBjbGFzcz1cImNvbC00XCI+e3tsYWJlbH19PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wtMlwiPlxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiAoY2xpY2spPVwibW92ZSgtc3RlcClcIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtYW5nbGUtbGVmdFwiPjwvaT5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb2wtNFwiPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgYnRuLXNtXCI+e3tzcmNbcHJvcGVydHldfX08L2J1dHRvbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNvbC0yXCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIChjbGljayk9XCJtb3ZlKHN0ZXApXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWFuZ2xlLXJpZ2h0XCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxzdHlsZXM6IFtdfSlcbmV4cG9ydCBjbGFzcyBEYXRlRWxlbWVudENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQgIHtcbiAgQElucHV0KCkgbGFiZWw6c3RyaW5nO1xuICBASW5wdXQoKSBwcm9wZXJ0eTpzdHJpbmc7XG4gIEBJbnB1dCgpIHNyYzphbnk7XG4gIEBJbnB1dCgpIHN0ZXAgPSAxO1xuICBAT3V0cHV0KCkgY2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBcbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG5cbiAgfVxuXG4gIG1vdmUobjpudW1iZXIpe1xuICAgIHRoaXMuc3JjW3RoaXMucHJvcGVydHldICs9IG47XG4gICAgdGhpcy5jaGFuZ2VkLmVtaXQodGhpcy5zcmMpO1xuICB9XG59XG4iXX0=