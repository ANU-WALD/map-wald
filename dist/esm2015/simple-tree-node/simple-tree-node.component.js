import * as tslib_1 from "tslib";
import { Component, Input, EventEmitter, Output } from '@angular/core';
let SimpleTreeNodeComponent = class SimpleTreeNodeComponent {
    constructor() {
        this.options = {};
        this.nodeSelected = new EventEmitter();
    }
    ngOnChanges(changes) {
        this.evalState();
    }
    ngAfterViewInit() {
    }
    treeClick(event) {
        event.stopPropagation();
        event.preventDefault();
        if (!this.tree) {
            return;
        }
        this.tree.expanded = !this.tree.expanded;
        this.evalState();
        if (this.tree.actions && this.tree.actions.length) {
            this.tree.actions[0].action(this.tree);
        }
        else {
            this.nodeSelected.emit(this.tree);
        }
    }
    evalState() {
        this.expanded = this.tree &&
            this.tree.expanded &&
            this.tree.children &&
            this.tree.children.length > 0;
        this.leaf = this.tree && (!this.tree.children || this.tree.children.length === 0);
        this.collapsed = this.tree &&
            !this.tree.expanded &&
            this.tree.children &&
            this.tree.children.length > 0;
        if (this.expanded) {
            this.icon = this.options.expandedIcon;
        }
        else if (this.collapsed) {
            this.icon = this.options.collapsedIcon;
        }
        else {
            this.icon = this.options.leafIcon;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeNodeComponent.prototype, "tree", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeNodeComponent.prototype, "options", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], SimpleTreeNodeComponent.prototype, "nodeSelected", void 0);
SimpleTreeNodeComponent = tslib_1.__decorate([
    Component({
        selector: 'simple-tree-node',
        template: `<a href="#" 
                (click)="treeClick($event)"
                [ngClass]="tree.klass"><i [ngClass]="icon"></i>
  &nbsp;
  <span ngbTooltip="{{tree.tooltip | async}}"
        placement="right"
        container="body">{{tree.label}}</span>
  <span *ngIf="tree.actions"
        class="float-right">
      &nbsp;
      <i *ngFor="let a of tree.actions"
       [ngClass]="a.icon"
       ngbTooltip="{{a.tooltip | async}}"
       placement="right"
       container="body"
       (click)="a.action(tree)">&nbsp;</i>
  </span>
</a>
`
    })
], SimpleTreeNodeComponent);
export { SimpleTreeNodeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXRyZWUtbm9kZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbInNpbXBsZS10cmVlLW5vZGUvc2ltcGxlLXRyZWUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUN2QixZQUFZLEVBQUUsTUFBTSxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQTBCeEUsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFyQnBDO1FBOEJXLFlBQU8sR0FBTyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBMkM5QyxDQUFDO0lBcERDLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGVBQWU7SUFDZixDQUFDO0lBV0QsU0FBUyxDQUFDLEtBQVU7UUFDbEIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSTtZQUN4QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztTQUN2QzthQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1NBQ3hDO2FBQ0k7WUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUE3Q1U7SUFBUixLQUFLLEVBQUU7O3FEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7d0RBQWtCO0FBQ2hCO0lBQVQsTUFBTSxFQUFFOzs2REFBbUM7QUFWakMsdUJBQXVCO0lBckJuQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0JYO0tBQVksQ0FBQztHQUNELHVCQUF1QixDQXFEbkM7U0FyRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBcbiAgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZU1vZGVsIH0gZnJvbSAnLi4vZGF0YS90cmVlJztcblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NpbXBsZS10cmVlLW5vZGUnLFxuICB0ZW1wbGF0ZTogYDxhIGhyZWY9XCIjXCIgXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRyZWVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ0cmVlLmtsYXNzXCI+PGkgW25nQ2xhc3NdPVwiaWNvblwiPjwvaT5cbiAgJm5ic3A7XG4gIDxzcGFuIG5nYlRvb2x0aXA9XCJ7e3RyZWUudG9vbHRpcCB8IGFzeW5jfX1cIlxuICAgICAgICBwbGFjZW1lbnQ9XCJyaWdodFwiXG4gICAgICAgIGNvbnRhaW5lcj1cImJvZHlcIj57e3RyZWUubGFiZWx9fTwvc3Bhbj5cbiAgPHNwYW4gKm5nSWY9XCJ0cmVlLmFjdGlvbnNcIlxuICAgICAgICBjbGFzcz1cImZsb2F0LXJpZ2h0XCI+XG4gICAgICAmbmJzcDtcbiAgICAgIDxpICpuZ0Zvcj1cImxldCBhIG9mIHRyZWUuYWN0aW9uc1wiXG4gICAgICAgW25nQ2xhc3NdPVwiYS5pY29uXCJcbiAgICAgICBuZ2JUb29sdGlwPVwie3thLnRvb2x0aXAgfCBhc3luY319XCJcbiAgICAgICBwbGFjZW1lbnQ9XCJyaWdodFwiXG4gICAgICAgY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgKGNsaWNrKT1cImEuYWN0aW9uKHRyZWUpXCI+Jm5ic3A7PC9pPlxuICA8L3NwYW4+XG48L2E+XG5gLHN0eWxlczogW119KVxuZXhwb3J0IGNsYXNzIFNpbXBsZVRyZWVOb2RlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2Vze1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5ldmFsU3RhdGUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIEBJbnB1dCgpIHRyZWU6IFRyZWVNb2RlbDtcbiAgQElucHV0KCkgb3B0aW9uczphbnkgPSB7fTtcbiAgQE91dHB1dCgpIG5vZGVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBleHBhbmRlZDogYm9vbGVhbjtcbiAgbGVhZjogYm9vbGVhbjtcbiAgY29sbGFwc2VkOiBib29sZWFuO1xuICBpY29uOiBzdHJpbmc7XG5cbiAgdHJlZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy50cmVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudHJlZS5leHBhbmRlZCA9ICF0aGlzLnRyZWUuZXhwYW5kZWQ7XG4gICAgdGhpcy5ldmFsU3RhdGUoKTtcblxuICAgIGlmKHRoaXMudHJlZS5hY3Rpb25zJiZ0aGlzLnRyZWUuYWN0aW9ucy5sZW5ndGgpe1xuICAgICAgdGhpcy50cmVlLmFjdGlvbnNbMF0uYWN0aW9uKHRoaXMudHJlZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubm9kZVNlbGVjdGVkLmVtaXQodGhpcy50cmVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGV2YWxTdGF0ZSgpIHtcbiAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy50cmVlICYmXG4gICAgICB0aGlzLnRyZWUuZXhwYW5kZWQgJiZcbiAgICAgIHRoaXMudHJlZS5jaGlsZHJlbiAmJlxuICAgICAgdGhpcy50cmVlLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5sZWFmID0gdGhpcy50cmVlICYmICghdGhpcy50cmVlLmNoaWxkcmVuIHx8IHRoaXMudHJlZS5jaGlsZHJlbi5sZW5ndGggPT09IDApO1xuICAgIHRoaXMuY29sbGFwc2VkID0gdGhpcy50cmVlICYmXG4gICAgICAhdGhpcy50cmVlLmV4cGFuZGVkICYmXG4gICAgICB0aGlzLnRyZWUuY2hpbGRyZW4gJiZcbiAgICAgIHRoaXMudHJlZS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICB0aGlzLmljb24gPSB0aGlzLm9wdGlvbnMuZXhwYW5kZWRJY29uO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5pY29uID0gdGhpcy5vcHRpb25zLmNvbGxhcHNlZEljb247XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5pY29uID0gdGhpcy5vcHRpb25zLmxlYWZJY29uO1xuICAgIH1cbiAgfVxufSJdfQ==