import { NgModule } from '@angular/core';
import {IonicPageModule,} from 'ionic-angular';
import { PaymentShared } from './payment-shared';

@NgModule({
  declarations: [
    PaymentShared,
  ],
  imports: [
    IonicPageModule.forChild(PaymentShared),
  ],
  exports: [
    PaymentShared
  ]
})
export class PaymentSharedModule {}
