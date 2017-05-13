import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';


declare var google;

/**
 * Generated class for the JoinMapView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-join-map-view',
  templateUrl: 'join-map-view.html',
})
export class JoinMapView {

  @ViewChild('map') mapElement: ElementRef;

  ID='';
  directionsService:any;
  directionsDisplay:any;
  map:any;
  marker:any;
  latLng = new google.maps.LatLng(6.9271,79.8612);
  outData={id:'',Pusername:'',to:'',from:'',distance:'',duration:'',amount:'',toPay:''};
  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private fireHandler:FirebaseHandler) {
    this.ID = navParams.get('id');
    console.log('Get query id : ',this.ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinMapView');
    this.initMap();
    this.datafiller();
  }


  initMap(){    
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: false
    });

    let mapOptions = {
      center: this.latLng,
      zoom: 13,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);    
    
  }

  addMarker(){
     this.marker = new google.maps.Marker({
          map: this.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position:  this.latLng
        });
      
      this.marker.addListener('click', this.toggleBounce());
        
      }

  getPickerGeoLocation(){

  }

  toggleBounce() {
          if (this.marker.getAnimation() !== null) {
            this.marker.setAnimation(null);
          } else {
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    
  joinToRide(){

  }

   //data filler
   datafiller(){
    this.fireHandler.getFirebase().database().ref('/ride/share/'+this.ID)
    .on('value',(snap)=>{
        //  this.outData.id        = snap.child('id').val();        
         console.log(snap.val());
      });
  }

}
