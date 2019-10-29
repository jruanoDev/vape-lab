import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { DirectivesModule } from '../directives/directives.module';
import { HomePage } from '../pages/home/home';
import { CalculatorProvider } from '../providers/calculator/calculator';
import { FlavourProvider } from '../providers/flavour/flavour';
import { LiquidProvider } from '../providers/liquid/liquid';
import { StorageProvider } from '../providers/storage/storage';
import { UtilsProvider } from '../providers/utils/utils';
import { MyApp } from './app.component';

@NgModule({
  declarations: [MyApp, HomePage],
  imports: [
    BrowserModule,
    DirectivesModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'vapeBookDB',
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StorageProvider,
    FlavourProvider,
    LiquidProvider,
    CalculatorProvider,
    UtilsProvider,
  ],
})
export class AppModule {}
