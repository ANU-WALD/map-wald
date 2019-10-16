import { Injectable } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Observable, from} from 'rxjs';

declare var google:any;

@Injectable()
export class GeocodingService {
  constructor(private _api:MapsAPILoader){

  }

  geocode(address:string,bnds?:any):Observable<any>{
    var promise = new Promise((resolve,reject)=>{
      this._api.load().then(()=>{
        var service = new google.maps.Geocoder();
        service.geocode({
          address:address,
          componentRestrictions: {
            country: 'AU'
          },
          region:'AU'
        },(results:any,status:any)=>{
          if(status!==google.maps.GeocoderStatus.OK){
            reject();
          } else {
            resolve(results.filter(function(r:any){
              return r.formatted_address!=='Australia';
            }));
          }
        });
      });
    });

    return from(promise);
  }
}
