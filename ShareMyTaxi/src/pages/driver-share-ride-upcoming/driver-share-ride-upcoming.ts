import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverMapView } from '../driver-map-view/driver-map-view';
import { FirebaseHandler } from '../../providers/firebase-handler';

/**
 * Generated class for the DriverShareRideUpcoming page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-share-ride-upcoming',
  templateUrl: 'driver-share-ride-upcoming.html',
})

export class DriverShareRideUpcoming {
  searchBar:'';
  showCancelButton:true;
  ShareRides = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private fireHandler:FirebaseHandler) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverShareRideUpcoming');
    this.getAllActiveShareRideForDrivers();
  }

  dataValues(){
    
  }

   getAllActiveShareRideForDrivers(){      
    let shareRide = this.fireHandler.getFirebase().database().ref('share_ride');
    let query = shareRide.orderByChild('status').equalTo('active_!driver');
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


    onClick(key){
      console.log(key);
      this.navCtrl.push(DriverMapView,{'data':key});
    }

    onInput($event){

    }
    onCancel($event){

    }
}
