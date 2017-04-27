import { Component,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
declare var google,infoWidow;
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


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService: any;
  directionsDisplay: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation) {
    this.rootPage = HomePage;
    platform.ready().then(() => {
      //this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad General');
  }

  /*
  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let image = 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/128/Map-Marker-Marker-Outside-Azure.png';
      let mapOptions = {
        center: latLng,
        zoom: 15,
        draggable:false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker=new google.maps.Marker({
        map: this.map,
        icon:image,
        animation: google.maps.Animation.DROP,
        position:latLng
      });

    }, (err) => {
      console.log(err);
    });


  }
  */

}
