import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseHandler } from '../providers/firebase-handler';

/*
  Generated class for the FirebasePusher provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebasePusher {

  constructor(private fireHandler:FirebaseHandler) {
    console.log('Hello FirebasePusher Provider');
  }

  pushActiveShareRide(elmVal){
    let newPostKey = this.fireHandler.getFirebase().database().ref().child('share_ride').push().key;
    elmVal.id=newPostKey;
    return this.fireHandler.getFirebase().database().ref('share_ride/'+ newPostKey).set(elmVal);
  }

}
