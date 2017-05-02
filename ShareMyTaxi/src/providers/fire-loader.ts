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
  pick_ride:FirebaseListObservable<any>
  book_ride:FirebaseListObservable<any>
  users:FirebaseListObservable<any>;
  active_riders:FirebaseListObservable<any>
  shared_ride_payment: FirebaseListObservable<any>;
  mapLocations: FirebaseListObservable<any>;


    constructor(private angFire:AngularFire) {
    this.share_ride = this.angFire.database.list('/share_ride');
    this.pick_ride = this.angFire.database.list('/pick_ride');
    this.book_ride = this.angFire.database.list('/book_ride');
    this.users = this.angFire.database.list('/users');
    this.active_riders = this.angFire.database.list('/active_riders');
    this.shared_ride_payment=this.angFire.database.list('/share_ride_payments');
    this.mapLocations=this.angFire.database.list('/map_locations');
    console.log('Hello FireLoader Provider');
  }

  //general
  // active riders

  public pushActiveRiders(elVal){
    return this.active_riders.push(elVal);
  }

  public getActiveRiders(){
    return this.active_riders;
  }

//share ride
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



//Pick Ride Providers
public pushPickRide(elVal){
  console.log('fire load provide || Push Pick Ride');
  return this.pick_ride.push(elVal);
}
public getPickRide(){
  console.log('fire load provide || get Pick Ride');
  return this.pick_ride;
}

//book ride
  public pushBookRide(elVal){
    console.log('fire load provide || Push Pick Ride');
    return this.book_ride.push(elVal);
  }
  public getBookRide(){
    console.log('fire load provide || get Pick Ride');
    return this.book_ride;
  }



//payment  providers
public getSharePaymentProider(){
  console.log("Provider push share payment called");
  return this.shared_ride_payment;
}

 public pushSharePaymentProider(elVal){
   console.log("Provider push share payment called");
    return this.shared_ride_payment.push(elVal);
  }

  //map push methods
  public pushMapLocations(elmV){
    return this.mapLocations.push(elmV);
  }

}
