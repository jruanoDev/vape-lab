import { AlertController, Modal, Platform } from 'ionic-angular';

import { Injectable } from '@angular/core';
import HttpClient from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

import { globalConfig } from '../../config';

@Injectable()
export class UtilsProvider {
  constructor(
    private platform: Platform,
    private storage: Storage,
    private alertCtrl: AlertController,
    private inAppBrowser: InAppBrowser,
  ) {}

  subscribeOnce(modal: Modal): void {
    let unsubscribe = this.platform.registerBackButtonAction(() => {
      modal.dismiss();
      modal.onWillDismiss(() => unsubscribe());
    });
  }

  showRatingAlert(): void {
    this.incrementRatingCount();

    this.storage.get('ratingCount').then((data) => {
      if (data >= globalConfig.RATING_VIEW_INTERVAL) {
        this.resetRatingCount();

        this.alertCtrl
          .create({
            title: '¡Valora VapeLab!',
            message:
              'Tu opinión puede ayudar mucho, si quieres, puedes valorar VapeLab en Google Play, ¡sólo te llevará 1 minuto!',
            buttons: [
              {
                text: 'No en este momento',
                role: 'cancel',
              },
              {
                text: '¡Valorar ahora!',
                handler: () => {
                  this.inAppBrowser.create(
                    'https://play.google.com/store/apps/details?id=com.github.jruanodev',
                  );
                },
              },
            ],
          })
          .present();
      }
    });
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
