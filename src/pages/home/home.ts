import { NavController } from 'ionic-angular';

import { Component } from '@angular/core';
import {
  NativePageTransitions,
  NativeTransitionOptions,
} from '@ionic-native/native-page-transitions';

import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private storageProvider: StorageProvider,
    private nativeTransitions: NativePageTransitions,
  ) {}

  options: NativeTransitionOptions = {
    direction: 'left',
    duration: 300,
    slowdownfactor: -1,
  };

  ionViewDidLoad() {
    this.storageProvider.checkFirstLaunch();

    /* this.toastCtrl.create({
      message: 'Error al crear un líquido',
      duration: 3000
    }).present(); */
  }

  openPage(page: string) {
    this.nativeTransitions.slide(this.options);
    this.navCtrl.push(page);
  }
}
