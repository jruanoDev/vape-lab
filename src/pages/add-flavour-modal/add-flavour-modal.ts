import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Component } from '@angular/core';
import { Flavour } from '../../models/Flavour';

@IonicPage()
@Component({
  selector: 'page-add-flavour-modal',
  templateUrl: 'add-flavour-modal.html',
})
export class AddFlavourModalPage {
  flavourName:string = "";
  flavourBrand:string = "";
  flavourProportion:number;
  saveToList:boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public alertCtrl:AlertController) {}

  createFlavour() {
    if(this.checkForErrors()) {
      let flavour = new Flavour();

      flavour.name = this.flavourName;
      flavour.brand = this.flavourBrand;
      flavour.proportion = this.flavourProportion;

      if(flavour.brand == "")
        flavour.brand = "Sin marca";

      if(this.saveToList) {
        //Lógica para guardar aroma en BD
      }
      
      this.viewCtrl.dismiss(flavour);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  checkForErrors() {    
    let message = "<ul>";
    let result = true;

    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      buttons: ['OK']
    });
    
    if(this.flavourName.length < 1) {
      message += '<li>Debes añadir un nombre al aroma</li>';
      errorAlert.setMessage(message);
      errorAlert.present();
      
      result = false;
    }
    
    if(isNaN(this.flavourProportion) || this.flavourProportion == undefined || 
       this.flavourProportion <= 0.1 || this.flavourProportion > 55) {

      message += '<li>Debes añadir una proporción entre 0.1 y 55 (%)</li>'
      errorAlert.setMessage(message);
      errorAlert.present();
      
      result = false;
    }
    message += '</ul>';

    return result;
  }
}
