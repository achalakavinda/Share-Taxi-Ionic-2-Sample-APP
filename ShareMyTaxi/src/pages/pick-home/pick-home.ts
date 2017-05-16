import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Main } from '../main/main';
import { ActiveShareRide } from '../active-share-ride/active-share-ride';
import { PaymentGenerator } from '../../providers/payment-generator';
import { MessageHander } from '../../providers/message-hander';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { ActivePickRide } from '../active-pick-ride/active-pick-ride';

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
  distanceDetails={distance:'0000',duration:'0000',distance_value:'0000',duration_value:'0000'};
  buttonDisabled:false;
  UID='';
  ride='pick';
  outData={from:'',to:'',driver:'Not Allocated',distance:'',duration:'',amount:0,date:'',min_date:'2017-01-17',max_date:'2018-01-01'};
  date_validator:any;
  time_validator:any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private Auth: AuthService,
     private paymentGenerator:PaymentGenerator,
     private msgHandler:MessageHander,
     private fireHandler:FirebaseHandler
     ) {
    this.response =this.navParams.get('response');
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
        console.log(this.outData.min_date);
        this.dateSetor();
  }

  dateSetor(){
    let currentdate=new Date();
    this.date_validator = currentdate.getFullYear()+'-'+currentdate.getMonth()+'-'+currentdate.getDate();  
    this.time_validator = currentdate.getHours() +":"+ currentdate.getMinutes() + ":"+currentdate.getSeconds();
    this.outData.min_date = currentdate.getFullYear()+'-0'+currentdate.getMonth()+'-'+(currentdate.getDate()+1);
    this.outData.max_date = currentdate.getFullYear()+'-0'+currentdate.getMonth()+'-'+(currentdate.getDate()+5);
    console.log('min date',this.outData.min_date);
    console.log('max date',this.outData.max_date);
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
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      minZoom: 7
    });
    this.mapService = new google.maps.DistanceMatrixService;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false
    });
    this.setRoute();
    this.getDistance();
  }

//set map route with response
  setRoute(){
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setDirections(this.response);
  }


  addRide(){
    console.log('add ride method called');
    if(this.UID===''){
     this.msgHandler.showError('Sorry cannot add a booking , please try again !');
   }else{
    new Promise((resolve,reject)=>{
      let x= {
       UID:this.UID,
       distance:this.distanceDetails.distance,
       duration:this.distanceDetails.duration,
       distance_value:this.distanceDetails.distance_value,
       from:this.wayPoint.from,
       to:this.wayPoint.to,
       distance_amount:this.outData.amount,
       payment_verified:false,
       driver_allocated:false,
       driver_UID:'',
       driver_username:'',
       driver_tel:'',
       driver_nic:'',
       driver_img:'',
       date:this.date_validator,
       status:'active'
      }
      console.log('add pick ride saving array',x);
     let newPostKey = this.fireHandler.getFirebase().database().ref().child('ride/pick').push().key;
     let pusher=this.fireHandler.getFirebase().database().ref('ride/pick/'+ newPostKey).set(x);
     pusher.then((success)=>{
        this.msgHandler.dissmisLoading();
        console.log('new pick  key',newPostKey);
        let alert =this.msgHandler.alertCtrl.create({
          title:'Successfull',
          subTitle: 'You have succesfully pick a ride !',
          buttons: ['Dismiss']
        });        
        alert.present();
        this.navCtrl.setRoot(ActivePickRide,{id:newPostKey,from:this.wayPoint.from,to:this.wayPoint.to});
      },(error)=>{
        reject(error);
        this.msgHandler.showError("Please Try Again request cannot be done !");
      });      
    });
   }

  }

 addBook(){
   console.log('Book ride method called',this.outData.date);
   if(this.UID===''){
     this.msgHandler.showError('Sorry cannot add a booking , please try again !');
   }else if (this.outData.date===''){
     this.msgHandler.showError('Please Select a time and date !');
   }else{
     let promise = new Promise((resolve,reject)=>{
     let x= {
       UID:this.UID,
       distance:this.distanceDetails.distance,
       duration:this.distanceDetails.duration,
       distance_value:this.distanceDetails.distance_value,
       from:this.wayPoint.from,
       to:this.wayPoint.to,
       distance_amount:this.outData.amount,
       payment_verified:false,
       driver_allocated:false,
       driver_UID:'',
       driver_username:'',
       driver_tel:'',
       driver_nic:'',
       driver_img:'',
       date:this.date_validator,
       time:this.time_validator,
       date_time:this.outData.date,
       status:'active'
     }
     console.log('Add booking saving array ',x);
     let newPostKey = this.fireHandler.getFirebase().database().ref().child('ride/book').push().key;
     let pusher=this.fireHandler.getFirebase().database().ref('ride/book/'+ newPostKey).set(x);
     pusher.then((success)=>{
        this.msgHandler.dissmisLoading();
        console.log('new booking  key',newPostKey);
        let alert =this.msgHandler.alertCtrl.create({
          title:'Successfull',
          subTitle: 'You have succesfully book a ride !',
          buttons: ['Dismiss']
        });        
        alert.present();
        this.navCtrl.setRoot(Main);
      },(error)=>{
        reject(error);
        this.msgHandler.showError("Please Try Again request cannot be done !");
      });
    });
   }   
  }

  initFields(response){
    console.log('init feild called',response);
    this.outData.from=this.wayPoint.from;
    this.outData.to=this.wayPoint.to;
    this.outData.distance=response.distance.text;
    this.outData.duration=response.duration.text;  
    this.distanceDetails.distance=response.distance.text;
    this.distanceDetails.distance_value=response.distance.value;
    this.distanceDetails.duration=response.duration.text;
    this.distanceDetails.duration_value=response.duration.value;  
    this.outData.amount = this.paymentGenerator.getPayment(response.distance.value);
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
          console.log("inside form result");
          RES(response.rows[0].elements[0]);
        }

      });
    }).then((response)=>{
      this.initFields(response);
    });
  }



  cancelation(){
    this.navCtrl.setRoot(Main);
    console.log("cancelation called");
  }

  getUID(){
   let user = this.Auth.getUid();
   if(user){
     this.UID = user.uid;
     console.log('fetch uid here');
   }
  }

}
