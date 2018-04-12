import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Main } from  '../main/main';
import { FirebaseHandler } from '../../providers/firebase-handler'; 
import { MessageHander } from '../../providers/message-hander';
import { AuthService } from '../../providers/auth-service';


declare var google;

@IonicPage()
@Component({
  selector: 'page-active-share-ride',
  templateUrl: 'active-share-ride.html',
})
export class ActiveShareRide {

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
      pUsername:'',      
      pFrom:'',
      pTo:'',
      pDistnace:'',
      pAmount_to_pay:'',
      pImg:'',

      sUsername:'',
      sFrom:'',
      sTo:'',
      sDistnace:'',
      sAmount_to_pay:'',
      sImg:'',
      
      joinable:true,


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
    this.fireHandler.getFirebase().database().ref('/ride/share/'+this.push_id)
    .on('value',(snap)=>{
      this.getUserID();

      this.outData.pImg =  snap.child('/primary/imgUrl').val();
      this.outData.pUsername =  snap.child('/primary/username').val();
      this.outData.pFrom =  snap.child('/primary/from').val();
      this.outData.pTo =  snap.child('/primary/to').val();
      this.outData.pAmount_to_pay = snap.child('/primary/amount_to_pay').val();

      this.outData.sImg = snap.child('/secondary/imgUrl').val();
      this.outData.sUsername = snap.child('/secondary/username').val();
      this.outData.sFrom = snap.child('/secondary/from').val();
      this.outData.sTo = snap.child('/secondary/to').val();
      this.outData.sAmount_to_pay = snap.child('/secondary/amount_to_pay').val();

      this.outData.joinable = snap.child('/joinable').val();

      this.outData.dImgUrl = snap.child('driver_img_url').val();
      this.outData.dUsername = snap.child('driver_username').val();
      this.outData.dTel = snap.child('driver_tel').val();

      if(this.outData.dUsername===''){
        console.log('Looking on driver allocation');
        setTimeout(()=>{
          if(this.outData.dUsername===''){
            console.log('Driver is not allocated for 5 min/ data deleting auto');
             this. presentAlert('This Ride this no longer available, No Driver Availble');
             this.fireHandler.getFirebase().database().ref('/ride/share/'+this.push_id).remove();
          }else{
            console.log('driver allocated');
          }
        },12000);
      }

      if(snap.child('/joinable').val()=='true'){
        console.log('Looking for patner');        
          if(snap.child('/joinable').val()=='true'){
            setTimeout(()=>{
              if(snap.child('/joinable').val()=='true'){
               let alert = this.alertCtrl.create({
                  title: 'No partner join yet',
                  subTitle: "No partner join yet !",
                  buttons: ['Dismiss']
                });
                alert.present();
                this.fireHandler.getFirebase().database().ref('/ride/share/'+this.push_id+'/joinable').set(false);
              }
            },5000);
          }else{
            console.log('partner has join');
          }
      }

      if(snap.child('/primary_UID').val()===this.user_id){
        console.log("Am the primary user");
        if(snap.child('primary/payment_verified').val()==='true'){
          this.customeAlert('Succes',"Your payment has successfuly verifies");
        }else{
          console.log('Payment Not done yet');
        }
      }

      if(snap.child('/secondary_UID').val()===this.user_id){
        console.log("Am the Secondary user");
         if(snap.child('secondary/payment_verified').val()==='true'){
          this.customeAlert('Succes',"Your payment has successfuly verifies");
        }else{
          console.log('Payment Not done yet');
        }
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




  addDriverPostion(){
    var myLatLng ={lat:6.9271, lng: 79.8612}
    this.driverMarker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          icon:'assets/icon/taxiIcon.png'
        });
  }


  //go back
  gooBack(){
      this.navCtrl.setRoot(Main);
      this.fireHandler.getFirebase().database().ref('/ride/share/'+this.push_id+'/status').set('done_driver');
  }



}
