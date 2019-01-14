import { IonicPageModule } from 'ionic-angular';
import { LiquidListPage } from './liquid-list';
import { LongPressModule } from 'ionic-long-press';
import { NgModule } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  declarations: [
    LiquidListPage,
  ],
  imports: [
    IonicPageModule.forChild(LiquidListPage),
    LongPressModule,
  ],
  providers: [
    SocialSharing
  ]
})
export class LiquidListPageModule {}
