import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalFlavourCalculatorPage } from './total-flavour-calculator';

@NgModule({
  declarations: [
    TotalFlavourCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(TotalFlavourCalculatorPage),
  ],
})
export class TotalFlavourCalculatorPageModule {}
