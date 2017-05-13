import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { ActiveShareRide } from '../active-share-ride/active-share-ride';
import { PaymentGenerator } from '../../providers/payment-generator';
import { MessageHander } from '../../providers/message-hander';


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
  outData={id:'',PUsername:'',imgURL:'',to:'',from:'',distance:'',duration:'',amount:'',toPay:''};
  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private fireHandler:FirebaseHandler,
     private PaymentGenerator:PaymentGenerator,
     private msgHandler:MessageHander) {
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

    DisplayRoute(){
    console.log("calcDisplay");
    this.RoutePath(this.directionsService,this.directionsDisplay).then((Success)=>{
      console.log('success');
    }).catch(()=>{});
  }

  RoutePath(directionService,directionDisplay){
     return new Promise((resolve, reject) => {
      directionService.route({
        origin:this.outData.from,
        destination:this.outData.to,
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

  toggleBounce() {
          if (this.marker.getAnimation() !== null) {
            this.marker.setAnimation(null);
          } else {
            this.marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

    
  joinToRide(elmVal){
    console.log(elmVal);
    this.navCtrl.setRoot(ActiveShareRide,{id:elmVal.id,from:elmVal.from,to:elmVal.to})
  }

   //data filler
   datafiller(){
    this.fireHandler.getFirebase().database().ref('/ride/share/'+this.ID)
    .on('value',(snap)=>{
        this.outData.id  = snap.child('id').val();
        this.outData.PUsername  = snap.child('/primary/username').val();   
        this.outData.distance  = snap.child('/primary/distance').val();    
        this.outData.duration  = snap.child('/primary/duration').val();
         this.outData.amount  = snap.child('/primary/amount').val();  
        this.outData. from  = snap.child('/primary/from').val(); 
        this.outData.to  = snap.child('/primary/to').val(); 
        this.outData.imgURL  = snap.child('/primary/imgUrl').val(); 

        let amounts =this.PaymentGenerator.getSharedPayment(snap.child('/primary/distance_value').val(),snap.child('/primary/distance_value').val());

        this.outData.toPay = amounts.SA.toString();
        this.DisplayRoute();
        console.log(snap.val());
      });
  }

}
