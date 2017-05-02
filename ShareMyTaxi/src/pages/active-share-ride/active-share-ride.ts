import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {FireLoader } from '../../providers/fire-loader';
import { AuthService } from '../../providers/auth-service';

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
  passingValues = {username:'Achala Kavinda',distance:'75 KM',duration:'1 hr 24 min',type:'Shared',amount:'2500'};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Auth: AuthService,
    private fireLoader:FireLoader,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.wayPoint.from = this.navParams.get('from');
    this.wayPoint.to = this.navParams.get('to');
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
        origin:this.wayPoint.from,
        destination:this.wayPoint,
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



  //go back
  gooBack(){
      this.navCtrl.setRoot(Main);
  }

  //show loading
  public showLoading(){
    this.loading = this.loadingCtrl.create({content: 'Please wait...'});
    this.loading.present();
  }
  private showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
