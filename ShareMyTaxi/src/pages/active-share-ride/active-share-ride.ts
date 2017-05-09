import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Main } from  '../main/main';


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
  passingValues = {username:'----',distance:'---- KM',duration:'-- hr -- min',type:'Shared',amount:'----'};
  driverPostions=[];
  driverMarker:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
    this.push_id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveShareRide');
    this.initMap();
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

  addDriverPostion(){
    var myLatLng ={lat:6.9271, lng: 79.8612}
    this.driverMarker = new google.maps.Marker({
          position: myLatLng,
          map: this.map,
          icon:'assets/icon/taxiIcon.png'
        });
        // setTimeout(()=>{
        //   marker.setMap(null);
        // },5000);
  }


  //go back
  gooBack(){
      this.navCtrl.setRoot(Main);
  }



}
