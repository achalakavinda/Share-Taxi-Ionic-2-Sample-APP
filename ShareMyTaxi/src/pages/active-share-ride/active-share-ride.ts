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
    private msgHandler:MessageHander
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
      directionService.route({
        origin:'malabe',
        destination:'kotte',
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

      this.outData.pImg =  snap.child('/primary/imgUrl').val();
      this.outData.pUsername =  snap.child('/primary/username').val();
      this.outData.pFrom =  snap.child('/primary/from').val();
      this.outData.pTo =  snap.child('/primary/to').val();
      this.outData.pAmount_to_pay = snap.child('/primary/amount_to_pay').val();

      this.outData.sImg = snap.child('/secondary/imgUrl').val();
      this.outData.sUsername = snap.child('/secondary/username').val();
      this.outData.sFrom = snap.child('/secondary/from').val();
      this.outData.sTo = snap.child('/secondary/to').val();
      this.outData.sAmount_to_pay = snap.child('/amount_to_pay').val();

      this.outData.dImgUrl = snap.child('driver_img_url').val();
      this.outData.dUsername = snap.child('driver_username').val();

       
       console.log(snap.val());
      });
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
