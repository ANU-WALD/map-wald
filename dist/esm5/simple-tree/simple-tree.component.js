import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
var SimpleTreeComponent = /** @class */ (function () {
    function SimpleTreeComponent() {
        this.showTop = true;
        this.collapsedIcon = 'fa fa-caret-right';
        this.expandedIcon = 'fa fa-caret-down';
        this.leafIcon = 'fa fa-minus';
        this.nodeSelected = new EventEmitter();
        this.options = {};
    }
    SimpleTreeComponent.prototype.ngAfterViewInit = function () {
    };
    SimpleTreeComponent.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            return;
        }
        this.options = {
            collapsedIcon: this.collapsedIcon,
            expandedIcon: this.expandedIcon,
            leafIcon: this.leafIcon
        };
    };
    SimpleTreeComponent.prototype.childSelected = function (node) {
        this.nodeSelected.emit(node);
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
            template: "<div *ngIf=\"tree&&tree.visible\" class=\"simple-tree\">\n\n  <div *ngIf=\"inner\">\n    <li ><simple-tree-node [tree]=\"tree\"\n                           [options]=\"options\"\n                           (nodeSelected)=\"childSelected($event)\"></simple-tree-node>\n      <ul *ngIf=\"tree.children&&tree.expanded\" class=\"inner-list\">\n        <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n                    (nodeSelected)=\"childSelected($event)\"\n                    [options]=\"options\"></simple-tree>\n      </ul>\n    </li>\n  </div>\n\n  <div *ngIf=\"!inner&&showTop\">\n    <ul class=\"outer-list\">\n      <li><simple-tree-node [tree]=\"tree\" [options]=\"options\"\n        (nodeSelected)=\"childSelected($event)\"></simple-tree-node>\n        <ul *ngIf=\"tree.children&&tree.expanded\" class=\"inner-list\">\n            <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n            (nodeSelected)=\"childSelected($event)\"\n            [options]=\"options\"></simple-tree>\n        </ul>\n      </li>\n    </ul>\n  </div>\n\n  <div *ngIf=\"!inner&&!showTop\">\n      <ul *ngIf=\"tree.children&&tree.expanded\" class=\"outer-list\">\n          <simple-tree *ngFor=\"let t of tree.children\" [tree]=\"t\" [inner]=\"true\"\n          (nodeSelected)=\"childSelected($event)\"\n          [options]=\"options\"></simple-tree>\n      </ul>\n    </div>\n  \n</div>\n",
            styles: ["\n.simple-tree ul{\n  list-style-type: none\n}\n\nul.outer-list{\n  padding-left:5px;\n}\n\nul.inner-list{\n  padding-left:15px;\n}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SimpleTreeComponent);
    return SimpleTreeComponent;
}());
export { SimpleTreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRyZWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJzaW1wbGUtdHJlZS9zaW1wbGUtdHJlZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBdUR2STtJQWFFO1FBWFMsWUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixrQkFBYSxHQUFHLG1CQUFtQixDQUFDO1FBQ3BDLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7UUFDbEMsYUFBUSxHQUFHLGFBQWEsQ0FBQztRQUV4QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsWUFBTyxHQUFPLEVBQUUsQ0FBQztJQUkxQixDQUFDO0lBRUQsNkNBQWUsR0FBZjtJQUVBLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsSUFBRyxPQUFPLENBQUMsT0FBTyxFQUFDO1lBQ2pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUc7WUFDYixhQUFhLEVBQUMsSUFBSSxDQUFDLGFBQWE7WUFDaEMsWUFBWSxFQUFDLElBQUksQ0FBQyxZQUFZO1lBQzlCLFFBQVEsRUFBQyxJQUFJLENBQUMsUUFBUTtTQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVELDJDQUFhLEdBQWIsVUFBYyxJQUFjO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFsQ1E7UUFBUixLQUFLLEVBQUU7O3FEQUFpQjtJQUNoQjtRQUFSLEtBQUssRUFBRTs7d0RBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOztzREFBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTs7OERBQXFDO0lBQ3BDO1FBQVIsS0FBSyxFQUFFOzs2REFBbUM7SUFDbEM7UUFBUixLQUFLLEVBQUU7O3lEQUEwQjtJQUV4QjtRQUFULE1BQU0sRUFBRTs7NkRBQW1DO0lBRW5DO1FBQVIsS0FBSyxFQUFFOzt3REFBa0I7SUFYZixtQkFBbUI7UUFsRC9CLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSwrNUNBb0NYO3FCQUFVLHFJQVdUO1NBQUUsQ0FBQzs7T0FDUSxtQkFBbUIsQ0FxQy9CO0lBQUQsMEJBQUM7Q0FBQSxBQXJDRCxJQXFDQztTQXJDWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL2RhdGEvdHJlZSc7XG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzaW1wbGUtdHJlZScsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInRyZWUmJnRyZWUudmlzaWJsZVwiIGNsYXNzPVwic2ltcGxlLXRyZWVcIj5cblxuICA8ZGl2ICpuZ0lmPVwiaW5uZXJcIj5cbiAgICA8bGkgPjxzaW1wbGUtdHJlZS1ub2RlIFt0cmVlXT1cInRyZWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAobm9kZVNlbGVjdGVkKT1cImNoaWxkU2VsZWN0ZWQoJGV2ZW50KVwiPjwvc2ltcGxlLXRyZWUtbm9kZT5cbiAgICAgIDx1bCAqbmdJZj1cInRyZWUuY2hpbGRyZW4mJnRyZWUuZXhwYW5kZWRcIiBjbGFzcz1cImlubmVyLWxpc3RcIj5cbiAgICAgICAgPHNpbXBsZS10cmVlICpuZ0Zvcj1cImxldCB0IG9mIHRyZWUuY2hpbGRyZW5cIiBbdHJlZV09XCJ0XCIgW2lubmVyXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAobm9kZVNlbGVjdGVkKT1cImNoaWxkU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIj48L3NpbXBsZS10cmVlPlxuICAgICAgPC91bD5cbiAgICA8L2xpPlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwiIWlubmVyJiZzaG93VG9wXCI+XG4gICAgPHVsIGNsYXNzPVwib3V0ZXItbGlzdFwiPlxuICAgICAgPGxpPjxzaW1wbGUtdHJlZS1ub2RlIFt0cmVlXT1cInRyZWVcIiBbb3B0aW9uc109XCJvcHRpb25zXCJcbiAgICAgICAgKG5vZGVTZWxlY3RlZCk9XCJjaGlsZFNlbGVjdGVkKCRldmVudClcIj48L3NpbXBsZS10cmVlLW5vZGU+XG4gICAgICAgIDx1bCAqbmdJZj1cInRyZWUuY2hpbGRyZW4mJnRyZWUuZXhwYW5kZWRcIiBjbGFzcz1cImlubmVyLWxpc3RcIj5cbiAgICAgICAgICAgIDxzaW1wbGUtdHJlZSAqbmdGb3I9XCJsZXQgdCBvZiB0cmVlLmNoaWxkcmVuXCIgW3RyZWVdPVwidFwiIFtpbm5lcl09XCJ0cnVlXCJcbiAgICAgICAgICAgIChub2RlU2VsZWN0ZWQpPVwiY2hpbGRTZWxlY3RlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFtvcHRpb25zXT1cIm9wdGlvbnNcIj48L3NpbXBsZS10cmVlPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwiIWlubmVyJiYhc2hvd1RvcFwiPlxuICAgICAgPHVsICpuZ0lmPVwidHJlZS5jaGlsZHJlbiYmdHJlZS5leHBhbmRlZFwiIGNsYXNzPVwib3V0ZXItbGlzdFwiPlxuICAgICAgICAgIDxzaW1wbGUtdHJlZSAqbmdGb3I9XCJsZXQgdCBvZiB0cmVlLmNoaWxkcmVuXCIgW3RyZWVdPVwidFwiIFtpbm5lcl09XCJ0cnVlXCJcbiAgICAgICAgICAobm9kZVNlbGVjdGVkKT1cImNoaWxkU2VsZWN0ZWQoJGV2ZW50KVwiXG4gICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9uc1wiPjwvc2ltcGxlLXRyZWU+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICBcbjwvZGl2PlxuYCxzdHlsZXM6IFtgXG4uc2ltcGxlLXRyZWUgdWx7XG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZVxufVxuXG51bC5vdXRlci1saXN0e1xuICBwYWRkaW5nLWxlZnQ6NXB4O1xufVxuXG51bC5pbm5lci1saXN0e1xuICBwYWRkaW5nLWxlZnQ6MTVweDtcbn1gXX0pXG5leHBvcnQgY2xhc3MgU2ltcGxlVHJlZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHRyZWU6IFRyZWVNb2RlbDtcbiAgQElucHV0KCkgc2hvd1RvcDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGlubmVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGNvbGxhcHNlZEljb24gPSAnZmEgZmEtY2FyZXQtcmlnaHQnO1xuICBASW5wdXQoKSBleHBhbmRlZEljb24gPSAnZmEgZmEtY2FyZXQtZG93bic7XG4gIEBJbnB1dCgpIGxlYWZJY29uID0gJ2ZhIGZhLW1pbnVzJztcblxuICBAT3V0cHV0KCkgbm9kZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIG9wdGlvbnM6YW55ID0ge307XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmKGNoYW5nZXMub3B0aW9ucyl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgY29sbGFwc2VkSWNvbjp0aGlzLmNvbGxhcHNlZEljb24sXG4gICAgICBleHBhbmRlZEljb246dGhpcy5leHBhbmRlZEljb24sXG4gICAgICBsZWFmSWNvbjp0aGlzLmxlYWZJY29uXG4gICAgfTtcbiAgfVxuXG4gIGNoaWxkU2VsZWN0ZWQobm9kZTpUcmVlTW9kZWwpe1xuICAgIHRoaXMubm9kZVNlbGVjdGVkLmVtaXQobm9kZSk7XG4gIH1cblxufSJdfQ==