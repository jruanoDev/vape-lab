import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFlavourModalPage } from './add-flavour-modal';

@NgModule({
  declarations: [
    AddFlavourModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFlavourModalPage),
  ],
})
export class AddFlavourModalPageModule {}
