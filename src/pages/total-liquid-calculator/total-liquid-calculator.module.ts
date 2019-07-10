import { IonicPageModule } from 'ionic-angular';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DirectivesModule } from '../../directives/directives.module';
import { TotalLiquidCalculatorPage } from './total-liquid-calculator';

@NgModule({
  declarations: [TotalLiquidCalculatorPage],
  imports: [
    IonicPageModule.forChild(TotalLiquidCalculatorPage),
    DirectivesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TotalLiquidCalculatorPageModule {}
