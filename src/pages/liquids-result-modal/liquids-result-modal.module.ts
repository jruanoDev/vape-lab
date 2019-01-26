import { IonicPageModule } from 'ionic-angular';
import { LiquidsResultModalPage } from './liquids-result-modal';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    LiquidsResultModalPage,
  ],
  imports: [
    IonicPageModule.forChild(LiquidsResultModalPage),
  ],
})
export class LiquidsResultModalPageModule {
  
}
