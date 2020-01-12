import { Injectable } from '@angular/core';
import { Liquid } from '../../models/Liquid';
import { Storage } from '@ionic/storage';

@Injectable()
export class LiquidProvider {

  constructor(private storage: Storage) {}

  saveLiquid(liquid: Liquid) {
    let liquids = [];
    this.storage.get('liquids')
      .then((data) => {
        liquids = data;
        liquids.push(liquid);
        this.storage.set('liquids', liquids);
      });
  }

  getAllLiquids() {
    return this.storage.get('liquids');
  }

  deleteLiquid(liquid) {
    return new Promise((resolve, reject) => {
      let liquids = [];
      let index;

      this.storage.get('liquids')
      .then((data) => {
        liquids = data;
        index = data.map((liquid) => { return liquid.name }).indexOf(liquid.name);
        
        liquids.splice(index, 1);
        this.storage.set('liquids', liquids)
          .then(() => resolve())
          .catch((err) => reject(err));
      });
    })
  }

  updateLiquid(liquid: Liquid, newLiquid: Liquid) {
    return new Promise((resolve, reject) => {
      this.deleteLiquid(liquid)
      .then(() => {
        this.saveLiquid(newLiquid);
        resolve();
      })
      .catch((err) => reject(err));
    })
  }
}
