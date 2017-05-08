import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';



@Injectable()
export class FireLoader {

  // share_ride:FirebaseListObservable<any>;
  // pick_ride:FirebaseListObservable<any>
  // book_ride:FirebaseListObservable<any>
  // users:FirebaseListObservable<any>;
  // active_riders:FirebaseListObservable<any>
  // shared_ride_payment: FirebaseListObservable<any>;
  // mapLocations: FirebaseListObservable<any>;


    constructor() {
    // this.share_ride = this.angFire.database.list('/share_ride');
    // this.pick_ride = this.angFire.database.list('/pick_ride');
    // this.book_ride = this.angFire.database.list('/book_ride');
    // this.users = this.angFire.database.list('/users');
    // this.active_riders = this.angFire.database.list('/active_riders');
    // this.shared_ride_payment=this.angFire.database.list('/share_ride_payments');
    // this.mapLocations=this.angFire.database.list('/map_locations');
    console.log('Hello FireLoader Provider');
  }

  //general
  // active riders

  public pushActiveRiders(elVal){
   // return this.active_riders.push(elVal);
  }

  public getActiveRiders(){
    //return this.active_riders;
  }

//share ride
public pushShareRide(elVal){
  // this.pushSharePaymentProider({
  //     partner_name:'Yesith',
  //     primary_distance:elVal.primary_distance,
  //     primary_duration:elVal.primary_duration,
  //     Secondary_distance:elVal.primary_distance,
  //     total_amount:1000,
  //     primary_payment:500,
  //     secondary_payment:500
  //   });
 // return this.share_ride.push(elVal);
}



}
