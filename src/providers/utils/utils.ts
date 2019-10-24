import { Modal, Platform } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsProvider {
  constructor(private platform: Platform) {}

  subscribeOnce(modal: Modal) {
    let unsubscribe = this.platform.registerBackButtonAction(() => {
      modal.dismiss();
      modal.onWillDismiss(() => unsubscribe());
    });
  }
}
