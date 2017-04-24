import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController , NavParams  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  homeMap ={from:'',to:''};

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService: any;
  directionsDisplay: any;


  constructor(public navCtrl: NavController,public NavParams:NavParams,public geolocation:Geolocation) {
    this.getGeolocation();
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){

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

   //this.calcDisplayRoute(this.directionsService,this.directionsDisplay);
  }

  calcDisplayRoute(directionService,directionDisplay){
    console.log("calcDisplay");
    directionService.route({
          origin:this.homeMap.from,
          destination: this.homeMap.to,
          travelMode: 'DRIVING'
        },function(response,status){
          if(status == 'OK'){
            directionDisplay.setDirections(response);
          }else{
            console.log(status);
          }

        });
  }

  homeMapSearchBtn(){
    console.log("hi");
    this.calcDisplayRoute(this.directionsService,this.directionsDisplay);
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
      console.log(position.coords.latitude+" "+position.coords.longitude);
    }
    );
  }


}
