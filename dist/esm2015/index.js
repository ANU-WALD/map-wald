"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var MapWaldCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const http_1 = require("@angular/common/http");
const tree_filter_service_1 = require("./tree-filter.service");
const palette_service_1 = require("./palette.service");
const time_utils_service_1 = require("./time-utils.service");
const static_data_service_1 = require("./static-data.service");
const metadata_service_1 = require("./metadata.service");
const opendap_service_1 = require("./opendap.service");
const timeseries_service_1 = require("./timeseries.service");
const point_selection_service_1 = require("./point-selection.service");
const available_dates_service_1 = require("./available-dates.service");
const catalog_service_1 = require("./catalog.service");
const map_view_service_1 = require("./map-view.service");
const wms_service_1 = require("./wms.service");
const projection_service_1 = require("./projection.service");
__export(require("./data/catalog"));
__export(require("./data/mapped-layer"));
__export(require("./wms.service"));
__export(require("./projection.service"));
__export(require("./map-view.service"));
__export(require("./interpolation.service"));
__export(require("./available-dates.service"));
__export(require("./point-selection.service"));
__export(require("./metadata.service"));
__export(require("./catalog.service"));
__export(require("./palette.service"));
__export(require("./static-data.service"));
__export(require("./opendap.service"));
__export(require("./timeseries.service"));
__export(require("./time-utils.service"));
__export(require("./tree-filter.service"));
__export(require("./parsing/csv"));
const services = [
    //$serviceList
    available_dates_service_1.AvailableDatesService,
    point_selection_service_1.PointSelectionService,
    timeseries_service_1.TimeseriesService,
    static_data_service_1.StaticDataService,
    metadata_service_1.MetadataService,
    opendap_service_1.OpendapService,
    palette_service_1.PaletteService,
    time_utils_service_1.TimeUtilsService,
    wms_service_1.WMSService,
    map_view_service_1.MapViewParameterService,
    projection_service_1.ProjectionService,
    catalog_service_1.CatalogService,
    tree_filter_service_1.TreeFilterService
];
//import { CSVService } from './src/csv.service';
//$importList
//$exportList
let MapWaldCoreModule = MapWaldCoreModule_1 = class MapWaldCoreModule {
    static forRoot(moduleInitialisation) {
        return {
            ngModule: MapWaldCoreModule_1,
            providers: services
        };
    }
};
MapWaldCoreModule = MapWaldCoreModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            http_1.HttpClientModule
        ],
        declarations: [],
        exports: [],
        providers: services
    })
], MapWaldCoreModule);
exports.MapWaldCoreModule = MapWaldCoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHdDQUE4RDtBQUM5RCw0Q0FBK0M7QUFDL0MsMENBQTZDO0FBQzdDLCtDQUF3RDtBQUV4RCwrREFBMEQ7QUFDMUQsdURBQW1EO0FBQ25ELDZEQUF3RDtBQUN4RCwrREFBMEQ7QUFDMUQseURBQXFEO0FBQ3JELHVEQUFtRDtBQUNuRCw2REFBeUQ7QUFDekQsdUVBQWtFO0FBQ2xFLHVFQUFrRTtBQUNsRSx1REFBbUQ7QUFDbkQseURBQTZEO0FBQzdELCtDQUEyQztBQUMzQyw2REFBeUQ7QUFFekQsb0NBQStCO0FBQy9CLHlDQUFvQztBQUtwQyxtQ0FBOEI7QUFDOUIsMENBQXFDO0FBQ3JDLHdDQUFtQztBQUNuQyw2Q0FBd0M7QUFDeEMsK0NBQTBDO0FBQzFDLCtDQUEwQztBQUMxQyx3Q0FBbUM7QUFDbkMsdUNBQWtDO0FBQ2xDLHVDQUFrQztBQUNsQywyQ0FBc0M7QUFDdEMsdUNBQWtDO0FBQ2xDLDBDQUFxQztBQUNyQywwQ0FBcUM7QUFDckMsMkNBQXNDO0FBRXRDLG1DQUE4QjtBQUU5QixNQUFNLFFBQVEsR0FBRztJQUNmLGNBQWM7SUFDZCwrQ0FBcUI7SUFDckIsK0NBQXFCO0lBQ3JCLHNDQUFpQjtJQUNqQix1Q0FBaUI7SUFDakIsa0NBQWU7SUFDZixnQ0FBYztJQUNkLGdDQUFjO0lBQ2QscUNBQWdCO0lBQ2hCLHdCQUFVO0lBQ1YsMENBQXVCO0lBQ3ZCLHNDQUFpQjtJQUNqQixnQ0FBYztJQUNkLHVDQUFpQjtDQUNsQixDQUFDO0FBRUYsaURBQWlEO0FBRWpELGFBQWE7QUFFYixhQUFhO0FBYWIsSUFBYSxpQkFBaUIseUJBQTlCLE1BQWEsaUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsb0JBQXlCO1FBQ3RDLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQWlCO1lBQzNCLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVBZLGlCQUFpQjtJQVY3QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxxQkFBWTtZQUNaLG1CQUFXO1lBQ1gsdUJBQWdCO1NBQ2pCO1FBQ0QsWUFBWSxFQUFFLEVBQUU7UUFDaEIsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUUsUUFBUTtLQUNwQixDQUFDO0dBQ1csaUJBQWlCLENBTzdCO0FBUFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IFRyZWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhbGV0dGVTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZVV0aWxzU2VydmljZSB9IGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRpY0RhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zdGF0aWMtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVzZXJpZXNTZXJ2aWNlIH0gZnJvbSAnLi90aW1lc2VyaWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wb2ludC1zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdmFpbGFibGVEYXRlc1NlcnZpY2UgfSBmcm9tICcuL2F2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhdGFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UgfSBmcm9tICcuL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgV01TU2VydmljZSB9IGZyb20gJy4vd21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb2plY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL3RyZWUnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvYWN0aW9ucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vd21zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wcm9qZWN0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtdmlldy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJwb2xhdGlvbi5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wb2ludC1zZWxlY3Rpb24uc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wYWxldHRlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0aWMtZGF0YS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdGltZXNlcmllcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdHJlZS1maWx0ZXIuc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vcGFyc2luZy9jc3YnO1xuXG5jb25zdCBzZXJ2aWNlcyA9IFtcbiAgLy8kc2VydmljZUxpc3RcbiAgQXZhaWxhYmxlRGF0ZXNTZXJ2aWNlLFxuICBQb2ludFNlbGVjdGlvblNlcnZpY2UsXG4gIFRpbWVzZXJpZXNTZXJ2aWNlLFxuICBTdGF0aWNEYXRhU2VydmljZSxcbiAgTWV0YWRhdGFTZXJ2aWNlLFxuICBPcGVuZGFwU2VydmljZSxcbiAgUGFsZXR0ZVNlcnZpY2UsXG4gIFRpbWVVdGlsc1NlcnZpY2UsXG4gIFdNU1NlcnZpY2UsXG4gIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLFxuICBQcm9qZWN0aW9uU2VydmljZSxcbiAgQ2F0YWxvZ1NlcnZpY2UsXG4gIFRyZWVGaWx0ZXJTZXJ2aWNlXG5dO1xuXG4vL2ltcG9ydCB7IENTVlNlcnZpY2UgfSBmcm9tICcuL3NyYy9jc3Yuc2VydmljZSc7XG5cbi8vJGltcG9ydExpc3RcblxuLy8kZXhwb3J0TGlzdFxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBzZXJ2aWNlc1xufSlcbmV4cG9ydCBjbGFzcyBNYXBXYWxkQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1vZHVsZUluaXRpYWxpc2F0aW9uOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hcFdhbGRDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBzZXJ2aWNlc1xuICAgIH07XG4gIH1cbn1cblxuIl19