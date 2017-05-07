import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestView } from './test-view';

@NgModule({
  declarations: [
    TestView,
  ],
  imports: [
    IonicPageModule.forChild(TestView),
  ],
  exports: [
    TestView
  ]
})
export class TestViewModule {}
