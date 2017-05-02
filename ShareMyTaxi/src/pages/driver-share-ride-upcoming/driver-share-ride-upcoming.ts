import { Component,Pipe } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DriverMapView } from '../driver-map-view/driver-map-view';

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
  orginShareRides: FirebaseListObservable<any>;
  ShareRides:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public angFire: AngularFire) {
    this.orginShareRides = angFire.database.list('/share_ride');
    this.filterData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverShareRideUpcoming');
  }

  dataValues(){
    //console.log(this.shareRides);
  }

  filterData(){
    this.ShareRides=this.orginShareRides;
    console.log(this.orginShareRides);
      this.orginShareRides.subscribe((response)=>{

      });

    }

    onClick(key){
      console.log(key);
      this.navCtrl.push(DriverMapView,{'location':key});
    }

    onInput($event){

    }
    onCancel($event){

    }
}
