import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalVariables } from '../../providers/local-variables';

//page import
import { General } from '../general/general';
import { DriverShareTabs } from '../driver-share-tabs/driver-share-tabs';
import { DriverPickRide } from '../driver-pick-ride/driver-pick-ride';
import { ProfileHome } from  '../profile-home/profile-home';
import { PaymentNormal } from '../payment-normal/payment-normal';
import { PaymentDriver } from '../payment-driver/payment-driver';
import { PaymentShared } from '../payment-shared/payment-shared';
import { TestView } from '../test-view/test-view';


/**
 * Generated class for the Main page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class Main {
  private USER = true;
  private rootPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private localVariables: LocalVariables) {
    this.rootPage = General;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
  }

  openPage(PageName) {

    if (PageName == 'DriverShareTabs') {
      this.navCtrl.push(DriverShareTabs);
    } else if (PageName === 'Profile') {
      this.navCtrl.push(ProfileHome);
    } else if (PageName === 'DriverPayment') {
      this.navCtrl.push(PaymentDriver);
    }else if (PageName === 'PaymentShared') {
      this.navCtrl.push(PaymentShared);
    } else if (PageName === 'Payment') {
      this.navCtrl.push(PaymentNormal);
    }else if (PageName ==='PickRide'){
      this.navCtrl.push(DriverPickRide);
    }else if(PageName === 'test'){
      this.navCtrl.push(TestView);
    }
  }

}
