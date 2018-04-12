import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

import { GeneralDriver } from '../general-driver/general-driver';
import { DriverUpcomingWindow } from '../driver-upcoming-window/driver-upcoming-window';
import { DriverPaymentWindow } from '../driver-payment-window/driver-payment-window';

/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {
  homePage = GeneralDriver;
  paymentPage = DriverPaymentWindow;
  upComingPage =  DriverUpcomingWindow;

  constructor(){

  }
  

}
