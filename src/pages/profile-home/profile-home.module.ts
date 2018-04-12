import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileHome } from './profile-home';

@NgModule({
  declarations: [
    ProfileHome,
  ],
  imports: [
    IonicPageModule.forChild(ProfileHome),
  ],
  exports: [
    ProfileHome
  ]
})
export class ProfileHomeModule {}
