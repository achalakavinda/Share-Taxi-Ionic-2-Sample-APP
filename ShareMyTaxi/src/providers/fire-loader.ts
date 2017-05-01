import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



/*
  Generated class for the FireLoader provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FireLoader {

  share_ride:FirebaseListObservable<any>;
  users:FirebaseListObservable<any>;
  active_riders:FirebaseListObservable<any>


    constructor(private angFire:AngularFire) {
    this.share_ride = this.angFire.database.list('/share_ride');
    this.users = this.angFire.database.list('/users');
    this.active_riders = this.angFire.database.list('/active_riders');
    console.log('Hello FireLoader Provider');
  }


public pushShareRide(elVal){
  return this.share_ride.push(elVal);
}

//active riders

  public pushActiveRiders(elVal){
    return this.active_riders.push(elVal);
  }

public getActiveRiders(){
    return this.active_riders;
}



}
