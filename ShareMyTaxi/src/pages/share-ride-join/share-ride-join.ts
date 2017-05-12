import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { JoinMapView } from '../join-map-view/join-map-view';

/**
 * Generated class for the ShareRideJoin page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-share-ride-join',
  templateUrl: 'share-ride-join.html',
})
export class ShareRideJoin {

  ShareRides=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fireHandler:FirebaseHandler) {
      this.getAllActiveShareRideForDrivers();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareRideJoin');
  }

    getAllActiveShareRideForDrivers(){      
      let shareRide = this.fireHandler.getFirebase().database().ref('ride/share');
      let query = shareRide.orderByChild('joinable').equalTo(true);
      query.on('value',(snap)=>{
        console.log('getting active rider called');
        console.log('called',snap);
        query.once('value').then((snap)=>{
          let x =this.ShareRides.length;
          for(let y=0;y<x;y++){
            this.ShareRides.pop();
          }
        snap.forEach((child)=>{         
            this.ShareRides.push(child.val());          
        });
      });
    });    
  } 

  onClick(shareRide){
    this.navCtrl.push(JoinMapView,{id:shareRide.id});
  }

}
