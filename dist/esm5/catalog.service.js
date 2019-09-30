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
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient, MetadataService])
    ], CatalogService);
    return CatalogService;
}());
export { CatalogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHckQ7SUFHRSx3QkFBb0IsS0FBZ0IsRUFBVSxRQUF3QjtRQUFsRCxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBZ0I7SUFDdEUsQ0FBQztJQUVELDZCQUFJLEdBQUosVUFBSyxXQUFlO1FBQXBCLGlCQU1DO1FBTEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFyQixDQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNqRSxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBVztRQUFwQixpQkFhQztRQVpDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUMxQixHQUFHLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFaLENBQVksQ0FBQyxDQUFDLENBQUM7UUFFeEIsbURBQW1EO1FBQ25ELDZDQUE2QztRQUM3Qyx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixRQUFRO1FBRVIsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsQ0FBUTtRQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2dCQS9CeUIsVUFBVTtnQkFBbUIsZUFBZTs7SUFIM0QsY0FBYztRQUQxQixVQUFVLEVBQUU7aURBSWUsVUFBVSxFQUFtQixlQUFlO09BSDNELGNBQWMsQ0FtQzFCO0lBQUQscUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQW5DWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENhdGFsb2csIExheWVyIH0gZnJvbSAnLi9kYXRhL2NhdGFsb2cnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCb3VuZHMgfSBmcm9tICcuL2RhdGEvYm91bmRzJztcbmltcG9ydCB7IE1hcHBlZExheWVyIH0gZnJvbSAnLi9kYXRhL21hcHBlZC1sYXllcic7XG5pbXBvcnQgeyBNZXRhZGF0YVNlcnZpY2UgfSBmcm9tICcuL21ldGFkYXRhLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2F0YWxvZ1NlcnZpY2Uge1xuICBjdXJyZW50OkNhdGFsb2c7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDpIdHRwQ2xpZW50LCBwcml2YXRlIG1ldGFkYXRhOk1ldGFkYXRhU2VydmljZSl7XG4gIH1cblxuICBsb2FkKGNhdGFsb2dKU09OOmFueSl7XG4gICAgdGhpcy5jdXJyZW50ID0gbmV3IENhdGFsb2coY2F0YWxvZ0pTT04pO1xuXG4gICAgdGhpcy5jdXJyZW50LmFsbExheWVycygpLmZpbHRlcihsPT5sLm9wdGlvbnMuc21hbGxFeHRlbnQpLmZvckVhY2gobD0+e1xuICAgICAgbC5zcGF0aWFsRXh0ZW50ID0gdGhpcy5maW5kRXh0ZW50T2ZMYXllcihsKVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZEZyb20ocGF0aDpzdHJpbmcpOk9ic2VydmFibGU8Q2F0YWxvZz57XG4gICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgpLnBpcGUoXG4gICAgICB0YXAoanNvbj0+dGhpcy5sb2FkKGpzb24pKSxcbiAgICAgIG1hcChfPT50aGlzLmN1cnJlbnQpKTtcblxuICAgIC8vICAgdmFyIHJlc3VsdCA9IG5ldyBQcm9taXNlPENhdGFsb2c+KChyZXMscmVqKT0+e1xuICAgIC8vICAgICB0aGlzLl9odHRwLmdldChwYXRoKS5zdWJzY3JpYmUoanNvbj0+e1xuICAgIC8vICAgICAgIHRoaXMubG9hZChqc29uKTtcbiAgICAvLyAgICAgICByZXModGhpcy5jdXJyZW50KTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9KTtcblxuICAgIC8vIHJldHVybiBmcm9tKHJlc3VsdCk7XG4gIH1cblxuICBmaW5kRXh0ZW50T2ZMYXllcihsOiBMYXllcik6T2JzZXJ2YWJsZTxCb3VuZHM+e1xuICAgIGNvbnN0IHRtcCA9IG5ldyBNYXBwZWRMYXllcigpO1xuICAgIHRtcC5sYXllciA9IGw7XG4gICAgdG1wLnVwZGF0ZSgpO1xuICAgIHJldHVybiB0aGlzLm1ldGFkYXRhLmdldFNwYXRpYWxFeHRlbnQodG1wKTtcbiAgfVxufVxuIl19