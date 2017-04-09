import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading,NavParams  } from 'ionic-angular';

//my import
//import auth service
//import home and login pages
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
import { Register } from '../register/register';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loading: Loading;
  registerCredentials = {email: '', password: ''};

  constructor(public nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController,public navParams: NavParams) {
  }

  //client registration new page
  public createAccount(){
    this.nav.push(Register);
  }

  //user login
  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(HomePage)
          });
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  //show loading
  public showLoading(){
    this.loading = this.loadingCtrl.create({content: 'Please wait...'});
    this.loading.present();
  }

  private showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }



}
