import { IonicPageModule } from 'ionic-angular';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ScrollHideDirective } from '../../directives/scroll-hide/scroll-hide';
import { TotalLiquidCalculatorPage } from './total-liquid-calculator';

@NgModule({
  declarations: [TotalLiquidCalculatorPage],
  imports: [IonicPageModule.forChild(TotalLiquidCalculatorPage)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TotalLiquidCalculatorPageModule {}
