import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LayeredMapComponent } from '../layered-map/layered-map.component';
import { MetadataService } from '../metadata.service';
let LayerControlComponent = class LayerControlComponent {
    constructor(metadata) {
        this.metadata = metadata;
        this.allowRemove = true;
        this.showLegends = true;
        this.allowReorder = true;
        this.layersChange = new EventEmitter();
        this.foo = 'bar';
    }
    ngAfterViewInit() {
    }
    ngOnChanges(changes) {
        if (!changes.layers || !this.layers) {
            return;
        }
        this.applyViewMode();
        this.fetchMetadata();
    }
    applyViewMode() {
        if (this.uniformViewMode === undefined) {
            return;
        }
        this.layers.forEach(l => l.options.legend = this.uniformViewMode);
    }
    allLegends(showLegend) {
        this.uniformViewMode = showLegend;
        this.layers.forEach(l => l.options.legend = showLegend);
    }
    layerLegend(layer, showLegend) {
        this.uniformViewMode = undefined;
        layer.options.legend = showLegend;
    }
    moveToTop(idx) {
        this.layers = [this.layers[idx]].concat(this.layers.slice(0, idx)).concat(this.layers.slice(idx + 1));
        this._changed();
    }
    moveUp(idx) {
        if (idx === 0) {
            return;
        }
        var layers = this.layers;
        this.layers = layers.slice(0, idx - 1).concat([layers[idx], layers[idx - 1]]).concat(layers.slice(idx + 1));
        this._changed();
    }
    moveDown(idx) {
        if (idx === (this.layers.length - 1)) {
            return;
        }
        var layers = this.layers;
        this.layers = layers.slice(0, idx).concat([layers[idx + 1], layers[idx]]).concat(layers.slice(idx + 2));
        this._changed();
    }
    moveToBottom(idx) {
        this.layers = this.layers.slice(0, idx).concat(this.layers.slice(idx + 1)).concat([this.layers[idx]]);
        this._changed();
    }
    removeLayer(idx) {
        var layers = this.layers.slice();
        layers.splice(idx, 1);
        this.layers = layers;
        this._changed();
    }
    layerPropertyChanged(l) {
        this.layers = this.layers.slice();
        this._changed();
    }
    _changed() {
        this.fetchMetadata();
        this.layersChange.emit(this.layers);
    }
    fetchMetadata() {
        this.layers.forEach(ml => {
            this.metadata.populateMetadata(ml);
        });
    }
};
LayerControlComponent.ctorParameters = () => [
    { type: MetadataService }
];
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
        template: `<div class="layers-control">
  <div *ngIf="showLegends" class="layers-control-header"> <!-- header -->
    <div class="float-right">
      <!-- TODO Attach handlers and tooltips to each icon -->
      <i class="fa fa-lg fa-cog discrete-icon" (click)="allLegends(false)"></i>
      <i class="fa fa-lg fa-th-list discrete-icon" (click)="allLegends(true)"></i>
    </div>
    <br/>
  </div>

  <div *ngIf="layers">
    <div *ngFor="let l of layers; let i = index"
         class="layer-control d-flex justify-content-between">
      <div class="p-2" style="width:100%">
        <div *ngIf="showLegends&&l.options.legend">
          <div *ngIf="l.flattenedSettings?.palette || l.legendURL">
            <map-legend [title]="l.title"
              [imageURL]="l.legendURL"
              [helpText]="l.description()"
              [mapUnits]="l.flattenedSettings?.units"
              [cbPalette]="l.flattenedSettings?.palette?.name||l.flattenedSettings?.palette"
              [cbCount]="l.flattenedSettings?.numcolorbands||l.flattenedSettings?.palette?.count"
              [cbReverse]="l.flattenedSettings?.palette?.reverse"
              [cbRange]="l.flattenedSettings?.colorscalerange">
            </map-legend>
          </div>
        </div>

        <div *ngIf="!showLegends||!l.options.legend">
          <layer-properties [layer]="l"
                            [map]="map"
                            (propertyChanged)="layerPropertyChanged($event)">
          </layer-properties>
        </div>
      </div>
      <div class="p-2">
          <div>
            <!-- TODO Attach handlers and tooltips to each icon -->
            <i *ngIf="allowReorder" class="fa fa-bars discrete-icon"></i><br *ngIf="allowReorder"/>
            <i *ngIf="showLegends" class="fa fa-cog discrete-icon"
               ngbTooltip="Show layer controls" placement="right" data-container="body"
               (click)="layerLegend(l,false)"></i><br *ngIf="showLegends"/>
            <i *ngIf="showLegends" class="fa fa-th-list discrete-icon"
               ngbTooltip="Show layer data" placement="right" data-container="body"
               (click)="layerLegend(l,true)"></i><br *ngIf="showLegends"/>
            <i *ngIf="allowReorder" class="fa fa-angle-double-up discrete-icon"
               ngbTooltip="Move to top" placement="right" data-container="body"
              (click)="moveToTop(i)"></i><br *ngIf="allowReorder"/>
            <i *ngIf="allowReorder" class="fa fa-angle-up discrete-icon"
               ngbTooltip="Move up" placement="right" data-container="body"
              (click)="moveUp(i)"></i><br *ngIf="allowReorder"/>
            <i *ngIf="allowReorder" class="fa fa-angle-down discrete-icon"
               ngbTooltip="Move down" placement="right" data-container="body"
              (click)="moveDown(i)"></i><br *ngIf="allowReorder"/>
            <i *ngIf="allowReorder" class="fa fa-angle-double-down discrete-icon"
               ngbTooltip="Move to bottom" placement="right" data-container="body"
              (click)="moveToBottom(i)"></i><br *ngIf="allowReorder"/>
            <i *ngIf="allowRemove" class="fa fa-times discrete-icon"
               ngbTooltip="Remove layer" placement="right" data-container="body"
              data-toggle="tooltip" title="Remove layer"
              (click)="removeLayer(i)"></i>
          </div>
        </div>
      </div>
  </div>
</div>

<!-- Should this control be outside the map? eg to the left? -->
`,
        styles: [`.layers-control{
  width:200px;
}


.layers-control-header, .layer-control{
  border-bottom: 1.5px solid #aaa;
}`]
    }),
    tslib_1.__metadata("design:paramtypes", [MetadataService])
], LayerControlComponent);
export { LayerControlComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImxheWVyLWNvbnRyb2wvbGF5ZXItY29udHJvbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFrRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZJLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW1GdEQsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFVaEMsWUFBb0IsUUFBd0I7UUFBeEIsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7UUFQbkMsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDbkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUUzRCxRQUFHLEdBQVcsS0FBSyxDQUFDO0lBSXBCLENBQUM7SUFFRCxlQUFlO0lBQ2YsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDdEMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJ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dXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tIFwiLi4vZGF0YS9tYXBwZWQtbGF5ZXJcIjtcbmltcG9ydCB7IExheWVyZWRNYXBDb21wb25lbnQgfSBmcm9tICcuLi9sYXllcmVkLW1hcC9sYXllcmVkLW1hcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi4vbWV0YWRhdGEuc2VydmljZSc7XG5cblxuZGVjbGFyZSB2YXIgUGxvdGx5OiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xheWVyLWNvbnRyb2wnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJsYXllcnMtY29udHJvbFwiPlxuICA8ZGl2ICpuZ0lmPVwic2hvd0xlZ2VuZHNcIiBjbGFzcz1cImxheWVycy1jb250cm9sLWhlYWRlclwiPiA8IS0tIGhlYWRlciAtLT5cbiAgICA8ZGl2IGNsYXNzPVwiZmxvYXQtcmlnaHRcIj5cbiAgICAgIDwhLS0gVE9ETyBBdHRhY2ggaGFuZGxlcnMgYW5kIHRvb2x0aXBzIHRvIGVhY2ggaWNvbiAtLT5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGcgZmEtY29nIGRpc2NyZXRlLWljb25cIiAoY2xpY2spPVwiYWxsTGVnZW5kcyhmYWxzZSlcIj48L2k+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWxnIGZhLXRoLWxpc3QgZGlzY3JldGUtaWNvblwiIChjbGljayk9XCJhbGxMZWdlbmRzKHRydWUpXCI+PC9pPlxuICAgIDwvZGl2PlxuICAgIDxici8+XG4gIDwvZGl2PlxuXG4gIDxkaXYgKm5nSWY9XCJsYXllcnNcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBsIG9mIGxheWVyczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICBjbGFzcz1cImxheWVyLWNvbnRyb2wgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicC0yXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzaG93TGVnZW5kcyYmbC5vcHRpb25zLmxlZ2VuZFwiPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJsLmZsYXR0ZW5lZFNldHRpbmdzPy5wYWxldHRlIHx8IGwubGVnZW5kVVJMXCI+XG4gICAgICAgICAgICA8bWFwLWxlZ2VuZCBbdGl0bGVdPVwibC50aXRsZVwiXG4gICAgICAgICAgICAgIFtpbWFnZVVSTF09XCJsLmxlZ2VuZFVSTFwiXG4gICAgICAgICAgICAgIFtoZWxwVGV4dF09XCJsLmRlc2NyaXB0aW9uKClcIlxuICAgICAgICAgICAgICBbbWFwVW5pdHNdPVwibC5mbGF0dGVuZWRTZXR0aW5ncz8udW5pdHNcIlxuICAgICAgICAgICAgICBbY2JQYWxldHRlXT1cImwuZmxhdHRlbmVkU2V0dGluZ3M/LnBhbGV0dGU/Lm5hbWV8fGwuZmxhdHRlbmVkU2V0dGluZ3M/LnBhbGV0dGVcIlxuICAgICAgICAgICAgICBbY2JDb3VudF09XCJsLmZsYXR0ZW5lZFNldHRpbmdzPy5udW1jb2xvcmJhbmRzfHxsLmZsYXR0ZW5lZFNldHRpbmdzPy5wYWxldHRlPy5jb3VudFwiXG4gICAgICAgICAgICAgIFtjYlJldmVyc2VdPVwibC5mbGF0dGVuZWRTZXR0aW5ncz8ucGFsZXR0ZT8ucmV2ZXJzZVwiXG4gICAgICAgICAgICAgIFtjYlJhbmdlXT1cImwuZmxhdHRlbmVkU2V0dGluZ3M/LmNvbG9yc2NhbGVyYW5nZVwiPlxuICAgICAgICAgICAgPC9tYXAtbGVnZW5kPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2ICpuZ0lmPVwiIXNob3dMZWdlbmRzfHwhbC5vcHRpb25zLmxlZ2VuZFwiPlxuICAgICAgICAgIDxsYXllci1wcm9wZXJ0aWVzIFtsYXllcl09XCJsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWFwXT1cIm1hcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByb3BlcnR5Q2hhbmdlZCk9XCJsYXllclByb3BlcnR5Q2hhbmdlZCgkZXZlbnQpXCI+XG4gICAgICAgICAgPC9sYXllci1wcm9wZXJ0aWVzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInAtMlwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8IS0tIFRPRE8gQXR0YWNoIGhhbmRsZXJzIGFuZCB0b29sdGlwcyB0byBlYWNoIGljb24gLS0+XG4gICAgICAgICAgICA8aSAqbmdJZj1cImFsbG93UmVvcmRlclwiIGNsYXNzPVwiZmEgZmEtYmFycyBkaXNjcmV0ZS1pY29uXCI+PC9pPjxiciAqbmdJZj1cImFsbG93UmVvcmRlclwiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwic2hvd0xlZ2VuZHNcIiBjbGFzcz1cImZhIGZhLWNvZyBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJTaG93IGxheWVyIGNvbnRyb2xzXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAgKGNsaWNrKT1cImxheWVyTGVnZW5kKGwsZmFsc2UpXCI+PC9pPjxiciAqbmdJZj1cInNob3dMZWdlbmRzXCIvPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJzaG93TGVnZW5kc1wiIGNsYXNzPVwiZmEgZmEtdGgtbGlzdCBkaXNjcmV0ZS1pY29uXCJcbiAgICAgICAgICAgICAgIG5nYlRvb2x0aXA9XCJTaG93IGxheWVyIGRhdGFcIiBwbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICAgICAoY2xpY2spPVwibGF5ZXJMZWdlbmQobCx0cnVlKVwiPjwvaT48YnIgKm5nSWY9XCJzaG93TGVnZW5kc1wiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIgY2xhc3M9XCJmYSBmYS1hbmdsZS1kb3VibGUtdXAgZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICBuZ2JUb29sdGlwPVwiTW92ZSB0byB0b3BcIiBwbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVG9Ub3AoaSlcIj48L2k+PGJyICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIvPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIiBjbGFzcz1cImZhIGZhLWFuZ2xlLXVwIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIk1vdmUgdXBcIiBwbGFjZW1lbnQ9XCJyaWdodFwiIGRhdGEtY29udGFpbmVyPVwiYm9keVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJtb3ZlVXAoaSlcIj48L2k+PGJyICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIvPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIiBjbGFzcz1cImZhIGZhLWFuZ2xlLWRvd24gZGlzY3JldGUtaWNvblwiXG4gICAgICAgICAgICAgICBuZ2JUb29sdGlwPVwiTW92ZSBkb3duXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZURvd24oaSlcIj48L2k+PGJyICpuZ0lmPVwiYWxsb3dSZW9yZGVyXCIvPlxuICAgICAgICAgICAgPGkgKm5nSWY9XCJhbGxvd1Jlb3JkZXJcIiBjbGFzcz1cImZhIGZhLWFuZ2xlLWRvdWJsZS1kb3duIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIk1vdmUgdG8gYm90dG9tXCIgcGxhY2VtZW50PVwicmlnaHRcIiBkYXRhLWNvbnRhaW5lcj1cImJvZHlcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwibW92ZVRvQm90dG9tKGkpXCI+PC9pPjxiciAqbmdJZj1cImFsbG93UmVvcmRlclwiLz5cbiAgICAgICAgICAgIDxpICpuZ0lmPVwiYWxsb3dSZW1vdmVcIiBjbGFzcz1cImZhIGZhLXRpbWVzIGRpc2NyZXRlLWljb25cIlxuICAgICAgICAgICAgICAgbmdiVG9vbHRpcD1cIlJlbW92ZSBsYXllclwiIHBsYWNlbWVudD1cInJpZ2h0XCIgZGF0YS1jb250YWluZXI9XCJib2R5XCJcbiAgICAgICAgICAgICAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgdGl0bGU9XCJSZW1vdmUgbGF5ZXJcIlxuICAgICAgICAgICAgICAoY2xpY2spPVwicmVtb3ZlTGF5ZXIoaSlcIj48L2k+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjwhLS0gU2hvdWxkIHRoaXMgY29udHJvbCBiZSBvdXRzaWRlIHRoZSBtYXA/IGVnIHRvIHRoZSBsZWZ0PyAtLT5cbmAsc3R5bGVzOiBbYC5sYXllcnMtY29udHJvbHtcbiAgd2lkdGg6MjAwcHg7XG59XG5cblxuLmxheWVycy1jb250cm9sLWhlYWRlciwgLmxheWVyLWNvbnRyb2x7XG4gIGJvcmRlci1ib3R0b206IDEuNXB4IHNvbGlkICNhYWE7XG59YF19KVxuZXhwb3J0IGNsYXNzIExheWVyQ29udHJvbENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxheWVyczogTWFwcGVkTGF5ZXJbXTtcbiAgQElucHV0KCkgbWFwOiBMYXllcmVkTWFwQ29tcG9uZW50O1xuICBASW5wdXQoKSBhbGxvd1JlbW92ZSA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dMZWdlbmRzID0gdHJ1ZTtcbiAgQElucHV0KCkgYWxsb3dSZW9yZGVyID0gdHJ1ZTtcbiAgQE91dHB1dCgpIGxheWVyc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwcGVkTGF5ZXJbXT4oKTtcbiAgdW5pZm9ybVZpZXdNb2RlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICBmb286IHN0cmluZyA9ICdiYXInO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIWNoYW5nZXMubGF5ZXJzIHx8ICF0aGlzLmxheWVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Vmlld01vZGUoKTtcbiAgICB0aGlzLmZldGNoTWV0YWRhdGEoKTtcbiAgfVxuXG4gIGFwcGx5Vmlld01vZGUoKXtcbiAgICBpZiAodGhpcy51bmlmb3JtVmlld01vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobCA9PiBsLm9wdGlvbnMubGVnZW5kID0gdGhpcy51bmlmb3JtVmlld01vZGUpO1xuICB9XG5cbiAgYWxsTGVnZW5kcyhzaG93TGVnZW5kOiBib29sZWFuKSB7XG4gICAgdGhpcy51bmlmb3JtVmlld01vZGUgPSBzaG93TGVnZW5kO1xuICAgIHRoaXMubGF5ZXJzLmZvckVhY2gobCA9PiBsLm9wdGlvbnMubGVnZW5kID0gc2hvd0xlZ2VuZCk7XG4gIH1cblxuICBsYXllckxlZ2VuZChsYXllcjogTWFwcGVkTGF5ZXIsIHNob3dMZWdlbmQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnVuaWZvcm1WaWV3TW9kZSA9IHVuZGVmaW5lZDtcbiAgICBsYXllci5vcHRpb25zLmxlZ2VuZCA9IHNob3dMZWdlbmQ7XG4gIH1cblxuICBtb3ZlVG9Ub3AoaWR4OiBudW1iZXIpIHtcbiAgICB0aGlzLmxheWVycyA9IFt0aGlzLmxheWVyc1tpZHhdXS5jb25jYXQodGhpcy5sYXllcnMuc2xpY2UoMCwgaWR4KSkuY29uY2F0KHRoaXMubGF5ZXJzLnNsaWNlKGlkeCArIDEpKTtcbiAgICB0aGlzLl9jaGFuZ2VkKCk7XG4gIH1cblxuICBtb3ZlVXAoaWR4OiBudW1iZXIpIHtcbiAgICBpZiAoaWR4ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzO1xuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzLnNsaWNlKDAsIGlkeCAtIDEpLmNvbmNhdChbbGF5ZXJzW2lkeF0sIGxheWVyc1tpZHggLSAxXV0pLmNvbmNhdChsYXllcnMuc2xpY2UoaWR4ICsgMSkpO1xuICAgIHRoaXMuX2NoYW5nZWQoKTtcbiAgfVxuXG4gIG1vdmVEb3duKGlkeDogbnVtYmVyKSB7XG4gICAgaWYgKGlkeCA9PT0gKHRoaXMubGF5ZXJzLmxlbmd0aCAtIDEpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxheWVycyA9IHRoaXMubGF5ZXJzO1xuICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtsYXllcnNbaWR4ICsgMV0sIGxheWVyc1tpZHhdXSkuY29uY2F0KGxheWVycy5zbGljZShpZHggKyAyKSk7XG4gICAgdGhpcy5fY2hhbmdlZCgpO1xuICB9XG5cbiAgbW92ZVRvQm90dG9tKGlkeDogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXllcnMgPSB0aGlzLmxheWVycy5zbGljZSgwLCBpZHgpLmNvbmNhdCh0aGlzLmxheWVycy5zbGljZShpZHggKyAxKSkuY29uY2F0KFt0aGlzLmxheWVyc1tpZHhdXSk7XG4gICAgdGhpcy5fY2hhbmdlZCgpO1xuICB9XG5cbiAgcmVtb3ZlTGF5ZXIoaWR4OiBudW1iZXIpIHtcbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5sYXllcnMuc2xpY2UoKTtcbiAgICBsYXllcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XG4gICAgdGhpcy5fY2hhbmdlZCgpO1xuICB9XG5cbiAgbGF5ZXJQcm9wZXJ0eUNoYW5nZWQobDogTWFwcGVkTGF5ZXIpIHtcbiAgICB0aGlzLmxheWVycyA9IHRoaXMubGF5ZXJzLnNsaWNlKCk7XG4gICAgdGhpcy5fY2hhbmdlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlZCgpIHtcbiAgICB0aGlzLmZldGNoTWV0YWRhdGEoKTtcbiAgICB0aGlzLmxheWVyc0NoYW5nZS5lbWl0KHRoaXMubGF5ZXJzKTtcbiAgfVxuXG4gIGZldGNoTWV0YWRhdGEoKXtcbiAgICB0aGlzLmxheWVycy5mb3JFYWNoKG1sPT57XG4gICAgICB0aGlzLm1ldGFkYXRhLnBvcHVsYXRlTWV0YWRhdGEobWwpO1xuICAgIH0pXG4gIH1cbn1cbiJdfQ==