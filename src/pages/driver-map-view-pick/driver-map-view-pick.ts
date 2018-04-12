import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { AuthService } from '../../providers/auth-service';
import { MessageHander  } from '../../providers/message-hander';
import { ActiveDriverPickRide } from '../active-driver-pick-ride/active-driver-pick-ride';


declare var google;

/**
 * Generated class for the DriverMapViewPick page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-driver-map-view-pick',
  templateUrl: 'driver-map-view-pick.html',
})
export class DriverMapViewPick {
  outData = {
              id:'',
              Username:'----',
              Distance:'----',
              Duration:'-----',
              Amount:'----',
            };
              driverInfo={
                uid:'',
                username:'',
                table_id:'',
                imgURL:'',
                tel:'',
                nic:'',
                address:''
              }  

  map:any;
  directionsService:any;
  directionsDisplay:any;
  geoPosition={lat:0,lng:0};
  passedData:any;
  driverMarker:any;
  uid='0000';          

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public geolocation:Geolocation,
     private fireHandler:FirebaseHandler,
     private Auth:AuthService,
     private msgHandler:MessageHander) {
       this.passedData = this.navParams.get('data');
        console.log("this is called",this.passedData);        
        this.datafiller();
        
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverMapViewPick');
    
  }

  datafiller(){
    this.fireHandler.getFirebase().database().ref('/ride/pick/'+this.passedData.id)
    .on('value',(snap)=>{
         this.outData.id = snap.child('id').val();
         this.outData.Username = snap.child('username').val();
         this.outData.Distance = snap.child('distance').val(); 
         this.outData.Amount = snap.child('distance_amount').val();  
         this.outData.Duration = snap.child('duration').val();   
      });
  }

   getDriverUID(){
    console.log('this is get login id of auth user so be care full');
    let user =this.Auth.getUid();
     if(user){
      console.log('logged in',user.uid);
      this.uid=user.uid;
      let userinfo=this.Auth.getUserFromUsers(this.uid);

      userinfo.then((snap)=>{
       snap.forEach(childData => {         
         this.driverInfo.username= childData.val().username;
         this.driverInfo.imgURL= childData.val().img;
         this.driverInfo.table_id = childData.val().id;
        //  this.driverInfo.nic = childData.val().nic;
        //  this.driverInfo.address = childData.val().address;
        //  this.driverInfo.tel = childData.val().tel;
         this.driverInfo.uid=this.uid;

        console.log('fetch driver info',this.driverInfo);
       });
     }).catch((e)=>{
       console.log('error geting Driver info',e);
       this.driverInfo={uid:'0000',username:'',table_id:'',imgURL:'', tel:'', nic:'', address:''} 
     });

      console.log('get driver info');
    }else{
        console.log('not logged in');
    }
  }

    allocateDriver(){
    console.log('Value from pick_ride Db',this.outData);
    console.log('driver confirmed');
    let field=this.fireHandler.getFirebase().database().ref('ride/pick/'+this.passedData.id);
       field.child('driver_allocated').set('true');
       field.child('status').set('active_driver');
       field.child('driver_UID').set(this.uid);
       field.child('driver_username').set(this.driverInfo.username);
       field.child('driver_img').set(this.driverInfo.imgURL);
       field.child('driver_tel').set(this.driverInfo.tel);
       field.child('driver_nic').set(this.driverInfo.nic);       
      this.navCtrl.setRoot(ActiveDriverPickRide,{id:this.passedData.id});
  }


}
