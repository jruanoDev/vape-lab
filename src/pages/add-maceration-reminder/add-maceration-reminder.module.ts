import { AddMacerationReminderPage } from './add-maceration-reminder';
import { Calendar } from '@ionic-native/calendar';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AddMacerationReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMacerationReminderPage),
  ],
  providers: [
    Calendar
  ]
})
export class AddMacerationReminderPageModule {}
