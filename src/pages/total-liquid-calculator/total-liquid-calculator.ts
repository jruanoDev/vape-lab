import { AlertController, IonicPage, Modal, ModalController, NavController, NavParams } from 'ionic-angular';

import { AddFlavourModalPage } from '../../pages/add-flavour-modal/add-flavour-modal';
import { Component } from '@angular/core';
import { Flavour } from '../../models/Flavour';
import { Liquid } from '../../models/Liquid';
import { LiquidsResultModalPage } from '../liquids-result-modal/liquids-result-modal';

@IonicPage()
@Component({
  selector: 'page-total-liquid-calculator',
  templateUrl: 'total-liquid-calculator.html',
})
export class TotalLiquidCalculatorPage {
  liquidQuantity:string;
  baseProportion:number = 50;
  totalNicotine:string = "0";
  nicokitConcentration:string = "10";
  nicokitProportion:number = 50;
  flavours:Array<Flavour> = [];
  saveToRecipeList:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {}

  onAddFlavourClick() {
    let modal =this.modalCtrl.create(AddFlavourModalPage);
    modal.present();

    modal.onDidDismiss((flavour:Flavour) => {
      if(flavour)
        this.flavours.push(flavour);
    });
  }
  
  openResultsModal() {
    if(this.checkForErrors()) {
      let liquid = new Liquid();
    
      liquid.name = "";
      liquid.baseVG = this.baseProportion;
      liquid.basePG = 100 - this.baseProportion;
      liquid.totalNicotine = parseInt(this.totalNicotine);
      liquid.nicokitConcentration = parseInt(this.nicokitConcentration);
      liquid.nicokitPG = 100 - this.nicokitProportion;
      liquid.nicokitVG = this.nicokitProportion;
      liquid.flavours = this.flavours;
      liquid.totalQuantity = parseInt(this.liquidQuantity);

      if(this.saveToRecipeList) {
        // Lógica para guardar en BD
      }

      let resultsModal = this.modalCtrl.create(LiquidsResultModalPage, {
        liquid: liquid
      });
      resultsModal.present();
    }
  }
  
  checkForErrors() {
    let quantity = parseInt(this.liquidQuantity);
    let message = "<ul>";
    let result = true;

    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      buttons: ['OK']
    });
    
    if(isNaN(quantity) || quantity <= 0) {
      message += '<li>No puedes calcular un líquido de menos de 0 ml</li>';
      errorAlert.setMessage(message);
      errorAlert.present();
      
      result = false;
    }
    
    if(this.flavours.length <= 0) {
      message += '<li>Tienes que añadir algún aroma antes de calcular un líquido</li>'
      errorAlert.setMessage(message);
      errorAlert.present();
      
      result = false;
    }
    message += '</ul>';

    return result;
  }

  deleteFlavourFromCalc(flavour:Flavour) {
    let index = this.flavours.indexOf(flavour);
    this.flavours.splice(index, 1);
  }
}
