import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TreeFilterService } from './tree-filter.service';
import { PaletteService } from './palette.service';
import { TimeUtilsService } from './time-utils.service';
import { StaticDataService } from './static-data.service';
import { MetadataService } from './metadata.service';
import { OpendapService } from './opendap.service';
import { TimeseriesService } from './timeseries.service';
import { PointSelectionService } from './point-selection.service';
import { AvailableDatesService } from './available-dates.service';
import { CatalogService } from './catalog.service';
import { MapViewParameterService } from './map-view.service';
import { WMSService } from './wms.service';
import { ProjectionService } from './projection.service';
export * from './data/catalog';
export * from './data/mapped-layer';
export * from './wms.service';
export * from './projection.service';
export * from './map-view.service';
export * from './interpolation.service';
export * from './available-dates.service';
export * from './point-selection.service';
export * from './metadata.service';
export * from './catalog.service';
export * from './palette.service';
export * from './static-data.service';
export * from './opendap.service';
export * from './timeseries.service';
export * from './time-utils.service';
export * from './tree-filter.service';
export * from './parsing/csv';
var services = [
    //$serviceList
    AvailableDatesService,
    PointSelectionService,
    TimeseriesService,
    StaticDataService,
    MetadataService,
    OpendapService,
    PaletteService,
    TimeUtilsService,
    WMSService,
    MapViewParameterService,
    ProjectionService,
    CatalogService,
    TreeFilterService
];
//import { CSVService } from './src/csv.service';
//$importList
//$exportList
var MapWaldCoreModule = /** @class */ (function () {
    function MapWaldCoreModule() {
    }
    MapWaldCoreModule_1 = MapWaldCoreModule;
    MapWaldCoreModule.forRoot = function (moduleInitialisation) {
        return {
            ngModule: MapWaldCoreModule_1,
            providers: services
        };
    };
    var MapWaldCoreModule_1;
    MapWaldCoreModule = MapWaldCoreModule_1 = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                HttpClientModule
            ],
            declarations: [],
            exports: [],
            providers: services
        })
    ], MapWaldCoreModule);
    return MapWaldCoreModule;
}());
export { MapWaldCoreModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxxQkFBcUIsQ0FBQztBQUtwQyxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyx5QkFBeUIsQ0FBQztBQUN4QyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsMkJBQTJCLENBQUM7QUFDMUMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLHVCQUF1QixDQUFDO0FBRXRDLGNBQWMsZUFBZSxDQUFDO0FBRTlCLElBQU0sUUFBUSxHQUFHO0lBQ2YsY0FBYztJQUNkLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsY0FBYztJQUNkLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLHVCQUF1QjtJQUN2QixpQkFBaUI7SUFDakIsY0FBYztJQUNkLGlCQUFpQjtDQUNsQixDQUFDO0FBRUYsaURBQWlEO0FBRWpELGFBQWE7QUFFYixhQUFhO0FBYWI7SUFBQTtJQU9BLENBQUM7MEJBUFksaUJBQWlCO0lBQ3JCLHlCQUFPLEdBQWQsVUFBZSxvQkFBeUI7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQztJQUNKLENBQUM7O0lBTlUsaUJBQWlCO1FBVjdCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsZ0JBQWdCO2FBQ2pCO1lBQ0QsWUFBWSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxFQUFFLEVBQUU7WUFDWCxTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDO09BQ1csaUJBQWlCLENBTzdCO0lBQUQsd0JBQUM7Q0FBQSxBQVBELElBT0M7U0FQWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgVHJlZUZpbHRlclNlcnZpY2UgfSBmcm9tICcuL3RyZWUtZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFsZXR0ZVNlcnZpY2UgfSBmcm9tICcuL3BhbGV0dGUuc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi90aW1lLXV0aWxzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGljRGF0YVNlcnZpY2UgfSBmcm9tICcuL3N0YXRpYy1kYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE9wZW5kYXBTZXJ2aWNlIH0gZnJvbSAnLi9vcGVuZGFwLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZXNlcmllc1NlcnZpY2UgfSBmcm9tICcuL3RpbWVzZXJpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBQb2ludFNlbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3BvaW50LXNlbGVjdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEF2YWlsYWJsZURhdGVzU2VydmljZSB9IGZyb20gJy4vYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2F0YWxvZ1NlcnZpY2UgfSBmcm9tICcuL2NhdGFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBNYXBWaWV3UGFyYW1ldGVyU2VydmljZSB9IGZyb20gJy4vbWFwLXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBXTVNTZXJ2aWNlIH0gZnJvbSAnLi93bXMuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9qZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcHJvamVjdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL21hcHBlZC1sYXllcic7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvdHJlZSc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvYm91bmRzJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9hY3Rpb25zJztcblxuZXhwb3J0ICogZnJvbSAnLi93bXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3Byb2plY3Rpb24uc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL21hcC12aWV3LnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcnBvbGF0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hdmFpbGFibGUtZGF0ZXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3BvaW50LXNlbGVjdGlvbi5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2NhdGFsb2cuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3BhbGV0dGUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3N0YXRpYy1kYXRhLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9vcGVuZGFwLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi90aW1lc2VyaWVzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi90aW1lLXV0aWxzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi90cmVlLWZpbHRlci5zZXJ2aWNlJztcblxuZXhwb3J0ICogZnJvbSAnLi9wYXJzaW5nL2Nzdic7XG5cbmNvbnN0IHNlcnZpY2VzID0gW1xuICAvLyRzZXJ2aWNlTGlzdFxuICBBdmFpbGFibGVEYXRlc1NlcnZpY2UsXG4gIFBvaW50U2VsZWN0aW9uU2VydmljZSxcbiAgVGltZXNlcmllc1NlcnZpY2UsXG4gIFN0YXRpY0RhdGFTZXJ2aWNlLFxuICBNZXRhZGF0YVNlcnZpY2UsXG4gIE9wZW5kYXBTZXJ2aWNlLFxuICBQYWxldHRlU2VydmljZSxcbiAgVGltZVV0aWxzU2VydmljZSxcbiAgV01TU2VydmljZSxcbiAgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UsXG4gIFByb2plY3Rpb25TZXJ2aWNlLFxuICBDYXRhbG9nU2VydmljZSxcbiAgVHJlZUZpbHRlclNlcnZpY2Vcbl07XG5cbi8vaW1wb3J0IHsgQ1NWU2VydmljZSB9IGZyb20gJy4vc3JjL2Nzdi5zZXJ2aWNlJztcblxuLy8kaW1wb3J0TGlzdFxuXG4vLyRleHBvcnRMaXN0XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IHNlcnZpY2VzXG59KVxuZXhwb3J0IGNsYXNzIE1hcFdhbGRDb3JlTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QobW9kdWxlSW5pdGlhbGlzYXRpb246IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFwV2FsZENvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IHNlcnZpY2VzXG4gICAgfTtcbiAgfVxufVxuXG4iXX0=