import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverMapView } from './driver-map-view';

@NgModule({
  declarations: [
    DriverMapView,
  ],
  imports: [
    IonicPageModule.forChild(DriverMapView),
  ],
  exports: [
    DriverMapView
  ]
})
export class DriverMapViewModule {}
