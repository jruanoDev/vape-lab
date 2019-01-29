import { AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { CalculatorProvider } from '../../providers/calculator/calculator';
import { Component } from '@angular/core';
import { Flavour } from '../../models/Flavour';
import { Liquid } from '../../models/Liquid';
import { LiquidProvider } from '../../providers/liquid/liquid';

@IonicPage()
@Component({
  selector: 'page-total-liquid-calculator',
  templateUrl: 'total-liquid-calculator.html',
})
export class TotalLiquidCalculatorPage {
  liquid:Liquid = new Liquid();

  // Data Binding variables
  liquidQuantity:string;
  baseProportion:number = 50;
  totalNicotine:string = "0";
  nicokitConcentration:string = "10";
  nicokitProportion:number = 50;
  flavours:Array<Flavour> = [];
  saveToRecipeList:boolean = false;

  results: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private liquidProvider: LiquidProvider,
    private nativeTransitions: NativePageTransitions,
    private calcProvider: CalculatorProvider) {}

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 300
    };

    this.nativeTransitions.slide(options);
  }

  onAddFlavourClick() {
    let modal = this.modalCtrl.create("AddFlavourModalPage");

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 250
    };
    
    this.nativeTransitions.slide(options);
    modal.present();

    modal.onDidDismiss((flavour:Flavour) => {
      if(flavour)
        this.flavours.push(flavour);
    });
  }
  
  openResultsModal() {
    let resultsModal = this.modalCtrl.create("LiquidsResultModalPage", {
      liquid: this.liquid,
      nicotineMl: this.results.nicotineMl,
      mlFlavourList: this.results.mlFlavourList,
      flavourTotalPercentage: this.results.flavourTotalPercentage,
      totalBase: this.results.totalBase,
      totalBasePG: this.results.totalBasePG,
      totalBaseVG: this.results.totalBaseVG,
      nicotineInLiquid: this.results.nicotineInLiquid,
      title: '¡Aquí tienes tu nuevo e-liquid!'
    });
    resultsModal.present();
  }

  createLiquid() {
    if(this.checkForErrors()) {    
      this.liquid.name = "";
      this.liquid.baseVG = this.baseProportion;
      this.liquid.basePG = 100 - this.baseProportion;
      this.liquid.totalNicotine = parseInt(this.totalNicotine);
      this.liquid.nicokitConcentration = parseInt(this.nicokitConcentration);
      this.liquid.nicokitPG = 100 - this.nicokitProportion;
      this.liquid.nicokitVG = this.nicokitProportion;
      this.liquid.flavours = this.flavours;
      this.liquid.totalQuantity = parseInt(this.liquidQuantity);

      if(this.saveToRecipeList) {
        let nameAlert = this.alertCtrl.create({
          title: 'Una última cosa',
          message: 'Introduce un nombre para guardar la receta',
          inputs: [
            {
              name: 'nombre',
              placeholder: 'Nombre'
            }
          ],
          buttons: [{
            text: 'Guardar',
            handler: data => {
              this.liquid.name = data.nombre;
              this.liquid.createdAt = new Date();
              this.liquidProvider.saveLiquid(this.liquid);
              this.calculateQuantities();
            }
          }]
        });
        nameAlert.present();
      } else {
        this.calculateQuantities();
      }
    }
  }

  calculateQuantities() {
    this.results = this.calcProvider.calculateQuantities(this.liquid);

    if(this.liquid.totalQuantity < this.results.totalCalc) {  
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'Demasiados aromas para la cantidad de líquido total especificado',
        buttons: ['OK']
      });

      alert.present();
    } else {
      this.openResultsModal();
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
      message += '<li>No puedes calcular un líquido de menos de 1 ml</li>';
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

  showPrebuildLiquidResults(liquid: Liquid) {
  
  }
}