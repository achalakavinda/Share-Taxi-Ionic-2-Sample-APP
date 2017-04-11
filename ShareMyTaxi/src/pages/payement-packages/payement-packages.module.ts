
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayementPackages } from './payement-packages';

@NgModule({
  declarations: [
    PayementPackages,
  ],
  imports: [
    IonicPageModule.forChild(PayementPackages),
  ],
  exports: [
    PayementPackages
  ]
})
export class PayementPackagesModule {}
