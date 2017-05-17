import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { FirebaseHandler } from '../../providers/firebase-handler';
/**
 * Generated class for the DriverPaymentWindow page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-payment-window',
  templateUrl: 'driver-payment-window.html',
})
export class DriverPaymentWindow {
  UID='';
  HistoryShareRides=[];
  HistoryBookRides=[];
  HistoryPickRides=[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private Auth:AuthService,
    private fireHandler:FirebaseHandler
    ) {
    this.getUID();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPaymentWindow');
  }

  getUID(){
    let user = this.Auth.getUid();
    if(user){
      this.UID=user.uid;
      this.getDriverShareRideHistory();
    }
  }

      getDriverShareRideHistory(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('history/driver/ride/share');
    let query = shareRide.orderByChild('driver_uid').equalTo(this.UID);
    query.on('value',(snap)=>{
      console.log('getting active share ride history  called');
      console.log('called',snap);
      query.once('value').then((snap)=>{
        let x =this.HistoryShareRides.length;
        for(let y=0;y<x;y++){
          this.HistoryShareRides.pop();
        }
      snap.forEach((child)=>{         
          this.HistoryShareRides.push(child.val());          
      });
      console.log(this.HistoryShareRides)
    });
    });    
  }

}
