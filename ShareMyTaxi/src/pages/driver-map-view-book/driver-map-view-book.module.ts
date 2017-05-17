import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverMapViewBook } from './driver-map-view-book';

@NgModule({
  declarations: [
    DriverMapViewBook,
  ],
  imports: [
    IonicPageModule.forChild(DriverMapViewBook),
  ],
  exports: [
    DriverMapViewBook
  ]
})
export class DriverMapViewBookModule {}
