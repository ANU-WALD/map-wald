"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var catalog_1 = require("./data/catalog");
var operators_1 = require("rxjs/operators");
var mapped_layer_1 = require("./data/mapped-layer");
var metadata_service_1 = require("./metadata.service");
var CatalogService = /** @class */ (function () {
    function CatalogService(_http, metadata) {
        this._http = _http;
        this.metadata = metadata;
    }
    CatalogService.prototype.load = function (catalogJSON) {
        var _this = this;
        this.current = new catalog_1.Catalog(catalogJSON);
        this.current.allLayers().filter(function (l) { return l.options.smallExtent; }).forEach(function (l) {
            l.spatialExtent = _this.findExtentOfLayer(l);
        });
    };
    CatalogService.prototype.loadFrom = function (path) {
        var _this = this;
        return this._http.get(path).pipe(operators_1.tap(function (json) { return _this.load(json); }), operators_1.map(function (_) { return _this.current; }));
        //   var result = new Promise<Catalog>((res,rej)=>{
        //     this._http.get(path).subscribe(json=>{
        //       this.load(json);
        //       res(this.current);
        //     });
        //   });
        // return from(result);
    };
    CatalogService.prototype.findExtentOfLayer = function (l) {
        var tmp = new mapped_layer_1.MappedLayer();
        tmp.layer = l;
        tmp.update();
        return this.metadata.getSpatialExtent(tmp);
    };
    CatalogService.ctorParameters = function () { return [
        { type: http_1.HttpClient },
        { type: metadata_service_1.MetadataService }
    ]; };
    CatalogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient, metadata_service_1.MetadataService])
    ], CatalogService);
    return CatalogService;
}());
exports.CatalogService = CatalogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQWtEO0FBQ2xELDBDQUFnRDtBQUVoRCw0Q0FBMEM7QUFFMUMsb0RBQWtEO0FBQ2xELHVEQUFxRDtBQUdyRDtJQUdFLHdCQUFvQixLQUFnQixFQUFVLFFBQXdCO1FBQWxELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUN0RSxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFdBQWU7UUFBcEIsaUJBTUM7UUFMQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFyQixDQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNqRSxDQUFDLENBQUMsYUFBYSxHQUFHLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsSUFBVztRQUFwQixpQkFhQztRQVpDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixlQUFHLENBQUMsVUFBQSxJQUFJLElBQUUsT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQyxFQUMxQixlQUFHLENBQUMsVUFBQSxDQUFDLElBQUUsT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFaLENBQVksQ0FBQyxDQUFDLENBQUM7UUFFeEIsbURBQW1EO1FBQ25ELDZDQUE2QztRQUM3Qyx5QkFBeUI7UUFDekIsMkJBQTJCO1FBQzNCLFVBQVU7UUFDVixRQUFRO1FBRVIsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCwwQ0FBaUIsR0FBakIsVUFBa0IsQ0FBUTtRQUN4QixJQUFNLEdBQUcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDOztnQkEvQnlCLGlCQUFVO2dCQUFtQixrQ0FBZTs7SUFIM0QsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUllLGlCQUFVLEVBQW1CLGtDQUFlO09BSDNELGNBQWMsQ0FtQzFCO0lBQUQscUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztBQW5DWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDYXRhbG9nLCBMYXllciB9IGZyb20gJy4vZGF0YS9jYXRhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQm91bmRzIH0gZnJvbSAnLi9kYXRhL2JvdW5kcyc7XG5pbXBvcnQgeyBNYXBwZWRMYXllciB9IGZyb20gJy4vZGF0YS9tYXBwZWQtbGF5ZXInO1xuaW1wb3J0IHsgTWV0YWRhdGFTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhZGF0YS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGFsb2dTZXJ2aWNlIHtcbiAgY3VycmVudDpDYXRhbG9nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cENsaWVudCwgcHJpdmF0ZSBtZXRhZGF0YTpNZXRhZGF0YVNlcnZpY2Upe1xuICB9XG5cbiAgbG9hZChjYXRhbG9nSlNPTjphbnkpe1xuICAgIHRoaXMuY3VycmVudCA9IG5ldyBDYXRhbG9nKGNhdGFsb2dKU09OKTtcblxuICAgIHRoaXMuY3VycmVudC5hbGxMYXllcnMoKS5maWx0ZXIobD0+bC5vcHRpb25zLnNtYWxsRXh0ZW50KS5mb3JFYWNoKGw9PntcbiAgICAgIGwuc3BhdGlhbEV4dGVudCA9IHRoaXMuZmluZEV4dGVudE9mTGF5ZXIobClcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGcm9tKHBhdGg6c3RyaW5nKTpPYnNlcnZhYmxlPENhdGFsb2c+e1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoKS5waXBlKFxuICAgICAgdGFwKGpzb249PnRoaXMubG9hZChqc29uKSksXG4gICAgICBtYXAoXz0+dGhpcy5jdXJyZW50KSk7XG5cbiAgICAvLyAgIHZhciByZXN1bHQgPSBuZXcgUHJvbWlzZTxDYXRhbG9nPigocmVzLHJlaik9PntcbiAgICAvLyAgICAgdGhpcy5faHR0cC5nZXQocGF0aCkuc3Vic2NyaWJlKGpzb249PntcbiAgICAvLyAgICAgICB0aGlzLmxvYWQoanNvbik7XG4gICAgLy8gICAgICAgcmVzKHRoaXMuY3VycmVudCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgfSk7XG5cbiAgICAvLyByZXR1cm4gZnJvbShyZXN1bHQpO1xuICB9XG5cbiAgZmluZEV4dGVudE9mTGF5ZXIobDogTGF5ZXIpOk9ic2VydmFibGU8Qm91bmRzPntcbiAgICBjb25zdCB0bXAgPSBuZXcgTWFwcGVkTGF5ZXIoKTtcbiAgICB0bXAubGF5ZXIgPSBsO1xuICAgIHRtcC51cGRhdGUoKTtcbiAgICByZXR1cm4gdGhpcy5tZXRhZGF0YS5nZXRTcGF0aWFsRXh0ZW50KHRtcCk7XG4gIH1cbn1cbiJdfQ==