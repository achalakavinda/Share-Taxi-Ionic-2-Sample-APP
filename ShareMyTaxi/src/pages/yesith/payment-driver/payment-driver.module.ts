import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentDriver } from './payment-driver';

@NgModule({
  declarations: [
    PaymentDriver,
  ],
  imports: [
    IonicPageModule.forChild(PaymentDriver),
  ],
  exports: [
    PaymentDriver
  ]
})
export class PaymentDriverModule {}
