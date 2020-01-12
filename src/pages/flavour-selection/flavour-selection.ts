import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Component } from "@angular/core";

import { FlavourProvider } from "../../providers/flavour/flavour";
import { LiquidProvider } from "../../providers/liquid/liquid";
import { StorageProvider } from "../../providers/storage/storage";

@IonicPage()
@Component({
  selector: "page-flavour-selection",
  templateUrl: "flavour-selection.html"
})
export class FlavourSelectionPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private flavourProvider: FlavourProvider
  ) {}

  public flavours = [];

  ionViewDidLoad() {
    this.flavourProvider.getAllFlavours().then(data => {
      this.flavours = data;
      console.log(data);
    });
  }
}
