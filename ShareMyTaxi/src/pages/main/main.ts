import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

//page import
import { General } from '../general/general';
import { Tabs } from '../tabs/tabs';
import { DriverShareRideUpcoming } from '../driver-share-ride-upcoming/driver-share-ride-upcoming';
import { DriverPickRide } from '../driver-pick-ride/driver-pick-ride';
import { ProfileHome } from  '../profile-home/profile-home';
import { PaymentNormal } from '../payment-normal/payment-normal';
import { PaymentDriver } from '../payment-driver/payment-driver';
import { PaymentShared } from '../payment-shared/payment-shared';
import { ShareRideJoin } from '../share-ride-join/share-ride-join';
import { TestView } from '../test-view/test-view';


//geolocation provider imported
import { DynamicMap } from '../../providers/dynamic-map'

/**
 * Generated class for the Main page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class Main {
  private USER = true;
  private rootPage: any;
  private uid='';
  private type=null;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private dynamicMap:DynamicMap,
     private Auth:AuthService) {
     this.checkUserType();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Main');
   
  }


  checkUserType(){
    let user=this.Auth.getUid();
    if(user){
      this.uid=user.uid;
      this.Auth.getUserFromUsers(user.uid).then((response)=>{
        response.forEach(element => {
          console.log("user type",element.val().user_type);
          this.type=element.val().user_type;
          if(this.type==='Passenger'){
            this.rootPage = General;
          }else{
            this.rootPage = Tabs;
          }
        });
      });
    }
  }

  openPage(PageName) {

    if (PageName == 'DriverShareTabs') {
      this.navCtrl.push(DriverShareRideUpcoming);
    } else if (PageName === 'Profile') {
      this.navCtrl.push(ProfileHome);
    } else if (PageName === 'DriverPayment') {
      this.navCtrl.push(PaymentDriver);
    }else if (PageName === 'PaymentShared') {
      this.navCtrl.push(PaymentShared);
    } else if (PageName === 'Payment') {
      this.navCtrl.push(PaymentNormal);
    }else if (PageName ==='PickRide'){
      this.navCtrl.push(DriverPickRide);
    }else if(PageName === 'test'){
      this.navCtrl.push(TestView);
    }else if(PageName==='JoinShareRide'){
      this.navCtrl.push(ShareRideJoin);
    }
  }

}
