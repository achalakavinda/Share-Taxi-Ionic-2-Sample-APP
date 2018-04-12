import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivePickRide } from './active-pick-ride';

@NgModule({
  declarations: [
    ActivePickRide,
  ],
  imports: [
    IonicPageModule.forChild(ActivePickRide),
  ],
  exports: [
    ActivePickRide
  ]
})
export class ActivePickRideModule {}
