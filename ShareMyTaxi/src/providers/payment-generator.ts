import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the PaymentGenerator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PaymentGenerator {

  RATE_FOR_1_KM=0.05;
  RATE_FOR_REST_KM=0.015;

  constructor() {
    console.log('Hello PaymentGenerator Provider');
  }

  public getPayment(distance_in_meters){
    let x=0;
    //implement algo here

    x=distance_in_meters*this.RATE_FOR_1_KM;
    return x;
  }

  public getSharedPaymentPrimary(tot_distance,primary_distance){
    //implemet here
    return 0;
  }

  public getSharedPaymentSecondary(tot_distance,primary_distance){
    //implement here
    return 0;
  }

}
