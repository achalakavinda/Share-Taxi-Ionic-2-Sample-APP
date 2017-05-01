import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverShareRide } from './driver-share-ride';

@NgModule({
  declarations: [
    DriverShareRide,
  ],
  imports: [
    IonicPageModule.forChild(DriverShareRide),
  ],
  exports: [
    DriverShareRide
  ]
})
export class DriverShareRideModule {}
