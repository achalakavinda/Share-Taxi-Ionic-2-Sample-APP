import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
/*
  Generated class for the MessageHander provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MessageHander {
  loading: Loading;
  constructor(
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
  ) {
    console.log('Message Hander Provider');
  }

  //show loading
  public showLoading(){
    this.loading = this.loadingCtrl.create({content: 'Please wait...'});
    this.loading.present();
  }

  public dissmisLoading(){
    this.loading.dismiss().catch((e)=>{
      console.log(e);
    });
  }

  public showError(text) {
    setTimeout(() => {
      this.loading.dismiss().catch((e)=>{
        console.log(e);
      });
    });
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
