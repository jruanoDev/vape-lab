import { IonicPageModule } from 'ionic-angular';
import { LongPressModule } from 'ionic-long-press';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Calendar } from '@ionic-native/calendar';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

import { DirectivesModule } from '../../directives/directives.module';
import { LiquidListPage } from './liquid-list';

@NgModule({
  declarations: [LiquidListPage],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(LiquidListPage),
    LongPressModule,
  ],
  providers: [Vibration, SocialSharing, Calendar],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LiquidListPageModule {}
