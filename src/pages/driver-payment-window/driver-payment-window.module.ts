import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverPaymentWindow } from './driver-payment-window';

@NgModule({
  declarations: [
    DriverPaymentWindow,
  ],
  imports: [
    IonicPageModule.forChild(DriverPaymentWindow),
  ],
  exports: [
    DriverPaymentWindow
  ]
})
export class DriverPaymentWindowModule {}
