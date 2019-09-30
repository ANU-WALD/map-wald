import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let CollapsibleMapControlComponent = class CollapsibleMapControlComponent {
    constructor() {
    }
    ngAfterViewInit() {
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], CollapsibleMapControlComponent.prototype, "isCollapsed", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CollapsibleMapControlComponent.prototype, "heading", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], CollapsibleMapControlComponent.prototype, "direction", void 0);
CollapsibleMapControlComponent = tslib_1.__decorate([
    Component({
        selector: 'collapsible-map-control',
        template: `<div class="card map-control collapsible-control">
    <a (click)="isCollapsed = !isCollapsed">
      <div class="card-header">
        <h6 class="mb-0">
          {{heading}}
          <span *ngIf="isCollapsed" class="float-right fa fa-caret-up
            collapse-arrow" aria-hidden="true"></span>
          <span *ngIf="!isCollapsed" class="float-right fa fa-caret-down
            collapse-arrow" aria-hidden="true"></span>
        </h6>
      </div>
    </a>

    <div class="ngbCollapse" [ngbCollapse]="isCollapsed">
      <ng-content></ng-content>
    </div>
  </div>
`,
        styles: [`.collapsible-control{
  margin:3px;
}`]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], CollapsibleMapControlComponent);
export { CollapsibleMapControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2libGUtbWFwLWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjb2xsYXBzaWJsZS1tYXAtY29udHJvbC9jb2xsYXBzaWJsZS1tYXAtY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF3QyxNQUFNLGVBQWUsQ0FBQztBQTJCdkYsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFLekM7SUFFQSxDQUFDO0lBRUQsZUFBZTtJQUVmLENBQUM7Q0FDRixDQUFBO0FBWFU7SUFBUixLQUFLLEVBQUU7O21FQUFzQjtBQUNyQjtJQUFSLEtBQUssRUFBRTs7K0RBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOztpRUFBbUI7QUFIaEIsOEJBQThCO0lBdEIxQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQlg7aUJBQVU7O0VBRVQ7S0FBRSxDQUFDOztHQUNRLDhCQUE4QixDQVkxQztTQVpZLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjb2xsYXBzaWJsZS1tYXAtY29udHJvbCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQgbWFwLWNvbnRyb2wgY29sbGFwc2libGUtY29udHJvbFwiPlxuICAgIDxhIChjbGljayk9XCJpc0NvbGxhcHNlZCA9ICFpc0NvbGxhcHNlZFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+XG4gICAgICAgIDxoNiBjbGFzcz1cIm1iLTBcIj5cbiAgICAgICAgICB7e2hlYWRpbmd9fVxuICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNDb2xsYXBzZWRcIiBjbGFzcz1cImZsb2F0LXJpZ2h0IGZhIGZhLWNhcmV0LXVwXG4gICAgICAgICAgICBjb2xsYXBzZS1hcnJvd1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpc0NvbGxhcHNlZFwiIGNsYXNzPVwiZmxvYXQtcmlnaHQgZmEgZmEtY2FyZXQtZG93blxuICAgICAgICAgICAgY29sbGFwc2UtYXJyb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICAgIDwvaDY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2E+XG5cbiAgICA8ZGl2IGNsYXNzPVwibmdiQ29sbGFwc2VcIiBbbmdiQ29sbGFwc2VdPVwiaXNDb2xsYXBzZWRcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5gLHN0eWxlczogW2AuY29sbGFwc2libGUtY29udHJvbHtcbiAgbWFyZ2luOjNweDtcbn1gXX0pXG5leHBvcnQgY2xhc3MgQ29sbGFwc2libGVNYXBDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCAge1xuICBASW5wdXQoKSBpc0NvbGxhcHNlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgaGVhZGluZzogc3RyaW5nO1xuICBASW5wdXQoKSBkaXJlY3Rpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKXtcblxuICB9XG59Il19