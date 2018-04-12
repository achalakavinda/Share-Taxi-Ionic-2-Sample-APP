import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the GeneralDriver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-general-driver',
  templateUrl: 'general-driver.html',
})
export class GeneralDriver {
  @ViewChild('map') mapElement: ElementRef;
  directionsService:any;
  directionsDisplay:any;
  map:any;
  driverMarker:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation:Geolocation) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralDriver');
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
      zoom:8,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);
      this.showDriverPostion();
  }

  showDriverPostion(){
    this.geolocation.watchPosition().subscribe((e)=>{
        console.log('call geo change');
        if(e.coords !== undefined){
          console.log(e.coords.latitude,e.coords.longitude);
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
        this.driverMarker.setMap(this.map);
  }

}
