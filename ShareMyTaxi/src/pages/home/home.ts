import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController , NavParams  } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  todo: String;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
 

  constructor(public navCtrl: NavController,public NavParams:NavParams) {
    
  }

  ionViewDidLoad(){
    this.loadMap();
  }
  
  loadMap(){
 
    let latLng = new google.maps.LatLng(6.9271,79.8612);

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer; 

    let mapOptions = {
      center: latLng,
      zoom: 13,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    directionsDisplay.setMap(this.map);

    this.calcDisplayRoute(directionsService,directionsDisplay);
  }

  calcDisplayRoute(directionService,directionDisplay){
    console.log("calcDisplay");
    let z= directionService.route({
          origin:{
          "lat": 6.9271,
          "lng": 79.8612
        },
          destination: {
          "lat":6.8940,
          "lng":79.9052
        },
          travelMode: 'DRIVING'
        },function(response,status){
          if(status == 'OK'){
            directionDisplay.setDirections(response);
          }else{
            console.log(status);
          }
          
        });
  }


}
