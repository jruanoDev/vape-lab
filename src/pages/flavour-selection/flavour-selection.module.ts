import { IonicPageModule } from "ionic-angular";

import { NgModule } from "@angular/core";

import { FlavourSelectionPage } from "./flavour-selection";

@NgModule({
  declarations: [FlavourSelectionPage],
  imports: [IonicPageModule.forChild(FlavourSelectionPage)]
})
export class FlavourSelectionPageModule {}
