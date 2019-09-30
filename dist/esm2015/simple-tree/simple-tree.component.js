import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let SimpleTreeComponent = class SimpleTreeComponent {
    constructor() {
        this.showTop = true;
        this.collapsedIcon = 'fa fa-caret-right';
        this.expandedIcon = 'fa fa-caret-down';
        this.leafIcon = 'fa fa-minus';
        this.nodeSelected = new EventEmitter();
        this.options = {};
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if (changes.options) {
            return;
        }
        this.options = {
            collapsedIcon: this.collapsedIcon,
            expandedIcon: this.expandedIcon,
            leafIcon: this.leafIcon
        };
    }
    childSelected(node) {
        this.nodeSelected.emit(node);
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "tree", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SimpleTreeComponent.prototype, "showTop", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], SimpleTreeComponent.prototype, "inner", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "collapsedIcon", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "expandedIcon", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "leafIcon", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "nodeSelected", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeComponent.prototype, "options", void 0);
SimpleTreeComponent = tslib_1.__decorate([
    Component({
        selector: 'simple-tree',
        template: `<div *ngIf="tree&&tree.visible" class="simple-tree">

  <div *ngIf="inner">
    <li ><simple-tree-node [tree]="tree"
                           [options]="options"
                           (nodeSelected)="childSelected($event)"></simple-tree-node>
      <ul *ngIf="tree.children&&tree.expanded" class="inner-list">
        <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
                    (nodeSelected)="childSelected($event)"
                    [options]="options"></simple-tree>
      </ul>
    </li>
  </div>

  <div *ngIf="!inner&&showTop">
    <ul class="outer-list">
      <li><simple-tree-node [tree]="tree" [options]="options"
        (nodeSelected)="childSelected($event)"></simple-tree-node>
        <ul *ngIf="tree.children&&tree.expanded" class="inner-list">
            <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
            (nodeSelected)="childSelected($event)"
            [options]="options"></simple-tree>
        </ul>
      </li>
    </ul>
  </div>

  <div *ngIf="!inner&&!showTop">
      <ul *ngIf="tree.children&&tree.expanded" class="outer-list">
          <simple-tree *ngFor="let t of tree.children" [tree]="t" [inner]="true"
          (nodeSelected)="childSelected($event)"
          [options]="options"></simple-tree>
      </ul>
    </div>
  
</div>
`,
        styles: [`
.simple-tree ul{
  list-style-type: none
}

ul.outer-list{
  padding-left:5px;
}

ul.inner-list{
  padding-left:15px;
}`]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SimpleTreeComponent);
export { SimpleTreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJzaW1wbGUtdHJlZS9zaW1wbGUtdHJlZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUR2SSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWE5QjtRQVhTLFlBQU8sR0FBWSxJQUFJLENBQUM7UUFHeEIsa0JBQWEsR0FBRyxtQkFBbUIsQ0FBQztRQUNwQyxpQkFBWSxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFFeEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5DLFlBQU8sR0FBTyxFQUFFLENBQUM7SUFJMUIsQ0FBQztJQUVELGVBQWU7SUFFZixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUcsT0FBTyxDQUFDLE9BQU8sRUFBQztZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsYUFBYSxFQUFDLElBQUksQ0FBQyxhQUFhO1lBQ2hDLFlBQVksRUFBQyxJQUFJLENBQUMsWUFBWTtZQUM5QixRQUFRLEVBQUMsSUFBSSxDQUFDLFFBQVE7U0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBYztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBRUYsQ0FBQTtBQXBDVTtJQUFSLEtBQUssRUFBRTs7aURBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOztvREFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7O2tEQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFOzswREFBcUM7QUFDcEM7SUFBUixLQUFLLEVBQUU7O3lEQUFtQztBQUNsQztJQUFSLEtBQUssRUFBRTs7cURBQTBCO0FBRXhCO0lBQVQsTUFBTSxFQUFFOzt5REFBbUM7QUFFbkM7SUFBUixLQUFLLEVBQUU7O29EQUFrQjtBQVhmLG1CQUFtQjtJQWxEL0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQ1g7aUJBQVU7Ozs7Ozs7Ozs7O0VBV1Q7S0FBRSxDQUFDOztHQUNRLG1CQUFtQixDQXFDL0I7U0FyQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9kYXRhL3RyZWUnO1xuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2ltcGxlLXRyZWUnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJ0cmVlJiZ0cmVlLnZpc2libGVcIiBjbGFzcz1cInNpbXBsZS10cmVlXCI+XG5cbiAgPGRpdiAqbmdJZj1cImlubmVyXCI+XG4gICAgPGxpID48c2ltcGxlLXRyZWUtbm9kZSBbdHJlZV09XCJ0cmVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVTZWxlY3RlZCk9XCJjaGlsZFNlbGVjdGVkKCRldmVudClcIj48L3NpbXBsZS10cmVlLW5vZGU+XG4gICAgICA8dWwgKm5nSWY9XCJ0cmVlLmNoaWxkcmVuJiZ0cmVlLmV4cGFuZGVkXCIgY2xhc3M9XCJpbm5lci1saXN0XCI+XG4gICAgICAgIDxzaW1wbGUtdHJlZSAqbmdGb3I9XCJsZXQgdCBvZiB0cmVlLmNoaWxkcmVuXCIgW3RyZWVdPVwidFwiIFtpbm5lcl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgKG5vZGVTZWxlY3RlZCk9XCJjaGlsZFNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+PC9zaW1wbGUtdHJlZT5cbiAgICAgIDwvdWw+XG4gICAgPC9saT5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cIiFpbm5lciYmc2hvd1RvcFwiPlxuICAgIDx1bCBjbGFzcz1cIm91dGVyLWxpc3RcIj5cbiAgICAgIDxsaT48c2ltcGxlLXRyZWUtbm9kZSBbdHJlZV09XCJ0cmVlXCIgW29wdGlvbnNdPVwib3B0aW9uc1wiXG4gICAgICAgIChub2RlU2VsZWN0ZWQpPVwiY2hpbGRTZWxlY3RlZCgkZXZlbnQpXCI+PC9zaW1wbGUtdHJlZS1ub2RlPlxuICAgICAgICA8dWwgKm5nSWY9XCJ0cmVlLmNoaWxkcmVuJiZ0cmVlLmV4cGFuZGVkXCIgY2xhc3M9XCJpbm5lci1saXN0XCI+XG4gICAgICAgICAgICA8c2ltcGxlLXRyZWUgKm5nRm9yPVwibGV0IHQgb2YgdHJlZS5jaGlsZHJlblwiIFt0cmVlXT1cInRcIiBbaW5uZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICAobm9kZVNlbGVjdGVkKT1cImNoaWxkU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICBbb3B0aW9uc109XCJvcHRpb25zXCI+PC9zaW1wbGUtdHJlZT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cIiFpbm5lciYmIXNob3dUb3BcIj5cbiAgICAgIDx1bCAqbmdJZj1cInRyZWUuY2hpbGRyZW4mJnRyZWUuZXhwYW5kZWRcIiBjbGFzcz1cIm91dGVyLWxpc3RcIj5cbiAgICAgICAgICA8c2ltcGxlLXRyZWUgKm5nRm9yPVwibGV0IHQgb2YgdHJlZS5jaGlsZHJlblwiIFt0cmVlXT1cInRcIiBbaW5uZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgKG5vZGVTZWxlY3RlZCk9XCJjaGlsZFNlbGVjdGVkKCRldmVudClcIlxuICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIj48L3NpbXBsZS10cmVlPlxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgXG48L2Rpdj5cbmAsc3R5bGVzOiBbYFxuLnNpbXBsZS10cmVlIHVse1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmVcbn1cblxudWwub3V0ZXItbGlzdHtcbiAgcGFkZGluZy1sZWZ0OjVweDtcbn1cblxudWwuaW5uZXItbGlzdHtcbiAgcGFkZGluZy1sZWZ0OjE1cHg7XG59YF19KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSB0cmVlOiBUcmVlTW9kZWw7XG4gIEBJbnB1dCgpIHNob3dUb3A6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBpbm5lcjogYm9vbGVhbjtcblxuICBASW5wdXQoKSBjb2xsYXBzZWRJY29uID0gJ2ZhIGZhLWNhcmV0LXJpZ2h0JztcbiAgQElucHV0KCkgZXhwYW5kZWRJY29uID0gJ2ZhIGZhLWNhcmV0LWRvd24nO1xuICBASW5wdXQoKSBsZWFmSWNvbiA9ICdmYSBmYS1taW51cyc7XG5cbiAgQE91dHB1dCgpIG5vZGVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBvcHRpb25zOmFueSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZihjaGFuZ2VzLm9wdGlvbnMpe1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIGNvbGxhcHNlZEljb246dGhpcy5jb2xsYXBzZWRJY29uLFxuICAgICAgZXhwYW5kZWRJY29uOnRoaXMuZXhwYW5kZWRJY29uLFxuICAgICAgbGVhZkljb246dGhpcy5sZWFmSWNvblxuICAgIH07XG4gIH1cblxuICBjaGlsZFNlbGVjdGVkKG5vZGU6VHJlZU1vZGVsKXtcbiAgICB0aGlzLm5vZGVTZWxlY3RlZC5lbWl0KG5vZGUpO1xuICB9XG5cbn0iXX0=