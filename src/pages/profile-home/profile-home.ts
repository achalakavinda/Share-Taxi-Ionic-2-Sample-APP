import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { MessageHander } from '../../providers/message-hander';

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
  profile={username:'------',email:'-----',img:'#',user_type:'----',nic:'---',tel:''};
  constructor(public navCtrl: NavController, public navParams: NavParams,private Auth:AuthService,private msgHandler:MessageHander) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileHome');
    this.detailsFiller();
  }

  detailsFiller(){
    this.msgHandler.showLoading();
    let uid=this.Auth.getUid().uid;
    this.Auth.getUserFromUsers(uid).then((snap)=>{
        snap.forEach(child=>{
          console.log(child.val());
          this.profile.username=child.val().username;
          this.profile.email=child.val().email;
          this.profile.img=child.val().img;
          this.profile.user_type=child.val().user_type;
          this.profile.nic=child.val().nic;
          this.profile.tel=child.val().tel;
        });
        this.msgHandler.dissmisLoading();
    }).catch(err=>{
      console.log('error while geting user info',err);
      this.msgHandler.showError(err.message);
    });
  }

  logout(){
    console.log('log out call');
    this.Auth.logout();
    this.navCtrl.push(Login);
  }

}
