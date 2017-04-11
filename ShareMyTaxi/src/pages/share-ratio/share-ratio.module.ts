import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareRatio } from './share-ratio';

@NgModule({
  declarations: [
    ShareRatio,
  ],
  imports: [
    IonicPageModule.forChild(ShareRatio),
  ],
  exports: [
    ShareRatio
  ]
})
export class ShareRatioModule {}
