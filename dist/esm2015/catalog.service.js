import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalog } from './data/catalog';
import { tap, map } from 'rxjs/operators';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';
let CatalogService = class CatalogService {
    constructor(_http, metadata) {
        this._http = _http;
        this.metadata = metadata;
    }
    load(catalogJSON) {
        this.current = new Catalog(catalogJSON);
        this.current.allLayers().filter(l => l.options.smallExtent).forEach(l => {
            l.spatialExtent = this.findExtentOfLayer(l);
        });
    }
    loadFrom(path) {
        return this._http.get(path).pipe(tap(json => this.load(json)), map(_ => this.current));
        //   var result = new Promise<Catalog>((res,rej)=>{
        //     this._http.get(path).subscribe(json=>{
        //       this.load(json);
        //       res(this.current);
        //     });
        //   });
        // return from(result);
    }
    findExtentOfLayer(l) {
        const tmp = new MappedLayer();
        tmp.layer = l;
        tmp.update();
        return this.metadata.getSpatialExtent(tmp);
    }
};
CatalogService.ctorParameters = () => [
    { type: HttpClient },
    { type: MetadataService }
];
CatalogService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient, MetadataService])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUd6QixZQUFvQixLQUFnQixFQUFVLFFBQXdCO1FBQWxELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUN0RSxDQUFDO0lBRUQsSUFBSSxDQUFDLFdBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ25FLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFCLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXhCLG1EQUFtRDtRQUNuRCw2Q0FBNkM7UUFDN0MseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQixVQUFVO1FBQ1YsUUFBUTtRQUVSLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsQ0FBUTtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRixDQUFBOztZQWhDMkIsVUFBVTtZQUFtQixlQUFlOztBQUgzRCxjQUFjO0lBRDFCLFVBQVUsRUFBRTs2Q0FJZSxVQUFVLEVBQW1CLGVBQWU7R0FIM0QsY0FBYyxDQW1DMUI7U0FuQ1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nLCBMYXllciB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcbiAgY3VycmVudDpDYXRhbG9nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cENsaWVudCwgcHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2Upe1xuICB9XG5cbiAgbG9hZChjYXRhbG9nSlNPTjphbnkpe1xuICAgIHRoaXMuY3VycmVudCA9IG5ldyBDYXRhbG9nKGNhdGFsb2dKU09OKTtcblxuICAgIHRoaXMuY3VycmVudC5hbGxMYXllcnMoKS5maWx0ZXIobD0+bC5vcHRpb25zLnNtYWxsRXh0ZW50KS5mb3JFYWNoKGw9PntcbiAgICAgIGwuc3BhdGlhbEV4dGVudCA9IHRoaXMuZmluZEV4dGVudE9mTGF5ZXIobClcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGcm9tKHBhdGg6c3RyaW5nKTpPYnNlcnZhYmxlPENhdGFsb2c+e1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoKS5waXBlKFxuICAgICAgdGFwKGpzb249PnRoaXMubG9hZChqc29uKSksXG4gICAgICBtYXAoXz0+dGhpcy5jdXJyZW50KSk7XG5cbiAgICAvLyAgIHZhciByZXN1bHQgPSBuZXcgUHJvbWlzZTxDYXRhbG9nPigocmVzLHJlaik9PntcbiAgICAvLyAgICAgdGhpcy5faHR0cC5nZXQocGF0aCkuc3Vic2NyaWJlKGpzb249PntcbiAgICAvLyAgICAgICB0aGlzLmxvYWQoanNvbik7XG4gICAgLy8gICAgICAgcmVzKHRoaXMuY3VycmVudCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG5cbiAgICAvLyByZXR1cm4gZnJvbShyZXN1bHQpO1xuICB9XG5cbiAgZmluZEV4dGVudE9mTGF5ZXIobDogTGF5ZXIpOk9ic2VydmFibGU8Qm91bmRzPntcbiAgICBjb25zdCB0bXAgPSBuZXcgTWFwcGVkTGF5ZXIoKTtcbiAgICB0bXAubGF5ZXIgPSBsO1xuICAgIHRtcC51cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5nZXRTcGF0aWFsRXh0ZW50KHRtcCk7XG4gIH1cbn1cbiJdfQ==