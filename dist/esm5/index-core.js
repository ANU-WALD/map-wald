import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
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
import { GeocodingService } from './geocoding.service';
import { ProjectionService } from './projection.service';
export * from './data/catalog';
export * from './data/mapped-layer';
export * from './wms.service';
export * from './projection.service';
export * from './map-view.service';
export * from './geocoding.service';
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
export var services = [
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
    GeocodingService,
    CatalogService,
    TreeFilterService
];
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
                AgmCoreModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtY29yZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL21hcC13YWxkLyIsInNvdXJjZXMiOlsiaW5kZXgtY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELGNBQWMsZ0JBQWdCLENBQUM7QUFDL0IsY0FBYyxxQkFBcUIsQ0FBQztBQUtwQyxjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxxQkFBcUIsQ0FBQztBQUNwQyxjQUFjLHlCQUF5QixDQUFDO0FBQ3hDLGNBQWMsMkJBQTJCLENBQUM7QUFDMUMsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLHNCQUFzQixDQUFDO0FBRXJDLE1BQU0sQ0FBQyxJQUFNLFFBQVEsR0FBRztJQUN0QixjQUFjO0lBQ2QscUJBQXFCO0lBQ3JCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixjQUFjO0lBQ2QsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixVQUFVO0lBQ1YsdUJBQXVCO0lBQ3ZCLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGlCQUFpQjtDQUNsQixDQUFDO0FBY0Y7SUFBQTtJQU9BLENBQUM7MEJBUFksaUJBQWlCO0lBQ3JCLHlCQUFPLEdBQWQsVUFBZSxvQkFBeUI7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBaUI7WUFDM0IsU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQztJQUNKLENBQUM7O0lBTlUsaUJBQWlCO1FBWDdCLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLFdBQVc7Z0JBQ1gsYUFBYTtnQkFDYixnQkFBZ0I7YUFDakI7WUFDRCxZQUFZLEVBQUUsRUFBRTtZQUNoQixPQUFPLEVBQUUsRUFBRTtZQUNYLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7T0FDVyxpQkFBaUIsQ0FPN0I7SUFBRCx3QkFBQztDQUFBLEFBUEQsSUFPQztTQVBZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQWdtQ29yZU1vZHVsZSB9IGZyb20gJ0BhZ20vY29yZSc7XG5cbmltcG9ydCB7IFRyZWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhbGV0dGVTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZVV0aWxzU2VydmljZSB9IGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRpY0RhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zdGF0aWMtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVzZXJpZXNTZXJ2aWNlIH0gZnJvbSAnLi90aW1lc2VyaWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wb2ludC1zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdmFpbGFibGVEYXRlc1NlcnZpY2UgfSBmcm9tICcuL2F2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhdGFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UgfSBmcm9tICcuL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgV01TU2VydmljZSB9IGZyb20gJy4vd21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2VvY29kaW5nU2VydmljZSB9IGZyb20gJy4vZ2VvY29kaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb2plY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL3RyZWUnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvYWN0aW9ucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vd21zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wcm9qZWN0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtdmlldy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vZ2VvY29kaW5nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcnBvbGF0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9hdmFpbGFibGUtZGF0ZXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3BvaW50LXNlbGVjdGlvbi5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2NhdGFsb2cuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3BhbGV0dGUuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3N0YXRpYy1kYXRhLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9vcGVuZGFwLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi90aW1lc2VyaWVzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi90aW1lLXV0aWxzLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3Qgc2VydmljZXMgPSBbXG4gIC8vJHNlcnZpY2VMaXN0XG4gIEF2YWlsYWJsZURhdGVzU2VydmljZSxcbiAgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlLFxuICBUaW1lc2VyaWVzU2VydmljZSxcbiAgU3RhdGljRGF0YVNlcnZpY2UsXG4gIE1ldGFkYXRhU2VydmljZSxcbiAgT3BlbmRhcFNlcnZpY2UsXG4gIFBhbGV0dGVTZXJ2aWNlLFxuICBUaW1lVXRpbHNTZXJ2aWNlLFxuICBXTVNTZXJ2aWNlLFxuICBNYXBWaWV3UGFyYW1ldGVyU2VydmljZSxcbiAgUHJvamVjdGlvblNlcnZpY2UsXG4gIEdlb2NvZGluZ1NlcnZpY2UsXG4gIENhdGFsb2dTZXJ2aWNlLFxuICBUcmVlRmlsdGVyU2VydmljZVxuXTtcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEFnbUNvcmVNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBzZXJ2aWNlc1xufSlcbmV4cG9ydCBjbGFzcyBNYXBXYWxkQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1vZHVsZUluaXRpYWxpc2F0aW9uOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1hcFdhbGRDb3JlTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBzZXJ2aWNlc1xuICAgIH07XG4gIH1cbn1cblxuIl19