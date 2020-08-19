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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFekQsY0FBYyxnQkFBZ0IsQ0FBQztBQUMvQixjQUFjLHFCQUFxQixDQUFDO0FBQ3BDLGNBQWMsYUFBYSxDQUFDO0FBQzVCLGNBQWMsZUFBZSxDQUFDO0FBQzlCLGNBQWMsZ0JBQWdCLENBQUM7QUFFL0IsY0FBYyxlQUFlLENBQUM7QUFDOUIsY0FBYyxzQkFBc0IsQ0FBQztBQUNyQyxjQUFjLG9CQUFvQixDQUFDO0FBQ25DLGNBQWMseUJBQXlCLENBQUM7QUFDeEMsY0FBYywyQkFBMkIsQ0FBQztBQUMxQyxjQUFjLDJCQUEyQixDQUFDO0FBQzFDLGNBQWMsb0JBQW9CLENBQUM7QUFDbkMsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLG1CQUFtQixDQUFDO0FBQ2xDLGNBQWMsdUJBQXVCLENBQUM7QUFDdEMsY0FBYyxtQkFBbUIsQ0FBQztBQUNsQyxjQUFjLHNCQUFzQixDQUFDO0FBQ3JDLGNBQWMsc0JBQXNCLENBQUM7QUFDckMsY0FBYyx1QkFBdUIsQ0FBQztBQUV0QyxjQUFjLGVBQWUsQ0FBQztBQUU5QixNQUFNLFFBQVEsR0FBRztJQUNmLGNBQWM7SUFDZCxxQkFBcUI7SUFDckIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLGNBQWM7SUFDZCxjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxpQkFBaUI7Q0FDbEIsQ0FBQztBQUVGLGlEQUFpRDtBQUVqRCxhQUFhO0FBRWIsYUFBYTtBQWFiLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBeUI7UUFDdEMsT0FBTztZQUNMLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQztJQUNKLENBQUM7OztZQWhCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxnQkFBZ0I7aUJBQ2pCO2dCQUNELFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsUUFBUTthQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBUcmVlRmlsdGVyU2VydmljZSB9IGZyb20gJy4vdHJlZS1maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQYWxldHRlU2VydmljZSB9IGZyb20gJy4vcGFsZXR0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFRpbWVVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBTdGF0aWNEYXRhU2VydmljZSB9IGZyb20gJy4vc3RhdGljLWRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3BlbmRhcFNlcnZpY2UgfSBmcm9tICcuL29wZW5kYXAuc2VydmljZSc7XG5pbXBvcnQgeyBUaW1lc2VyaWVzU2VydmljZSB9IGZyb20gJy4vdGltZXNlcmllcy5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50U2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4vcG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXZhaWxhYmxlRGF0ZXNTZXJ2aWNlIH0gZnJvbSAnLi9hdmFpbGFibGUtZGF0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBDYXRhbG9nU2VydmljZSB9IGZyb20gJy4vY2F0YWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IE1hcFZpZXdQYXJhbWV0ZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXAtdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IFdNU1NlcnZpY2UgfSBmcm9tICcuL3dtcy5zZXJ2aWNlJztcbmltcG9ydCB7IFByb2plY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9wcm9qZWN0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS90cmVlJztcbmV4cG9ydCAqIGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuZXhwb3J0ICogZnJvbSAnLi9kYXRhL2FjdGlvbnMnO1xuXG5leHBvcnQgKiBmcm9tICcuL3dtcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vcHJvamVjdGlvbi5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbWFwLXZpZXcuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2ludGVycG9sYXRpb24uc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL2F2YWlsYWJsZS1kYXRlcy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vcG9pbnQtc2VsZWN0aW9uLnNlcnZpY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vY2F0YWxvZy5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vcGFsZXR0ZS5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vc3RhdGljLWRhdGEuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL29wZW5kYXAuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3RpbWVzZXJpZXMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3RpbWUtdXRpbHMuc2VydmljZSc7XG5leHBvcnQgKiBmcm9tICcuL3RyZWUtZmlsdGVyLnNlcnZpY2UnO1xuXG5leHBvcnQgKiBmcm9tICcuL3BhcnNpbmcvY3N2JztcblxuY29uc3Qgc2VydmljZXMgPSBbXG4gIC8vJHNlcnZpY2VMaXN0XG4gIEF2YWlsYWJsZURhdGVzU2VydmljZSxcbiAgUG9pbnRTZWxlY3Rpb25TZXJ2aWNlLFxuICBUaW1lc2VyaWVzU2VydmljZSxcbiAgU3RhdGljRGF0YVNlcnZpY2UsXG4gIE1ldGFkYXRhU2VydmljZSxcbiAgT3BlbmRhcFNlcnZpY2UsXG4gIFBhbGV0dGVTZXJ2aWNlLFxuICBUaW1lVXRpbHNTZXJ2aWNlLFxuICBXTVNTZXJ2aWNlLFxuICBNYXBWaWV3UGFyYW1ldGVyU2VydmljZSxcbiAgUHJvamVjdGlvblNlcnZpY2UsXG4gIENhdGFsb2dTZXJ2aWNlLFxuICBUcmVlRmlsdGVyU2VydmljZVxuXTtcblxuLy9pbXBvcnQgeyBDU1ZTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvY3N2LnNlcnZpY2UnO1xuXG4vLyRpbXBvcnRMaXN0XG5cbi8vJGV4cG9ydExpc3RcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogc2VydmljZXNcbn0pXG5leHBvcnQgY2xhc3MgTWFwV2FsZENvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChtb2R1bGVJbml0aWFsaXNhdGlvbjogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVyczxNYXBXYWxkQ29yZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTWFwV2FsZENvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IHNlcnZpY2VzXG4gICAgfTtcbiAgfVxufVxuXG4iXX0=