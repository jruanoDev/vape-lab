import { IonicPageModule } from 'ionic-angular';
import { LongPressModule } from 'ionic-long-press';

import { NgModule } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

import { DirectivesModule } from '../../directives/directives.module';
import { FlavourListPage } from './flavour-list';

@NgModule({
  declarations: [FlavourListPage],
  imports: [
    IonicPageModule.forChild(FlavourListPage),
    LongPressModule,
    DirectivesModule,
  ],
  providers: [Vibration, SocialSharing],
})
export class FlavourListPageModule {}
