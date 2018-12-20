import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AddFlavourModalPage } from '../pages/add-flavour-modal/add-flavour-modal';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TotalLiquidCalculatorPage } from '../pages/total-liquid-calculator/total-liquid-calculator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TotalLiquidCalculatorPage,
    AddFlavourModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TotalLiquidCalculatorPage,
    AddFlavourModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
