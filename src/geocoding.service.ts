import { Injectable } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/bindCallback';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/combineAll';

declare var google:any;

@Injectable()
export class GeocodingService {
  constructor(private _api:MapsAPILoader){

  }

  geocode(address:string,bnds?:any):Observable<any>{
    var promise = new Promise((resolve,reject)=>{
      console.log('before load');
      this._api.load().then(()=>{
        var service = new google.maps.Geocoder();
        service.geocode({
          address:address,
          componentRestrictions: {
            country: 'AU'
          },
          region:'AU'
        },(results:any,status:any)=>{
          console.log(results,status);
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

    return Observable.fromPromise(promise);
//    console.log(address);
//    var api = Observable.fromPromise();
//    var higher = api.map(()=>{
//      console.log('HERE');
//      var service = new google.maps.Geocoder();
//      var callbackMethod:((param:any,callback:(() => any))=>void) = service.geocode;
//      return Observable.bindCallback(callbackMethod)({
//        address:address,
//        componentRestrictions: {
//          country: 'AU'
//        },
//        region:'AU'
//      });
//    });
//    return higher.combineAll();


//    return new Promise((resolve,reject)=>{
//      .then(()=>{
//  //      if(bnds){
//  //        var sw = new google.maps.LatLng(bnds.south,bnds.west);
//  //        var ne = new google.maps.LatLng(bnds.north,bnds.east);
//  //        bnds = new google.maps.LatLngBounds(sw,ne);
//  //      }
//
//        var service = new google.maps.Geocoder();
//        service.geocode({
//          address:address,
//          componentRestrictions: {
//            country: 'AU'
//          },
//          region:'AU'
//        },function(results,status){
//          if(status!==google.maps.GeocoderStatus.OK){
//            reject();
//            return;
//          }
//
//          resolve(results.filter(function(r){
//            return r.formatted_address!=='Australia';
//          }));
//        });
//
//
//      });
//    });
  }
}
