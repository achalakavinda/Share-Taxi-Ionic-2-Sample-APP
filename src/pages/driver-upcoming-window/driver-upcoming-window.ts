import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { AuthService } from '../../providers/auth-service';

import { DriverMapView } from '../driver-map-view/driver-map-view';
import { DriverMapViewPick } from '../driver-map-view-pick/driver-map-view-pick';
import { DriverMapViewBook } from '../driver-map-view-book/driver-map-view-book';

/**
 * Generated class for the DriverUpcomingWindow page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-upcoming-window',
  templateUrl: 'driver-upcoming-window.html',
})
export class DriverUpcomingWindow {
  ShareRides=[];
  pickRides=[];
  bookRides=[];
  HistoryShareRides=[];
  HistorypickRides=[];
  UID='';
  segments='pick';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fireHandler:FirebaseHandler,
    private Auth:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverUpcomingWindow');
    this.getAllActiveShareRideForDrivers();
    this.getAllActivePickRideForDrivers();
    this.getAllActivebookRideForDrivers();
    
  }

  


   getAllActiveShareRideForDrivers(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('ride/share');
    let query = shareRide.orderByChild('status').equalTo('active_!driver');
    query.on('value',(snap)=>{
      console.log('getting active rider called');
      console.log('called',snap.val());
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

   getAllActivePickRideForDrivers(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('ride/pick');
    let query = shareRide.orderByChild('status').equalTo('active_!driver');
    query.on('value',(snap)=>{
      console.log('getting active pick rider called');
      console.log('called',snap.val());
      query.once('value').then((snap)=>{
        let x =this.pickRides.length;
        for(let y=0;y<x;y++){
          this.pickRides.pop();
        }
      snap.forEach((child)=>{         
          this.pickRides.push(child.val());          
      });
    });
    });    
  }

  getAllActivebookRideForDrivers(){      
    let Ride = this.fireHandler.getFirebase().database().ref('ride/book');
    let query = Ride.orderByChild('status').equalTo('active_!driver');
    query.on('value',(snap)=>{
      console.log('getting active book rider called');
      console.log('called',snap.val());
      query.once('value').then((snap)=>{
        let x =this.bookRides.length;
        for(let y=0;y<x;y++){
          this.bookRides.pop();
        }
      snap.forEach((child)=>{         
          this.bookRides.push(child.val());          
      });
    });
    });    
  }



  onClickShare(key){
      console.log(key);
      this.navCtrl.push(DriverMapView,{'data':key});
    } 

    onClickBook(key){
      console.log(key);
      this.navCtrl.push(DriverMapViewBook,{'data':key});
    }

    onClickPick(key){
      console.log(key);
      this.navCtrl.push(DriverMapViewPick,{'data':key});
    }

}
