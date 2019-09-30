import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Catalog } from '../data/catalog';
import { TreeFilterService } from '../tree-filter.service';
import { MetadataService } from '../metadata.service';
import { MappedLayer } from '../data/mapped-layer';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
var CatalogComponent = /** @class */ (function () {
    function CatalogComponent(filterService, metadata) {
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
    CatalogComponent.prototype.ngAfterViewInit = function () {
        if (this.catalog) {
            this.buildTree();
        }
    };
    CatalogComponent.prototype.ngOnChanges = function (changes) {
        if (changes.catalog && this.catalog) {
            this.filterText = '';
            this.buildTree();
            this.highlightLayers([], this.tree);
        }
    };
    CatalogComponent.prototype.buildTree = function () {
        var _this = this;
        var self = this;
        this.layers = [];
        var cat = this.catalog;
        var tree = {
            label: cat.name,
            expanded: true,
            visible: true,
        };
        var deferredLayers = cat.themes.map(function (t) { return t.layers.filter(function (l) { return l.path && !l.skip; }); }).reduce(function (l, r) { return l.concat(r); }, []);
        var deferredThemes = cat.themes.filter(function (t) { return t.path && !t.skip; });
        var treeActions = this.layerActions.map(function (la) {
            return {
                icon: la.icon,
                tooltip: la.tooltip,
                action: function (node) { return _this.layerClick(node.data, la.action); }
            };
        });
        var layerToTree = function (l) {
            var result = {
                label: l.name,
                data: l,
                visible: true,
                actions: treeActions
            };
            var tmp = new MappedLayer();
            tmp.layer = l;
            tmp.update();
            if (l.description) {
                result.tooltip = of(l.description);
            }
            else {
                result.tooltip = _this.metadata.getMetadata(tmp).pipe(map(function (meta) { return meta[l.descriptionField || 'long_name']; }));
            }
            return result;
        };
        function themeToTree(t) {
            return {
                label: t.name,
                expanded: false,
                visible: true,
                children: t.layers.filter(function (l) { return !l.path && !l.skip; })
                    .filter(function (l) { return self.showPlaceholders || !l.placeholder; })
                    .map(layerToTree)
            };
        }
        tree.children = cat.themes.filter(function (t) { return !t.path && !t.skip; }).map(themeToTree);
        function findParent(path) {
            var e_1, _a, e_2, _b;
            var components = path.split('/');
            var parent = tree;
            var index = -1;
            try {
                for (var components_1 = tslib_1.__values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                    var component = components_1_1.value;
                    var split = component.split('@');
                    component = split[0];
                    index = -1;
                    if (split.length > 1) {
                        index = +split[1];
                    }
                    var found = false;
                    try {
                        for (var _c = (e_2 = void 0, tslib_1.__values(parent.children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var n = _d.value;
                            if (n.label === component) {
                                parent = n;
                                found = true;
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                }
                finally { if (e_1) throw e_1.error; }
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
        deferredThemes.forEach(function (t) {
            var _a = tslib_1.__read(findParent(t.path), 2), parent = _a[0], index = _a[1];
            addChild(parent, themeToTree(t), index);
        });
        deferredLayers.forEach(function (l) {
            var _a = tslib_1.__read(findParent(l.path), 2), parent = _a[0], index = _a[1];
            addChild(parent, layerToTree(l), index);
        });
        this.tree = tree;
    };
    CatalogComponent.prototype.layerClick = function (l, action) {
        var selection = {
            layer: l,
            action: action
        };
        this.layerSelected.emit(selection);
    };
    CatalogComponent.prototype.nodeSelected = function (e) {
        if (!e.data) {
            return;
        }
        var layer = e.data;
        this.layerClick(layer, this.defaultAction);
    };
    CatalogComponent.prototype.activeLayers = function (layers) {
        this.highlightLayers(layers, this.tree);
    };
    CatalogComponent.prototype.highlightLayers = function (layers, tree) {
        tree.klass = null;
        if (tree.data && (layers.indexOf(tree.data) >= 0)) {
            tree.klass = 'active-layer';
            return true;
        }
        if (tree.children) {
            var activeChild = false;
            for (var i = 0; i < tree.children.length; i++) {
                activeChild = this.highlightLayers(layers, tree.children[i]) || activeChild;
            }
            if (activeChild) {
                tree.klass = 'active-child';
            }
            tree.klass = (tree.klass || '') + ' theme';
            return activeChild;
        }
        return false;
    };
    CatalogComponent.ctorParameters = function () { return [
        { type: TreeFilterService },
        { type: MetadataService }
    ]; };
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
            template: "<div class=\"input-group\">\n  <span class=\"input-group-btn\">\n            <button class=\"btn\" type=\"button\" [disabled]=\"!filterText\"\n              (click)=\"filterText = ''\">\n            <i *ngIf=\"filterText\"class=\"fa fa-times\" aria-hidden=\"true\"></i>\n            <i *ngIf=\"!filterText\"class=\"fa fa-search\" aria-hidden=\"true\"></i>\n            </button>\n  </span>\n  <input #filterInput type=\"text\" class=\"form-control\" placeholder=\"Catalog search...\"\n  [(ngModel)]=\"filterText\"/>\n</div>\n\n<simple-tree \n  [tree]=\"this.filterService.filterTree(tree, filterText)\"\n  [showTop]=\"false\"\n  [leafIcon]=\"leafIcon\"\n  [collapsedIcon]=\"collapsedIcon\"\n  [expandedIcon]=\"expandedIcon\"\n  (nodeSelected)=\"nodeSelected($event)\">\n</simple-tree>\n",
            styles: ["\n.node-name{\n  font-size:1em;\n}\n"]
        }),
        tslib_1.__metadata("design:paramtypes", [TreeFilterService, MetadataService])
    ], CatalogComponent);
    return CatalogComponent;
}());
export { CatalogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImNhdGFsb2cvY2F0YWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUNMLE1BQU0sRUFBRSxZQUFZLEVBQ2hDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFHekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQXFDMUI7SUFnQkUsMEJBQVksYUFBZ0MsRUFBVSxRQUF3QjtRQUF4QixhQUFRLEdBQVIsUUFBUSxDQUFnQjtRQWRyRSxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsaUJBQVksR0FBd0IsRUFBRSxDQUFDO1FBQ3RDLGtCQUFhLEdBQWlDLElBQUksWUFBWSxFQUFrQixDQUFDO1FBQ2xGLGtCQUFhLEdBQUcsbUJBQW1CLENBQUM7UUFDcEMsaUJBQVksR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxhQUFRLEdBQUcsYUFBYSxDQUFDO1FBRWxDLFdBQU0sR0FBaUIsRUFBRSxDQUFDO1FBQzFCLFNBQUksR0FBYyxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pELGVBQVUsR0FBRyxFQUFFLENBQUM7UUFLZCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMENBQWUsR0FB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QWdCO1FBM0I1QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsb3hCQW9CWDtxQkFBVSxzQ0FJVjtTQUFHLENBQUM7aURBaUJ3QixpQkFBaUIsRUFBbUIsZUFBZTtPQWhCbkUsZ0JBQWdCLENBaU01QjtJQUFELHVCQUFDO0NBQUEsQUFqTUQsSUFpTUM7U0FqTVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLFxuICBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2F0YWxvZywgIExheWVyLCBUaGVtZSB9IGZyb20gJy4uL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBMYXllclNlbGVjdGlvbiB9IGZyb20gJy4uL2RhdGEvYWN0aW9ucyc7XG5pbXBvcnQgeyBUcmVlTW9kZWwgfSBmcm9tICcuLi9kYXRhL3RyZWUnO1xuaW1wb3J0IHsgVHJlZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi90cmVlLWZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4uL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIHZhciBQbG90bHk6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBDYXRhbG9nTm9kZUFjdGlvbiB7XG4gIGFjdGlvbjpzdHJpbmc7XG4gIGljb246c3RyaW5nO1xuICB0b29sdGlwOnN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2F0YWxvZycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgdHlwZT1cImJ1dHRvblwiIFtkaXNhYmxlZF09XCIhZmlsdGVyVGV4dFwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJmaWx0ZXJUZXh0ID0gJydcIj5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiZmlsdGVyVGV4dFwiY2xhc3M9XCJmYSBmYS10aW1lc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiIWZpbHRlclRleHRcImNsYXNzPVwiZmEgZmEtc2VhcmNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gIDwvc3Bhbj5cbiAgPGlucHV0ICNmaWx0ZXJJbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJDYXRhbG9nIHNlYXJjaC4uLlwiXG4gIFsobmdNb2RlbCldPVwiZmlsdGVyVGV4dFwiLz5cbjwvZGl2PlxuXG48c2ltcGxlLXRyZWUgXG4gIFt0cmVlXT1cInRoaXMuZmlsdGVyU2VydmljZS5maWx0ZXJUcmVlKHRyZWUsIGZpbHRlclRleHQpXCJcbiAgW3Nob3dUb3BdPVwiZmFsc2VcIlxuICBbbGVhZkljb25dPVwibGVhZkljb25cIlxuICBbY29sbGFwc2VkSWNvbl09XCJjb2xsYXBzZWRJY29uXCJcbiAgW2V4cGFuZGVkSWNvbl09XCJleHBhbmRlZEljb25cIlxuICAobm9kZVNlbGVjdGVkKT1cIm5vZGVTZWxlY3RlZCgkZXZlbnQpXCI+XG48L3NpbXBsZS10cmVlPlxuYCxzdHlsZXM6IFtgXG4ubm9kZS1uYW1le1xuICBmb250LXNpemU6MWVtO1xufVxuYF0sfSlcbmV4cG9ydCBjbGFzcyBDYXRhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY2F0YWxvZzogQ2F0YWxvZztcbiAgQElucHV0KCkgc2hvd1BsYWNlaG9sZGVycyA9IHRydWU7XG4gIEBJbnB1dCgpIGRlZmF1bHRBY3Rpb24gPSAnYWRkJztcbiAgQElucHV0KCkgbGF5ZXJBY3Rpb25zOiBDYXRhbG9nTm9kZUFjdGlvbltdID0gW107XG4gIEBPdXRwdXQoKSBsYXllclNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TGF5ZXJTZWxlY3Rpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxMYXllclNlbGVjdGlvbj4oKTtcbiAgQElucHV0KCkgY29sbGFwc2VkSWNvbiA9ICdmYSBmYS1jYXJldC1yaWdodCc7XG4gIEBJbnB1dCgpIGV4cGFuZGVkSWNvbiA9ICdmYSBmYS1jYXJldC1kb3duJztcbiAgQElucHV0KCkgbGVhZkljb24gPSAnZmEgZmEtbWludXMnO1xuXG4gIGxheWVyczogQXJyYXk8TGF5ZXI+ID0gW107XG4gIHRyZWU6IFRyZWVNb2RlbCA9IHsgbGFiZWw6ICdubyBjYXRhbG9nIGxvYWRlZCcgfTtcbiAgZmlsdGVyVGV4dCA9ICcnOyBcblxuICBmaWx0ZXJTZXJ2aWNlOiBUcmVlRmlsdGVyU2VydmljZTtcblxuICBjb25zdHJ1Y3RvcihmaWx0ZXJTZXJ2aWNlOiBUcmVlRmlsdGVyU2VydmljZSwgcHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2UpIHtcbiAgICB0aGlzLmZpbHRlclNlcnZpY2UgPSBmaWx0ZXJTZXJ2aWNlO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLmNhdGFsb2cpIHtcbiAgICAgIHRoaXMuYnVpbGRUcmVlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLmNhdGFsb2cgJiYgdGhpcy5jYXRhbG9nKSB7XG4gICAgICB0aGlzLmZpbHRlclRleHQgPSAnJztcbiAgICAgIHRoaXMuYnVpbGRUcmVlKCk7XG4gICAgICB0aGlzLmhpZ2hsaWdodExheWVycyhbXSx0aGlzLnRyZWUpO1xuICAgIH1cbiAgfVxuXG4gIGJ1aWxkVHJlZSgpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5sYXllcnMgPSBbXTtcbiAgICB2YXIgY2F0ID0gdGhpcy5jYXRhbG9nO1xuICAgIHZhciB0cmVlOiBUcmVlTW9kZWwgPSB7XG4gICAgICBsYWJlbDogY2F0Lm5hbWUsXG4gICAgICBleHBhbmRlZDogdHJ1ZSxcbiAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAvLyBzZXR0aW5nczp7XG4gICAgICAvLyAgIHN0YXRpYzp0cnVlLFxuICAgICAgLy8gICBsZWZ0TWVudTpmYWxzZVxuICAgICAgLy8gfVxuICAgIH1cblxuICAgIHZhciBkZWZlcnJlZExheWVycyA9IGNhdC50aGVtZXMubWFwKHQgPT4gdC5sYXllcnMuZmlsdGVyKGwgPT4gbC5wYXRoJiYhbC5za2lwKSkucmVkdWNlKChsLCByKSA9PiBsLmNvbmNhdChyKSwgW10pO1xuICAgIHZhciBkZWZlcnJlZFRoZW1lcyA9IGNhdC50aGVtZXMuZmlsdGVyKHQgPT4gdC5wYXRoJiYhdC5za2lwKTtcblxuICAgIGNvbnN0IHRyZWVBY3Rpb25zID0gdGhpcy5sYXllckFjdGlvbnMubWFwKGxhPT57XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpY29uOmxhLmljb24sXG4gICAgICAgIHRvb2x0aXA6bGEudG9vbHRpcCxcbiAgICAgICAgYWN0aW9uOihub2RlOiBUcmVlTW9kZWwpID0+IHRoaXMubGF5ZXJDbGljayhub2RlLmRhdGEsbGEuYWN0aW9uKVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxheWVyVG9UcmVlID0gKGw6IExheWVyKT0+IHtcbiAgICAgIGxldCByZXN1bHQ6VHJlZU1vZGVsID0ge1xuICAgICAgICBsYWJlbDogbC5uYW1lLFxuICAgICAgICBkYXRhOiBsLFxuICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICBhY3Rpb25zOiB0cmVlQWN0aW9uc1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdG1wID0gbmV3IE1hcHBlZExheWVyKCk7XG4gICAgICB0bXAubGF5ZXIgPSBsO1xuICAgICAgdG1wLnVwZGF0ZSgpO1xuXG4gICAgICBpZihsLmRlc2NyaXB0aW9uKXtcbiAgICAgICAgcmVzdWx0LnRvb2x0aXAgPSBvZihsLmRlc2NyaXB0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC50b29sdGlwID0gdGhpcy5tZXRhZGF0YS5nZXRNZXRhZGF0YSh0bXApLnBpcGUoXG4gICAgICAgICAgbWFwKG1ldGE9Pm1ldGFbbC5kZXNjcmlwdGlvbkZpZWxkfHwnbG9uZ19uYW1lJ10pXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRoZW1lVG9UcmVlKHQ6IFRoZW1lKTogVHJlZU1vZGVsIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxhYmVsOiB0Lm5hbWUsXG4gICAgICAgIGV4cGFuZGVkOiBmYWxzZSxcbiAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgY2hpbGRyZW46IHQubGF5ZXJzLmZpbHRlcihsID0+ICFsLnBhdGgmJiFsLnNraXApXG4gICAgICAgICAgLmZpbHRlcihsPT5zZWxmLnNob3dQbGFjZWhvbGRlcnN8fCFsLnBsYWNlaG9sZGVyKVxuICAgICAgICAgIC5tYXAobGF5ZXJUb1RyZWUpXG4gICAgICB9O1xuICAgIH1cblxuICAgIHRyZWUuY2hpbGRyZW4gPSBjYXQudGhlbWVzLmZpbHRlcih0ID0+ICF0LnBhdGgmJiF0LnNraXApLm1hcCh0aGVtZVRvVHJlZSk7XG5cbiAgICBmdW5jdGlvbiBmaW5kUGFyZW50KHBhdGg6IHN0cmluZyk6IFtUcmVlTW9kZWwsbnVtYmVyXSB7XG4gICAgICB2YXIgY29tcG9uZW50cyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgIHZhciBwYXJlbnQ6IFRyZWVNb2RlbCA9IHRyZWU7XG4gICAgICB2YXIgaW5kZXggPSAtMTtcblxuICAgICAgZm9yICh2YXIgY29tcG9uZW50IG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gY29tcG9uZW50LnNwbGl0KCdAJyk7XG4gICAgICAgIGNvbXBvbmVudCA9IHNwbGl0WzBdO1xuICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICBpZihzcGxpdC5sZW5ndGg+MSl7XG4gICAgICAgICAgaW5kZXggPSArc3BsaXRbMV07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgbiBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAobi5sYWJlbCA9PT0gY29tcG9uZW50KSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBuO1xuICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgIHZhciBuZXdOb2RlOiBUcmVlTW9kZWwgPSB7XG4gICAgICAgICAgICBsYWJlbDogY29tcG9uZW50LFxuICAgICAgICAgICAgZXhwYW5kZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgICAgIH07XG4gICAgICAgICAgYWRkQ2hpbGQocGFyZW50LG5ld05vZGUsaW5kZXgpO1xuICAgICAgICAgIHBhcmVudCA9IG5ld05vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbcGFyZW50LGluZGV4XTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRDaGlsZChwYXJlbnQ6VHJlZU1vZGVsLGNoaWxkOlRyZWVNb2RlbCxpOm51bWJlcil7XG4gICAgICBpZihpPDApe1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7ICAgICAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGksMCxjaGlsZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmZXJyZWRUaGVtZXMuZm9yRWFjaCh0ID0+IHtcbiAgICAgIHZhciBbcGFyZW50LGluZGV4XSA9IGZpbmRQYXJlbnQodC5wYXRoKTtcbiAgICAgIGFkZENoaWxkKHBhcmVudCx0aGVtZVRvVHJlZSh0KSxpbmRleCk7XG4gICAgfSk7XG5cbiAgICBkZWZlcnJlZExheWVycy5mb3JFYWNoKGwgPT4ge1xuICAgICAgdmFyIFtwYXJlbnQsaW5kZXhdID0gZmluZFBhcmVudChsLnBhdGgpO1xuICAgICAgYWRkQ2hpbGQocGFyZW50LGxheWVyVG9UcmVlKGwpLGluZGV4KTtcbiAgICB9KTtcbiAgICB0aGlzLnRyZWUgPSB0cmVlO1xuICB9XG5cbiAgbGF5ZXJDbGljayhsOiBMYXllcixhY3Rpb246c3RyaW5nKSB7XG4gICAgdmFyIHNlbGVjdGlvbjogTGF5ZXJTZWxlY3Rpb24gPSB7XG4gICAgICBsYXllcjogbCxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfTtcbiAgICB0aGlzLmxheWVyU2VsZWN0ZWQuZW1pdChzZWxlY3Rpb24pO1xuICB9XG5cbiAgbm9kZVNlbGVjdGVkKGU6IFRyZWVNb2RlbCkge1xuICAgIGlmICghZS5kYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxheWVyID0gPExheWVyPmUuZGF0YTtcbiAgICB0aGlzLmxheWVyQ2xpY2sobGF5ZXIsdGhpcy5kZWZhdWx0QWN0aW9uKTtcbiAgfVxuXG4gIGFjdGl2ZUxheWVycyhsYXllcnM6TGF5ZXJbXSl7XG4gICAgdGhpcy5oaWdobGlnaHRMYXllcnMobGF5ZXJzLHRoaXMudHJlZSk7XG4gIH1cblxuICBoaWdobGlnaHRMYXllcnMobGF5ZXJzOkxheWVyW10sdHJlZTpUcmVlTW9kZWwpOmJvb2xlYW57XG4gICAgdHJlZS5rbGFzcyA9IG51bGw7XG5cbiAgICBpZih0cmVlLmRhdGEmJihsYXllcnMuaW5kZXhPZih0cmVlLmRhdGEpPj0wKSl7XG4gICAgICB0cmVlLmtsYXNzID0gJ2FjdGl2ZS1sYXllcic7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZih0cmVlLmNoaWxkcmVuKXtcbiAgICAgIGxldCBhY3RpdmVDaGlsZCA9IGZhbHNlO1xuICAgICAgZm9yKGxldCBpPTA7aTx0cmVlLmNoaWxkcmVuLmxlbmd0aDtpKyspe1xuICAgICAgICBhY3RpdmVDaGlsZCA9IHRoaXMuaGlnaGxpZ2h0TGF5ZXJzKGxheWVycyx0cmVlLmNoaWxkcmVuW2ldKSB8fCBhY3RpdmVDaGlsZDtcbiAgICAgIH1cbiAgICAgIGlmKGFjdGl2ZUNoaWxkKXtcbiAgICAgICAgdHJlZS5rbGFzcyA9ICdhY3RpdmUtY2hpbGQnO1xuICAgICAgfVxuICAgICAgdHJlZS5rbGFzcyA9ICh0cmVlLmtsYXNzfHwnJykgKyAnIHRoZW1lJztcbiAgICAgIHJldHVybiBhY3RpdmVDaGlsZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==