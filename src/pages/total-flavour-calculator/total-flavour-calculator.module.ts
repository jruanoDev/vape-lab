import { IonicPageModule } from 'ionic-angular';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DirectivesModule } from '../../directives/directives.module';
import { TotalFlavourCalculatorPage } from './total-flavour-calculator';

@NgModule({
  declarations: [TotalFlavourCalculatorPage],
  imports: [
    IonicPageModule.forChild(TotalFlavourCalculatorPage),
    DirectivesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TotalFlavourCalculatorPageModule {}
