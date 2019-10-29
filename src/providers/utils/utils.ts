import { AlertController, Modal, Platform } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { globalConfig } from '../../config';

@Injectable()
export class UtilsProvider {
  constructor(
    private platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController,
  ) {}

  subscribeOnce(modal: Modal): void {
    let unsubscribe = this.platform.registerBackButtonAction(() => {
      modal.dismiss();
      modal.onWillDismiss(() => unsubscribe());
    });
  }

  showRatingAlert(): void {
    this.storage
      .get('ratingDone')
      .then((ratingDone) => {
        if (ratingDone !== true) {
          this.incrementRatingCount();

          this.storage.get('ratingCount').then((data) => {
            if (data >= globalConfig.RATING_VIEW_INTERVAL) {
              this.resetRatingCount();

              this.alertCtrl
                .create({
                  message: `<h3 class="rating-title">Tu opinión puede ayudar mucho</h3>\nSi quieres, puedes valorar VapeLab en Google Play, <b>¡sólo te llevará 1 minuto!</b>`,
                  buttons: [
                    {
                      text: 'No en este momento',
                      role: 'cancel',
                    },
                    {
                      cssClass: 'rating-accept',
                      text: '¡Valorar ahora!',
                      handler: () => {
                        window.open(
                          'https://play.google.com/store/apps/details?id=com.github.jruanodev&hl=es',
                          '_system',
                        );
                        this.storage.set('ratingDone', true);
                      },
                    },
                  ],
                })
                .present();
            }
          });
        }
      })
      .catch(() => null);
  }

  private async resetRatingCount() {
    await this.storage.set('ratingCount', 0);
  }

  private incrementRatingCount(): void {
    this.storage
      .get('ratingCount')
      .then((data) => {
        this.storage.set('ratingCount', data + 1).catch(() => null);
      })
      .catch(() => null);
  }
}
