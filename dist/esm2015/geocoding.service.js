import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { from } from 'rxjs';
let GeocodingService = class GeocodingService {
    constructor(_api) {
        this._api = _api;
    }
    geocode(address, bnds) {
        var promise = new Promise((resolve, reject) => {
            this._api.load().then(() => {
                var service = new google.maps.Geocoder();
                service.geocode({
                    address: address,
                    componentRestrictions: {
                        country: 'AU'
                    },
                    region: 'AU'
                }, (results, status) => {
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
    }
};
GeocodingService.ctorParameters = () => [
    { type: MapsAPILoader }
];
GeocodingService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [MapsAPILoader])
], GeocodingService);
export { GeocodingService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tYXAtd2FsZC8iLCJzb3VyY2VzIjpbImdlb2NvZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFhLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUt0QyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUMzQixZQUFvQixJQUFrQjtRQUFsQixTQUFJLEdBQUosSUFBSSxDQUFjO0lBRXRDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBYyxFQUFDLElBQVM7UUFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO2dCQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ2QsT0FBTyxFQUFDLE9BQU87b0JBQ2YscUJBQXFCLEVBQUU7d0JBQ3JCLE9BQU8sRUFBRSxJQUFJO3FCQUNkO29CQUNELE1BQU0sRUFBQyxJQUFJO2lCQUNaLEVBQUMsQ0FBQyxPQUFXLEVBQUMsTUFBVSxFQUFDLEVBQUU7b0JBQzFCLElBQUcsTUFBTSxLQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBQzt3QkFDeEMsTUFBTSxFQUFFLENBQUM7cUJBQ1Y7eUJBQU07d0JBQ0wsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBUyxDQUFLOzRCQUNuQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsS0FBRyxXQUFXLENBQUM7d0JBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ0w7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGLENBQUE7O1lBNUIwQixhQUFhOztBQUQzQixnQkFBZ0I7SUFENUIsVUFBVSxFQUFFOzZDQUVjLGFBQWE7R0FEM0IsZ0JBQWdCLENBNkI1QjtTQTdCWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gJ0BhZ20vY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIGZyb219IGZyb20gJ3J4anMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6YW55O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2VvY29kaW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwaTpNYXBzQVBJTG9hZGVyKXtcblxuICB9XG5cbiAgZ2VvY29kZShhZGRyZXNzOnN0cmluZyxibmRzPzphbnkpOk9ic2VydmFibGU8YW55PntcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgIHRoaXMuX2FwaS5sb2FkKCkudGhlbigoKT0+e1xuICAgICAgICB2YXIgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICAgICAgICBzZXJ2aWNlLmdlb2NvZGUoe1xuICAgICAgICAgIGFkZHJlc3M6YWRkcmVzcyxcbiAgICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtcbiAgICAgICAgICAgIGNvdW50cnk6ICdBVSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZ2lvbjonQVUnXG4gICAgICAgIH0sKHJlc3VsdHM6YW55LHN0YXR1czphbnkpPT57XG4gICAgICAgICAgaWYoc3RhdHVzIT09Z29vZ2xlLm1hcHMuR2VvY29kZXJTdGF0dXMuT0spe1xuICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cy5maWx0ZXIoZnVuY3Rpb24ocjphbnkpe1xuICAgICAgICAgICAgICByZXR1cm4gci5mb3JtYXR0ZWRfYWRkcmVzcyE9PSdBdXN0cmFsaWEnO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmcm9tKHByb21pc2UpO1xuICB9XG59XG4iXX0=