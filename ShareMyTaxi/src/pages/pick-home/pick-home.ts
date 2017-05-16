import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FireLoader } from '../../providers/fire-loader';
import { AuthService } from '../../providers/auth-service';
import { Main } from '../main/main';
import { ActiveShareRide } from '../active-share-ride/active-share-ride';

/**
 * Generated class for the PickHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare  var google;

@IonicPage()
@Component({
  selector: 'page-pick-home',
  templateUrl: 'pick-home.html',
})
export class PickHome {

  @ViewChild('map') mapElement: ElementRef;

  loading:any;
  response:any;
  map:any;
  directionsService: any;
  directionsDisplay: any;
  mapService :any;
  wayPoint={from:'',to:''};
  distanceDetails:any;
  buttonDisabled:false;
  UID:any;
  ride:'pick';
  dateTime:'';
  milege: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,private Auth: AuthService,private fireLoader:FireLoader) {
    this.response =this.navParams.get('response');
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PickHome');
    this.initMap();
    this.getUID();
    this.getDistance();
  }


  //initialize share taxi map view
  initMap(){
    let latLng = new google.maps.LatLng(6.9271,79.8612);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center:latLng,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.mapService = new google.maps.DistanceMatrixService;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false
    });
    this.setRoute();
  }

//set map route with response
  setRoute(){
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setDirections(this.response);
  }


  addRide(){
    console.log('add ride method called');
    let promise = new Promise((resolve,reject)=>{
      let x= {
        UID:this.UID,
        distance:this.distanceDetails.distance.text,
        duration:this.distanceDetails.duration.text,
        from:this.wayPoint.from,
        to:this.wayPoint.to,
        distance_amount:0,
        tot_amount:0,
        payment_verified:false,
        driver_allocated:false,
        driver_UID:'',
        time:'12:01"05',
        status:'active'
      }
      console.log(x);
      // this.fireLoader.pushPickRide(x).then((succes)=>{
      //   console.log('add ride sucess');
      //   this.navCtrl.setRoot(ActiveShareRide);
      // },(err)=>{
      //   console.log('add rides unsucessful'+err);
      // });
    });

  }

 addBook(){
   console.log('Book ride method called');
   let promise = new Promise((resolve,reject)=>{
     let x= {
       UID:this.UID,
       distance:this.distanceDetails.distance.text,
       duration:this.distanceDetails.duration.text,
       from:this.wayPoint.from,
       to:this.wayPoint.to,
       distance_amount:0,
       tot_amount:0,
       payment_verified:false,
       driver_allocated:false,
       driver_UID:'',
       date:'tomorrow',
       time:'12:01"05',
       status:'active'
     }
     console.log(x);
    //  this.fireLoader.pushBookRide(x).then((succes)=>{
    //    console.log('book ride ride sucess');

    //  },(err)=>{
    //    console.log('add rides unsucessful'+err);
    //  });
   });
  }

  getDistance(){
    new Promise ((RES,RJCT)=>{
      this.mapService.getDistanceMatrix({
        origins: [this.wayPoint.to],
        destinations:[this.wayPoint.from],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, function(response, status) {
        if (status !== 'OK') {
          console.log('Error was: ' + status);
          RJCT(status);
        } else {
          RES(response.rows[0].elements[0]);
          console.log(response.rows[0].elements[0]);
        }

      });
    }).then((s)=>{
      this.distanceDetails=s;
    });





  }
  cancelation(){
    this.navCtrl.setRoot(Main);
    console.log("cancelation called");
  }

  getUID(){
   this.UID='';
  }

}
