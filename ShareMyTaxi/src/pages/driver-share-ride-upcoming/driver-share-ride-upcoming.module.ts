import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverShareRideUpcoming } from './driver-share-ride-upcoming';

@NgModule({
  declarations: [
    DriverShareRideUpcoming,
  ],
  imports: [
    IonicPageModule.forChild(DriverShareRideUpcoming),
  ],
  exports: [
    DriverShareRideUpcoming
  ]
})
export class DriverShareRideUpcomingModule {}
