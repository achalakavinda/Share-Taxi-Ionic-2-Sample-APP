import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';


/*custom imports
  All Custome Import are added bellow
*/

//login page
import { Login } from '../pages/login/login';

//register page
import { Register } from '../pages/register/register';

//tabs 
import { Tabs } from '../pages/tabs/tabs';

//home page
import { HomePage } from '../pages/home/home';

//payemnet page
import { Payment }  from '../pages/payment/payment';
//payment history
import { PaymentHistory } from '../pages/payment-history/payment-history';
//payment packages
import { PayementPackages } from '../pages/payement-packages/payement-packages';


//profile
import { Profile } from '../pages/profile/profile'; 

//share ride
import { ShareRatio } from '../pages/share-ratio/share-ratio';

// login Auth Service
import { AuthService } from '../providers/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Register,
    Tabs,
    Payment,
    PaymentHistory,
    PayementPackages,
    ShareRatio,
    Profile
  ],

  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Register,
    Tabs,
    Payment,
    PaymentHistory,
    PayementPackages,
    ShareRatio,
    Profile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
