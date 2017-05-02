import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';

/**
 * Generated class for the ProfileHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-home',
  templateUrl: 'profile-home.html',
})
export class ProfileHome {

  constructor(public navCtrl: NavController, public navParams: NavParams,public Auth:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileHome');
  }


  logout(){
    console.log('log out call');
    this.Auth.logout();
    this.navCtrl.push(Login);
  }

}
