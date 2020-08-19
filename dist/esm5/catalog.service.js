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
    CatalogService.decorators = [
        { type: Injectable }
    ];
    CatalogService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: MetadataService }
    ]; };
    return CatalogService;
}());
export { CatalogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBUyxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRDtJQUlFLHdCQUFvQixLQUFnQixFQUFVLFFBQXdCO1FBQWxELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUN0RSxDQUFDO0lBRUQsNkJBQUksR0FBSixVQUFLLFdBQWU7UUFBcEIsaUJBTUM7UUFMQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFFLE9BQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBUyxJQUFXO1FBQXBCLGlCQWFDO1FBWkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQzlCLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBRSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLEVBQzFCLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBRSxPQUFBLEtBQUksQ0FBQyxPQUFPLEVBQVosQ0FBWSxDQUFDLENBQUMsQ0FBQztRQUV4QixtREFBbUQ7UUFDbkQsNkNBQTZDO1FBQzdDLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IsVUFBVTtRQUNWLFFBQVE7UUFFUix1QkFBdUI7SUFDekIsQ0FBQztJQUVELDBDQUFpQixHQUFqQixVQUFrQixDQUFRO1FBQ3hCLElBQU0sR0FBRyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Z0JBL0J5QixVQUFVO2dCQUFtQixlQUFlOzs7Z0JBSnZFLFVBQVU7OztnQkFSRixVQUFVO2dCQU1WLGVBQWU7O0lBc0N4QixxQkFBQztDQUFBLEFBcENELElBb0NDO1NBbkNZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ2F0YWxvZywgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU2VydmljZSB7XG4gIGN1cnJlbnQ6Q2F0YWxvZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHBDbGllbnQsIHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKXtcbiAgfVxuXG4gIGxvYWQoY2F0YWxvZ0pTT046YW55KXtcbiAgICB0aGlzLmN1cnJlbnQgPSBuZXcgQ2F0YWxvZyhjYXRhbG9nSlNPTik7XG5cbiAgICB0aGlzLmN1cnJlbnQuYWxsTGF5ZXJzKCkuZmlsdGVyKGw9Pmwub3B0aW9ucy5zbWFsbEV4dGVudCkuZm9yRWFjaChsPT57XG4gICAgICBsLnNwYXRpYWxFeHRlbnQgPSB0aGlzLmZpbmRFeHRlbnRPZkxheWVyKGwpXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRnJvbShwYXRoOnN0cmluZyk6T2JzZXJ2YWJsZTxDYXRhbG9nPntcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCkucGlwZShcbiAgICAgIHRhcChqc29uPT50aGlzLmxvYWQoanNvbikpLFxuICAgICAgbWFwKF89PnRoaXMuY3VycmVudCkpO1xuXG4gICAgLy8gICB2YXIgcmVzdWx0ID0gbmV3IFByb21pc2U8Q2F0YWxvZz4oKHJlcyxyZWopPT57XG4gICAgLy8gICAgIHRoaXMuX2h0dHAuZ2V0KHBhdGgpLnN1YnNjcmliZShqc29uPT57XG4gICAgLy8gICAgICAgdGhpcy5sb2FkKGpzb24pO1xuICAgIC8vICAgICAgIHJlcyh0aGlzLmN1cnJlbnQpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIGZyb20ocmVzdWx0KTtcbiAgfVxuXG4gIGZpbmRFeHRlbnRPZkxheWVyKGw6IExheWVyKTpPYnNlcnZhYmxlPEJvdW5kcz57XG4gICAgY29uc3QgdG1wID0gbmV3IE1hcHBlZExheWVyKCk7XG4gICAgdG1wLmxheWVyID0gbDtcbiAgICB0bXAudXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZ2V0U3BhdGlhbEV4dGVudCh0bXApO1xuICB9XG59XG4iXX0=