import { ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { CalculatorProvider } from '../../providers/calculator/calculator';
import { Component } from '@angular/core';
import { LiquidProvider } from '../../providers/liquid/liquid';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-liquid-list',
  templateUrl: 'liquid-list.html',
})

export class LiquidListPage {
  public liquids = [];
  check = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private liquidsProvider: LiquidProvider,
              public actionSheedCtrl: ActionSheetController,
              private socialShare: SocialSharing,
              public alertCtrl: AlertController,
              private vibrateCtrl: Vibration,
              private calcProvider: CalculatorProvider,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.liquidsProvider.getAllLiquids().then(data => this.liquids = data);
  }

  onItemLongClick(liquid) {
    if(this.check) {
      this.check = false;

      this.vibrateCtrl.vibrate(30);
      
      let actionSheet = this.actionSheedCtrl.create({
        buttons: [
          {
            text: 'Editar',
            icon: 'create',
            handler: () => {
              
            }
          },
          {
            text: 'Compartir',
            icon: 'share',
            handler: () => {
              let message = "Hola\n Bienvenido"
              this.socialShare.share(message, "Tomalo");
            }
          },
          {
            text: 'Añadir fecha de maceración',
            icon: 'calendar',
            handler: () => {
              this.navCtrl.push("AddMacerationReminderPage", {liquid: liquid});
            }
          },
          {
            text: 'Eliminar',
            icon: 'trash',
            role: 'destructive',
            handler: () => {
              this.alertCtrl.create({
                title: 'Eliminar líquido',
                message: '¿Seguro que quieres eliminar este líquido?',
                buttons: [
                  {
                    text: 'Eliminar',
                    handler: data => {
                      this.liquidsProvider.deleteLiquid(liquid);
                      let index = this.liquids.map((liquid) => { return liquid.name }).indexOf(liquid.name);
                      this.liquids.splice(index, 1);
                    }
                  },
                  {
                    text: 'Cancelar'
                  }
                ]
              }).present();
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  onItemLongClickRelease() {
    this.check = true;
  }

  openResultsModal(liquid) {
    let results = this.calcProvider.calculateQuantities(liquid);

    let resultsModal = this.modalCtrl.create("LiquidsResultModalPage", {
      liquid: liquid,
      nicotineMl: results.nicotineMl,
      mlFlavourList: results.mlFlavourList,
      flavourTotalPercentage: results.flavourTotalPercentage,
      totalBase: results.totalBase,
      totalBasePG: results.totalBasePG,
      totalBaseVG: results.totalBaseVG,
      nicotineInLiquid: results.nicotineInLiquid,
      title: liquid.name
    });
    resultsModal.present();
  }
}
