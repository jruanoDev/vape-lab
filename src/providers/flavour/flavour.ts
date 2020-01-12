import { Flavour } from '../../models/Flavour';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FlavourProvider {

  constructor(private storage: Storage) {}

  getAllFlavours() {
    return this.storage.get('flavours');
  }
  
  saveFlavour(flavour: Flavour) {
    let flavours = [];
    this.storage.get('flavours')
      .then((data) => {
        flavours = data;
        flavours.push(flavour);
        this.storage.set('flavours', flavours);
      });
  }

  deleteFlavour(flavour) {
    return new Promise((resolve, reject) => {
      let flavours = [];
      let index;

      this.storage.get('flavours')
      .then((data) => {
        flavours = data;
        index = data.map((flavour) => { return flavour.name }).indexOf(flavour.name);
        
        flavours.splice(index, 1);
        this.storage.set('flavours', flavours)
          .then(() => resolve())
          .catch((err) => reject(err));
      });
    })
  }

  updateFlavour(flavour: Flavour, newFlavour: Flavour) {
    return new Promise((resolve, reject) => {
      this.deleteFlavour(flavour)
      .then(() => {
        this.saveFlavour(newFlavour);
        resolve();
      })
      .catch((err) => reject(err));
    })
  }
}
