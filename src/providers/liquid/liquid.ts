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
}
