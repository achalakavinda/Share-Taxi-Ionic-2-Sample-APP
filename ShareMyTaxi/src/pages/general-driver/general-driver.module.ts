import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralDriver } from './general-driver';

@NgModule({
  declarations: [
    GeneralDriver,
  ],
  imports: [
    IonicPageModule.forChild(GeneralDriver),
  ],
  exports: [
    GeneralDriver
  ]
})
export class GeneralDriverModule {}
