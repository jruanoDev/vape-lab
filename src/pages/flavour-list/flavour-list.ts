import { ActionSheetController, AlertController, IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Component } from '@angular/core';
import { FlavourProvider } from '../../providers/flavour/flavour';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-flavour-list',
  templateUrl: 'flavour-list.html',
})
export class FlavourListPage {

  public flavours = [];
  check = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private flavoursProvider: FlavourProvider,
              public actionSheedCtrl: ActionSheetController,
              private socialShare: SocialSharing,
              public alertCtrl: AlertController,
              private vibrateCtrl: Vibration,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.getFlavours();
  }

  getFlavours() {
    this.flavoursProvider.getAllFlavours().then(data => this.flavours = data);
  }

  onItemLongClick(flavour) {
    if(this.check) {
      this.check = false;

      this.vibrateCtrl.vibrate(30);

      let actionSheet = this.actionSheedCtrl.create({
        buttons: [
          {
            text: 'Editar',
            icon: 'create',
            handler: () => {
              let modal = this.modalCtrl.create('AddFlavourModalPage', {
                flavour: flavour,
                isEditModal: true
              });

              modal.present();
              modal.onDidDismiss(() => this.getFlavours());
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
            text: 'Eliminar',
            icon: 'trash',
            role: 'destructive',
            handler: () => {
              this.alertCtrl.create({
                title: 'Eliminar aroma',
                message: '¿Seguro que quieres eliminar este aroma?',
                buttons: [
                  {
                    text: 'Eliminar',
                    handler: data => {
                      this.flavoursProvider.deleteFlavour(flavour);
                      let index = this.flavours.map((flavour) => { return flavour.name }).indexOf(flavour.name);
                      this.flavours.splice(index, 1);
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

   /* openResultsModal(liquid) {
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
  }  */

}
