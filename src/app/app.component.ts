import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen) {
      platform.ready().then(() => {
        statusBar.styleDefault();
        statusBar.backgroundColorByHexString('#ffffff');
        splashScreen.hide();
    });
  }

  openPage(event, page) {
    this.changeMenuSelection(event);

    /* FALLA AL COMPARAR LA PANTALLA ACTIVA Y
       AL ELIMINAR LA PANTALLA ANTERIOR */

    if(this.nav.getActive().name != page) {
      if(page == 'HomePage') {
        this.nav.push(HomePage);
      } else {
        this.nav.push(page);
        console.log(this.nav.getPrevious().name);
      }
    }
  }

  changeMenuSelection(event) {
    let menuElements = document.querySelectorAll('.menu-button');
    [].forEach.call(menuElements, function(element) {
      element.classList.remove('active');
    });

    event.path[2].classList.add('active');
  }
}

