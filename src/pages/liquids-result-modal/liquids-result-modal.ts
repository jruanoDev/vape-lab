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
  title: string = "";

  nicotineInLiquid:boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController) {
      this.nicotineMl = navParams.get("nicotineMl");
      this.mlFlavourList = navParams.get("mlFlavourList");
      this.flavourTotalPercentage = navParams.get("flavourTotalPercentage");
      this.totalBase = navParams.get("totalBase");
      this.totalBasePG = navParams.get("totalBasePG");
      this.totalBaseVG = navParams.get("totalBaseVG");
      this.nicotineInLiquid = navParams.get("nicotineInLiquid");      
      this.liquid = navParams.get("liquid");
      this.title = navParams.get("title");
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
