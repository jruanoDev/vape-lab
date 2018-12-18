import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalLiquidCalculatorPage } from './total-liquid-calculator';

@NgModule({
  declarations: [
    TotalLiquidCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(TotalLiquidCalculatorPage),
  ],
})
export class TotalLiquidCalculatorPageModule {}
