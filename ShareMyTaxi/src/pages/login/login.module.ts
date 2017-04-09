import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from 'login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [

    /*IonicModule.forChild(Login)*/
    IonicPageModule.forChild(Login)


  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
