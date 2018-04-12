import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

import { FirebaseGetter } from '../../providers/firebase-getter';

/**
 * Generated class for the TestView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-test-view',
  templateUrl: 'test-view.html',
})
export class TestView {

  constructor(public navCtrl: NavController, public navParams: NavParams,private fireGetter:FirebaseGetter) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestView');
    console.log(this.fireGetter.getAllActiveShareRideForDrivers());
  }

  loger(){
    this.navCtrl.setRoot(Login);
  }

}
