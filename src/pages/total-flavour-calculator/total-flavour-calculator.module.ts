import { IonicPageModule } from 'ionic-angular';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { ScrollHideDirective } from '../../directives/scroll-hide/scroll-hide';
import { TotalFlavourCalculatorPage } from './total-flavour-calculator';

@NgModule({
  declarations: [TotalFlavourCalculatorPage],
  imports: [IonicPageModule.forChild(TotalFlavourCalculatorPage)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TotalFlavourCalculatorPageModule {}
