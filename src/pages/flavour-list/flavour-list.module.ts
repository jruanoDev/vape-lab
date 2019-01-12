import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlavourListPage } from './flavour-list';

@NgModule({
  declarations: [
    FlavourListPage,
  ],
  imports: [
    IonicPageModule.forChild(FlavourListPage),
  ],
})
export class FlavourListPageModule {}
