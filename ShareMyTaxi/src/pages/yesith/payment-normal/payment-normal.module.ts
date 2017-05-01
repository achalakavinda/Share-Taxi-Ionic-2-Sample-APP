import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentNormal } from './payment-normal';
//import { ActionSheetController } from 'ionic-angular';
@NgModule({
  declarations: [
    PaymentNormal,
  ],
  imports: [
    IonicPageModule.forChild(PaymentNormal),
  ],
  exports: [
    PaymentNormal
  ]
})
export class PaymentNormalModule {}
