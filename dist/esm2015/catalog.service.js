import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalog } from './data/catalog';
import { tap, map } from 'rxjs/operators';
import { MappedLayer } from './data/mapped-layer';
import { MetadataService } from './metadata.service';
export class CatalogService {
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
}
CatalogService.ctorParameters = () => [
    { type: HttpClient },
    { type: MetadataService }
];
CatalogService.decorators = [
    { type: Injectable }
];
CatalogService.ctorParameters = () => [
    { type: HttpClient },
    { type: MetadataService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLE9BQU8sRUFBUyxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdyRCxNQUFNLE9BQU8sY0FBYztJQUd6QixZQUFvQixLQUFnQixFQUFVLFFBQXdCO1FBQWxELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFnQjtJQUN0RSxDQUFDO0lBRUQsSUFBSSxDQUFDLFdBQWU7UUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ25FLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFCLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXhCLG1EQUFtRDtRQUNuRCw2Q0FBNkM7UUFDN0MseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQixVQUFVO1FBQ1YsUUFBUTtRQUVSLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsQ0FBUTtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7OztZQS9CeUIsVUFBVTtZQUFtQixlQUFlOzs7WUFKdkUsVUFBVTs7O1lBUkYsVUFBVTtZQU1WLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ2F0YWxvZywgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU2VydmljZSB7XG4gIGN1cnJlbnQ6Q2F0YWxvZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHBDbGllbnQsIHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKXtcbiAgfVxuXG4gIGxvYWQoY2F0YWxvZ0pTT046YW55KXtcbiAgICB0aGlzLmN1cnJlbnQgPSBuZXcgQ2F0YWxvZyhjYXRhbG9nSlNPTik7XG5cbiAgICB0aGlzLmN1cnJlbnQuYWxsTGF5ZXJzKCkuZmlsdGVyKGw9Pmwub3B0aW9ucy5zbWFsbEV4dGVudCkuZm9yRWFjaChsPT57XG4gICAgICBsLnNwYXRpYWxFeHRlbnQgPSB0aGlzLmZpbmRFeHRlbnRPZkxheWVyKGwpXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRnJvbShwYXRoOnN0cmluZyk6T2JzZXJ2YWJsZTxDYXRhbG9nPntcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCkucGlwZShcbiAgICAgIHRhcChqc29uPT50aGlzLmxvYWQoanNvbikpLFxuICAgICAgbWFwKF89PnRoaXMuY3VycmVudCkpO1xuXG4gICAgLy8gICB2YXIgcmVzdWx0ID0gbmV3IFByb21pc2U8Q2F0YWxvZz4oKHJlcyxyZWopPT57XG4gICAgLy8gICAgIHRoaXMuX2h0dHAuZ2V0KHBhdGgpLnN1YnNjcmliZShqc29uPT57XG4gICAgLy8gICAgICAgdGhpcy5sb2FkKGpzb24pO1xuICAgIC8vICAgICAgIHJlcyh0aGlzLmN1cnJlbnQpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIGZyb20ocmVzdWx0KTtcbiAgfVxuXG4gIGZpbmRFeHRlbnRPZkxheWVyKGw6IExheWVyKTpPYnNlcnZhYmxlPEJvdW5kcz57XG4gICAgY29uc3QgdG1wID0gbmV3IE1hcHBlZExheWVyKCk7XG4gICAgdG1wLmxheWVyID0gbDtcbiAgICB0bXAudXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZ2V0U3BhdGlhbEV4dGVudCh0bXApO1xuICB9XG59XG4iXX0=