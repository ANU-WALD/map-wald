import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalog } from './data/catalog';
import { tap, map } from 'rxjs/operators';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';
var CatalogService = /** @class */ (function () {
    function CatalogService(_http, metadata) {
        this._http = _http;
        this.metadata = metadata;
    }
    CatalogService.prototype.load = function (catalogJSON) {
        var _this = this;
        this.current = new Catalog(catalogJSON);
        this.current.allLayers().filter(function (l) { return l.options.smallExtent; }).forEach(function (l) {
            l.spatialExtent = _this.findExtentOfLayer(l);
        });
    };
    CatalogService.prototype.loadFrom = function (path) {
        var _this = this;
        return this._http.get(path).pipe(tap(function (json) { return _this.load(json); }), map(function (_) { return _this.current; }));
        //   var result = new Promise<Catalog>((res,rej)=>{
        //     this._http.get(path).subscribe(json=>{
        //       this.load(json);
        //       res(this.current);
        //     });
        //   });
        // return from(result);
    };
    CatalogService.prototype.findExtentOfLayer = function (l) {
        var tmp = new MappedLayer();
        tmp.layer = l;
        tmp.update();
        return this.metadata.getSpatialExtent(tmp);
    };
    CatalogService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: MetadataService }
    ]; };
    CatalogService = tslib_1.__decorate([
        Injectable()
    ], CatalogService);
    return CatalogService;
}());
export { CatalogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQ7SUFHRSx3QkFBb0IsS0FBZ0IsRUFBVSxRQUF3QjtRQUFsRCxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFDdEUsQ0FBQztJQUVELDZCQUFJLEdBQUosVUFBSyxXQUFlO1FBQXBCLGlCQU1DO1FBTEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFyQixDQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNqRSxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBVztRQUFwQixpQkFhQztRQVpDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUMxQixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFaLENBQVksQ0FBQyxDQUFDLENBQUM7UUFFeEIsbURBQW1EO1FBQ25ELDZDQUE2QztRQUM3Qyx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixRQUFRO1FBRVIsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsQ0FBUTtRQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2dCQS9CeUIsVUFBVTtnQkFBbUIsZUFBZTs7SUFIM0QsY0FBYztRQUQxQixVQUFVLEVBQUU7T0FDQSxjQUFjLENBbUMxQjtJQUFELHFCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nLCBMYXllciB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcbiAgY3VycmVudDpDYXRhbG9nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cENsaWVudCwgcHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2Upe1xuICB9XG5cbiAgbG9hZChjYXRhbG9nSlNPTjphbnkpe1xuICAgIHRoaXMuY3VycmVudCA9IG5ldyBDYXRhbG9nKGNhdGFsb2dKU09OKTtcblxuICAgIHRoaXMuY3VycmVudC5hbGxMYXllcnMoKS5maWx0ZXIobD0+bC5vcHRpb25zLnNtYWxsRXh0ZW50KS5mb3JFYWNoKGw9PntcbiAgICAgIGwuc3BhdGlhbEV4dGVudCA9IHRoaXMuZmluZEV4dGVudE9mTGF5ZXIobClcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGcm9tKHBhdGg6c3RyaW5nKTpPYnNlcnZhYmxlPENhdGFsb2c+e1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoKS5waXBlKFxuICAgICAgdGFwKGpzb249PnRoaXMubG9hZChqc29uKSksXG4gICAgICBtYXAoXz0+dGhpcy5jdXJyZW50KSk7XG5cbiAgICAvLyAgIHZhciByZXN1bHQgPSBuZXcgUHJvbWlzZTxDYXRhbG9nPigocmVzLHJlaik9PntcbiAgICAvLyAgICAgdGhpcy5faHR0cC5nZXQocGF0aCkuc3Vic2NyaWJlKGpzb249PntcbiAgICAvLyAgICAgICB0aGlzLmxvYWQoanNvbik7XG4gICAgLy8gICAgICAgcmVzKHRoaXMuY3VycmVudCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG5cbiAgICAvLyByZXR1cm4gZnJvbShyZXN1bHQpO1xuICB9XG5cbiAgZmluZEV4dGVudE9mTGF5ZXIobDogTGF5ZXIpOk9ic2VydmFibGU8Qm91bmRzPntcbiAgICBjb25zdCB0bXAgPSBuZXcgTWFwcGVkTGF5ZXIoKTtcbiAgICB0bXAubGF5ZXIgPSBsO1xuICAgIHRtcC51cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5nZXRTcGF0aWFsRXh0ZW50KHRtcCk7XG4gIH1cbn1cbiJdfQ==