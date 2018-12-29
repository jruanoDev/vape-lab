import { Flavour } from '../../models/Flavour';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FlavourProvider {

  constructor(private storage: Storage) {}

  saveFlavour(flavour: Flavour) {
    let flavours = [];
    this.storage.get('flavours')
      .then((data) => {
        flavours = data;
        flavours.push(flavour);
        this.storage.set('flavours', flavours);
      });
  }

}
