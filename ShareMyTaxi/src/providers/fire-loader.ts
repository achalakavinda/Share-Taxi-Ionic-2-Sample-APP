import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';



/*
  Generated class for the FireLoader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FireLoader {

  share_ride:FirebaseListObservable<any>;
  users:FirebaseListObservable<any>;


    constructor(
    private angFire:AngularFire,

  ) {
    this.share_ride = this.angFire.database.list('/share_ride');
    this.users = this.angFire.database.list('/users');;
    console.log('Hello FireLoader Provider');
  }

public pushShareRide(elVal){
  return this.share_ride.push(elVal);
}





}
