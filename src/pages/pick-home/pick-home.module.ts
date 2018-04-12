import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickHome } from './pick-home';

@NgModule({
  declarations: [
    PickHome,
  ],
  imports: [
    IonicPageModule.forChild(PickHome),
  ],
  exports: [
    PickHome
  ]
})
export class PickHomeModule {}
