import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Calendar } from '@ionic-native/calendar';
import { Component } from '@angular/core';
import { Liquid } from '../../models/Liquid';

@IonicPage()
@Component({
  selector: 'page-add-maceration-reminder',
  templateUrl: 'add-maceration-reminder.html',
})

export class AddMacerationReminderPage {
  countSinceCreationDay: string = "true";
  macerationDays: string = "";
  liquid: Liquid;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private calendar: Calendar,
              private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    this.liquid = this.navParams.get('liquid');
  }

  addMacerationReminder() {
    if(this.setUpCalendarPermissions() && this.checkForErrors()) {
      let reminderDate = this.getReminderDate();

      let options = this.calendar.getCalendarOptions();
      options.firstReminderMinutes = 1440;

      this.calendar.createEventWithOptions('Fin de maceración de ' + this.liquid.name,
        null, null, reminderDate, reminderDate, options)
        .then((data) => {
          let toast = this.toastCtrl.create({
            message: 'Recordatorio añadido correctamente',
            duration: 3000,
            position: 'bottom'
          });
      
          toast.present();
          this.navCtrl.pop();
        });
    }
  }

  dissmiss() {
    this.navCtrl.pop(); 
  }

  setUpCalendarPermissions() {
    let check = true;

    this.calendar.hasReadWritePermission().then((data) => {
      if(!data) {
        this.calendar.requestReadWritePermission()
        .then((data) => {
          this.addMacerationReminder();
        })
        .catch((err) => {
          check = false;
        });
      }
    }).catch((err) => {
      check = false;
    });

    return check;
  }

  checkForErrors() {
    let numberCheck = new RegExp('^[0-9]*$');
    if(numberCheck.test(this.macerationDays)) 
      return true;

    return false;
  }

  getReminderDate() {
    let check = (this.countSinceCreationDay === 'true');
    let reminderDate: Date;
    
    if(check) {
      reminderDate = this.sumDaysToDate(this.liquid.createdAt, parseInt(this.macerationDays));
    } else {
      reminderDate = this.sumDaysToDate(new Date(), parseInt(this.macerationDays));
    }

    return reminderDate;
  }

  sumDaysToDate(date: Date, days) {
    let tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + days);
    
    return tempDate;
  }

}
