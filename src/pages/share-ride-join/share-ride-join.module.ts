import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareRideJoin } from './share-ride-join';

@NgModule({
  declarations: [
    ShareRideJoin,
  ],
  imports: [
    IonicPageModule.forChild(ShareRideJoin),
  ],
  exports: [
    ShareRideJoin
  ]
})
export class ShareRideJoinModule {}
