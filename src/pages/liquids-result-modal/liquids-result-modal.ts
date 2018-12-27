import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Component } from '@angular/core';
import { Liquid } from '../../models/Liquid';

@IonicPage()
@Component({
  selector: 'page-liquids-result-modal',
  templateUrl: 'liquids-result-modal.html',
})
export class LiquidsResultModalPage {
  liquid:Liquid;
  nicotineMl:number = 0;
  mlFlavourList:Array<Object> = [];
  flavourTotalPercentage:number = 0;
  totalBase:number = 0;
  totalBasePG:number = 0;
  totalBaseVG:number = 0;

  nicotineInLiquid:boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController) {
      this.liquid = navParams.get("liquid");
  }

  ionViewDidLoad() {
    this.calculateELiquid();
  }

  calculateELiquid() {
    if(this.liquid.totalNicotine == 0)
      this.nicotineInLiquid = false;

    let totalFlavourMl = 0;

    this.nicotineMl = (this.liquid.totalNicotine * this.liquid.totalQuantity) / this.liquid.nicokitConcentration;
    
    this.liquid.flavours.forEach((flavour) => {
      this.flavourTotalPercentage += flavour.proportion;

      let flavourMl = flavour.proportion * this.liquid.totalQuantity / 100;
      totalFlavourMl += flavourMl;

      this.mlFlavourList.push({
        flavour: flavour,
        quantity: flavourMl
      });
    });

    this.totalBase = this.liquid.totalQuantity - this.nicotineMl - totalFlavourMl;
    this.totalBasePG = (this.liquid.basePG * this.totalBase) / 100;
    this.totalBaseVG = (this.liquid.baseVG * this.totalBase) / 100;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
