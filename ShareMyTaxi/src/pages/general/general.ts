import { Component,ViewChild,ElementRef  } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform, ActionSheetController ,LoadingController,AlertController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { ShareHome } from  '../share-home/share-home';
import { PickHome } from '../pick-home/pick-home';
import { AuthService } from '../../providers/auth-service';
import { FireLoader } from '../../providers/fire-loader';
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
  homeMap ={from:'malabe',to:'kotte'};
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapRouteResponse:any;
  directionsService: any;
  directionsDisplay: any;
  auth:any;
  loading:any;
  UID:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geolocation: Geolocation,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private Auth: AuthService,
    private fireLoader:FireLoader
    ) {

    this.rootPage = HomePage;
    platform.ready().then(() => {
      this.loadMap();
    });
    //console.log(this.auth.currentUser);

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
    return new Promise((resolve, reject) => {
      directionService.route({
        origin:this.homeMap.from,
        destination: this.homeMap.to,
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

  homeMapSearchBtn(){
    this.showLoading();
    this.calcDisplayRoute(this.directionsService,this.directionsDisplay).then((succes)=>{
      this.loading.dismiss();
     console.log(succes);
      this.mapRouteResponse=succes;
      this.showAction();
    },(error)=>{
      this.showError("Sorry There were some error , Try Again later! ");
      console.log(error);
      console.log("homeMap Search response error "+error);
      this.mapRouteResponse=error;
    });
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
          text: 'Pick Ride',
          role: 'destructive',
          handler: () => {
            console.log('Action sheet Share Taxi');
            this.pickRideValidator();
          }
        },
        {
          text: 'Share Ride',
          role: 'destructive',
          handler: () => {
            console.log('Action sheet Share Taxi');
            this.shareRideValidator();
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

  //active record validator

  shareRideValidator(){
    let count=0;
    this.UID = this.Auth.getUserInfo();
    console.log(this.UID.uid)
    //this.fireLoader.getActiveRiders().push({uid:this.UID.uid});   
    this.navCtrl.push(ShareHome,{'from':this.homeMap.from,'to':this.homeMap.to,response:this.mapRouteResponse});
  }

  pickRideValidator(){
     this.navCtrl.push(PickHome,{'from':this.homeMap.from,'to':this.homeMap.to,response:this.mapRouteResponse});
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
