import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverMapViewPick } from './driver-map-view-pick';

@NgModule({
  declarations: [
    DriverMapViewPick,
  ],
  imports: [
    IonicPageModule.forChild(DriverMapViewPick),
  ],
  exports: [
    DriverMapViewPick
  ]
})
export class DriverMapViewPickModule {}
