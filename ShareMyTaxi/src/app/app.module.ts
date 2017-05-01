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


/*
  All Custom Import are added bellow
*/
import { HttpModule } from "@angular/http";

import { Storage } from  '@ionic/storage';
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
//payment page
import { Payment }  from '../pages/payment/payment';
//payment history
import { PaymentHistory } from '../pages/payment-history/payment-history';
//payment packages
import { PayementPackages } from '../pages/payement-packages/payement-packages';
//profile
import { Profile } from '../pages/profile/profile';
//share ride
import { ShareRatio } from '../pages/share-ratio/share-ratio';
//share home
import { ShareHome } from '../pages/share-home/share-home';
//share ride driver tabs
import { DriverShareTabs } from '../pages/driver-share-tabs/driver-share-tabs';
//share ride driver
import { DriverShareRide } from '../pages/driver-share-ride/driver-share-ride';
//share ride selected
import { DriverShareRideUpcoming } from '../pages/driver-share-ride-upcoming/driver-share-ride-upcoming';
//share ride driver selected
import { DriverShareRideSelected } from '../pages/driver-share-ride-selected/driver-share-ride-selected';


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
    HomePage,
    Login,
    Register,
    Tabs,
    Payment,
    PaymentHistory,
    PayementPackages,
    ShareHome,
    ShareRatio,
    DriverShareTabs,
    DriverShareRide,
    DriverShareRideUpcoming,
    DriverShareRideSelected,
    Profile
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
    HomePage,
    Login,
    Register,
    Tabs,
    Payment,
    PaymentHistory,
    PayementPackages,
    ShareHome,
    ShareRatio,
    DriverShareTabs,
    DriverShareRide,
    DriverShareRideUpcoming,
    DriverShareRideSelected,
    Profile
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
