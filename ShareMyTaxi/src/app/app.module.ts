import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
/*
 * All the important services are imports in here
 * */
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from "@angular/http";
import { Storage } from  '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

import { AuthService } from '../providers/auth-service';
import { DynamicMap } from '../providers/dynamic-map';
import { FireLoader } from '../providers/fire-loader';
import { FirebaseHandler } from '../providers/firebase-handler';
import { FirebaseGetter } from '../providers/firebase-getter';
import { FirebaseSetter } from '../providers/firebase-setter';
import { FirebasePusher } from '../providers/firebase-pusher';
import { FirebaseDelete } from '../providers/firebase-delete';
import { LocalVariables } from '../providers/local-variables';
import { MessageHander } from '../providers/message-hander';
import { PaymentGenerator } from '../providers/payment-generator';
import { UserHandler } from '../providers/user-handler';
//Active panels for the both of passenger and driver are imported bellow!
import { Loading } from '../pages/loading/loading'
import { ActiveShareRide } from '../pages/active-share-ride/active-share-ride';
import { ActivePickRide } from '../pages/active-pick-ride/active-pick-ride';
import { ActiveDriverShareRide } from '../pages/active-driver-share-ride/active-driver-share-ride';
import { Main } from '../pages/main/main';
import { General } from '../pages/general/general';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Tabs } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ProfileHome } from '../pages/profile-home/profile-home';
import { ShareRatio } from '../pages/share-ratio/share-ratio';
import { ShareHome } from '../pages/share-home/share-home';
import { ShareRideJoin } from '../pages/share-ride-join/share-ride-join';
import { JoinMapView } from '../pages/join-map-view/join-map-view';
import { DriverMapView } from '../pages/driver-map-view/driver-map-view';
import { DriverShareTabs } from '../pages/driver-share-tabs/driver-share-tabs';
import { DriverShareRide } from '../pages/driver-share-ride/driver-share-ride';
import { DriverShareRideUpcoming } from '../pages/driver-share-ride-upcoming/driver-share-ride-upcoming';
import { DriverShareRideSelected } from '../pages/driver-share-ride-selected/driver-share-ride-selected';
import { PaymentNormal } from '../pages/payment-normal/payment-normal';
import { PaymentDriver } from '../pages/payment-driver/payment-driver';
import { PaymentShared } from '../pages/payment-shared/payment-shared';
import { PickHome } from '../pages/pick-home/pick-home';
import { DriverPickRide } from '../pages/driver-pick-ride/driver-pick-ride';
import { TestView } from '../pages/test-view/test-view';



@NgModule({
  declarations: [
    MyApp,
    Loading,
    Main,
    General,
    ActiveShareRide,
    ActivePickRide,
    ActiveDriverShareRide,
    HomePage,
    Login,
    Register,
    Tabs,
    ShareHome,
    ShareRatio,
    ShareRideJoin,
    JoinMapView,
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
    PaymentShared,
    TestView
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Loading,
    Main,
    General,
    ActiveShareRide,
    ActivePickRide,
    ActiveDriverShareRide,
    HomePage,
    Login,
    Register,
    Tabs,
    ShareHome,
    ShareRideJoin,
    ShareRatio,
    JoinMapView,
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
    PaymentShared,
    TestView
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    FirebaseHandler,
    FirebaseSetter,
    FirebaseGetter,
    FirebasePusher,
    FirebaseDelete,
    Geolocation,
    LocalVariables,
    MessageHander,
    FireLoader,
    DynamicMap,
    PaymentGenerator,
    UserHandler,
    Storage
  ]
})
export class AppModule {}
