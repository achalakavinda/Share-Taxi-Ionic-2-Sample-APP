import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Loading } from '../pages/loading/loading';

import { DraggableMap } from '../pages/draggable-map/draggable-map'


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

