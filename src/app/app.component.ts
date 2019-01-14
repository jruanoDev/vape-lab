import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, ViewController } from 'ionic-angular';

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
        
        this.nav.viewDidEnter.subscribe((view: ViewController) => {
          this.changeMenuSelection(view.name);
        });
    });
  }

  openPage(page) {
    if(this.nav.getActive().name != page) {
      if(page == 'HomePage') {
        this.nav.push(HomePage);
      } else {
        this.nav.push(page).then(() => {
          this.removePreviousView();
        });
      }
    }
  }

  removePreviousView() {
    let previousPage = this.nav.getPrevious(this.nav.getActive());
    if(this.nav.getPrevious() != null && previousPage.name != 'HomePage')
      previousPage.dismiss();
  }

  changeMenuSelection(viewName) {
    let menuElements = document.querySelectorAll('.menu-button');

    [].forEach.call(menuElements, function(element) {
      element.classList.remove('active');

      if(element.getAttribute('data-page') == viewName)
        element.classList.add('active');
    });
  }
}

