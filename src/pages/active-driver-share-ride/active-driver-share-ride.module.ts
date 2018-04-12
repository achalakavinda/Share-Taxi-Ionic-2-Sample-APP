import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveDriverShareRide } from './active-driver-share-ride';

@NgModule({
  declarations: [
    ActiveDriverShareRide,
  ],
  imports: [
    IonicPageModule.forChild(ActiveDriverShareRide),
  ],
  exports: [
    ActiveDriverShareRide
  ]
})
export class ActiveDriverShareRideModule {}
