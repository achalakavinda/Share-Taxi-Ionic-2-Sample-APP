import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveShareRide } from './active-share-ride';

@NgModule({
  declarations: [
    ActiveShareRide,
  ],
  imports: [
    IonicPageModule.forChild(ActiveShareRide),
  ],
  exports: [
    ActiveShareRide
  ]
})
export class ActiveShareRideModule {}
