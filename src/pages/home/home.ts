import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../providers/storage/storage';
import { TotalLiquidCalculatorPage } from '../total-liquid-calculator/total-liquid-calculator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
              private storageProvider: StorageProvider) {}

  ionViewDidLoad() {
    console.log("INICIO");
    this.storageProvider.checkFirstLaunch();
  }

  openPage(page:string) {
    switch(page) {
      case 'totalLiquid':
        this.navCtrl.push(TotalLiquidCalculatorPage);
        break;
    }
  }

}
