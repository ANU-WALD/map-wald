import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let DateShifterComponent = class DateShifterComponent {
    constructor() {
        this.interval = 2000;
        this.limits = null;
        this.date = new Date();
        this.dateChange = new EventEmitter();
        this.value = 0;
        this.label = '-';
        this.timer = 0;
        this.dateText = '-';
    }
    ngOnChanges(changes) {
        if (changes.interval) {
            this.startTimer();
        }
    }
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = window.setInterval(() => this.tick(), this.interval);
    }
    ngAfterViewInit() {
        this.startTimer();
    }
    reset() {
        this.value = 0;
        this.sliderMoved();
    }
    tick() {
        if (!this.value) {
            return;
        }
        let sign = this.value < 0 ? -1 : 1;
        this.date = new Date(this.date.getTime());
        switch (Math.abs(this.value)) {
            case 1:
                this.date.setDate(this.date.getDate() + sign);
                break;
            case 2:
                this.date.setDate(this.date.getDate() + 7 * sign);
                break;
            case 3:
                this.date.setMonth(this.date.getMonth() + sign);
                break;
            case 4:
                this.date.setFullYear(this.date.getFullYear() + sign);
                break;
        }
        if (this.limits && this.limits.length) {
            if (this.date.getTime() < this.limits[0].getTime()) {
                this.date = this.limits[0];
            }
            if (this.date.getTime() > this.limits[1].getTime()) {
                this.date = this.limits[1];
            }
        }
        this.setDateText();
        this.dateChange.emit(this.date);
    }
    setDateText() {
        this.dateText = this.date.toLocaleDateString();
    }
    sliderMoved() {
        this.setLabel();
    }
    setLabel() {
        if (this.value < 0) {
            this.label = 'back 1';
        }
        else if (this.value > 0) {
            this.label = 'advance 1';
        }
        else {
            this.label = '-';
        }
        switch (Math.abs(this.value)) {
            case 1:
                this.label += 'day';
                break;
            case 2:
                this.label += 'week';
                break;
            case 3:
                this.label += 'month';
                break;
            case 4:
                this.label += 'year';
                break;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateShifterComponent.prototype, "interval", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], DateShifterComponent.prototype, "limits", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateShifterComponent.prototype, "date", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], DateShifterComponent.prototype, "dateChange", void 0);
DateShifterComponent = tslib_1.__decorate([
    Component({
        selector: 'date-shifter',
        template: `<div>
  <h3>{{dateText}}</h3>
  <input type="range"
         class="form-control"
         min="-4"
         [max]="4"
         step="1"
         [(ngModel)]="value"
         (ngModelChange)="sliderMoved()"
         (mouseup)="reset()">
  <h4>{{label}}</h4>
</div>

  `,
        styles: [``]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], DateShifterComponent);
export { DateShifterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zaGlmdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiZGF0ZS1zaGlmdGVyL2RhdGUtc2hpZnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQTRCLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQXVCdkksSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFXL0I7UUFWUyxhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFdBQU0sR0FBVSxJQUFJLENBQUM7UUFDckIsU0FBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDakIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFaEQsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLFVBQUssR0FBRyxHQUFHLENBQUM7UUFDWixVQUFLLEdBQVUsQ0FBQyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxHQUFHLENBQUM7SUFHZixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUcsT0FBTyxDQUFDLFFBQVEsRUFBQztZQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztZQUNaLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRSxFQUFFLENBQUEsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FB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Q0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO2dCQUNyQixNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDO2dCQUN0QixNQUFNO1lBQ1IsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO2dCQUNyQixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXBHVTtJQUFSLEtBQUssRUFBRTs7c0RBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOztvREFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O2tEQUFtQjtBQUNqQjtJQUFULE1BQU0sRUFBRTs7d0RBQXVDO0FBSnJDLG9CQUFvQjtJQWxCaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0dBYVQ7aUJBQ1EsRUFBRTtLQUNaLENBQUM7O0dBQ1csb0JBQW9CLENBcUdoQztTQXJHWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1zaGlmdGVyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8aDM+e3tkYXRlVGV4dH19PC9oMz5cbiAgPGlucHV0IHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICBtaW49XCItNFwiXG4gICAgICAgICBbbWF4XT1cIjRcIlxuICAgICAgICAgc3RlcD1cIjFcIlxuICAgICAgICAgWyhuZ01vZGVsKV09XCJ2YWx1ZVwiXG4gICAgICAgICAobmdNb2RlbENoYW5nZSk9XCJzbGlkZXJNb3ZlZCgpXCJcbiAgICAgICAgIChtb3VzZXVwKT1cInJlc2V0KClcIj5cbiAgPGg0Pnt7bGFiZWx9fTwvaDQ+XG48L2Rpdj5cblxuICBgLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGF0ZVNoaWZ0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uQ2hhbmdlcyAge1xuICBASW5wdXQoKSBpbnRlcnZhbCA9IDIwMDA7XG4gIEBJbnB1dCgpIGxpbWl0czpEYXRlW10gPSBudWxsO1xuICBASW5wdXQoKSBkYXRlID0gbmV3IERhdGUoKTtcbiAgQE91dHB1dCgpIGRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGU+KCk7XG5cbiAgdmFsdWUgPSAwO1xuICBsYWJlbCA9ICctJztcbiAgdGltZXI6bnVtYmVyID0gMDtcbiAgZGF0ZVRleHQgPSAnLSc7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZihjaGFuZ2VzLmludGVydmFsKXtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VGltZXIoKTogYW55IHtcbiAgICBpZih0aGlzLnRpbWVyKXtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgfVxuICAgIHRoaXMudGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCk9PnRoaXMudGljaygpLHRoaXMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudmFsdWUgPSAwO1xuICAgIHRoaXMuc2xpZGVyTW92ZWQoKTtcbiAgfVxuXG4gIHRpY2soKTogYW55IHtcbiAgICBpZighdGhpcy52YWx1ZSl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHNpZ24gPSB0aGlzLnZhbHVlIDwgMCA/IC0xIDogMTtcbiAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZSh0aGlzLmRhdGUuZ2V0VGltZSgpKTtcbiAgICBzd2l0Y2goTWF0aC5hYnModGhpcy52YWx1ZSkpe1xuICAgICAgY2FzZSAxOlxuICAgICAgICB0aGlzLmRhdGUuc2V0RGF0ZSh0aGlzLmRhdGUuZ2V0RGF0ZSgpK3NpZ24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgdGhpcy5kYXRlLnNldERhdGUodGhpcy5kYXRlLmdldERhdGUoKSs3KnNpZ24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5kYXRlLnNldE1vbnRoKHRoaXMuZGF0ZS5nZXRNb250aCgpK3NpZ24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5kYXRlLnNldEZ1bGxZZWFyKHRoaXMuZGF0ZS5nZXRGdWxsWWVhcigpK3NpZ24pO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZih0aGlzLmxpbWl0cyYmdGhpcy5saW1pdHMubGVuZ3RoKXtcbiAgICAgIGlmKHRoaXMuZGF0ZS5nZXRUaW1lKCk8dGhpcy5saW1pdHNbMF0uZ2V0VGltZSgpKXtcbiAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5saW1pdHNbMF07XG4gICAgICB9XG4gICAgICBpZih0aGlzLmRhdGUuZ2V0VGltZSgpPnRoaXMubGltaXRzWzFdLmdldFRpbWUoKSl7XG4gICAgICAgIHRoaXMuZGF0ZSA9IHRoaXMubGltaXRzWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldERhdGVUZXh0KCk7XG4gICAgdGhpcy5kYXRlQ2hhbmdlLmVtaXQodGhpcy5kYXRlKTtcbiAgfVxuICBzZXREYXRlVGV4dCgpOiBhbnkge1xuICAgIHRoaXMuZGF0ZVRleHQgPSB0aGlzLmRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gIH1cblxuICBzbGlkZXJNb3ZlZCgpe1xuICAgIHRoaXMuc2V0TGFiZWwoKTtcbiAgfVxuXG4gIHNldExhYmVsKCkge1xuICAgIGlmKHRoaXMudmFsdWU8MCl7XG4gICAgICB0aGlzLmxhYmVsID0gJ2JhY2sgMSc7XG4gICAgfSBlbHNlIGlmKHRoaXMudmFsdWU+MCl7XG4gICAgICB0aGlzLmxhYmVsID0gJ2FkdmFuY2UgMSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFiZWwgPSAnLSc7XG4gICAgfVxuXG4gICAgc3dpdGNoKE1hdGguYWJzKHRoaXMudmFsdWUpKXtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgdGhpcy5sYWJlbCArPSAnZGF5JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHRoaXMubGFiZWwgKz0gJ3dlZWsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgdGhpcy5sYWJlbCArPSAnbW9udGgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgdGhpcy5sYWJlbCArPSAneWVhcic7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19