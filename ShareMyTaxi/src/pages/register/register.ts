import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable ,FirebaseAuthState} from 'angularfire2'; 
//import auth service
import { AuthService } from  '../../providers/auth-service';

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
  contactList: FirebaseListObservable<any>;
  createSuccess = false;
  registerCredentials = {
    email: '',
    username:'',
    password: '',
    comfirmPassword:'',
    gender:''  
  };
  
  

  constructor(public nav: NavController, public navParams: NavParams,private auth : AuthService, private alertCtrl : AlertController,public angFire:AngularFire) {
    this.contactList = this.angFire.database.list('/users');
}

 /* public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
      error => {
        this.showPopup("Error", error);
      });
  }
*/

public register(){
  this.angFire.auth.createUser({
    email:this.registerCredentials.email ,
    password:this.registerCredentials.password
  }).then(()=>{
    let data= this.angFire.auth.getAuth();
    console.log(this.registerCredentials.gender);
    let imgURL ='';    
    if(this.registerCredentials.gender  === 'm'){
      imgURL='http://homelasa.mi.infn.it/images/imageslasa/donna.png';
    }else{
      imgURL='http://www.iconsfind.com/wp-content/uploads/2015/10/20151012_561baed03a54e.png';
    }
     
     this.contactList.push({
      uid:data.uid,
      username:this.registerCredentials.username,
      gender:this.registerCredentials.gender,
      driver:false,
      img:imgURL      
    }).then((()=>{
      this.createSuccess = true;
    this.showPopup("Success", "Account created.");
    }),error=>{
      console.log(error);
    });    
  });

/*
  this.contactList.push({
      name: 'fname',
      address: 'address',
      phone: '0882918',
      city: 'colombo'
    }).then((()=>{
      console.log("hellow owrld");

    }),error=>{
      console.log(error);
    });*/
}

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
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
