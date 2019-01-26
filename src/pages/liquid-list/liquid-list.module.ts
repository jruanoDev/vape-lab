import { Calendar } from '@ionic-native/calendar';
import { IonicPageModule } from 'ionic-angular';
import { LiquidListPage } from './liquid-list';
import { LongPressModule } from 'ionic-long-press';
import { NgModule } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

@NgModule({
  declarations: [
    LiquidListPage,
  ],
  imports: [
    IonicPageModule.forChild(LiquidListPage),
    LongPressModule
  ],
  providers: [
    Vibration,
    SocialSharing,
    Calendar
  ]
})
export class LiquidListPageModule {}
