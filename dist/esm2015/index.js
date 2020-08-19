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
export * from './data/tree';
export * from './data/bounds';
export * from './data/actions';
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
const services = [
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
export class MapWaldCoreModule {
    static forRoot(moduleInitialisation) {
        return {
            ngModule: MapWaldCoreModule,
            providers: services
        };
    }
}
MapWaldCoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    HttpClientModule
                ],
                declarations: [],
                exports: [],
                providers: services
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxjQUFjLGdCQUFnQixDQUFDO0FBQy9CLGNBQWMscUJBQXFCLENBQUM7QUFDcEMsY0FBYyxhQUFhLENBQUM7QUFDNUIsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxnQkFBZ0IsQ0FBQztBQUUvQixjQUFjLGVBQWUsQ0FBQztBQUM5QixjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyx5QkFBeUIsQ0FBQztBQUN4QyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsMkJBQTJCLENBQUM7QUFDMUMsY0FBYyxvQkFBb0IsQ0FBQztBQUNuQyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsY0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLHVCQUF1QixDQUFDO0FBRXRDLGNBQWMsZUFBZSxDQUFDO0FBRTlCLE1BQU0sUUFBUSxHQUFHO0lBQ2YsY0FBYztJQUNkLHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsY0FBYztJQUNkLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLHVCQUF1QjtJQUN2QixpQkFBaUI7SUFDakIsY0FBYztJQUNkLGlCQUFpQjtDQUNsQixDQUFDO0FBRUYsaURBQWlEO0FBRWpELGFBQWE7QUFFYixhQUFhO0FBYWIsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUF5QjtRQUN0QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDO0lBQ0osQ0FBQzs7O1lBaEJGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixXQUFXO29CQUNYLGdCQUFnQjtpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRSxRQUFRO2FBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IFRyZWVGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi90cmVlLWZpbHRlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhbGV0dGVTZXJ2aWNlIH0gZnJvbSAnLi9wYWxldHRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVGltZVV0aWxzU2VydmljZSB9IGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmltcG9ydCB7IFN0YXRpY0RhdGFTZXJ2aWNlIH0gZnJvbSAnLi9zdGF0aWMtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBPcGVuZGFwU2VydmljZSB9IGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVzZXJpZXNTZXJ2aWNlIH0gZnJvbSAnLi90aW1lc2VyaWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wb2ludC1zZWxlY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBdmFpbGFibGVEYXRlc1NlcnZpY2UgfSBmcm9tICcuL2F2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhdGFsb2dTZXJ2aWNlIH0gZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWFwVmlld1BhcmFtZXRlclNlcnZpY2UgfSBmcm9tICcuL21hcC12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgV01TU2VydmljZSB9IGZyb20gJy4vd21zLnNlcnZpY2UnO1xuaW1wb3J0IHsgUHJvamVjdGlvblNlcnZpY2UgfSBmcm9tICcuL3Byb2plY3Rpb24uc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL3RyZWUnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvYWN0aW9ucyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vd21zLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wcm9qZWN0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9tYXAtdmlldy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJwb2xhdGlvbi5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vYXZhaWxhYmxlLWRhdGVzLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wb2ludC1zZWxlY3Rpb24uc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jYXRhbG9nLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9wYWxldHRlLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9zdGF0aWMtZGF0YS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vb3BlbmRhcC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdGltZXNlcmllcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdGltZS11dGlscy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vdHJlZS1maWx0ZXIuc2VydmljZSc7XG5cbmV4cG9ydCAqIGZyb20gJy4vcGFyc2luZy9jc3YnO1xuXG5jb25zdCBzZXJ2aWNlcyA9IFtcbiAgLy8kc2VydmljZUxpc3RcbiAgQXZhaWxhYmxlRGF0ZXNTZXJ2aWNlLFxuICBQb2ludFNlbGVjdGlvblNlcnZpY2UsXG4gIFRpbWVzZXJpZXNTZXJ2aWNlLFxuICBTdGF0aWNEYXRhU2VydmljZSxcbiAgTWV0YWRhdGFTZXJ2aWNlLFxuICBPcGVuZGFwU2VydmljZSxcbiAgUGFsZXR0ZVNlcnZpY2UsXG4gIFRpbWVVdGlsc1NlcnZpY2UsXG4gIFdNU1NlcnZpY2UsXG4gIE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlLFxuICBQcm9qZWN0aW9uU2VydmljZSxcbiAgQ2F0YWxvZ1NlcnZpY2UsXG4gIFRyZWVGaWx0ZXJTZXJ2aWNlXG5dO1xuXG4vL2ltcG9ydCB7IENTVlNlcnZpY2UgfSBmcm9tICcuL3NyYy9jc3Yuc2VydmljZSc7XG5cbi8vJGltcG9ydExpc3RcblxuLy8kZXhwb3J0TGlzdFxuXG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXSxcbiAgcHJvdmlkZXJzOiBzZXJ2aWNlc1xufSlcbmV4cG9ydCBjbGFzcyBNYXBXYWxkQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KG1vZHVsZUluaXRpYWxpc2F0aW9uOiBhbnkpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hcFdhbGRDb3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXBXYWxkQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogc2VydmljZXNcbiAgICB9O1xuICB9XG59XG5cbiJdfQ==