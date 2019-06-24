import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ViewController,
} from 'ionic-angular';

import { Component } from '@angular/core';

import { Flavour } from '../../models/Flavour';
import { FlavourProvider } from '../../providers/flavour/flavour';

@IonicPage()
@Component({
  selector: 'page-add-flavour-modal',
  templateUrl: 'add-flavour-modal.html',
})
export class AddFlavourModalPage {
  flavourName: string = '';
  flavourBrand: string = '';
  flavourProportion: number;
  saveToList: boolean = false;
  staticFlavourName = '';
  flavourQuantity: number;

  flavourToEdit: Flavour;

  // Flags
  isEditModal: boolean = false;
  isQuantityEnabled: boolean = false;
  isCreationScreen: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    private flavourProvider: FlavourProvider,
    private toastCtrl: ToastController,
  ) {}

  ionViewDidLoad() {
    if (this.navParams.get('isEditModal') === true) this.isEditModal = true;

    if (this.navParams.get('isQuantityEnabled') === true)
      this.isQuantityEnabled = true;

    if (this.navParams.get('isCreationScreen') === true) {
      this.isCreationScreen = true;
      this.saveToList = true;
    }

    let flavourTemp = this.navParams.get('flavour');
    if (flavourTemp) {
      this.setEditValues(flavourTemp);
      this.flavourToEdit = flavourTemp;

      this.staticFlavourName = flavourTemp.name;
    }
  }

  setEditValues(flavour) {
    this.flavourName = flavour.name;
    this.flavourBrand = flavour.brand;
    this.flavourProportion = flavour.proportion;
  }

  editFlavour() {
    if (this.checkForErrors()) {
      let newFlavour = new Flavour();
      newFlavour.name = this.flavourName;
      newFlavour.brand = this.flavourBrand;
      newFlavour.proportion = this.flavourProportion;
      newFlavour.quantity = this.flavourQuantity;

      this.flavourProvider
        .updateFlavour(this.flavourToEdit, newFlavour)
        .then(() => {
          this.toastCtrl
            .create({
              message: 'Aroma actualizado correctamente',
              duration: 3000,
            })
            .present();

          this.navCtrl.pop();
        })
        .catch(() => {
          this.toastCtrl
            .create({
              message: 'No se pudo actualizar el aroma',
              duration: 3000,
            })
            .present();
        });
    }
  }

  createFlavour() {
    if (this.checkForErrors()) {
      let flavour = new Flavour();

      flavour.name = this.flavourName;
      flavour.brand = this.flavourBrand;
      flavour.proportion = this.flavourProportion;
      flavour.quantity = this.flavourQuantity;
      flavour.isFavourite = false;

      if (flavour.brand == '') flavour.brand = 'Sin marca';

      if (flavour.name == '') flavour.name = 'Sin nombre';

      if (this.saveToList || this.isCreationScreen) {
        this.flavourProvider.saveFlavour(flavour);
      }

      this.viewCtrl.dismiss(flavour);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  checkForErrors() {
    let message = '<ul>';
    let result = true;

    let errorAlert = this.alertCtrl.create({
      title: 'Error',
      buttons: ['OK'],
    });

    if (this.saveToList) {
      if (this.flavourName.length < 1) {
        message += '<li>Debes añadir un nombre al aroma</li>';
        errorAlert.setMessage(message);
        errorAlert.present();

        result = false;
      }
    }

    if (
      isNaN(this.flavourProportion) ||
      this.flavourProportion == undefined ||
      this.flavourProportion <= 0.1 ||
      this.flavourProportion > 55
    ) {
      message += '<li>Debes añadir una proporción entre 0.1 y 55 (%)</li>';
      errorAlert.setMessage(message);
      errorAlert.present();

      result = false;
    }
    message += '</ul>';

    return result;
  }
}
