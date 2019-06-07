import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
} from 'ionic-angular';

import { Component } from '@angular/core';
import {
  NativePageTransitions,
  NativeTransitionOptions,
} from '@ionic-native/native-page-transitions';
import { Storage } from '@ionic/storage';

import { Flavour } from '../../models/Flavour';
import { Liquid } from '../../models/Liquid';
import { CalculatorProvider } from '../../providers/calculator/calculator';
import { LiquidProvider } from '../../providers/liquid/liquid';

@IonicPage()
@Component({
  selector: 'page-total-flavour-calculator',
  templateUrl: 'total-flavour-calculator.html',
})
export class TotalFlavourCalculatorPage {
  liquid: Liquid = new Liquid();

  // Data Binding variables
  baseProportion: number = 50;
  totalNicotine: string = '0';
  nicokitConcentration: string = '10';
  nicokitProportion: number = 50;
  flavours: Array<Flavour> = [];
  saveToRecipeList: boolean = false;

  // Flags
  showMessage: boolean = true;

  results: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private liquidProvider: LiquidProvider,
    private nativeTransitions: NativePageTransitions,
    private calcProvider: CalculatorProvider,
    private storage: Storage,
    private platform: Platform,
  ) {
    platform.registerBackButtonAction(() => {
      let options: NativeTransitionOptions = {
        direction: 'right',
        duration: 300,
      };

      navCtrl.pop({ animate: false });
      this.nativeTransitions.slide(options);
    });
  }

  ionViewWillEnter() {
    this.storage
      .get('showFlavourMessage')
      .then((data) => (this.showMessage = data));
  }

  onAddFlavourClick() {
    let modal = this.modalCtrl.create('AddFlavourModalPage', {
      isQuantityEnabled: true,
    });

    let options: NativeTransitionOptions = {
      direction: 'up',
      duration: 250,
    };

    this.nativeTransitions.slide(options);
    modal.present();

    modal.onDidDismiss((flavour: Flavour) => {
      if (flavour) this.flavours.push(flavour);
    });
  }

  openResultsModal() {
    let resultsModal = this.modalCtrl.create('LiquidsResultModalPage', {
      liquid: this.liquid,
      nicotineMl: this.results.nicotineMl,
      flavourTotalPercentage: this.results.flavourTotalPercentage,
      totalBase: this.results.totalBase,
      mlFlavourList: this.results.mlFlavourList,
      totalBasePG: this.results.totalBasePG,
      totalBaseVG: this.results.totalBaseVG,
      nicotineInLiquid: this.results.nicotineInLiquid,
      title: '¡Aquí tienes tu nuevo e-liquid!',
    });
    resultsModal.present();
  }

  dissmissFlavourMessage() {
    if (this.showMessage) {
      this.showMessage = false;
      this.storage.set('showFlavourMessage', false);
    }
  }

  createLiquid() {
    if (this.checkForErrors()) {
      this.liquid.name = '';
      this.liquid.baseVG = this.baseProportion;
      this.liquid.basePG = 100 - this.baseProportion;
      this.liquid.totalNicotine = parseInt(this.totalNicotine);
      this.liquid.nicokitConcentration = parseInt(this.nicokitConcentration);
      this.liquid.nicokitPG = 100 - this.nicokitProportion;
      this.liquid.nicokitVG = this.nicokitProportion;
      this.liquid.flavours = this.flavours;

      if (this.saveToRecipeList) {
        let nameAlert = this.alertCtrl.create({
          title: 'Una última cosa',
          message: 'Introduce un nombre para guardar la receta',
          inputs: [
            {
              name: 'nombre',
              placeholder: 'Nombre',
            },
          ],
          buttons: [
            {
              text: 'Guardar',
              handler: (data) => {
                this.liquid.name = data.nombre;
                this.liquid.createdAt = new Date();
                this.calculateQuantities(true);
              },
            },
          ],
        });
        nameAlert.present();
      } else {
        this.calculateQuantities();
      }
    }
  }

  calculateQuantities(save = false) {
    this.results = this.calcProvider.calculateFlavourQuantities(this.liquid);

    if (save) {
      this.liquid.totalQuantity = this.results.totalQuantity;
      this.liquidProvider.saveLiquid(this.liquid);
    }
    this.openResultsModal();
  }

  checkForErrors() {
    let message = '<ul>';
    let result = true;

    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      buttons: ['OK'],
    });

    if (this.flavours.length <= 0) {
      message +=
        '<li>Tienes que añadir algún aroma antes de calcular un líquido</li>';
      errorAlert.setMessage(message);
      errorAlert.present();

      result = false;
    }
    message += '</ul>';

    return result;
  }

  deleteFlavourFromCalc(flavour: Flavour) {
    let index = this.flavours.indexOf(flavour);
    this.flavours.splice(index, 1);
  }
}
