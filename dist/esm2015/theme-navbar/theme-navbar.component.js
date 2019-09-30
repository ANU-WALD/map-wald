import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Catalog } from "../data/catalog";
let ThemeNavbarComponent = class ThemeNavbarComponent {
    constructor() {
        this.layerSelected = new EventEmitter();
    }
    ngAfterViewInit() {
    }
    layerClick(event, layer, action) {
        this.stop(event);
        var selection = {
            layer: layer,
            action: action
        };
        this.layerSelected.emit(selection);
    }
    stop(event) {
        event.preventDefault();
        event.stopPropagation();
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Catalog)
], ThemeNavbarComponent.prototype, "catalog", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], ThemeNavbarComponent.prototype, "includeSearch", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ThemeNavbarComponent.prototype, "layerSelected", void 0);
ThemeNavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'theme-navbar',
        template: `<ul class="navbar-nav">
  <li class="nav-item" ngbDropdown *ngFor="let theme of catalog?.themes">
    <a class="nav-link" ngbDropdownToggle href="#"><i class="fa" [ngClass]="theme.icon"></i></a>
    <div ngbDropdownMenu class="dropdown-menu">
      <a class="dropdown-item" href="#" (click)="layerClick($event,layer,'replace')" *ngFor="let layer of theme.layers">
        <div>
          <span>{{layer.name}}</span>
          <span class="float-right layer-select-icons">
            <i class="fa fa-map layer-select-icon discrete-icon"
               (click)="layerClick($event,layer,'replace')"
               placement="right"
               ngbTooltip="Map this layer. (Replace any existing layers)"></i>
            <br/>
            <i class="fa fa-plus layer-select-icon discrete-icon"
               (click)="layerClick($event,layer,'add')"
               placement="right"
               ngbTooltip="Add this layer to the map."></i>
          </span>
        </div>
      </a>
    </div>
  </li>
</ul>

<!--

[ng-reflect-ngb-tooltip].yellow + .tooltip {
    background-color: yellow;
}
-->`,
        styles: [`
.layer-select-icons{
  font-size:0.75em;
  margin-right:-20px;
}

/* Annoying... using /deep/ to access the child component
 * but /deep/ (and synonyms) are deprecated. Not clear what
 * we should be doing
 */
/deep/ .tooltip-inner {
  width: 400px;
}

.dropdown-item{
  border-bottom: 1px solid #aaa;
  height: 40px;
}
`]
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ThemeNavbarComponent);
export { ThemeNavbarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsidGhlbWUtbmF2YmFyL3RoZW1lLW5hdmJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDVCxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLE9BQU8sRUFBUyxNQUFNLGlCQUFpQixDQUFDO0FBdURqRCxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQU0vQjtRQUZVLGtCQUFhLEdBQWdDLElBQUksWUFBWSxFQUFrQixDQUFDO0lBSTFGLENBQUM7SUFFRCxlQUFlO0lBRWYsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFTLEVBQUMsS0FBVyxFQUFDLE1BQWtCO1FBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsSUFBSSxTQUFTLEdBQUc7WUFDZCxLQUFLLEVBQUMsS0FBSztZQUNYLE1BQU0sRUFBQyxNQUFNO1NBQ2QsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBUztRQUNaLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUEzQlU7SUFBUixLQUFLLEVBQUU7c0NBQVMsT0FBTztxREFBQztBQUNoQjtJQUFSLEtBQUssRUFBRTs7MkRBQXVCO0FBRXJCO0lBQVQsTUFBTSxFQUFFO3NDQUFlLFlBQVk7MkRBQXNEO0FBSi9FLG9CQUFvQjtJQWxEaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZCUjtpQkFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBa0JiO0tBQUUsQ0FBQzs7R0FDUyxvQkFBb0IsQ0E0QmhDO1NBNUJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCxcbiAgICAgICAgIEFmdGVyVmlld0luaXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2F0YWxvZywgTGF5ZXIgfSBmcm9tIFwiLi4vZGF0YS9jYXRhbG9nXCI7XG5pbXBvcnQgeyBMYXllclNlbGVjdGlvbiwgTGF5ZXJBY3Rpb24gfSBmcm9tICcuLi9kYXRhL2FjdGlvbnMnO1xuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGhlbWUtbmF2YmFyJyxcbiAgdGVtcGxhdGU6IGA8dWwgY2xhc3M9XCJuYXZiYXItbmF2XCI+XG4gIDxsaSBjbGFzcz1cIm5hdi1pdGVtXCIgbmdiRHJvcGRvd24gKm5nRm9yPVwibGV0IHRoZW1lIG9mIGNhdGFsb2c/LnRoZW1lc1wiPlxuICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBuZ2JEcm9wZG93blRvZ2dsZSBocmVmPVwiI1wiPjxpIGNsYXNzPVwiZmFcIiBbbmdDbGFzc109XCJ0aGVtZS5pY29uXCI+PC9pPjwvYT5cbiAgICA8ZGl2IG5nYkRyb3Bkb3duTWVudSBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIj5cbiAgICAgIDxhIGNsYXNzPVwiZHJvcGRvd24taXRlbVwiIGhyZWY9XCIjXCIgKGNsaWNrKT1cImxheWVyQ2xpY2soJGV2ZW50LGxheWVyLCdyZXBsYWNlJylcIiAqbmdGb3I9XCJsZXQgbGF5ZXIgb2YgdGhlbWUubGF5ZXJzXCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHNwYW4+e3tsYXllci5uYW1lfX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJmbG9hdC1yaWdodCBsYXllci1zZWxlY3QtaWNvbnNcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbWFwIGxheWVyLXNlbGVjdC1pY29uIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cImxheWVyQ2xpY2soJGV2ZW50LGxheWVyLCdyZXBsYWNlJylcIlxuICAgICAgICAgICAgICAgcGxhY2VtZW50PVwicmlnaHRcIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIk1hcCB0aGlzIGxheWVyLiAoUmVwbGFjZSBhbnkgZXhpc3RpbmcgbGF5ZXJzKVwiPjwvaT5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBsdXMgbGF5ZXItc2VsZWN0LWljb24gZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwibGF5ZXJDbGljaygkZXZlbnQsbGF5ZXIsJ2FkZCcpXCJcbiAgICAgICAgICAgICAgIHBsYWNlbWVudD1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJBZGQgdGhpcyBsYXllciB0byB0aGUgbWFwLlwiPjwvaT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICA8L2xpPlxuPC91bD5cblxuPCEtLVxuXG5bbmctcmVmbGVjdC1uZ2ItdG9vbHRpcF0ueWVsbG93ICsgLnRvb2x0aXAge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcbn1cbi0tPmAsc3R5bGVzOiBbYFxuLmxheWVyLXNlbGVjdC1pY29uc3tcbiAgZm9udC1zaXplOjAuNzVlbTtcbiAgbWFyZ2luLXJpZ2h0Oi0yMHB4O1xufVxuXG4vKiBBbm5veWluZy4uLiB1c2luZyAvZGVlcC8gdG8gYWNjZXNzIHRoZSBjaGlsZCBjb21wb25lbnRcbiAqIGJ1dCAvZGVlcC8gKGFuZCBzeW5vbnltcykgYXJlIGRlcHJlY2F0ZWQuIE5vdCBjbGVhciB3aGF0XG4gKiB3ZSBzaG91bGQgYmUgZG9pbmdcbiAqL1xuL2RlZXAvIC50b29sdGlwLWlubmVyIHtcbiAgd2lkdGg6IDQwMHB4O1xufVxuXG4uZHJvcGRvd24taXRlbXtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNhYWE7XG4gIGhlaWdodDogNDBweDtcbn1cbmBdfSlcbmV4cG9ydCBjbGFzcyBUaGVtZU5hdmJhckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQgIHtcbiAgQElucHV0KCkgY2F0YWxvZzpDYXRhbG9nO1xuICBASW5wdXQoKSBpbmNsdWRlU2VhcmNoOmJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGxheWVyU2VsZWN0ZWQ6RXZlbnRFbWl0dGVyPExheWVyU2VsZWN0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8TGF5ZXJTZWxlY3Rpb24+KCk7XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCl7XG5cbiAgfVxuXG4gIGxheWVyQ2xpY2soZXZlbnQ6YW55LGxheWVyOkxheWVyLGFjdGlvbjpMYXllckFjdGlvbil7XG4gICAgdGhpcy5zdG9wKGV2ZW50KTtcbiAgICB2YXIgc2VsZWN0aW9uID0ge1xuICAgICAgbGF5ZXI6bGF5ZXIsXG4gICAgICBhY3Rpb246YWN0aW9uXG4gICAgfTtcblxuICAgIHRoaXMubGF5ZXJTZWxlY3RlZC5lbWl0KHNlbGVjdGlvbik7XG4gIH1cblxuICBzdG9wKGV2ZW50OmFueSl7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufSJdfQ==