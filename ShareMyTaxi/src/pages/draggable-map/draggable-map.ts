import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController,ActionSheetController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'

import { ShareHome } from '../share-home/share-home';


declare var google;
/**
 * Generated class for the DraggableMap page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-draggable-map',
  templateUrl: 'draggable-map.html',
})
export class DraggableMap {



  @ViewChild('map') mapElement;
  map: any;
  google: any;
  push: any;
  waypoint={to:'',from:''};
  waypointCods={origin_lng:0,origin_lat:0,destination_lng:0,destination_lat:0}
  travelMode: any;
  originPlaceId: any;
  destinationPlaceId: any;
  directionsService: any;
  directionsDisplay: any;
  response: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation   :Geolocation ,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private actionSheetCtrl:ActionSheetController
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DraggableMap');
    this.currentPostionLoader();
  }

  currentPostionLoader(){
    this.geolocation.getCurrentPosition().then((resp) => {
        var aaaLng:any = resp.coords.longitude;
        var zzzLat:any = resp.coords.latitude;
        this.initMap(aaaLng, zzzLat);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }




public abc = (error: any) => {
    console.log('abc done');
    return '10';
}

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Share Taxi Option',
      message: 'Do you want to share your taxi with others?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
            this.presentLoading();
          }
        },
        {
          text: 'Agree',
          handler: () => {

            this.presentLoading();

          }
        }
      ]
    });
    confirm.present();
  }

  presentLoading() {
  console.log('inside presenLoading');
  let loader = this.loadingCtrl.create({
    content: "Please wait...",
    duration: 3000
  });
  loader.present();
}

public  presentActionSheet() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Request a Taxi',
      buttons: [
        {
          text: 'Share Taxi',
          handler: () =>{
            console.log('Agree clicked | Share Taxi');
            this.navCtrl.push(ShareHome,{response:this.response,from:this.waypoint.from,to:this.waypoint.to});
          }
        },
        {
          text: 'Pick',
          handler: () =>{
            

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    // this.loadRoadRouteAndGetDistance();
   actionSheet.present();

}

  // loadRoadRouteAndGetDistance(){
  //   let aaa = (<HTMLInputElement>document.getElementById("destination-input")).value;
  //   let bbb = (<HTMLInputElement>document.getElementById("origin-input")).value;

  //   if(aaa!=bbb && aaa!='' && bbb!=''){
  //     let service = new google.maps.DistanceMatrixService;
  //     new Promise((Resolve,Reject)=>{
  //       service.getDistanceMatrix({
  //         origins: [aaa],
  //         destinations: [bbb],
  //         travelMode: 'DRIVING',
  //         unitSystem: google.maps.UnitSystem.METRIC,
  //         avoidHighways: false,
  //         avoidTolls: false,
  //       }, function(response, status) {
  //         if (status !== 'OK') {
  //           console.log('Error was: ' + status);
  //           status;
  //         } else {
  //           console.log(response);
  //           Resolve(response.rows[0]);
  //           console.log(response.rows[0].elements[0].distance.text);
  //           console.log(response.rows[0].elements[0].duration.text);
  //           console.log(response.destinationAddresses[0]);
  //           console.log(response.originAddresses[0]);
  //           console.log(response);
  //           console.log('done');
  //         }
  //       });
  //     });

  //     console.log('inside button function');

  //     this.geolocation.getCurrentPosition().then((resp) => {
  //     }).catch((error) => {
  //       console.log('Error getting location', error);
  //     });      
  //  };
  // }


  // dataPush(){
  //   let aaa = (<HTMLInputElement>document.getElementById("destination-input")).value;
  //   let bbb = (<HTMLInputElement>document.getElementById("origin-input")).value;
  //   let service = new google.maps.DistanceMatrixService;
  //   service.getDistanceMatrix({
  //     origins: [aaa],
  //     destinations: [bbb],
  //     travelMode: 'DRIVING',
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //     avoidHighways: false,
  //     avoidTolls: false
  //   }, function(response, status) {if (status !== 'OK') {
  //     console.log('Error was: ' + status);
  //     status;
  //   } else {
  //     console.log(response.rows[0].elements[0].distance.text);
  //     console.log(response.rows[0].elements[0].duration.text);
  //     console.log(response.destinationAddresses[0]);
  //     console.log(response.originAddresses[0]);
  //     console.log(response);
  //     console.log('done');

  //     //console.log(this.abc);
  //   }});
  // }

// public callback (response, status) {
//     if (status !== 'OK') {
//       console.log('Error was: ' + status);
//       status;
//     } else {
//       console.log(response.rows[0].elements[0].distance.text);
//       console.log(response.rows[0].elements[0].duration.text);
//       console.log(response.destinationAddresses[0]);
//       console.log(response.originAddresses[0]);
//       console.log(response);
//       console.log('done');
//       console.log(this.abc);
//       //this.abc();
      
//        this.mapDB.update(0,{
//        destination: response.destinationAddresses[0],
//        distance: response.rows[0].elements[0].distance.text,
//        duration: response.rows[0].elements[0].duration.text,
//        origin:response.originAddresses[0]
//        })
//       new abc();

//       let mapDB1 = AngularFire.prototype.database.list('/Users');
//       return duration;
//     }
//   }


 initMap(aaaLng, zzzLat) {
  let myLatLng = {lat: zzzLat, lng: aaaLng};
  this.map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: myLatLng,
    zoom: 18,
    disableDefaultUI: true
  });

  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  var maker = new google.maps.Marker({
    position: myLatLng,
    map: this.map,
    icon: image
  });

  var countryRestrict = {'country': 'sl'};

  this.AutocompleteDirectionsHandler();
}



public AutocompleteDirectionsHandler() {

  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  let originInput = document.getElementById('origin-input');
  let destinationInput = document.getElementById('destination-input');
  var options = {
    componentRestrictions: {country: 'lk'}
  };

  //var modeSelector = document.getElementById('mode-selector');
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: this.map,
    //panel: document.getElementById('right-panel')
  });
  this.directionsDisplay.setMap(this.map);
  let lol = this.directionsDisplay;

  this.directionsDisplay.addListener('directions_changed', ()=> {
    this.dataManupulator(lol.getDirections());
  });

  let originAutocomplete = new google.maps.places.Autocomplete(originInput, options);
  let destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, options);

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

public setupPlaceChangedListener(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    me.route();
  });

}

public route() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

 public dataManupulator(result) {
  console.log("Result Values",result);
  // console.log('start address ', result.routes[0].legs[0].start_address);
  // console.log('start address Lng ', result.routes[0].bounds.f.b);
  // console.log('start address Lat ', result.routes[0].bounds.b.b);
  // console.log('end address ', result.routes[0].legs[0].end_address);
  // console.log('end address Lng ', result.routes[0].bounds.f.f);
  // console.log('end address Lat ', result.routes[0].bounds.b.f);
  // console.log('distance ', result.routes[0].legs[0].distance.text);
  // console.log('duration ', result.routes[0].legs[0].duration.text);

  this.waypointCods.origin_lng =  result.routes[0].bounds.f.f;
  this.waypointCods.origin_lat =  result.routes[0].bounds.b.b;

  this.waypointCods.destination_lng = result.routes[0].bounds.f.b;
  this.waypointCods.destination_lat = result.routes[0].bounds.b.f;

  this.waypoint.from = result.routes[0].legs[0].start_address;
  this.waypoint.to = result.routes[0].legs[0].end_address;

  console.log('Way points codes ',this.waypointCods);
  console.log('Way points',this.waypoint);
  
}





}
