import {
  ActionSheetController,
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
} from 'ionic-angular';

import { Component } from '@angular/core';
import {
  NativePageTransitions,
  NativeTransitionOptions,
} from '@ionic-native/native-page-transitions';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Vibration } from '@ionic-native/vibration';

import { Flavour } from '../../models/Flavour';
import { FlavourProvider } from '../../providers/flavour/flavour';

@IonicPage()
@Component({
  selector: 'page-flavour-list',
  templateUrl: 'flavour-list.html',
})
export class FlavourListPage {
  public flavours = [];
  check = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private flavoursProvider: FlavourProvider,
    public actionSheedCtrl: ActionSheetController,
    private socialShare: SocialSharing,
    public alertCtrl: AlertController,
    private vibrateCtrl: Vibration,
    private nativeTransitions: NativePageTransitions,
    private modalCtrl: ModalController,
  ) {}

  ionViewDidLoad() {
    this.getFlavours();
  }

  getFlavours() {
    this.flavoursProvider.getAllFlavours().then((data) => {
      this.flavours = data.reverse();
      /* data.forEach((element) => {
        for (let i = 0; i < 20; i++) {
          this.flavours.push(element);
        }
      }); */
    });
  }

  onItemLongClick(flavour) {
    if (this.check) {
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
                isEditModal: true,
              });

              modal.present();
              modal.onDidDismiss(() => this.getFlavours());
            },
          },
          {
            text: flavour.isFavourite
              ? 'Quitar aroma de favoritos'
              : 'Añadir aroma a favoritos',
            icon: 'star',
            handler: () =>
              this.updateFlavourFavourite(
                flavour,
                flavour.isFavourite ? false : true,
              ),
          },
          {
            text: 'Compartir',
            icon: 'share',
            handler: () => {
              let message =
                '- Aroma: ' +
                flavour.name +
                '\n- Marca: ' +
                flavour.brand +
                '\n- Proporción: ' +
                flavour.proportion +
                '%\n\nCompartido mediante VapeLab';
              this.socialShare.share(message, '¡Mira este aroma de VapeLab!');
            },
          },
          {
            text: 'Eliminar',
            icon: 'trash',
            role: 'destructive',
            handler: () => {
              this.alertCtrl
                .create({
                  title: 'Eliminar aroma',
                  message: '¿Seguro que quieres eliminar este aroma?',
                  buttons: [
                    {
                      text: 'Eliminar',
                      handler: (data) => {
                        this.flavoursProvider.deleteFlavour(flavour);
                        let index = this.flavours
                          .map((flavour) => {
                            return flavour.name;
                          })
                          .indexOf(flavour.name);
                        this.flavours.splice(index, 1);
                      },
                    },
                    {
                      text: 'Cancelar',
                    },
                  ],
                })
                .present();
            },
          },
        ],
      });
      actionSheet.present();
    }
  }

  onItemLongClickRelease() {
    this.check = true;
  }

  openModal() {
    let modal = this.modalCtrl.create('AddFlavourModalPage', {
      isCreationScreen: true,
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

  updateFlavourFavourite(flavour, isFavourite) {
    let newFlavour = flavour;

    flavour.isFavourite = isFavourite;
    newFlavour.isFavourite = isFavourite;

    this.flavoursProvider.updateFlavour(flavour, newFlavour);
  }
}
