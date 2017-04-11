import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentHistory } from './payment-history';

@NgModule({
  declarations: [
    PaymentHistory,
  ],
  imports: [
    IonicPageModule.forChild(PaymentHistory),
  ],
  exports: [
    PaymentHistory
  ]
})
export class PaymentHistoryModule {}
