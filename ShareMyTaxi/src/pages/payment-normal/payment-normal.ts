import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ActionSheet } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { FirebaseHandler } from '../../providers/firebase-handler';
/**
 * Generated class for the PaymentNormal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment-normal',
  templateUrl: 'payment-normal.html',
})
export class PaymentNormal {

  ride='share';
   UID='';
    HistoryShareRides=[];
    HistoryBookRides=[];
    HistoryPickRides=[];

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams ,
     public actionsheetCtrl: ActionSheetController,
     public platform: Platform,
     private Auth:AuthService,
     private fireHandler:FirebaseHandler) {
       this.getUID();
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentNormal');
  }

  getUID(){
    let user = this.Auth.getUid();
    if(user){
      this.UID=user.uid;
      this.getDriverShareRideHistory();
      this.getDriverPickRideHistory();
      this.getDriverBookRideHistory();
    }
  }

   getDriverShareRideHistory(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('history/passenger/ride/share');
    let query = shareRide.orderByChild('uid').equalTo(this.UID);
    query.on('value',(snap)=>{
      console.log('getting active share ride history  called');
      console.log('called',snap.val());
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
   
   getDriverBookRideHistory(){
     let shareRide = this.fireHandler.getFirebase().database().ref('history/passenger/ride/book');
    let query = shareRide.orderByChild('uid').equalTo(this.UID);
    query.on('value',(snap)=>{
      console.log('getting active book ride history  called');
      console.log('called',snap.val());
      query.once('value').then((snap)=>{
        let x =this.HistoryBookRides.length;
        for(let y=0;y<x;y++){
          this.HistoryShareRides.pop();
        }
      snap.forEach((child)=>{         
          this.HistoryBookRides.push(child.val());          
      });
      console.log(this.HistoryBookRides)
    });
    });
   }

   getDriverPickRideHistory(){
     let shareRide = this.fireHandler.getFirebase().database().ref('history/passenger/ride/pick');
    let query = shareRide.orderByChild('uid').equalTo(this.UID);
    query.on('value',(snap)=>{
      console.log('getting active pick ride history  called');
      console.log('called',snap.val());
      query.once('value').then((snap)=>{
        let x =this.HistoryPickRides.length;
        for(let y=0;y<x;y++){
          this.HistoryPickRides.pop();
        }
      snap.forEach((child)=>{         
          this.HistoryPickRides.push(child.val());          
      });
      console.log(this.HistoryPickRides)
    });
    });
   }

   openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Rate Me..',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '1 Star',
        
          icon: !this.platform.is('ios') ? 'ios-star' : null,
          handler: () => {
            console.log('Rated 1 Star');
          }
        },
        {
          text: '2 Star',
          icon: !this.platform.is('ios') ? 'ios-star' : null,
          handler: () => {
            console.log('Rated 2 Star');
          }
        },
        {
          text: '3 Star',
          icon: !this.platform.is('ios') ? 'ios-star' : null,
          handler: () => {
            console.log('Rated 3 Star');
          }
        },
        {
          text: '4 Star',
          icon: !this.platform.is('ios') ? 'ios-star' : null,
          handler: () => {
            console.log('Rated 4 Star');
          }
        },
        {
          text: '5 Star',
         // role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'ios-star' : null,
          handler: () => {
            console.log('Ratedd 5 Star');
          }
        },
         {
          text: 'Cansel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
         }
      ]
    });
    actionSheet.present();
  }

}
