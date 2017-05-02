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
  shared_ride_payment: FirebaseListObservable<any>;


    constructor(private angFire:AngularFire) {
    this.share_ride = this.angFire.database.list('/share_ride');
    this.users = this.angFire.database.list('/users');
    this.active_riders = this.angFire.database.list('/active_riders');
    this.shared_ride_payment=this.angFire.database.list('/share_ride_payments');    
    console.log('Hello FireLoader Provider');
  }


public pushShareRide(elVal){
  this.pushSharePaymentProider({
      partner_name:'Yesith',
      primary_distance:elVal.primary_distance,
      primary_duration:elVal.primary_duration,
      Secondary_distance:elVal.primary_distance,
      total_amount:1000,
      primary_payment:500,
      secondary_payment:500
    });
  return this.share_ride.push(elVal);
}

//active riders

  public pushActiveRiders(elVal){
    return this.active_riders.push(elVal);
  }

public getActiveRiders(){
    return this.active_riders;
}

//payment providers

public getSharePaymentProider(){
  console.log("Provider push share payment called");
  return this.shared_ride_payment;
}

 public pushSharePaymentProider(elVal){
   console.log("Provider push share payment called");
    return this.shared_ride_payment.push(elVal);
  }

}
