import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { from } from 'rxjs';
var GeocodingService = /** @class */ (function () {
    function GeocodingService(_api) {
        this._api = _api;
    }
    GeocodingService.prototype.geocode = function (address, bnds) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this._api.load().then(function () {
                var service = new google.maps.Geocoder();
                service.geocode({
                    address: address,
                    componentRestrictions: {
                        country: 'AU'
                    },
                    region: 'AU'
                }, function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK) {
                        reject();
                    }
                    else {
                        resolve(results.filter(function (r) {
                            return r.formatted_address !== 'Australia';
                        }));
                    }
                });
            });
        });
        return from(promise);
    };
    GeocodingService.ctorParameters = function () { return [
        { type: MapsAPILoader }
    ]; };
    GeocodingService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [MapsAPILoader])
    ], GeocodingService);
    return GeocodingService;
}());
export { GeocodingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImdlb2NvZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFhLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUt0QztJQUNFLDBCQUFvQixJQUFrQjtRQUFsQixTQUFJLEdBQUosSUFBSSxDQUFjO0lBRXRDLENBQUM7SUFFRCxrQ0FBTyxHQUFQLFVBQVEsT0FBYyxFQUFDLElBQVM7UUFBaEMsaUJBdUJDO1FBdEJDLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFDLE1BQU07WUFDdkMsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDZCxPQUFPLEVBQUMsT0FBTztvQkFDZixxQkFBcUIsRUFBRTt3QkFDckIsT0FBTyxFQUFFLElBQUk7cUJBQ2Q7b0JBQ0QsTUFBTSxFQUFDLElBQUk7aUJBQ1osRUFBQyxVQUFDLE9BQVcsRUFBQyxNQUFVO29CQUN2QixJQUFHLE1BQU0sS0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUM7d0JBQ3hDLE1BQU0sRUFBRSxDQUFDO3FCQUNWO3lCQUFNO3dCQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVMsQ0FBSzs0QkFDbkMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLEtBQUcsV0FBVyxDQUFDO3dCQUMzQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNMO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7O2dCQTNCd0IsYUFBYTs7SUFEM0IsZ0JBQWdCO1FBRDVCLFVBQVUsRUFBRTtpREFFYyxhQUFhO09BRDNCLGdCQUFnQixDQTZCNUI7SUFBRCx1QkFBQztDQUFBLEFBN0JELElBNkJDO1NBN0JZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWFwc0FQSUxvYWRlcn0gZnJvbSAnQGFnbS9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgZnJvbX0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTphbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZW9jb2RpbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXBpOk1hcHNBUElMb2FkZXIpe1xuXG4gIH1cblxuICBnZW9jb2RlKGFkZHJlc3M6c3RyaW5nLGJuZHM/OmFueSk6T2JzZXJ2YWJsZTxhbnk+e1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgdGhpcy5fYXBpLmxvYWQoKS50aGVuKCgpPT57XG4gICAgICAgIHZhciBzZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyKCk7XG4gICAgICAgIHNlcnZpY2UuZ2VvY29kZSh7XG4gICAgICAgICAgYWRkcmVzczphZGRyZXNzLFxuICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge1xuICAgICAgICAgICAgY291bnRyeTogJ0FVJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVnaW9uOidBVSdcbiAgICAgICAgfSwocmVzdWx0czphbnksc3RhdHVzOmFueSk9PntcbiAgICAgICAgICBpZihzdGF0dXMhPT1nb29nbGUubWFwcy5HZW9jb2RlclN0YXR1cy5PSyl7XG4gICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzLmZpbHRlcihmdW5jdGlvbihyOmFueSl7XG4gICAgICAgICAgICAgIHJldHVybiByLmZvcm1hdHRlZF9hZGRyZXNzIT09J0F1c3RyYWxpYSc7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZyb20ocHJvbWlzZSk7XG4gIH1cbn1cbiJdfQ==