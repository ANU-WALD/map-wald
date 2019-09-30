import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TimeUtilsService } from "../time-utils.service";
import { InterpolationService } from '../interpolation.service';
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
let DateSelectionComponent = class DateSelectionComponent {
    constructor(timeUtils) {
        this.timeUtils = timeUtils;
        this.dateChange = new EventEmitter();
        this.style = 'arrows';
        this.stepDays = 1;
        this.referenceDate = null;
        this.need = {
            day: true,
            month: true,
            year: true
        };
        this.atMax = false;
        this.atMin = false;
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if (changes.minDate) {
            this.minDateStruct = this.timeUtils.convertDate(this.minDate);
        }
        if (changes.maxDate) {
            this.maxDateStruct = this.timeUtils.convertDate(this.maxDate);
        }
        if (changes.date) {
            this.dateStruct = this.timeUtils.convertDate(this.date);
        }
        if (changes.timestep) {
            this.assessDateComponents();
        }
        this.checkLimits();
    }
    dateStructChanged() {
        this.date = new Date(Date.UTC(this.dateStruct.year, this.dateStruct.month - 1, this.dateStruct.day));
        // this.date.setUTCFullYear(this.dateStruct.year)
        // this.date.setUTCMonth(this.dateStruct.month-1)
        // this.date.setUTCDate(this.dateStruct.day);
        this.checkReference();
        this.dateChange.emit(this.date);
    }
    assessDateComponents() {
        this.need.day = this.need.month = this.need.year = true;
        if (this.timestep === 'daily') {
            return;
        }
        this.need.day = false;
        if (this.timestep === 'annual') {
            this.need.month = false;
        }
    }
    move(n) {
        this.date = new Date(this.date && this.date.getTime());
        this.date.setDate(this.date.getDate() + n);
        this.onDateChanged();
        this.dateChange.emit(this.date);
    }
    onDateChanged() {
        this.checkLimits();
    }
    checkLimits() {
        this.atMax = this.timeUtils.datesEqual(this.dateStruct, this.maxDateStruct);
        this.atMin = this.timeUtils.datesEqual(this.dateStruct, this.minDateStruct);
    }
    // TODO not enforcing limits etc...
    checkReference() {
        if (!this.referenceDate) {
            return;
        }
        let refComponents = InterpolationService.interpolate(this.referenceDate, {
            year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            date: this.date.getDate()
        }).split('-').map(s => +s);
        let currentRef = new Date(Date.UTC(refComponents[0], refComponents[1] - 1, refComponents[2]));
        console.log('currentRef', currentRef);
        console.log('currentDate', this.date);
        let timeSpan = MILLISECONDS_PER_DAY * this.stepDays;
        let days = (this.date.getTime() - currentRef.getTime()) / timeSpan;
        this.date = new Date(currentRef.getTime() + Math.round(days) * timeSpan);
        this.dateStruct = this.timeUtils.convertDate(this.date);
    }
};
DateSelectionComponent.ctorParameters = () => [
    { type: TimeUtilsService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Date)
], DateSelectionComponent.prototype, "date", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], DateSelectionComponent.prototype, "dateChange", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateSelectionComponent.prototype, "timestep", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateSelectionComponent.prototype, "minDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateSelectionComponent.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateSelectionComponent.prototype, "style", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], DateSelectionComponent.prototype, "stepDays", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], DateSelectionComponent.prototype, "referenceDate", void 0);
DateSelectionComponent = tslib_1.__decorate([
    Component({
        selector: 'date-selection',
        template: `<div class="date-control container-fluid">
  <div *ngIf="style!=='arrows'" class="row no-gutters">
    <div class="col-8 form-group-inline">
        <div class="input-group input-group-sm">
          <input class="form-control form-control-sm" placeholder="yyyy-mm-dd"
                 name="dp" [(ngModel)]="dateStruct" (ngModelChange)="dateStructChanged()"
                 ngbDatepicker #d="ngbDatepicker"
                 [maxDate]="maxDateStruct" [minDate]="minDateStruct">
          <div class="input-group-addon" (click)="d.toggle()" >
            <i class="fa fa-calendar"></i>
          </div>
        </div>
      </div>

    <!--
      <div class="col-2" >
        <button class="btn btn-secondary btn-sm" [disabled]="atMax"
                (click)="move(1)"><i class="fa fa-chevron-right"></i></button>
      </div>
    -->
  </div>

  <div *ngIf="style==='arrows'">
    <date-element *ngIf="need.day"   [src]="dateStruct" [property]="'day'" [label]="'Day'"
                  [step]="stepDays"
                  (changed)="dateStructChanged()"></date-element>
    <date-element *ngIf="need.month" [src]="dateStruct" [property]="'month'" [label]="'Month'"
                  (changed)="dateStructChanged()"></date-element>
    <date-element *ngIf="need.year"  [src]="dateStruct" [property]="'year'" [label]="'Year'"
                  (changed)="dateStructChanged()"></date-element>
  </div>
</div>
`
    }),
    tslib_1.__metadata("design:paramtypes", [TimeUtilsService])
], DateSelectionComponent);
export { DateSelectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1zZWxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJkYXRlLXNlbGVjdGlvbi9kYXRlLXNlbGVjdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLE1BQU0sb0JBQW9CLEdBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsSUFBSSxDQUFDO0FBdUN6QyxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQXVCakMsWUFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFyQnJDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWpDLFVBQUssR0FBdUIsUUFBUSxDQUFDO1FBQ3JDLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixrQkFBYSxHQUFVLElBQUksQ0FBQztRQUVyQyxTQUFJLEdBQUc7WUFDTCxHQUFHLEVBQUMsSUFBSTtZQUNSLEtBQUssRUFBQyxJQUFJO1lBQ1YsSUFBSSxFQUFDLElBQUk7U0FDVixDQUFDO1FBTUYsVUFBSyxHQUFTLEtBQUssQ0FBQztRQUNwQixVQUFLLEdBQVMsS0FBSyxDQUFDO0lBSXBCLENBQUM7SUFFRCxlQUFlO0lBRWYsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFXO1FBQ3JCLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBQztZQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUcs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RUFBRTs7dURBQXNCO0FBQ3JCO0lBQVIsS0FBSyxFQUFFOzt1REFBc0I7QUFDckI7SUFBUixLQUFLLEVBQUU7O3FEQUFzQztBQUNyQztJQUFSLEtBQUssRUFBRTs7d0RBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTs7NkRBQTZCO0FBUjFCLHNCQUFzQjtJQW5DbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBZ0NYO0tBQVksQ0FBQzs2Q0F3Qm1CLGdCQUFnQjtHQXZCcEMsc0JBQXNCLENBOEdsQztTQTlHWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ2JEYXRlU3RydWN0IH0gZnJvbSBcIkBuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwXCI7XG5pbXBvcnQgeyBUaW1lVXRpbHNTZXJ2aWNlIH0gZnJvbSBcIi4uL3RpbWUtdXRpbHMuc2VydmljZVwiO1xuaW1wb3J0IHsgSW50ZXJwb2xhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9pbnRlcnBvbGF0aW9uLnNlcnZpY2UnO1xuXG5jb25zdCBNSUxMSVNFQ09ORFNfUEVSX0RBWT0yNCo2MCo2MCoxMDAwO1xuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS1zZWxlY3Rpb24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJkYXRlLWNvbnRyb2wgY29udGFpbmVyLWZsdWlkXCI+XG4gIDxkaXYgKm5nSWY9XCJzdHlsZSE9PSdhcnJvd3MnXCIgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtOCBmb3JtLWdyb3VwLWlubGluZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAgaW5wdXQtZ3JvdXAtc21cIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLXNtXCIgcGxhY2Vob2xkZXI9XCJ5eXl5LW1tLWRkXCJcbiAgICAgICAgICAgICAgICAgbmFtZT1cImRwXCIgWyhuZ01vZGVsKV09XCJkYXRlU3RydWN0XCIgKG5nTW9kZWxDaGFuZ2UpPVwiZGF0ZVN0cnVjdENoYW5nZWQoKVwiXG4gICAgICAgICAgICAgICAgIG5nYkRhdGVwaWNrZXIgI2Q9XCJuZ2JEYXRlcGlja2VyXCJcbiAgICAgICAgICAgICAgICAgW21heERhdGVdPVwibWF4RGF0ZVN0cnVjdFwiIFttaW5EYXRlXT1cIm1pbkRhdGVTdHJ1Y3RcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb25cIiAoY2xpY2spPVwiZC50b2dnbGUoKVwiID5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2FsZW5kYXJcIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICA8IS0tXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTJcIiA+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIiBbZGlzYWJsZWRdPVwiYXRNYXhcIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlKDEpXCI+PGkgY2xhc3M9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgLS0+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJzdHlsZT09PSdhcnJvd3MnXCI+XG4gICAgPGRhdGUtZWxlbWVudCAqbmdJZj1cIm5lZWQuZGF5XCIgICBbc3JjXT1cImRhdGVTdHJ1Y3RcIiBbcHJvcGVydHldPVwiJ2RheSdcIiBbbGFiZWxdPVwiJ0RheSdcIlxuICAgICAgICAgICAgICAgICAgW3N0ZXBdPVwic3RlcERheXNcIlxuICAgICAgICAgICAgICAgICAgKGNoYW5nZWQpPVwiZGF0ZVN0cnVjdENoYW5nZWQoKVwiPjwvZGF0ZS1lbGVtZW50PlxuICAgIDxkYXRlLWVsZW1lbnQgKm5nSWY9XCJuZWVkLm1vbnRoXCIgW3NyY109XCJkYXRlU3RydWN0XCIgW3Byb3BlcnR5XT1cIidtb250aCdcIiBbbGFiZWxdPVwiJ01vbnRoJ1wiXG4gICAgICAgICAgICAgICAgICAoY2hhbmdlZCk9XCJkYXRlU3RydWN0Q2hhbmdlZCgpXCI+PC9kYXRlLWVsZW1lbnQ+XG4gICAgPGRhdGUtZWxlbWVudCAqbmdJZj1cIm5lZWQueWVhclwiICBbc3JjXT1cImRhdGVTdHJ1Y3RcIiBbcHJvcGVydHldPVwiJ3llYXInXCIgW2xhYmVsXT1cIidZZWFyJ1wiXG4gICAgICAgICAgICAgICAgICAoY2hhbmdlZCk9XCJkYXRlU3RydWN0Q2hhbmdlZCgpXCI+PC9kYXRlLWVsZW1lbnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIERhdGVTZWxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0ICB7XG4gIEBJbnB1dCgpIGRhdGU6IERhdGU7XG4gIEBPdXRwdXQoKSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoKSB0aW1lc3RlcDogc3RyaW5nO1xuICBASW5wdXQoKSBtaW5EYXRlOiBEYXRlfHN0cmluZztcbiAgQElucHV0KCkgbWF4RGF0ZTogRGF0ZXxzdHJpbmc7XG4gIEBJbnB1dCgpIHN0eWxlOiAoJ3BvcHVwJ3wnYXJyb3dzJykgPSAnYXJyb3dzJztcbiAgQElucHV0KCkgc3RlcERheXMgPSAxO1xuICBASW5wdXQoKSByZWZlcmVuY2VEYXRlOnN0cmluZyA9IG51bGw7XG5cbiAgbmVlZCA9IHtcbiAgICBkYXk6dHJ1ZSxcbiAgICBtb250aDp0cnVlLFxuICAgIHllYXI6dHJ1ZVxuICB9O1xuXG4gIG1pbkRhdGVTdHJ1Y3Q6TmdiRGF0ZVN0cnVjdDtcbiAgbWF4RGF0ZVN0cnVjdDpOZ2JEYXRlU3RydWN0O1xuICBkYXRlU3RydWN0Ok5nYkRhdGVTdHJ1Y3Q7XG5cbiAgYXRNYXg6Ym9vbGVhbj1mYWxzZTtcbiAgYXRNaW46Ym9vbGVhbj1mYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVVdGlsczogVGltZVV0aWxzU2VydmljZSl7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOmFueSl7XG4gICAgaWYoY2hhbmdlcy5taW5EYXRlKXtcbiAgICAgIHRoaXMubWluRGF0ZVN0cnVjdCA9IHRoaXMudGltZVV0aWxzLmNvbnZlcnREYXRlKHRoaXMubWluRGF0ZSk7XG4gICAgfVxuXG4gICAgaWYoY2hhbmdlcy5tYXhEYXRlKXtcbiAgICAgIHRoaXMubWF4RGF0ZVN0cnVjdCA9IHRoaXMudGltZVV0aWxzLmNvbnZlcnREYXRlKHRoaXMubWF4RGF0ZSk7XG4gICAgfVxuXG4gICAgaWYoY2hhbmdlcy5kYXRlKXtcbiAgICAgIHRoaXMuZGF0ZVN0cnVjdCA9IHRoaXMudGltZVV0aWxzLmNvbnZlcnREYXRlKHRoaXMuZGF0ZSk7XG4gICAgfVxuXG4gICAgaWYoY2hhbmdlcy50aW1lc3RlcCl7XG4gICAgICB0aGlzLmFzc2Vzc0RhdGVDb21wb25lbnRzKCk7XG4gICAgfVxuICAgIHRoaXMuY2hlY2tMaW1pdHMoKTtcbiAgfVxuXG4gIGRhdGVTdHJ1Y3RDaGFuZ2VkKCl7XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoRGF0ZS5VVEModGhpcy5kYXRlU3RydWN0LnllYXIsdGhpcy5kYXRlU3RydWN0Lm1vbnRoLTEsdGhpcy5kYXRlU3RydWN0LmRheSkpO1xuICAgIC8vIHRoaXMuZGF0ZS5zZXRVVENGdWxsWWVhcih0aGlzLmRhdGVTdHJ1Y3QueWVhcilcbiAgICAvLyB0aGlzLmRhdGUuc2V0VVRDTW9udGgodGhpcy5kYXRlU3RydWN0Lm1vbnRoLTEpXG4gICAgLy8gdGhpcy5kYXRlLnNldFVUQ0RhdGUodGhpcy5kYXRlU3RydWN0LmRheSk7XG4gICAgdGhpcy5jaGVja1JlZmVyZW5jZSgpO1xuICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KHRoaXMuZGF0ZSk7XG4gIH1cblxuICBhc3Nlc3NEYXRlQ29tcG9uZW50cygpe1xuICAgIHRoaXMubmVlZC5kYXkgPSB0aGlzLm5lZWQubW9udGggPSB0aGlzLm5lZWQueWVhciA9IHRydWU7XG4gICAgaWYodGhpcy50aW1lc3RlcD09PSdkYWlseScpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5lZWQuZGF5ID0gZmFsc2U7XG5cbiAgICBpZih0aGlzLnRpbWVzdGVwPT09J2FubnVhbCcpIHtcbiAgICAgIHRoaXMubmVlZC5tb250aCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1vdmUobjpudW1iZXIpe1xuICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZGF0ZSYmdGhpcy5kYXRlLmdldFRpbWUoKSk7XG4gICAgdGhpcy5kYXRlLnNldERhdGUodGhpcy5kYXRlLmdldERhdGUoKStuKTtcbiAgICB0aGlzLm9uRGF0ZUNoYW5nZWQoKTtcbiAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdCh0aGlzLmRhdGUpO1xuICB9XG5cbiAgb25EYXRlQ2hhbmdlZCgpe1xuICAgIHRoaXMuY2hlY2tMaW1pdHMoKTtcbiAgfVxuXG4gIGNoZWNrTGltaXRzKCl7XG4gICAgdGhpcy5hdE1heCA9IHRoaXMudGltZVV0aWxzLmRhdGVzRXF1YWwodGhpcy5kYXRlU3RydWN0LHRoaXMubWF4RGF0ZVN0cnVjdCk7XG4gICAgdGhpcy5hdE1pbiA9IHRoaXMudGltZVV0aWxzLmRhdGVzRXF1YWwodGhpcy5kYXRlU3RydWN0LHRoaXMubWluRGF0ZVN0cnVjdCk7XG4gIH1cbiAgLy8gVE9ETyBub3QgZW5mb3JjaW5nIGxpbWl0cyBldGMuLi5cblxuICBjaGVja1JlZmVyZW5jZSgpOiBhbnkge1xuICAgIGlmKCF0aGlzLnJlZmVyZW5jZURhdGUpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByZWZDb21wb25lbnRzID0gSW50ZXJwb2xhdGlvblNlcnZpY2UuaW50ZXJwb2xhdGUodGhpcy5yZWZlcmVuY2VEYXRlLHtcbiAgICAgIHllYXI6dGhpcy5kYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICBtb250aDp0aGlzLmRhdGUuZ2V0TW9udGgoKSsxLFxuICAgICAgZGF0ZTp0aGlzLmRhdGUuZ2V0RGF0ZSgpXG4gICAgfSkuc3BsaXQoJy0nKS5tYXAocz0+K3MpO1xuXG4gICAgbGV0IGN1cnJlbnRSZWYgPSBuZXcgRGF0ZShEYXRlLlVUQyhyZWZDb21wb25lbnRzWzBdLHJlZkNvbXBvbmVudHNbMV0tMSxyZWZDb21wb25lbnRzWzJdKSk7XG5cbiAgICBjb25zb2xlLmxvZygnY3VycmVudFJlZicsY3VycmVudFJlZik7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnREYXRlJyx0aGlzLmRhdGUpO1xuICAgIGxldCB0aW1lU3BhbiA9IE1JTExJU0VDT05EU19QRVJfREFZICogdGhpcy5zdGVwRGF5cztcblxuICAgIGxldCBkYXlzID0gKHRoaXMuZGF0ZS5nZXRUaW1lKCkgLSBjdXJyZW50UmVmLmdldFRpbWUoKSkvdGltZVNwYW47XG4gICAgdGhpcy5kYXRlID0gbmV3IERhdGUoY3VycmVudFJlZi5nZXRUaW1lKCkgKyBNYXRoLnJvdW5kKGRheXMpKnRpbWVTcGFuKTtcbiAgICB0aGlzLmRhdGVTdHJ1Y3QgPSB0aGlzLnRpbWVVdGlscy5jb252ZXJ0RGF0ZSh0aGlzLmRhdGUpO1xuICB9XG5cbn1cbiJdfQ==