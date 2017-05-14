import { Component } from '@angular/core';
import { IonicPage,Platform, NavController, NavParams } from 'ionic-angular';
import { Login } from '../login/login';

/**
 * Generated class for the Loading page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class Loading {

  constructor(public platform:Platform,public navCtrl: NavController, public navParams: NavParams) {
    platform.ready().then(() => {
      console.log("Platform loaded");
      setTimeout(()=>{
        this.navCtrl.push(Login);
      },1000);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Loading');
  }

}
