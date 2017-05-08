import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseHandler } from '../providers/firebase-handler'

/*
  Generated class for the FirebaseGetter provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseGetter {

  constructor(private fireHandler:FirebaseHandler) {
    console.log('Hello FirebaseGetter Provider');
  }

    getAllActiveShareRideForDrivers(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('share_ride');
    let query = shareRide.orderByChild('status').equalTo('active_!driver');
    query.on('value',snap=>{
        console.log(snap.val());
        return snap.val();
    });
  } 

}
