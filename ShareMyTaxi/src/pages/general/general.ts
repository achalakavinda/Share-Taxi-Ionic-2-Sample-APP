import { Component,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
declare var google;
/**
 * Generated class for the General page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})



export class General {
  private rootPage;
  homeMap ={from:'',to:''};

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService: any;
  directionsDisplay: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation) {
    this.rootPage = HomePage;
    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad General');
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
    this.calcDisplayRoute(this.directionsService,this.directionsDisplay);
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
        console.log(position.coords.latitude+" "+position.coords.longitude);
      }
    );
  }

}
