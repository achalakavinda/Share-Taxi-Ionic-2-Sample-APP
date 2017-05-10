import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';

/**
 * Generated class for the ActiveDriverShareRide page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-active-driver-share-ride',
  templateUrl: 'active-driver-share-ride.html',
})
export class ActiveDriverShareRide {
  ID:any;
  outData={id:'',pUsername:'----',pDistance:'----',pDuration:'-----',pAmount:'----',sUsername:'----',sDistance:'----',sDuration:'----',sAmount:'----'};
  constructor(public navCtrl: NavController, public navParams: NavParams,private fireHandler:FirebaseHandler) {
    this.ID=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveDriverShareRide');
     this.datafiller();
  }

   datafiller(){
    this.fireHandler.getFirebase().database().ref('/share_ride/'+this.ID)
    .on('value',(snap)=>{
         this.outData.id = snap.child('id').val();
         this.outData.pUsername = snap.child('primary/username').val();
         this.outData.pDistance = snap.child('primary/distance').val(); 
         this.outData.pAmount = snap.child('primary/distance_amount').val();  
         this.outData.pDuration = snap.child('primary/duration').val();   
         this.outData.sUsername = snap.child('secondary/username').val();
         this.outData.sDistance = snap.child('secondary/distance').val(); 
         this.outData.sAmount = snap.child('secondary/distance_amount').val();  
         this.outData.sDuration = snap.child('secondary/duration').val(); 
         console.log(snap.val());
      });
  }

  allocateDriver(){

  }

}
