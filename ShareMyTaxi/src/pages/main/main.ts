import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalVariables } from '../../providers/local-variables';
//page import
import { General } from '../general/general';
import { Payment } from  '../payment/payment';
import { DriverShareTabs } from '../driver-share-tabs/driver-share-tabs';
import { ProfileHome } from  '../profile-home/profile-home';

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
  private USER =true;
  private rootPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private localVariables: LocalVariables) {
    this.rootPage = General;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
  }

  openPage(PageName){

    if(PageName==='Payment' && this.USER){
      this.navCtrl.push(Payment);
    }else if(PageName=='DriverShareTabs'){
      this.navCtrl.push(DriverShareTabs);
    }else if (PageName==='Profile'){
      this.navCtrl.push(ProfileHome);
    }

  }
}
