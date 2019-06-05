import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
  constructor(private storage: Storage) {}

  checkFirstLaunch() {
    this.storage.get('firstLaunch').then((data) => {
      if (!data) {
        this.storage.clear().then(() => {
          this.storage.set('flavours', []);
          this.storage.set('liquids', []);
          this.storage.set('showFlavourMessage', true);
          this.storage.set('firstLaunch', true);
        });
      }
    });
  }
}
