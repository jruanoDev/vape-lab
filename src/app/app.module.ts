import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AddFlavourModalPage } from '../pages/add-flavour-modal/add-flavour-modal';
import { BrowserModule } from '@angular/platform-browser';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import { LiquidsResultModalPage } from '../pages/liquids-result-modal/liquids-result-modal';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TotalLiquidCalculatorPage } from '../pages/total-liquid-calculator/total-liquid-calculator';
import { StorageProvider } from '../providers/storage/storage';
import { FlavourProvider } from '../providers/flavour/flavour';
import { LiquidProvider } from '../providers/liquid/liquid';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TotalLiquidCalculatorPage,
    AddFlavourModalPage,
    LiquidsResultModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'vapeBookDB',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TotalLiquidCalculatorPage,
    AddFlavourModalPage,
    LiquidsResultModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    FlavourProvider,
    LiquidProvider
  ]
})
export class AppModule {}
