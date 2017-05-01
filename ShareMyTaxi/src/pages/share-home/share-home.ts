import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {map} from "rxjs/operator/map";
import {FireLoader } from '../../providers/fire-loader';
import { AuthService } from '../../providers/auth-service';


declare var google;


@IonicPage()
@Component({
  selector: 'page-share-home',
  templateUrl: 'share-home.html',
})
export class ShareHome {

  @ViewChild('maps') mapElement: ElementRef;

  //init Variables
  loading:any;
  alertBox:any
  response:any;
  map:any;
  directionsService: any;
  directionsDisplay: any;
  mapService :any;
  wayPoint={from:'',to:''};
  distanceDetails:any;
  buttonDisabled:false;
  UID:any;
  bookingView:{booking_btn:'booking'};


//share home constructor
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Auth: AuthService,
    private fireLoader:FireLoader
    ) {
    this.response =this.navParams.get('response');
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
  }

  ionViewDidLoad() {
    this.initMap();
    this.getDistance();
    this.getUID();
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

  getDistance(){

    /*
    for (let key in waypoints) {
      console.log(this.response.geocoded_waypoints[key].place_id);
      if(x==0){
        this.wayPointID.from=this.response.geocoded_waypoints[key].place_id;
      }else if(x==1){
         this.wayPointID.to=this.response.geocoded_waypoints[key].place_id;
      }
    }
    */
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

//get auth user UID
  getUID(){
     let uid=this.Auth.getUserInfo();
     console.log(uid);
     this.UID=uid.uid;
  }

  //add booking
  addBooking(){
    console.log(this.response);

    let promise = new Promise((resolve,reject)=>{
      /*
      let x= {
        primary:{
            UID:this.UID,
            distanceMatrix:this.distanceDetails,
            distance_amount:0,
            tot_amount:0,
            profit:0,
            payment_verified:false
           },
        secondary:{
          UID:this.UID,
            distanceMatrix:0,
            distance_amount:0,
            tot_amount:0,
            profit:0,
            payment_verified:false
          },

        secondary_allocated:false,
        driver_allocated:false,
        driver_UID:'',
        waypoint:this.wayPoint,
        time:'12:01"05',
        status:'active'
      };*/

      let x= {
            primary_UID:this.UID,
            primary_distance:this.distanceDetails.distance.text,
            primary_duration:this.distanceDetails.duration.text,
            primary_from:this.wayPoint.from,
            primary_to:this.wayPoint.to,
            primary_distance_amount:0,
            primary_tot_amount:0,
            primary_profit:0,
            primary_payment_verified:false,

            secondary_UID:this.UID,
            secondary_distance:'',
            secondary_duration:'',
            secondary_from:this.wayPoint.from,
            secondary_to:this.wayPoint.to,
            secondary_distance_amount:0,
            secondary_tot_amount:0,
            secondary_profit:0,
            secondary_payment_verified:false,
            secondary_allocated:false,
            driver_allocated:false,
            driver_UID:'',
            time:'12:01"05',
            status:'active'
      };

      console.log(x);
      this.fireLoader.pushShareRide(x).then((success)=>{
        console.log(success)
        resolve(success);
      },(error)=>{
        reject(error);
      });
    });

    promise.then((success)=>{
      console.log(success);
    }).catch((e)=>{
      console.log(e);
    });

    console.log("Join button click");

  }

  test(){
    //console.log(this.fireLoader.getUserDetails(''));
  }
}
