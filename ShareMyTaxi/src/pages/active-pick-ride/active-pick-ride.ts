import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import {FireLoader } from '../../providers/fire-loader';
import { AuthService } from '../../providers/auth-service';
import { Main } from '../main/main';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { MessageHander } from '../../providers/message-hander';

declare var google;

@IonicPage()
@Component({
  selector: 'page-active-pick-ride',
  templateUrl: 'active-pick-ride.html',
})
export class ActivePickRide {
 @ViewChild('maps') mapElement: ElementRef;

  //init Variables
  loading:any;
  response:any;
  map:any;
  directionsService: any;
  directionsDisplay: any;
  mapService :any;
  wayPoint={from:'',to:''};
  buttonDisabled:false;
  UID:any;
  push_id='0';
  user_id='';
  outData = {
      Username:'',      
      From:'',
      To:'',
      Distnace:'',
      amount:'',
      duration:'',
      dUsername:'',
      dTel:'',
      dImgUrl:''
    };
  driverPostions=[];
  driverMarker:any;  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fireHandler:FirebaseHandler,
    private msgHandler:MessageHander,
    private alertCtrl:AlertController,
    private Auth:AuthService
    ) {

    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
    this.push_id = this.navParams.get('id');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveShareRide');
    this.initMap();
    this.datafiller();
  }

  initMap(){
    let latLng = new google.maps.LatLng(6.9271,79.8612);
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false
    });
    let mapOptions = {
      center: latLng,
      zoom: 13,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
    this.DisplayRoute();
  }

  DisplayRoute(){
    this.RoutePath(this.directionsService,this.directionsDisplay);
  }

  RoutePath(directionService,directionDisplay){
    console.log('waypoint from active share ride direct passing ',this.wayPoint);
      directionService.route({
        origin:this.wayPoint.to,
        destination:this.wayPoint.from,
        travelMode: 'DRIVING'
      },function(response,status){
        if(status == 'OK'){
          directionDisplay.setDirections(response);
          console.log("google response ok");
          
        }else{
          console.log(status);
        }
      });
  }

   datafiller(){
    this.fireHandler.getFirebase().database().ref('/ride/pick/'+this.push_id)
    .on('value',(snap)=>{
      console.log('Data change detect');
      this.getUserID();
      
      this.outData.dUsername = snap.child('driver_username').val();
      this.outData.dTel = snap.child('driver_tel').val();
      this.outData.dImgUrl =

      this.outData.From = snap.child('from').val();
      this.outData.To = snap.child('to').val();
      this.outData.duration = snap.child('duration').val();
      this.outData.amount =snap.child('distance_amount').val();
      this.outData.Distnace =snap.child('distance').val();

      if(this.outData.dUsername===''){
        console.log('Looking on driver allocation');
        setTimeout(()=>{
          if(this.outData.dUsername===''){
            console.log('Driver is not allocated for 5 min/ data deleting auto');
             this. presentAlert('This Ride is no longer available, No Driver Availble');
            //  this.fireHandler.getFirebase().database().ref('/ride/pick/'+this.push_id).remove();
          }else{
            console.log('driver allocated');
          }
        },60000);
      }

     
        if(snap.child('payment_verified').val()==='true'){
          this.customeAlert('Succes',"Your payment has successfuly verified");
        }else{
          console.log('Payment Not done yet');
        }

       console.log(snap.val());
       if(snap.val()===null){
        this. presentAlert('This Ride this no longer available');
       }
      });
  }


  



      getUserID(){
        let users=this.Auth.getUid();
        if(users){
          this.user_id = users.uid;
        }else{
          this.user_id='';
        }
        console.log('Here is user id',this.user_id)
        
      }



  presentAlert(title) {
  let alert = this.alertCtrl.create({
    title: 'Ride Cancel',
    subTitle: title,
    buttons: ['Dismiss']
  });
  alert.present();
  this.navCtrl.setRoot(Main);
}
 customeAlert(title,subTitle) {
  let alert = this.alertCtrl.create({
    title:title,
    subTitle: subTitle,
    buttons: ['Dismiss']
  });
  alert.present();
  this.navCtrl.setRoot(Main);
}



  //go back
  gooBack(){
      this.navCtrl.setRoot(Main);
      this.fireHandler.getFirebase().database().ref('/ride/pick/'+this.push_id+'/status').set('deactivate');
  }

}
