import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiquidListPage } from './liquid-list';

@NgModule({
  declarations: [
    LiquidListPage,
  ],
  imports: [
    IonicPageModule.forChild(LiquidListPage),
  ],
})
export class LiquidListPageModule {}
