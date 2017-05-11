import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { map } from "rxjs/operator/map";
import { ActiveShareRide } from '../active-share-ride/active-share-ride';
import { AuthService } from '../../providers/auth-service';
import { FirebasePusher } from '../../providers/firebase-pusher';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { PaymentGenerator } from '../../providers/payment-generator';
import { MessageHander } from '../../providers/message-hander';

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
  response:any;
  map:any;
  directionsService: any;
  directionsDisplay: any;
  mapService :any;

  wayPoint={from:'',to:''};
  distanceDetails={distance:'0000',duration:'0000',distance_value:'0000',duration_value:'0000'};
  buttonDisabled:false;
  UID='';
  UserInfo={username:'',imgUrl:'',tel:'',nic:''};
  bookingView={booking_btn:'booking'};
  passingValues = {username:'',distance:'00 KM',duration:'0 hr 00 min',type:'Shared',amount:0};



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Auth: AuthService,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firePusher:FirebasePusher,
    private paymentGenerator:PaymentGenerator,
    private fireHandler:FirebaseHandler,
    private msgHandler:MessageHander
    ) {
    this.response =this.navParams.get('response');
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
  }

  ionViewDidLoad() {
    this.initMap();
    this.getDistance();
    this.getUserinfo();
    console.log("ionViewDidLoad Share-Home");
  }

  initFields(response){
    console.log('init feild called',response);
    this.passingValues.distance=response.distance.text;
    this.passingValues.duration=response.duration.text;  
    this.distanceDetails.distance=response.distance.text;
    this.distanceDetails.distance_value=response.distance.value;
    this.distanceDetails.duration=response.duration.text;
    this.distanceDetails.duration_value=response.duration.value;  
    this.passingValues.amount=this.paymentGenerator.getPayment(response.distance.value);
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
      this.initFields(s);
    });
}

//get auth user UID
  getUserinfo(){
    let user=this.Auth.getUid();
    if(user){
      this.UID=user.uid;
    }
    console.log('user id is',this.UID);
     this.fireHandler.getFirebase().database().ref('users').orderByChild('UID')
     .equalTo(this.UID).once('value').then((snap)=>{
       snap.forEach(childData => {         
         this.UserInfo.username=childData.val().username;
         this.UserInfo.imgUrl=childData.val().img;
        //  this.UserInfo.nic=childData.val().nic;
        //  this.UserInfo.tel=childData.val().tel;
        console.log('fetch user info',this.UserInfo);
       });
     }).catch((e)=>{
       console.log('error geting user info',e);
       this.UserInfo={username:'',imgUrl:'',tel:'',nic:''};
     });
  }

  //add booking
  addBooking(){
    console.log(this.response);
    this.msgHandler.showLoading();
    let currentdate = new Date(); 
    let date =currentdate.getDate() +"/" +currentdate.getMonth()+"/"+currentdate.getFullYear();  
    let time =currentdate.getHours() +":"+ currentdate.getMinutes() + ":"+ currentdate.getSeconds();
    let promise = new Promise((resolve,reject)=>{
      let x= {
            id:'',
            primary_UID:this.UID,
            secondary_UID:'',
            driver_UID:'',
            driver_allocated:false,
            secondary_allocated:false,   
            date:date,         
            time:time,
            status:'active_!driver',
            joinable:true,
            primary:{
              username:this.UserInfo.username,
              imgUrl:this.UserInfo.imgUrl,
              nic:this.UserInfo.nic,
              tel:this.UserInfo.tel,
              distance:this.distanceDetails.distance,
              duration:this.distanceDetails.duration,
              distance_value:this.distanceDetails.distance_value,
              duration_value:this.distanceDetails.duration_value,
              from:this.wayPoint.from,
              to:this.wayPoint.to,
              amount:this.passingValues.amount,
              amount_to_pay:this.passingValues.amount,
              payment_verified:false,
            },
            secondary:{
              username:'',
              imgUrl:'',
              nic:'',
              tel:'',
              distance:'',
              duration:'',
              distance_value:'',
              duration_value:'',
              from:'',
              to:'',
              amount:0,
              amount_to_pay:0,
              payment_verified:false,
            }           
      };
      console.log("Pushing array",x);
      this.firePusher.pushActiveShareRide(x).then((success)=>{
        this.msgHandler.dissmisLoading();
        console.log('new active share ride key',this.firePusher.post_key);
        this.navCtrl.setRoot(ActiveShareRide,{id:this.firePusher.post_key,from:this.wayPoint.from,to:this.wayPoint.to});
      },(error)=>{
        reject(error);
        this.showError("Please Try Again request cannot be done !");
      });
    });

    // promise.then((success)=>{
    //   console.log(success);
    // }).catch((e)=>{
    //   console.log(e);
    // });

    // console.log("Join button click");

  }

private showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
