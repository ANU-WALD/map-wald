import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Catalog } from '../data/catalog';
import { TreeFilterService } from '../tree-filter.service';
import { MetadataService } from '../metadata.service';
import { MappedLayer } from '../data/mapped-layer';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
let CatalogComponent = class CatalogComponent {
    constructor(filterService, metadata) {
        this.metadata = metadata;
        this.showPlaceholders = true;
        this.defaultAction = 'add';
        this.layerActions = [];
        this.layerSelected = new EventEmitter();
        this.collapsedIcon = 'fa fa-caret-right';
        this.expandedIcon = 'fa fa-caret-down';
        this.leafIcon = 'fa fa-minus';
        this.layers = [];
        this.tree = { label: 'no catalog loaded' };
        this.filterText = '';
        this.filterService = filterService;
    }
    ngAfterViewInit() {
        if (this.catalog) {
            this.buildTree();
        }
    }
    ngOnChanges(changes) {
        if (changes.catalog && this.catalog) {
            this.filterText = '';
            this.buildTree();
            this.highlightLayers([], this.tree);
        }
    }
    buildTree() {
        let self = this;
        this.layers = [];
        var cat = this.catalog;
        var tree = {
            label: cat.name,
            expanded: true,
            visible: true,
        };
        var deferredLayers = cat.themes.map(t => t.layers.filter(l => l.path && !l.skip)).reduce((l, r) => l.concat(r), []);
        var deferredThemes = cat.themes.filter(t => t.path && !t.skip);
        const treeActions = this.layerActions.map(la => {
            return {
                icon: la.icon,
                tooltip: la.tooltip,
                action: (node) => this.layerClick(node.data, la.action)
            };
        });
        const layerToTree = (l) => {
            let result = {
                label: l.name,
                data: l,
                visible: true,
                actions: treeActions
            };
            const tmp = new MappedLayer();
            tmp.layer = l;
            tmp.update();
            if (l.description) {
                result.tooltip = of(l.description);
            }
            else {
                result.tooltip = this.metadata.getMetadata(tmp).pipe(map(meta => meta[l.descriptionField || 'long_name']));
            }
            return result;
        };
        function themeToTree(t) {
            return {
                label: t.name,
                expanded: false,
                visible: true,
                children: t.layers.filter(l => !l.path && !l.skip)
                    .filter(l => self.showPlaceholders || !l.placeholder)
                    .map(layerToTree)
            };
        }
        tree.children = cat.themes.filter(t => !t.path && !t.skip).map(themeToTree);
        function findParent(path) {
            var components = path.split('/');
            var parent = tree;
            var index = -1;
            for (var component of components) {
                var split = component.split('@');
                component = split[0];
                index = -1;
                if (split.length > 1) {
                    index = +split[1];
                }
                var found = false;
                for (var n of parent.children) {
                    if (n.label === component) {
                        parent = n;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    var newNode = {
                        label: component,
                        expanded: false,
                        visible: true,
                        children: []
                    };
                    addChild(parent, newNode, index);
                    parent = newNode;
                }
            }
            return [parent, index];
        }
        function addChild(parent, child, i) {
            if (i < 0) {
                parent.children.push(child);
            }
            else {
                parent.children.splice(i, 0, child);
            }
        }
        deferredThemes.forEach(t => {
            var [parent, index] = findParent(t.path);
            addChild(parent, themeToTree(t), index);
        });
        deferredLayers.forEach(l => {
            var [parent, index] = findParent(l.path);
            addChild(parent, layerToTree(l), index);
        });
        this.tree = tree;
    }
    layerClick(l, action) {
        var selection = {
            layer: l,
            action: action
        };
        this.layerSelected.emit(selection);
    }
    nodeSelected(e) {
        if (!e.data) {
            return;
        }
        var layer = e.data;
        this.layerClick(layer, this.defaultAction);
    }
    activeLayers(layers) {
        this.highlightLayers(layers, this.tree);
    }
    highlightLayers(layers, tree) {
        tree.klass = null;
        if (tree.data && (layers.indexOf(tree.data) >= 0)) {
            tree.klass = 'active-layer';
            return true;
        }
        if (tree.children) {
            let activeChild = false;
            for (let i = 0; i < tree.children.length; i++) {
                activeChild = this.highlightLayers(layers, tree.children[i]) || activeChild;
            }
            if (activeChild) {
                tree.klass = 'active-child';
            }
            tree.klass = (tree.klass || '') + ' theme';
            return activeChild;
        }
        return false;
    }
};
CatalogComponent.ctorParameters = () => [
    { type: TreeFilterService },
    { type: MetadataService }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Catalog)
], CatalogComponent.prototype, "catalog", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CatalogComponent.prototype, "showPlaceholders", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CatalogComponent.prototype, "defaultAction", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], CatalogComponent.prototype, "layerActions", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], CatalogComponent.prototype, "layerSelected", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CatalogComponent.prototype, "collapsedIcon", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CatalogComponent.prototype, "expandedIcon", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], CatalogComponent.prototype, "leafIcon", void 0);
CatalogComponent = tslib_1.__decorate([
    Component({
        selector: 'catalog',
        template: `<div class="input-group">
  <span class="input-group-btn">
            <button class="btn" type="button" [disabled]="!filterText"
              (click)="filterText = ''">
            <i *ngIf="filterText"class="fa fa-times" aria-hidden="true"></i>
            <i *ngIf="!filterText"class="fa fa-search" aria-hidden="true"></i>
            </button>
  </span>
  <input #filterInput type="text" class="form-control" placeholder="Catalog search..."
  [(ngModel)]="filterText"/>
</div>

<simple-tree 
  [tree]="this.filterService.filterTree(tree, filterText)"
  [showTop]="false"
  [leafIcon]="leafIcon"
  [collapsedIcon]="collapsedIcon"
  [expandedIcon]="expandedIcon"
  (nodeSelected)="nodeSelected($event)">
</simple-tree>
`,
        styles: [`
.node-name{
  font-size:1em;
}
`]
    }),
    tslib_1.__metadata("design:paramtypes", [TreeFilterService, MetadataService])
], CatalogComponent);
export { CatalogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImNhdGFsb2cvY2F0YWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUNMLE1BQU0sRUFBRSxZQUFZLEVBQ2hDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQXFDMUIsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFnQjNCLFlBQVksYUFBZ0MsRUFBVSxRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQWRyRSxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsaUJBQVksR0FBd0IsRUFBRSxDQUFDO1FBQ3RDLGtCQUFhLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQ2xGLGtCQUFhLEdBQUcsbUJBQW1CLENBQUM7UUFDcEMsaUJBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBRWxDLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLFNBQUksR0FBYyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFLZCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEs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RUFBbUIsZUFBZTtHQWhCbkUsZ0JBQWdCLENBaU01QjtTQWpNWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsXG4gIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXRhbG9nLCAgTGF5ZXIsIFRoZW1lIH0gZnJvbSAnLi4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IExheWVyU2VsZWN0aW9uIH0gZnJvbSAnLi4vZGF0YS9hY3Rpb25zJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL2RhdGEvdHJlZSc7XG5pbXBvcnQgeyBUcmVlRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3RyZWUtZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4uL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5leHBvcnQgaW50ZXJmYWNlIENhdGFsb2dOb2RlQWN0aW9uIHtcbiAgYWN0aW9uOnN0cmluZztcbiAgaWNvbjpzdHJpbmc7XG4gIHRvb2x0aXA6c3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjYXRhbG9nJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIiB0eXBlPVwiYnV0dG9uXCIgW2Rpc2FibGVkXT1cIiFmaWx0ZXJUZXh0XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cImZpbHRlclRleHQgPSAnJ1wiPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJmaWx0ZXJUZXh0XCJjbGFzcz1cImZhIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCIhZmlsdGVyVGV4dFwiY2xhc3M9XCJmYSBmYS1zZWFyY2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgPC9zcGFuPlxuICA8aW5wdXQgI2ZpbHRlcklucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkNhdGFsb2cgc2VhcmNoLi4uXCJcbiAgWyhuZ01vZGVsKV09XCJmaWx0ZXJUZXh0XCIvPlxuPC9kaXY+XG5cbjxzaW1wbGUtdHJlZSBcbiAgW3RyZWVdPVwidGhpcy5maWx0ZXJTZXJ2aWNlLmZpbHRlclRyZWUodHJlZSwgZmlsdGVyVGV4dClcIlxuICBbc2hvd1RvcF09XCJmYWxzZVwiXG4gIFtsZWFmSWNvbl09XCJsZWFmSWNvblwiXG4gIFtjb2xsYXBzZWRJY29uXT1cImNvbGxhcHNlZEljb25cIlxuICBbZXhwYW5kZWRJY29uXT1cImV4cGFuZGVkSWNvblwiXG4gIChub2RlU2VsZWN0ZWQpPVwibm9kZVNlbGVjdGVkKCRldmVudClcIj5cbjwvc2ltcGxlLXRyZWU+XG5gLHN0eWxlczogW2Bcbi5ub2RlLW5hbWV7XG4gIGZvbnQtc2l6ZToxZW07XG59XG5gXSx9KVxuZXhwb3J0IGNsYXNzIENhdGFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjYXRhbG9nOiBDYXRhbG9nO1xuICBASW5wdXQoKSBzaG93UGxhY2Vob2xkZXJzID0gdHJ1ZTtcbiAgQElucHV0KCkgZGVmYXVsdEFjdGlvbiA9ICdhZGQnO1xuICBASW5wdXQoKSBsYXllckFjdGlvbnM6IENhdGFsb2dOb2RlQWN0aW9uW10gPSBbXTtcbiAgQE91dHB1dCgpIGxheWVyU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxMYXllclNlbGVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyPExheWVyU2VsZWN0aW9uPigpO1xuICBASW5wdXQoKSBjb2xsYXBzZWRJY29uID0gJ2ZhIGZhLWNhcmV0LXJpZ2h0JztcbiAgQElucHV0KCkgZXhwYW5kZWRJY29uID0gJ2ZhIGZhLWNhcmV0LWRvd24nO1xuICBASW5wdXQoKSBsZWFmSWNvbiA9ICdmYSBmYS1taW51cyc7XG5cbiAgbGF5ZXJzOiBBcnJheTxMYXllcj4gPSBbXTtcbiAgdHJlZTogVHJlZU1vZGVsID0geyBsYWJlbDogJ25vIGNhdGFsb2cgbG9hZGVkJyB9O1xuICBmaWx0ZXJUZXh0ID0gJyc7IFxuXG4gIGZpbHRlclNlcnZpY2U6IFRyZWVGaWx0ZXJTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKGZpbHRlclNlcnZpY2U6IFRyZWVGaWx0ZXJTZXJ2aWNlLCBwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSkge1xuICAgIHRoaXMuZmlsdGVyU2VydmljZSA9IGZpbHRlclNlcnZpY2U7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY2F0YWxvZykge1xuICAgICAgdGhpcy5idWlsZFRyZWUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuY2F0YWxvZyAmJiB0aGlzLmNhdGFsb2cpIHtcbiAgICAgIHRoaXMuZmlsdGVyVGV4dCA9ICcnO1xuICAgICAgdGhpcy5idWlsZFRyZWUoKTtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0TGF5ZXJzKFtdLHRoaXMudHJlZSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGRUcmVlKCkge1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICB0aGlzLmxheWVycyA9IFtdO1xuICAgIHZhciBjYXQgPSB0aGlzLmNhdGFsb2c7XG4gICAgdmFyIHRyZWU6IFRyZWVNb2RlbCA9IHtcbiAgICAgIGxhYmVsOiBjYXQubmFtZSxcbiAgICAgIGV4cGFuZGVkOiB0cnVlLFxuICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgIC8vIHNldHRpbmdzOntcbiAgICAgIC8vICAgc3RhdGljOnRydWUsXG4gICAgICAvLyAgIGxlZnRNZW51OmZhbHNlXG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgdmFyIGRlZmVycmVkTGF5ZXJzID0gY2F0LnRoZW1lcy5tYXAodCA9PiB0LmxheWVycy5maWx0ZXIobCA9PiBsLnBhdGgmJiFsLnNraXApKS5yZWR1Y2UoKGwsIHIpID0+IGwuY29uY2F0KHIpLCBbXSk7XG4gICAgdmFyIGRlZmVycmVkVGhlbWVzID0gY2F0LnRoZW1lcy5maWx0ZXIodCA9PiB0LnBhdGgmJiF0LnNraXApO1xuXG4gICAgY29uc3QgdHJlZUFjdGlvbnMgPSB0aGlzLmxheWVyQWN0aW9ucy5tYXAobGE9PntcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGljb246bGEuaWNvbixcbiAgICAgICAgdG9vbHRpcDpsYS50b29sdGlwLFxuICAgICAgICBhY3Rpb246KG5vZGU6IFRyZWVNb2RlbCkgPT4gdGhpcy5sYXllckNsaWNrKG5vZGUuZGF0YSxsYS5hY3Rpb24pXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGF5ZXJUb1RyZWUgPSAobDogTGF5ZXIpPT4ge1xuICAgICAgbGV0IHJlc3VsdDpUcmVlTW9kZWwgPSB7XG4gICAgICAgIGxhYmVsOiBsLm5hbWUsXG4gICAgICAgIGRhdGE6IGwsXG4gICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgIGFjdGlvbnM6IHRyZWVBY3Rpb25zXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB0bXAgPSBuZXcgTWFwcGVkTGF5ZXIoKTtcbiAgICAgIHRtcC5sYXllciA9IGw7XG4gICAgICB0bXAudXBkYXRlKCk7XG5cbiAgICAgIGlmKGwuZGVzY3JpcHRpb24pe1xuICAgICAgICByZXN1bHQudG9vbHRpcCA9IG9mKGwuZGVzY3JpcHRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnRvb2x0aXAgPSB0aGlzLm1ldGFkYXRhLmdldE1ldGFkYXRhKHRtcCkucGlwZShcbiAgICAgICAgICBtYXAobWV0YT0+bWV0YVtsLmRlc2NyaXB0aW9uRmllbGR8fCdsb25nX25hbWUnXSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGhlbWVUb1RyZWUodDogVGhlbWUpOiBUcmVlTW9kZWwge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGFiZWw6IHQubmFtZSxcbiAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICBjaGlsZHJlbjogdC5sYXllcnMuZmlsdGVyKGwgPT4gIWwucGF0aCYmIWwuc2tpcClcbiAgICAgICAgICAuZmlsdGVyKGw9PnNlbGYuc2hvd1BsYWNlaG9sZGVyc3x8IWwucGxhY2Vob2xkZXIpXG4gICAgICAgICAgLm1hcChsYXllclRvVHJlZSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdHJlZS5jaGlsZHJlbiA9IGNhdC50aGVtZXMuZmlsdGVyKHQgPT4gIXQucGF0aCYmIXQuc2tpcCkubWFwKHRoZW1lVG9UcmVlKTtcblxuICAgIGZ1bmN0aW9uIGZpbmRQYXJlbnQocGF0aDogc3RyaW5nKTogW1RyZWVNb2RlbCxudW1iZXJdIHtcbiAgICAgIHZhciBjb21wb25lbnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgdmFyIHBhcmVudDogVHJlZU1vZGVsID0gdHJlZTtcbiAgICAgIHZhciBpbmRleCA9IC0xO1xuXG4gICAgICBmb3IgKHZhciBjb21wb25lbnQgb2YgY29tcG9uZW50cykge1xuICAgICAgICB2YXIgc3BsaXQgPSBjb21wb25lbnQuc3BsaXQoJ0AnKTtcbiAgICAgICAgY29tcG9uZW50ID0gc3BsaXRbMF07XG4gICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgIGlmKHNwbGl0Lmxlbmd0aD4xKXtcbiAgICAgICAgICBpbmRleCA9ICtzcGxpdFsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBuIG9mIHBhcmVudC5jaGlsZHJlbikge1xuICAgICAgICAgIGlmIChuLmxhYmVsID09PSBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG47XG4gICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgdmFyIG5ld05vZGU6IFRyZWVNb2RlbCA9IHtcbiAgICAgICAgICAgIGxhYmVsOiBjb21wb25lbnQsXG4gICAgICAgICAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICAgICAgfTtcbiAgICAgICAgICBhZGRDaGlsZChwYXJlbnQsbmV3Tm9kZSxpbmRleCk7XG4gICAgICAgICAgcGFyZW50ID0gbmV3Tm9kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtwYXJlbnQsaW5kZXhdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZENoaWxkKHBhcmVudDpUcmVlTW9kZWwsY2hpbGQ6VHJlZU1vZGVsLGk6bnVtYmVyKXtcbiAgICAgIGlmKGk8MCl7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGNoaWxkKTsgICAgICAgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSwwLGNoaWxkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZlcnJlZFRoZW1lcy5mb3JFYWNoKHQgPT4ge1xuICAgICAgdmFyIFtwYXJlbnQsaW5kZXhdID0gZmluZFBhcmVudCh0LnBhdGgpO1xuICAgICAgYWRkQ2hpbGQocGFyZW50LHRoZW1lVG9UcmVlKHQpLGluZGV4KTtcbiAgICB9KTtcblxuICAgIGRlZmVycmVkTGF5ZXJzLmZvckVhY2gobCA9PiB7XG4gICAgICB2YXIgW3BhcmVudCxpbmRleF0gPSBmaW5kUGFyZW50KGwucGF0aCk7XG4gICAgICBhZGRDaGlsZChwYXJlbnQsbGF5ZXJUb1RyZWUobCksaW5kZXgpO1xuICAgIH0pO1xuICAgIHRoaXMudHJlZSA9IHRyZWU7XG4gIH1cblxuICBsYXllckNsaWNrKGw6IExheWVyLGFjdGlvbjpzdHJpbmcpIHtcbiAgICB2YXIgc2VsZWN0aW9uOiBMYXllclNlbGVjdGlvbiA9IHtcbiAgICAgIGxheWVyOiBsLFxuICAgICAgYWN0aW9uOiBhY3Rpb25cbiAgICB9O1xuICAgIHRoaXMubGF5ZXJTZWxlY3RlZC5lbWl0KHNlbGVjdGlvbik7XG4gIH1cblxuICBub2RlU2VsZWN0ZWQoZTogVHJlZU1vZGVsKSB7XG4gICAgaWYgKCFlLmRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbGF5ZXIgPSA8TGF5ZXI+ZS5kYXRhO1xuICAgIHRoaXMubGF5ZXJDbGljayhsYXllcix0aGlzLmRlZmF1bHRBY3Rpb24pO1xuICB9XG5cbiAgYWN0aXZlTGF5ZXJzKGxheWVyczpMYXllcltdKXtcbiAgICB0aGlzLmhpZ2hsaWdodExheWVycyhsYXllcnMsdGhpcy50cmVlKTtcbiAgfVxuXG4gIGhpZ2hsaWdodExheWVycyhsYXllcnM6TGF5ZXJbXSx0cmVlOlRyZWVNb2RlbCk6Ym9vbGVhbntcbiAgICB0cmVlLmtsYXNzID0gbnVsbDtcblxuICAgIGlmKHRyZWUuZGF0YSYmKGxheWVycy5pbmRleE9mKHRyZWUuZGF0YSk+PTApKXtcbiAgICAgIHRyZWUua2xhc3MgPSAnYWN0aXZlLWxheWVyJztcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmKHRyZWUuY2hpbGRyZW4pe1xuICAgICAgbGV0IGFjdGl2ZUNoaWxkID0gZmFsc2U7XG4gICAgICBmb3IobGV0IGk9MDtpPHRyZWUuY2hpbGRyZW4ubGVuZ3RoO2krKyl7XG4gICAgICAgIGFjdGl2ZUNoaWxkID0gdGhpcy5oaWdobGlnaHRMYXllcnMobGF5ZXJzLHRyZWUuY2hpbGRyZW5baV0pIHx8IGFjdGl2ZUNoaWxkO1xuICAgICAgfVxuICAgICAgaWYoYWN0aXZlQ2hpbGQpe1xuICAgICAgICB0cmVlLmtsYXNzID0gJ2FjdGl2ZS1jaGlsZCc7XG4gICAgICB9XG4gICAgICB0cmVlLmtsYXNzID0gKHRyZWUua2xhc3N8fCcnKSArICcgdGhlbWUnO1xuICAgICAgcmV0dXJuIGFjdGl2ZUNoaWxkO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19