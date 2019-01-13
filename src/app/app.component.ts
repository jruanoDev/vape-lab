import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, ViewController } from 'ionic-angular';
import { Observable, merge } from 'rxjs';

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

        let navigationEvents = Observable.merge(
          this.nav.viewDidEnter, 
          this.nav.viewDidLeave
        );

        /* MEJORAR ESTO, ES EL MÉTODO CORRECTO PERO HAY QUE IMPLEMENTARLO BIEN */

        navigationEvents.subscribe((view: ViewController) => {
          console.log(view.name);
        });
    });
  }

  openPage(page) {
    if(this.nav.getActive().name != page) {
      if(page == 'HomePage') {
        this.nav.push(HomePage).then(() => {
          this.changeMenuSelection();
        });
      } else {
        this.nav.push(page).then(() => {
          this.changeMenuSelection();
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

  changeMenuSelection() {
    let menuElements = document.querySelectorAll('.menu-button');
    let activePage = this.nav.getActive().name;

    [].forEach.call(menuElements, function(element) {
      element.classList.remove('active');

      if(element.getAttribute('data-page') == activePage)
        element.classList.add('active');
    });
  }
}

