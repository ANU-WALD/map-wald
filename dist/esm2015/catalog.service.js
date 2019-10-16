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
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const catalog_1 = require("./data/catalog");
const operators_1 = require("rxjs/operators");
const mapped_layer_1 = require("./data/mapped-layer");
const metadata_service_1 = require("./metadata.service");
let CatalogService = class CatalogService {
    constructor(_http, metadata) {
        this._http = _http;
        this.metadata = metadata;
    }
    load(catalogJSON) {
        this.current = new catalog_1.Catalog(catalogJSON);
        this.current.allLayers().filter(l => l.options.smallExtent).forEach(l => {
            l.spatialExtent = this.findExtentOfLayer(l);
        });
    }
    loadFrom(path) {
        return this._http.get(path).pipe(operators_1.tap(json => this.load(json)), operators_1.map(_ => this.current));
        //   var result = new Promise<Catalog>((res,rej)=>{
        //     this._http.get(path).subscribe(json=>{
        //       this.load(json);
        //       res(this.current);
        //     });
        //   });
        // return from(result);
    }
    findExtentOfLayer(l) {
        const tmp = new mapped_layer_1.MappedLayer();
        tmp.layer = l;
        tmp.update();
        return this.metadata.getSpatialExtent(tmp);
    }
};
CatalogService.ctorParameters = () => [
    { type: http_1.HttpClient },
    { type: metadata_service_1.MetadataService }
];
CatalogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient, metadata_service_1.MetadataService])
], CatalogService);
exports.CatalogService = CatalogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbWFwLXdhbGQvIiwic291cmNlcyI6WyJjYXRhbG9nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBMkM7QUFDM0MsK0NBQWtEO0FBQ2xELDRDQUFnRDtBQUVoRCw4Q0FBMEM7QUFFMUMsc0RBQWtEO0FBQ2xELHlEQUFxRDtBQUdyRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBR3pCLFlBQW9CLEtBQWdCLEVBQVUsUUFBd0I7UUFBbEQsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFVLGFBQVEsR0FBUixRQUFRLENBQWdCO0lBQ3RFLENBQUM7SUFFRCxJQUFJLENBQUMsV0FBZTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxFQUFFO1lBQ25FLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM5QixlQUFHLENBQUMsSUFBSSxDQUFBLEVBQUUsQ0FBQSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFCLGVBQUcsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXhCLG1EQUFtRDtRQUNuRCw2Q0FBNkM7UUFDN0MseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQixVQUFVO1FBQ1YsUUFBUTtRQUVSLHVCQUF1QjtJQUN6QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsQ0FBUTtRQUN4QixNQUFNLEdBQUcsR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQztRQUM5QixHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0YsQ0FBQTs7WUFoQzJCLGlCQUFVO1lBQW1CLGtDQUFlOztBQUgzRCxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBSWUsaUJBQVUsRUFBbUIsa0NBQWU7R0FIM0QsY0FBYyxDQW1DMUI7QUFuQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ2F0YWxvZywgTGF5ZXIgfSBmcm9tICcuL2RhdGEvY2F0YWxvZyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJvdW5kcyB9IGZyb20gJy4vZGF0YS9ib3VuZHMnO1xuaW1wb3J0IHsgTWFwcGVkTGF5ZXIgfSBmcm9tICcuL2RhdGEvbWFwcGVkLWxheWVyJztcbmltcG9ydCB7IE1ldGFkYXRhU2VydmljZSB9IGZyb20gJy4vbWV0YWRhdGEuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRhbG9nU2VydmljZSB7XG4gIGN1cnJlbnQ6Q2F0YWxvZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHBDbGllbnQsIHByaXZhdGUgbWV0YWRhdGE6TWV0YWRhdGFTZXJ2aWNlKXtcbiAgfVxuXG4gIGxvYWQoY2F0YWxvZ0pTT046YW55KXtcbiAgICB0aGlzLmN1cnJlbnQgPSBuZXcgQ2F0YWxvZyhjYXRhbG9nSlNPTik7XG5cbiAgICB0aGlzLmN1cnJlbnQuYWxsTGF5ZXJzKCkuZmlsdGVyKGw9Pmwub3B0aW9ucy5zbWFsbEV4dGVudCkuZm9yRWFjaChsPT57XG4gICAgICBsLnNwYXRpYWxFeHRlbnQgPSB0aGlzLmZpbmRFeHRlbnRPZkxheWVyKGwpXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRnJvbShwYXRoOnN0cmluZyk6T2JzZXJ2YWJsZTxDYXRhbG9nPntcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCkucGlwZShcbiAgICAgIHRhcChqc29uPT50aGlzLmxvYWQoanNvbikpLFxuICAgICAgbWFwKF89PnRoaXMuY3VycmVudCkpO1xuXG4gICAgLy8gICB2YXIgcmVzdWx0ID0gbmV3IFByb21pc2U8Q2F0YWxvZz4oKHJlcyxyZWopPT57XG4gICAgLy8gICAgIHRoaXMuX2h0dHAuZ2V0KHBhdGgpLnN1YnNjcmliZShqc29uPT57XG4gICAgLy8gICAgICAgdGhpcy5sb2FkKGpzb24pO1xuICAgIC8vICAgICAgIHJlcyh0aGlzLmN1cnJlbnQpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gcmV0dXJuIGZyb20ocmVzdWx0KTtcbiAgfVxuXG4gIGZpbmRFeHRlbnRPZkxheWVyKGw6IExheWVyKTpPYnNlcnZhYmxlPEJvdW5kcz57XG4gICAgY29uc3QgdG1wID0gbmV3IE1hcHBlZExheWVyKCk7XG4gICAgdG1wLmxheWVyID0gbDtcbiAgICB0bXAudXBkYXRlKCk7XG4gICAgcmV0dXJuIHRoaXMubWV0YWRhdGEuZ2V0U3BhdGlhbEV4dGVudCh0bXApO1xuICB9XG59XG4iXX0=