import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { MessageHander } from '../../providers/message-hander';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  createSuccess = false;
  registerCredentials = {
    email: '',
    username:'',
    password: '',
    comfirmPassword:'',
    gender:''
  };



  constructor(
    private nav: NavController,
    private msgHandler:MessageHander
  ) {
    
}
register(){
    this.msgHandler.showLoading();
  // this.angFire.auth.createUser({
  //   email:this.registerCredentials.email ,
  //   password:this.registerCredentials.password
  // }).then(()=>{
  //   let data= this.angFire.auth.getAuth();
  //   console.log(this.registerCredentials.gender);
  //   let imgURL ='';
  //   if(this.registerCredentials.gender  === 'm'){
  //     imgURL='http://homelasa.mi.infn.it/images/imageslasa/donna.png';
  //   }else{
  //     imgURL='http://www.iconsfind.com/wp-content/uploads/2015/10/20151012_561baed03a54e.png';
  //   }

  //    this.contactList.push({
  //     uid:data.uid,
  //     username:this.registerCredentials.username,
  //     gender:this.registerCredentials.gender,
  //     driver:false,
  //     img:imgURL
  //   }).then((()=>{
  //     this.createSuccess = true;
  //       this.showPopup("Success", "Account created.");
  //      this.msgHandler.dissmisLoading();
  //   }),error=>{
  //     console.log(error);
  //   });
  // });
}

  showPopup(title, text) {
   let alert = this.msgHandler.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

}
