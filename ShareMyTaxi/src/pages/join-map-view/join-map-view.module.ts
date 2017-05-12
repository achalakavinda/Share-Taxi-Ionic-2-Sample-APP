import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JoinMapView } from './join-map-view';

@NgModule({
  declarations: [
    JoinMapView,
  ],
  imports: [
    IonicPageModule.forChild(JoinMapView),
  ],
  exports: [
    JoinMapView
  ]
})
export class JoinMapViewModule {}
