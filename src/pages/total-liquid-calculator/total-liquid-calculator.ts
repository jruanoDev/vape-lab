import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { AddFlavourModalPage } from '../../pages/add-flavour-modal/add-flavour-modal';
import { Component } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-total-liquid-calculator',
  templateUrl: 'total-liquid-calculator.html',
})
export class TotalLiquidCalculatorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TotalLiquidCalculatorPage');
  }

  onAddFlavourClick() {
    let modal =this.modalCtrl.create(AddFlavourModalPage);
    modal.present();
  }

}
