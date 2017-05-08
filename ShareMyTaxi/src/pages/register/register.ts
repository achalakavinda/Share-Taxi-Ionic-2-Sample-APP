import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { MessageHander } from '../../providers/message-hander';
import { AuthService } from '../../providers/auth-service';
import { FirebasePusher } from '../../providers/firebase-pusher';

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
    private msgHandler:MessageHander,
    private auth:AuthService,
    private firePusher:FirebasePusher
  ) {
    
}
register(){
    this.msgHandler.showLoading();
    if(this.registerCredentials.email ==='' || this.registerCredentials.password ===''){
      this.msgHandler.showError('Please Check input Fields');
    }else{
      this.auth.register(this.registerCredentials).then((response)=>{
          console.log('New user Registered',response.uid);
          let infoArray={
             UID:response.uid,
             username:this.registerCredentials.username,
             email:this.registerCredentials.email,
             gender:this.registerCredentials.gender,
             img:'https://cdn.dribbble.com/users/102974/screenshots/2726841/head_bob.gif',
             user_type:'Passenger'
          };
          this.firePusher.pushUserInfoWhileRegistering(infoArray).then(()=>{
            this.msgHandler.dissmisLoading();
            this.createSuccess=true;
            this.showPopup('Successful!','You are Registered !');
          }).catch( err=>{
            this.msgHandler.showError(err.message);
          });
      }).catch(error=>{
        console.log('Error',error);
        this.msgHandler.showError(error.message);
      });
    }
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
