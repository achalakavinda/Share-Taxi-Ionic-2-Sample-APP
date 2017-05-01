import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverShareTabs } from './driver-share-tabs';

@NgModule({
  declarations: [
    DriverShareTabs,
  ],
  imports: [
    IonicPageModule.forChild(DriverShareTabs),
  ],
  exports: [
    DriverShareTabs
  ]
})
export class DriverShareTabsModule {}
