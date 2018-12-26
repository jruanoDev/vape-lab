import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Component } from '@angular/core';
import { Flavour } from '../../models/Flavour';

@IonicPage()
@Component({
  selector: 'page-add-flavour-modal',
  templateUrl: 'add-flavour-modal.html',
})
export class AddFlavourModalPage {

  flavourName:string;
  flavourBrand:string;
  flavourProportion:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
  }

  createFlavour() {
    let flavour = new Flavour();
    flavour.name = this.flavourName;
    flavour.brand = this.flavourBrand;
    flavour.proportion = this.flavourProportion;
    
    this.viewCtrl.dismiss(flavour);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
