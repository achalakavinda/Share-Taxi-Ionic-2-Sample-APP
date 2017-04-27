import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, Loading,NavParams  } from 'ionic-angular';

//my import
//import auth service
//import home and login pages
import { AuthService } from '../../providers/auth-service';
import { AuthHttpService } from '../../providers/auth-http-service'
import { Register } from '../register/register';
import { Main } from "../main/main";
import { LocalVariables } from '../../providers/local-variables';
import { Storage } from '@ionic/storage';
import {main} from "@angular/compiler-cli/src/main";


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
  registerCredentials = {email: 'achalakavinda25r@gmail.com', password: 'Zte0811!'};

  constructor(
    public nav: NavController,
    private auth: AuthService,
    private httpAuth :AuthHttpService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    public storage:Storage
  ) {
  }

  //client registration new page
  public createAccount(){
    this.nav.push(Register);
  }

  //user login

/*
  public login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(Main);
          });
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }*/

public login(){
  this.showLoading();
  this.auth.login(this.registerCredentials).then((response)=>{
    console.log(JSON.stringify(response));
    this.loading.dismiss();
    this.storage.set('uid',response.uid);
    this.nav.setRoot(Main);
  }).catch((err)=>{
    console.log(err)
    this.loading.dismiss;
    this.showError("Invalide user!");
  });
  console.log();
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
