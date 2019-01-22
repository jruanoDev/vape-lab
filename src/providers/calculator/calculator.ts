import { Injectable } from '@angular/core';
import { Liquid } from '../../models/Liquid';

@Injectable()
export class CalculatorProvider {

  constructor() {}

  calculateQuantities(liquid: Liquid) {
    let nicotineMl:number = 0;
    let mlFlavourList:Array<Object> = [];
    let flavourTotalPercentage:number = 0;
    let totalBase:number = 0;
    let totalBasePG:number = 0;
    let totalBaseVG:number = 0;
    let nicotineInLiquid:boolean = true;
    let totalFlavourMl = 0;
    let flavourMl = 0;
    let totalCalc = 0;

    if(liquid.totalNicotine == 0)
      nicotineInLiquid = false;

    nicotineMl = (liquid.totalNicotine * liquid.totalQuantity) 
      / liquid.nicokitConcentration;
    
    liquid.flavours.forEach((flavour) => {
      flavourTotalPercentage += flavour.proportion;

      flavourMl = flavour.proportion * liquid.totalQuantity / 100;
      totalFlavourMl += flavourMl;

      mlFlavourList.push({
        flavour: flavour,
        quantity: flavourMl
      });
    });

    totalBase = this.roundTwoDecimals(liquid.totalQuantity - nicotineMl - totalFlavourMl);
    totalBasePG = this.roundTwoDecimals((liquid.basePG * totalBase) / 100);
    totalBaseVG = this.roundTwoDecimals((liquid.baseVG * totalBase) / 100);

    totalCalc = nicotineMl + totalFlavourMl;

    if(liquid.totalQuantity < totalCalc) {  
      return null;
    } else {
      let results = {
        nicotineMl: nicotineMl,
        mlFlavourList: mlFlavourList,
        flavourTotalPercentage: flavourTotalPercentage,
        totalBase: totalBase,
        totalBasePG: totalBasePG,
        totalBaseVG: totalBaseVG,
        nicotineInLiquid: nicotineInLiquid,
        totalFlavourMl: totalFlavourMl,
        flavourMl: flavourMl,
        totalCalc: totalCalc
      };

      return results;
    }
  }

  roundTwoDecimals(number) {
    return Math.round(number * 100) / 100;
  }

}
