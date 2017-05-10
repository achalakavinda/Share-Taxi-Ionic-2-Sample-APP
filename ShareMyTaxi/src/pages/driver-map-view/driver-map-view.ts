import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { ActiveDriverShareRide } from '../active-driver-share-ride/active-driver-share-ride'

/**
 * Generated class for the DriverMapView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-driver-map-view',
  templateUrl: 'driver-map-view.html',
})
export class DriverMapView {

@ViewChild('map') mapElement: ElementRef;
  outData={id:'',pUsername:'----',pDistance:'----',pDuration:'-----',pAmount:'----',sUsername:'----',sDistance:'----',sDuration:'----',sAmount:'----'};
  map:any;
  directionsService:any;
  directionsDisplay:any;
  geoPosition={lat:0,lng:0};
  passedData:any;
  driverMarker:any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public geolocation:Geolocation,
     private fireHandler:FirebaseHandler) {
    this.passedData = this.navParams.get('data');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverMapView');
    console.log(this.passedData.primary.to);
    if(this.map == undefined){
      console.log('Map Undefine so created',this.map);
      this.initMap();     
      this.datafiller(); 
    }

    this.loadMap();
    
        
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
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position)=>{
        this.geoPosition.lng=position.coords.longitude;
        this.geoPosition.lat=position.coords.latitude;
        console.log(position.coords.latitude+" "+position.coords.longitude);        
        this.DisplayRoute();
        console.log('inner load map roue');
      }
    ).catch((e)=>{
      this.geoPosition.lng=79.9733;
      this.geoPosition.lat=6.9147;
      this.DisplayRoute();
      console.log('cannot load map roue',e);
    });
  }

  

  DisplayRoute(){
    console.log("calcDisplay");
    this.RoutePath(this.directionsService,this.directionsDisplay).then((Success)=>{
      console.log('success');
      this.showDriverPostion();
    }).catch(()=>{});
  }

  RoutePath(directionService,directionDisplay){
     return new Promise((resolve, reject) => {
      directionService.route({
        origin:this.passedData.primary.from,
        destination: {lat:this.geoPosition.lat,lng:this.geoPosition.lng},
        travelMode: 'DRIVING'
      },function(response,status){
        if(status == 'OK'){
          directionDisplay.setDirections(response);
          resolve(response);
          console.log("google response ok");
        }else{
          console.log(status);
          reject(status);
        }
      });
    });
  }

  showDriverPostion(){
    this.geolocation.watchPosition().subscribe((e)=>{
        console.log('call geo change');
        if(e.coords !== undefined){
            this.addDriverPostion(e.coords.latitude,e.coords.longitude);
        }        
    });
  }

   addDriverPostion(latPara,lngPara){
    let latLng = new google.maps.LatLng(latPara,lngPara); 
    if(this.driverMarker!== undefined){
      this.driverMarker.setMap(null);
    }   
    this.driverMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          icon:'assets/icon/taxiIcon.png'
        });
  }

  datafiller(){
    this.fireHandler.getFirebase().database().ref('/share_ride/'+this.passedData.id)
    .on('value',(snap)=>{
         this.outData.id = snap.child('id').val();
         this.outData.pUsername = snap.child('primary/username').val();
         this.outData.pDistance = snap.child('primary/distance').val(); 
         this.outData.pAmount = snap.child('primary/distance_amount').val();  
         this.outData.pDuration = snap.child('primary/duration').val();   
         this.outData.sUsername = snap.child('secondary/username').val();
         this.outData.sDistance = snap.child('secondary/distance').val(); 
         this.outData.sAmount = snap.child('secondary/distance_amount').val();  
         this.outData.sDuration = snap.child('secondary/duration').val(); 
      });
  }

  allocateDriver(){
    // console.log('Value from share_ride Db',this.outData);
    // console.log('driver confirmed');
      this.navCtrl.setRoot(ActiveDriverShareRide,{id:this.passedData.id});
  }

}
