import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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

  map:any;
  directionsService:any;
  directionsDisplay:any;
  geoPosition={lat:0,lng:0};
  passedData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public geolocation:Geolocation) {
    this.passedData = this.navParams.get('location');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverMapView');
    console.log(this.passedData.primary_to);
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position)=>{
        this.geoPosition.lng=position.coords.longitude;
        this.geoPosition.lat=position.coords.latitude;
        console.log(position.coords.latitude+" "+position.coords.longitude);
        this.initMap();
        this.DisplayRoute();
      }
    ).catch(()=>{
      this.initMap();
    });
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

  DisplayRoute(){
    console.log("calcDisplay");
    this.RoutePath(this.directionsService,this.directionsDisplay).then((Success)=>{
      console.log('success');
    })
  }

  RoutePath(directionService,directionDisplay){
     return new Promise((resolve, reject) => {
      directionService.route({
        origin:this.passedData.primary_from,
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

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
       this.geoPosition.lng=position.coords.longitude;
       this.geoPosition.lat=position.coords.latitude;
        console.log(position.coords.latitude+" "+position.coords.longitude);
      }
    );
  }

}
