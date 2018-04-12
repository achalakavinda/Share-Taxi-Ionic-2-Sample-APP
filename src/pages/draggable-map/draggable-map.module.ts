import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DraggableMap } from './draggable-map';

@NgModule({
  declarations: [
    DraggableMap,
  ],
  imports: [
    IonicPageModule.forChild(DraggableMap),
  ],
  exports: [
    DraggableMap
  ]
})
export class DraggableMapModule {}
