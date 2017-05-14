import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { DriverShareTabs } from '../pages/driver-share-tabs/driver-share-tabs';
import { Main } from '../pages/main/main';
import { Loading } from '../pages/loading/loading';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Loading;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

