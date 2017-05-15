import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverUpcomingWindow } from './driver-upcoming-window';

@NgModule({
  declarations: [
    DriverUpcomingWindow,
  ],
  imports: [
    IonicPageModule.forChild(DriverUpcomingWindow),
  ],
  exports: [
    DriverUpcomingWindow
  ]
})
export class DriverUpcomingWindowModule {}
