import { NavController } from 'ionic-angular';

import { Component } from '@angular/core';

import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    private storageProvider: StorageProvider,
  ) {}

  ionViewDidLoad() {
    this.storageProvider.checkFirstLaunch();
  }

  openPage(page: string) {
    this.navCtrl.push(page);
  }
}
