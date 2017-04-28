import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareHome } from './share-home';

@NgModule({
  declarations: [
    ShareHome,
  ],
  imports: [
    IonicPageModule.forChild(ShareHome),
  ],
  exports: [
    ShareHome
  ]
})
export class ShareHomeModule {}
