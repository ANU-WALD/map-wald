import { MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs';
export declare class GeocodingService {
    private _api;
    constructor(_api: MapsAPILoader);
    geocode(address: string, bnds?: any): Observable<any>;
}
