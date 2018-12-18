import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TotalLiquidCalculatorPage } from '../total-liquid-calculator/total-liquid-calculator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipes = [
    {
      flavour:  {
        name: "Don Juan Reserve",
        proportion: 15,
        brand: "King's Crest"
      },
      name: "Receta Don Juan",
      createdAt: Date.now(),
      basePG: 50,
      baseVG: 50,
      nicotine: 3,
      nicokitProportion: 20,
      nicokitPG: 20,
      nicokitVG: 80,
      liquidQuantity: 300
    }
  ];
  constructor(public navCtrl: NavController) {

  }

  openPage(page:string) {
    switch(page) {
      case 'totalLiquid':
        this.navCtrl.push(TotalLiquidCalculatorPage);
        break;
    }
  }

}
