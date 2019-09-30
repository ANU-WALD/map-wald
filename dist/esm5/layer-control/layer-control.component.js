import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MetadataService } from '../metadata.service';
var LayerControlComponent = /** @class */ (function () {
    function LayerControlComponent(metadata) {
        this.metadata = metadata;
        this.allowRemove = true;
        this.showLegends = true;
        this.allowReorder = true;
        this.layersChange = new EventEmitter();
        this.foo = 'bar';
    }
    LayerControlComponent.prototype.ngAfterViewInit = function () {
    };
    LayerControlComponent.prototype.ngOnChanges = function (changes) {
        if (!changes.layers || !this.layers) {
            return;
        }
        this.applyViewMode();
        this.fetchMetadata();
    };
    LayerControlComponent.prototype.applyViewMode = function () {
        var _this = this;
        if (this.uniformViewMode === undefined) {
            return;
        }
        this.layers.forEach(function (l) { return l.options.legend = _this.uniformViewMode; });
    };
    LayerControlComponent.prototype.allLegends = function (showLegend) {
        this.uniformViewMode = showLegend;
        this.layers.forEach(function (l) { return l.options.legend = showLegend; });
    };
    LayerControlComponent.prototype.layerLegend = function (layer, showLegend) {
        this.uniformViewMode = undefined;
        layer.options.legend = showLegend;
    };
    LayerControlComponent.prototype.moveToTop = function (idx) {
        this.layers = [this.layers[idx]].concat(this.layers.slice(0, idx)).concat(this.layers.slice(idx + 1));
        this._changed();
    };
    LayerControlComponent.prototype.moveUp = function (idx) {
        if (idx === 0) {
            return;
        }
        var layers = this.layers;
        this.layers = layers.slice(0, idx - 1).concat([layers[idx], layers[idx - 1]]).concat(layers.slice(idx + 1));
        this._changed();
    };
    LayerControlComponent.prototype.moveDown = function (idx) {
        if (idx === (this.layers.length - 1)) {
            return;
        }
        var layers = this.layers;
        this.layers = layers.slice(0, idx).concat([layers[idx + 1], layers[idx]]).concat(layers.slice(idx + 2));
        this._changed();
    };
    LayerControlComponent.prototype.moveToBottom = function (idx) {
        this.layers = this.layers.slice(0, idx).concat(this.layers.slice(idx + 1)).concat([this.layers[idx]]);
        this._changed();
    };
    LayerControlComponent.prototype.removeLayer = function (idx) {
        var layers = this.layers.slice();
        layers.splice(idx, 1);
        this.layers = layers;
        this._changed();
    };
    LayerControlComponent.prototype.layerPropertyChanged = function (l) {
        this.layers = this.layers.slice();
        this._changed();
    };
    LayerControlComponent.prototype._changed = function () {
        this.fetchMetadata();
        this.layersChange.emit(this.layers);
    };
    LayerControlComponent.prototype.fetchMetadata = function () {
        var _this = this;
        this.layers.forEach(function (ml) {
            _this.metadata.populateMetadata(ml);
        });
    };
    LayerControlComponent.ctorParameters = function () { return [
        { type: MetadataService }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], LayerControlComponent.prototype, "layers", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", LayeredMapComponent)
    ], LayerControlComponent.prototype, "map", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LayerControlComponent.prototype, "allowRemove", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LayerControlComponent.prototype, "showLegends", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LayerControlComponent.prototype, "allowReorder", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LayerControlComponent.prototype, "layersChange", void 0);
    LayerControlComponent = tslib_1.__decorate([
        Component({
            selector: 'layer-control',
            template: "<div class=\"layers-control\">\n  <div *ngIf=\"showLegends\" class=\"layers-control-header\"> <!-- header -->\n    <div class=\"float-right\">\n      <!-- TODO Attach handlers and tooltips to each icon -->\n      <i class=\"fa fa-lg fa-cog discrete-icon\" (click)=\"allLegends(false)\"></i>\n      <i class=\"fa fa-lg fa-th-list discrete-icon\" (click)=\"allLegends(true)\"></i>\n    </div>\n    <br/>\n  </div>\n\n  <div *ngIf=\"layers\">\n    <div *ngFor=\"let l of layers; let i = index\"\n         class=\"layer-control d-flex justify-content-between\">\n      <div class=\"p-2\" style=\"width:100%\">\n        <div *ngIf=\"showLegends&&l.options.legend\">\n          <div *ngIf=\"l.flattenedSettings?.palette || l.legendURL\">\n            <map-legend [title]=\"l.title\"\n              [imageURL]=\"l.legendURL\"\n              [helpText]=\"l.description()\"\n              [mapUnits]=\"l.flattenedSettings?.units\"\n              [cbPalette]=\"l.flattenedSettings?.palette?.name||l.flattenedSettings?.palette\"\n              [cbCount]=\"l.flattenedSettings?.numcolorbands||l.flattenedSettings?.palette?.count\"\n              [cbReverse]=\"l.flattenedSettings?.palette?.reverse\"\n              [cbRange]=\"l.flattenedSettings?.colorscalerange\">\n            </map-legend>\n          </div>\n        </div>\n\n        <div *ngIf=\"!showLegends||!l.options.legend\">\n          <layer-properties [layer]=\"l\"\n                            [map]=\"map\"\n                            (propertyChanged)=\"layerPropertyChanged($event)\">\n          </layer-properties>\n        </div>\n      </div>\n      <div class=\"p-2\">\n          <div>\n            <!-- TODO Attach handlers and tooltips to each icon -->\n            <i *ngIf=\"allowReorder\" class=\"fa fa-bars discrete-icon\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"showLegends\" class=\"fa fa-cog discrete-icon\"\n               ngbTooltip=\"Show layer controls\" placement=\"right\" data-container=\"body\"\n               (click)=\"layerLegend(l,false)\"></i><br *ngIf=\"showLegends\"/>\n            <i *ngIf=\"showLegends\" class=\"fa fa-th-list discrete-icon\"\n               ngbTooltip=\"Show layer data\" placement=\"right\" data-container=\"body\"\n               (click)=\"layerLegend(l,true)\"></i><br *ngIf=\"showLegends\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-double-up discrete-icon\"\n               ngbTooltip=\"Move to top\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveToTop(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-up discrete-icon\"\n               ngbTooltip=\"Move up\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveUp(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-down discrete-icon\"\n               ngbTooltip=\"Move down\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveDown(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowReorder\" class=\"fa fa-angle-double-down discrete-icon\"\n               ngbTooltip=\"Move to bottom\" placement=\"right\" data-container=\"body\"\n              (click)=\"moveToBottom(i)\"></i><br *ngIf=\"allowReorder\"/>\n            <i *ngIf=\"allowRemove\" class=\"fa fa-times discrete-icon\"\n               ngbTooltip=\"Remove layer\" placement=\"right\" data-container=\"body\"\n              data-toggle=\"tooltip\" title=\"Remove layer\"\n              (click)=\"removeLayer(i)\"></i>\n          </div>\n        </div>\n      </div>\n  </div>\n</div>\n\n<!-- Should this control be outside the map? eg to the left? -->\n",
            styles: [".layers-control{\n  width:200px;\n}\n\n\n.layers-control-header, .layer-control{\n  border-bottom: 1.5px solid #aaa;\n}"]
        }),
        tslib_1.__metadata("design:paramtypes", [MetadataService])
    ], LayerControlComponent);
    return LayerControlComponent;
}());
export { LayerControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImxheWVyLWNvbnRyb2wvbGF5ZXItY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZJLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW1GdEQ7SUFVRSwrQkFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFQbkMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUUzRCxRQUFHLEdBQVcsS0FBSyxDQUFDO0lBSXBCLENBQUM7SUFFRCwrQ0FBZSxHQUFmO0lBQ0EsQ0FBQztJQUVELDJDQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsNkNBQWEsR0FBYjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUN0QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUks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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hcHBlZExheWVyIH0gZnJvbSBcIi4uL2RhdGEvbWFwcGVkLWxheWVyXCI7XG5pbXBvcnQgeyBMYXllcmVkTWFwQ29tcG9uZW50IH0gZnJvbSAnLi4vbGF5ZXJlZC1tYXAvbGF5ZXJlZC1tYXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4uL21ldGFkYXRhLnNlcnZpY2UnO1xuXG5cbmRlY2xhcmUgdmFyIFBsb3RseTogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsYXllci1jb250cm9sJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibGF5ZXJzLWNvbnRyb2xcIj5cbiAgPGRpdiAqbmdJZj1cInNob3dMZWdlbmRzXCIgY2xhc3M9XCJsYXllcnMtY29udHJvbC1oZWFkZXJcIj4gPCEtLSBoZWFkZXIgLS0+XG4gICAgPGRpdiBjbGFzcz1cImZsb2F0LXJpZ2h0XCI+XG4gICAgICA8IS0tIFRPRE8gQXR0YWNoIGhhbmRsZXJzIGFuZCB0b29sdGlwcyB0byBlYWNoIGljb24gLS0+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWxnIGZhLWNvZyBkaXNjcmV0ZS1pY29uXCIgKGNsaWNrKT1cImFsbExlZ2VuZHMoZmFsc2UpXCI+PC9pPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1sZyBmYS10aC1saXN0IGRpc2NyZXRlLWljb25cIiAoY2xpY2spPVwiYWxsTGVnZW5kcyh0cnVlKVwiPjwvaT5cbiAgICA8L2Rpdj5cbiAgICA8YnIvPlxuICA8L2Rpdj5cblxuICA8ZGl2ICpuZ0lmPVwibGF5ZXJzXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgbCBvZiBsYXllcnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICAgY2xhc3M9XCJsYXllci1jb250cm9sIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgPGRpdiBjbGFzcz1cInAtMlwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPlxuICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd0xlZ2VuZHMmJmwub3B0aW9ucy5sZWdlbmRcIj5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibC5mbGF0dGVuZWRTZXR0aW5ncz8ucGFsZXR0ZSB8fCBsLmxlZ2VuZFVSTFwiPlxuICAgICAgICAgICAgPG1hcC1sZWdlbmQgW3RpdGxlXT1cImwudGl0bGVcIlxuICAgICAgICAgICAgICBbaW1hZ2VVUkxdPVwibC5sZWdlbmRVUkxcIlxuICAgICAgICAgICAgICBbaGVscFRleHRdPVwibC5kZXNjcmlwdGlvbigpXCJcbiAgICAgICAgICAgICAgW21hcFVuaXRzXT1cImwuZmxhdHRlbmVkU2V0dGluZ3M/LnVuaXRzXCJcbiAgICAgICAgICAgICAgW2NiUGFsZXR0ZV09XCJsLmZsYXR0ZW5lZFNldHRpbmdzPy5wYWxldHRlPy5uYW1lfHxsLmZsYXR0ZW5lZFNldHRpbmdzPy5wYWxldHRlXCJcbiAgICAgICAgICAgICAgW2NiQ291bnRdPVwibC5mbGF0dGVuZWRTZXR0aW5ncz8ubnVtY29sb3JiYW5kc3x8bC5mbGF0dGVuZWRTZXR0aW5ncz8ucGFsZXR0ZT8uY291bnRcIlxuICAgICAgICAgICAgICBbY2JSZXZlcnNlXT1cImwuZmxhdHRlbmVkU2V0dGluZ3M/LnBhbGV0dGU/LnJldmVyc2VcIlxuICAgICAgICAgICAgICBbY2JSYW5nZV09XCJsLmZsYXR0ZW5lZFNldHRpbmdzPy5jb2xvcnNjYWxlcmFuZ2VcIj5cbiAgICAgICAgICAgIDwvbWFwLWxlZ2VuZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiAqbmdJZj1cIiFzaG93TGVnZW5kc3x8IWwub3B0aW9ucy5sZWdlbmRcIj5cbiAgICAgICAgICA8bGF5ZXItcHJvcGVydGllcyBbbGF5ZXJdPVwibFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW21hcF09XCJtYXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcm9wZXJ0eUNoYW5nZWQpPVwibGF5ZXJQcm9wZXJ0eUNoYW5nZWQoJGV2ZW50KVwiPlxuICAgICAgICAgIDwvbGF5ZXItcHJvcGVydGllcz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwLTJcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPCEtLSBUT0RPIEF0dGFjaCBoYW5kbGVycyBhbmQgdG9vbHRpcHMgdG8gZWFjaCBpY29uIC0tPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIiBjbGFzcz1cImZhIGZhLWJhcnMgZGlzY3JldGUtaWNvblwiPjwvaT48YnIgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIi8+XG4gICAgICAgICAgICA8aSAqbmdJZj1cInNob3dMZWdlbmRzXCIgY2xhc3M9XCJmYSBmYS1jb2cgZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICBuZ2JUb29sdGlwPVwiU2hvdyBsYXllciBjb250cm9sc1wiIHBsYWNlbWVudD1cInJpZ2h0XCIgZGF0YS1jb250YWluZXI9XCJib2R5XCJcbiAgICAgICAgICAgICAgIChjbGljayk9XCJsYXllckxlZ2VuZChsLGZhbHNlKVwiPjwvaT48YnIgKm5nSWY9XCJzaG93TGVnZW5kc1wiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwic2hvd0xlZ2VuZHNcIiBjbGFzcz1cImZhIGZhLXRoLWxpc3QgZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICBuZ2JUb29sdGlwPVwiU2hvdyBsYXllciBkYXRhXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cImxheWVyTGVnZW5kKGwsdHJ1ZSlcIj48L2k+PGJyICpuZ0lmPVwic2hvd0xlZ2VuZHNcIi8+XG4gICAgICAgICAgICA8aSAqbmdJZj1cImFsbG93UmVvcmRlclwiIGNsYXNzPVwiZmEgZmEtYW5nbGUtZG91YmxlLXVwIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIk1vdmUgdG8gdG9wXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvVG9wKGkpXCI+PC9pPjxiciAqbmdJZj1cImFsbG93UmVvcmRlclwiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIgY2xhc3M9XCJmYSBmYS1hbmdsZS11cCBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJNb3ZlIHVwXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVVwKGkpXCI+PC9pPjxiciAqbmdJZj1cImFsbG93UmVvcmRlclwiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3duIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIk1vdmUgZG93blwiIHBsYWNlbWVudD1cInJpZ2h0XCIgZGF0YS1jb250YWluZXI9XCJib2R5XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVEb3duKGkpXCI+PC9pPjxiciAqbmdJZj1cImFsbG93UmVvcmRlclwiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtZG93biBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJNb3ZlIHRvIGJvdHRvbVwiIHBsYWNlbWVudD1cInJpZ2h0XCIgZGF0YS1jb250YWluZXI9XCJib2R5XCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cIm1vdmVUb0JvdHRvbShpKVwiPjwvaT48YnIgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIi8+XG4gICAgICAgICAgICA8aSAqbmdJZj1cImFsbG93UmVtb3ZlXCIgY2xhc3M9XCJmYSBmYS10aW1lcyBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJSZW1vdmUgbGF5ZXJcIiBwbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICAgIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIHRpdGxlPVwiUmVtb3ZlIGxheWVyXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUxheWVyKGkpXCI+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG48IS0tIFNob3VsZCB0aGlzIGNvbnRyb2wgYmUgb3V0c2lkZSB0aGUgbWFwPyBlZyB0byB0aGUgbGVmdD8gLS0+XG5gLHN0eWxlczogW2AubGF5ZXJzLWNvbnRyb2x7XG4gIHdpZHRoOjIwMHB4O1xufVxuXG5cbi5sYXllcnMtY29udHJvbC1oZWFkZXIsIC5sYXllci1jb250cm9se1xuICBib3JkZXItYm90dG9tOiAxLjVweCBzb2xpZCAjYWFhO1xufWBdfSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsYXllcnM6IE1hcHBlZExheWVyW107XG4gIEBJbnB1dCgpIG1hcDogTGF5ZXJlZE1hcENvbXBvbmVudDtcbiAgQElucHV0KCkgYWxsb3dSZW1vdmUgPSB0cnVlO1xuICBASW5wdXQoKSBzaG93TGVnZW5kcyA9IHRydWU7XG4gIEBJbnB1dCgpIGFsbG93UmVvcmRlciA9IHRydWU7XG4gIEBPdXRwdXQoKSBsYXllcnNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE1hcHBlZExheWVyW10+KCk7XG4gIHVuaWZvcm1WaWV3TW9kZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgZm9vOiBzdHJpbmcgPSAnYmFyJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSkge1xuXG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCFjaGFuZ2VzLmxheWVycyB8fCAhdGhpcy5sYXllcnMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hcHBseVZpZXdNb2RlKCk7XG4gICAgdGhpcy5mZXRjaE1ldGFkYXRhKCk7XG4gIH1cblxuICBhcHBseVZpZXdNb2RlKCl7XG4gICAgaWYgKHRoaXMudW5pZm9ybVZpZXdNb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGwgPT4gbC5vcHRpb25zLmxlZ2VuZCA9IHRoaXMudW5pZm9ybVZpZXdNb2RlKTtcbiAgfVxuXG4gIGFsbExlZ2VuZHMoc2hvd0xlZ2VuZDogYm9vbGVhbikge1xuICAgIHRoaXMudW5pZm9ybVZpZXdNb2RlID0gc2hvd0xlZ2VuZDtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKGwgPT4gbC5vcHRpb25zLmxlZ2VuZCA9IHNob3dMZWdlbmQpO1xuICB9XG5cbiAgbGF5ZXJMZWdlbmQobGF5ZXI6IE1hcHBlZExheWVyLCBzaG93TGVnZW5kOiBib29sZWFuKSB7XG4gICAgdGhpcy51bmlmb3JtVmlld01vZGUgPSB1bmRlZmluZWQ7XG4gICAgbGF5ZXIub3B0aW9ucy5sZWdlbmQgPSBzaG93TGVnZW5kO1xuICB9XG5cbiAgbW92ZVRvVG9wKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXllcnMgPSBbdGhpcy5sYXllcnNbaWR4XV0uY29uY2F0KHRoaXMubGF5ZXJzLnNsaWNlKDAsIGlkeCkpLmNvbmNhdCh0aGlzLmxheWVycy5zbGljZShpZHggKyAxKSk7XG4gICAgdGhpcy5fY2hhbmdlZCgpO1xuICB9XG5cbiAgbW92ZVVwKGlkeDogbnVtYmVyKSB7XG4gICAgaWYgKGlkeCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBsYXllcnMgPSB0aGlzLmxheWVycztcbiAgICB0aGlzLmxheWVycyA9IGxheWVycy5zbGljZSgwLCBpZHggLSAxKS5jb25jYXQoW2xheWVyc1tpZHhdLCBsYXllcnNbaWR4IC0gMV1dKS5jb25jYXQobGF5ZXJzLnNsaWNlKGlkeCArIDEpKTtcbiAgICB0aGlzLl9jaGFuZ2VkKCk7XG4gIH1cblxuICBtb3ZlRG93bihpZHg6IG51bWJlcikge1xuICAgIGlmIChpZHggPT09ICh0aGlzLmxheWVycy5sZW5ndGggLSAxKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBsYXllcnMgPSB0aGlzLmxheWVycztcbiAgICB0aGlzLmxheWVycyA9IGxheWVycy5zbGljZSgwLCBpZHgpLmNvbmNhdChbbGF5ZXJzW2lkeCArIDFdLCBsYXllcnNbaWR4XV0pLmNvbmNhdChsYXllcnMuc2xpY2UoaWR4ICsgMikpO1xuICAgIHRoaXMuX2NoYW5nZWQoKTtcbiAgfVxuXG4gIG1vdmVUb0JvdHRvbShpZHg6IG51bWJlcikge1xuICAgIHRoaXMubGF5ZXJzID0gdGhpcy5sYXllcnMuc2xpY2UoMCwgaWR4KS5jb25jYXQodGhpcy5sYXllcnMuc2xpY2UoaWR4ICsgMSkpLmNvbmNhdChbdGhpcy5sYXllcnNbaWR4XV0pO1xuICAgIHRoaXMuX2NoYW5nZWQoKTtcbiAgfVxuXG4gIHJlbW92ZUxheWVyKGlkeDogbnVtYmVyKSB7XG4gICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzLnNsaWNlKCk7XG4gICAgbGF5ZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzO1xuICAgIHRoaXMuX2NoYW5nZWQoKTtcbiAgfVxuXG4gIGxheWVyUHJvcGVydHlDaGFuZ2VkKGw6IE1hcHBlZExheWVyKSB7XG4gICAgdGhpcy5sYXllcnMgPSB0aGlzLmxheWVycy5zbGljZSgpO1xuICAgIHRoaXMuX2NoYW5nZWQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZWQoKSB7XG4gICAgdGhpcy5mZXRjaE1ldGFkYXRhKCk7XG4gICAgdGhpcy5sYXllcnNDaGFuZ2UuZW1pdCh0aGlzLmxheWVycyk7XG4gIH1cblxuICBmZXRjaE1ldGFkYXRhKCl7XG4gICAgdGhpcy5sYXllcnMuZm9yRWFjaChtbD0+e1xuICAgICAgdGhpcy5tZXRhZGF0YS5wb3B1bGF0ZU1ldGFkYXRhKG1sKTtcbiAgICB9KVxuICB9XG59XG4iXX0=