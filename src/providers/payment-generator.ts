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
  RATE_FOR_REST_KM=0.04;

  constructor() {
    console.log('Hello PaymentGenerator Provider');
  }

  public getPayment(distance_in_meters){
    let x=0;
    if(distance_in_meters<=1000){
      x=this.RATE_FOR_1_KM*1000;
    }else {
      x=this.RATE_FOR_1_KM*1000;
    }
    if(distance_in_meters>1000){
      distance_in_meters=distance_in_meters-1000;
      x = x + distance_in_meters*this.RATE_FOR_REST_KM;
    }

    return Math.round(x*100)/100;
  }

  public getSharedPayment(primary_distance,secondary_distance){
    let elmArr={PA:0,SA:0};
    let amount_1 = this.getPayment(primary_distance);
    let amount_2 = this.getPayment(secondary_distance);
    let value = amount_1/2;
    elmArr.PA=Math.round(value*100)/100;;
    elmArr.SA=Math.round(value*100)/100;;
    
    return elmArr;
  }

}
