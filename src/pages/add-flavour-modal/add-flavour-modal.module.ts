import { IonicPageModule } from "ionic-angular";

import { NgModule } from "@angular/core";

import { AddFlavourModalPage } from "./add-flavour-modal";

@NgModule({
  declarations: [AddFlavourModalPage],
  imports: [IonicPageModule.forChild(AddFlavourModalPage)]
})
export class AddFlavourModalPageModule {}
