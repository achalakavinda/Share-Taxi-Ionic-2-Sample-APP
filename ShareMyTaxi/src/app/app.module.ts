import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
/*
* Fire Base Configuration
* */
export const firebaseConfig={
  apiKey: "AIzaSyB-KCKrSIswArC3WTOOyKPBmNUihVhTglQ",
  authDomain: "sharetaxi-cdc6f.firebaseapp.com",
  databaseURL: "https://sharetaxi-cdc6f.firebaseio.com",
  projectId: "sharetaxi-cdc6f",
  storageBucket: "sharetaxi-cdc6f.appspot.com",
  messagingSenderId: "787464864609"
};

import { AngularFireModule } from 'angularfire2';
import { HttpModule } from "@angular/http";
import { Storage } from  '@ionic/storage';

/*
  All Custom Import are added bellow
*/

//active pannels
import { ActiveShareRide } from '../pages/active-share-ride/active-share-ride';
import { ActivePickRide } from '../pages/active-pick-ride/active-pick-ride';

//main page includes main menu
import { Main } from '../pages/main/main';
//general page
import { General } from '../pages/general/general';
//login page
import { Login } from '../pages/login/login';
//register page
import { Register } from '../pages/register/register';
//tabs
import { Tabs } from '../pages/tabs/tabs';
//home page
import { HomePage } from '../pages/home/home';
//profile
import { ProfileHome } from '../pages/profile-home/profile-home';
//share ride
import { ShareRatio } from '../pages/share-ratio/share-ratio';
//share home
import { ShareHome } from '../pages/share-home/share-home';


//driver
import { DriverMapView } from '../pages/driver-map-view/driver-map-view';
//share ride driver tabs
import { DriverShareTabs } from '../pages/driver-share-tabs/driver-share-tabs';
//share ride driver
import { DriverShareRide } from '../pages/driver-share-ride/driver-share-ride';
//share ride selected
import { DriverShareRideUpcoming } from '../pages/driver-share-ride-upcoming/driver-share-ride-upcoming';
//share ride driver selected
import { DriverShareRideSelected } from '../pages/driver-share-ride-selected/driver-share-ride-selected';

/*
* Payemnet part import module
* */
import { PaymentNormal } from '../pages/payment-normal/payment-normal';
import { PaymentDriver } from '../pages/payment-driver/payment-driver';
import { PaymentShared } from '../pages/payment-shared/payment-shared';

//pick home
import { PickHome } from '../pages/pick-home/pick-home';
import { DriverPickRide } from '../pages/driver-pick-ride/driver-pick-ride';

/*
*Services
*
* */
import { AuthService } from '../providers/auth-service';
import { AuthHttpService } from '../providers/auth-http-service';
import { LocalVariables } from '../providers/local-variables';
import { FireLoader } from '../providers/fire-loader';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    Main,
    General,
    ActiveShareRide,
    ActivePickRide,
    HomePage,
    Login,
    Register,
    Tabs,
    ShareHome,
    ShareRatio,
    DriverMapView,
    DriverShareTabs,
    DriverShareRide,
    DriverShareRideUpcoming,
    DriverShareRideSelected,
    DriverPickRide,
    ProfileHome,
    PickHome,
    PaymentNormal,
    PaymentDriver,
    PaymentShared
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    HttpModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Main,
    General,
    ActiveShareRide,
    ActivePickRide,
    HomePage,
    Login,
    Register,
    Tabs,
    ShareHome,
    ShareRatio,
    DriverMapView,
    DriverShareTabs,
    DriverShareRide,
    DriverShareRideUpcoming,
    DriverShareRideSelected,
    DriverPickRide,
    ProfileHome,
    PickHome,
    PaymentNormal,
    PaymentDriver,
    PaymentShared
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthHttpService,
    Geolocation,
    LocalVariables,
    FireLoader,
    Storage
  ]
})
export class AppModule {}
