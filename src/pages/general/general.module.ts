import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { General } from './general';

@NgModule({
  declarations: [
    General,
  ],
  imports: [
    IonicPageModule.forChild(General),
  ],
  exports: [
    General
  ]
})
export class GeneralModule {}
