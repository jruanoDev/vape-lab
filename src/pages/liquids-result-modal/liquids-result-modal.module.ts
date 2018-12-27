import { IonicPageModule, NavController, NavParams, ViewController } from 'ionic-angular';

import { Liquid } from '../../models/Liquid';
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
