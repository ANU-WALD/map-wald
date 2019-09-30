import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MapWaldCoreModule } from './index-core';
import { MapWaldBootstrapModule } from './index-bootstrap';
export * from './index-core';
export * from './index-bootstrap';
//import { CSVService } from './src/csv.service';
//$importList
//$exportList
export * from './parsing/csv';
let MapWaldModule = class MapWaldModule {
};
MapWaldModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            AgmCoreModule,
            HttpClientModule,
            NgPipesModule,
            NgbModule,
            MapWaldBootstrapModule,
            MapWaldCoreModule
        ],
        declarations: [],
        exports: [],
        providers: []
    })
], MapWaldModule);
export { MapWaldModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUUxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNELGNBQWMsY0FBYyxDQUFDO0FBQzdCLGNBQWMsbUJBQW1CLENBQUM7QUFFbEMsaURBQWlEO0FBRWpELGFBQWE7QUFFYixhQUFhO0FBRWIsY0FBYyxlQUFlLENBQUM7QUFpQjlCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FPekIsQ0FBQTtBQVBZLGFBQWE7SUFmekIsUUFBUSxDQUFDO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsWUFBWTtZQUNaLFdBQVc7WUFDWCxhQUFhO1lBQ2IsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixTQUFTO1lBQ1Qsc0JBQXNCO1lBQ3RCLGlCQUFpQjtTQUNsQjtRQUNELFlBQVksRUFBRSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxFQUFFO1FBQ1gsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDO0dBQ1csYUFBYSxDQU96QjtTQVBZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TmdQaXBlc01vZHVsZX0gZnJvbSAnbmd4LXBpcGVzJztcbmltcG9ydCB7IEFnbUNvcmVNb2R1bGUgfSBmcm9tICdAYWdtL2NvcmUnO1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWFwV2FsZENvcmVNb2R1bGUgfSBmcm9tICcuL2luZGV4LWNvcmUnO1xuaW1wb3J0IHsgTWFwV2FsZEJvb3RzdHJhcE1vZHVsZSB9IGZyb20gJy4vaW5kZXgtYm9vdHN0cmFwJztcblxuZXhwb3J0ICogZnJvbSAnLi9pbmRleC1jb3JlJztcbmV4cG9ydCAqIGZyb20gJy4vaW5kZXgtYm9vdHN0cmFwJztcblxuLy9pbXBvcnQgeyBDU1ZTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvY3N2LnNlcnZpY2UnO1xuXG4vLyRpbXBvcnRMaXN0XG5cbi8vJGV4cG9ydExpc3RcblxuZXhwb3J0ICogZnJvbSAnLi9wYXJzaW5nL2Nzdic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgQWdtQ29yZU1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE5nUGlwZXNNb2R1bGUsXG4gICAgTmdiTW9kdWxlLFxuICAgIE1hcFdhbGRCb290c3RyYXBNb2R1bGUsXG4gICAgTWFwV2FsZENvcmVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogW10sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgTWFwV2FsZE1vZHVsZSB7XG4gIC8vIHN0YXRpYyBmb3JSb290KG1vZHVsZUluaXRpYWxpc2F0aW9uOmFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICBuZ01vZHVsZTogTWFwV2FsZE1vZHVsZSxcbiAgLy8gICAgIHByb3ZpZGVyczogW11cbiAgLy8gICB9O1xuICAvLyB9XG59XG5cbiJdfQ==