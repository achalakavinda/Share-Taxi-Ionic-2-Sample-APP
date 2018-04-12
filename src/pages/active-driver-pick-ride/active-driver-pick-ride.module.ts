import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveDriverPickRide } from './active-driver-pick-ride';

@NgModule({
  declarations: [
    ActiveDriverPickRide,
  ],
  imports: [
    IonicPageModule.forChild(ActiveDriverPickRide),
  ],
  exports: [
    ActiveDriverPickRide
  ]
})
export class ActiveDriverPickRideModule {}
