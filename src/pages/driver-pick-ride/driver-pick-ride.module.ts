import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverPickRide } from './driver-pick-ride';

@NgModule({
  declarations: [
    DriverPickRide,
  ],
  imports: [
    IonicPageModule.forChild(DriverPickRide),
  ],
  exports: [
    DriverPickRide
  ]
})
export class DriverPickRideModule {}
