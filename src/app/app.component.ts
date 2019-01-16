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
      statusBar.backgroundColorByHexString('#efefef');
      splashScreen.hide();
      
      this.nav.viewDidEnter.subscribe((view: ViewController) => {
        let viewName = view.id;

        if(view.instance instanceof HomePage)
          viewName = 'HomePage';

        this.changeMenuSelection(viewName);
      });
    });
  }

  openPage(page) {
    let activePageName = this.nav.getActive().id;

    if(this.nav.getActive().instance instanceof HomePage)
      activePageName = 'HomePage';

    if(activePageName != page) {
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
    let previousPageName = previousPage.id;

    if(previousPage.instance instanceof HomePage) 
      previousPageName = 'HomePage';

    if(this.nav.getPrevious() != null && previousPageName != 'HomePage')
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

