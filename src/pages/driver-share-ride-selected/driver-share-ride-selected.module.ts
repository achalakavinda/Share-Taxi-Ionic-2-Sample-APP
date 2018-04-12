import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverShareRideSelected } from './driver-share-ride-selected';

@NgModule({
  declarations: [
    DriverShareRideSelected,
  ],
  imports: [
    IonicPageModule.forChild(DriverShareRideSelected),
  ],
  exports: [
    DriverShareRideSelected
  ]
})
export class DriverShareRideSelectedModule {}
