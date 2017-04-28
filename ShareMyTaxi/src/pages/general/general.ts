import { Component,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform, ActionSheetController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { ShareHome } from  '../share-home/share-home';
import {Observable} from 'rxjs/Observable';
import {$$observable} from "rxjs/symbol/observable";
import {observeOn} from "rxjs/operator/observeOn";
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
  mapRouteResponse:any;
  directionsService: any;
  directionsDisplay: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation, public actionSheetCtrl: ActionSheetController) {
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

  calcDisplayRoute(directionService,directionDisplay,mapRes){
    console.log("calcDisplay");
    let obsr = Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
    directionService.route({
      origin:this.homeMap.from,
      destination: this.homeMap.to,
      travelMode: 'DRIVING'
    },function(response,status){
      if(status == 'OK'){
        directionDisplay.setDirections(response);
        mapRes=response;
        console.log("google response ok");
      }else{
        console.log(status);
      }

    });
    return obsr;

  }

  homeMapSearchBtn(){
    this.calcDisplayRoute(this.directionsService,this.directionsDisplay,this.mapRouteResponse).subscribe((data)=>{
        console.log(data);
    });
    console.log("getMap response");
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((position)=>{
        console.log(position.coords.latitude+" "+position.coords.longitude);
      }
    );
  }

  showAction(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Booking',
      buttons: [
        {
          text: 'Share Taxi Ride',
          role: 'destructive',
          handler: () => {
            console.log('Action sheet Share Taxi');
            this.navCtrl.push(ShareHome,{'from':this.homeMap.from,'to':this.homeMap.to});
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
