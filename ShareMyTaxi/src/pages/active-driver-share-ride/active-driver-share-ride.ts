import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseHandler } from '../../providers/firebase-handler';
import { MessageHander } from '../../providers/message-hander';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the ActiveDriverShareRide page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-active-driver-share-ride',
  templateUrl: 'active-driver-share-ride.html',
})
export class ActiveDriverShareRide {
  ID:any;
  Driver_UID='';
  passenger={p_1:false,p_2:false};
  btn = {
    disable_1:true,
    disable_2:true,
    name_1:'Payment Accept',
    name_2:'Payment Accept',
    complete_disable:true,
    complete_name:'End Ride',
    color_1:'dark',
    color_2:'dark',
    complete_color:'secondary',
    p_1:false,
    p_2:false  
};
  outData = {
            id:'',
            data:'',
            time:'',
            pUID:'',
            pUsername:'----',
            pDistance:'----',
            pDuration:'-----',
            pFrom:'',
            pTo:'',
            pAmount:'----',
            pAmount_to_pay:'----',
            sUID:'',
            sUsername:'----',
            sDistance:'----',
            sDuration:'----',
            sFrom:'',
            sTo:'',
            sAmount:'',
            sAmount_to_pay:'----'
          };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private fireHandler:FirebaseHandler,
    private msgHandler:MessageHander,
    private Auth:AuthService
    ) {
    this.ID=navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveDriverShareRide');
     this.datafiller();
     this.getDriverUID();
  }

  //get driver uid
  getDriverUID(){
    let user=this.Auth.getUid();
    if(user){
      this.Driver_UID=user.uid;
    }
  }

  //data filler
   datafiller(){
    this.fireHandler.getFirebase().database().ref('/ride/share/'+this.ID)
    .on('value',(snap)=>{

         this.outData.id        = snap.child('id').val();
         this.outData.pUID      = snap.child('primary_UID').val(); 
         this.outData.pUsername = snap.child('primary/username').val();
         this.outData.pDistance = snap.child('primary/distance').val(); 
         this.outData.pAmount   = snap.child('primary/amount').val();
         this.outData.pAmount_to_pay   = snap.child('primary/amount_to_pay').val();   
         this.outData.pDuration = snap.child('primary/duration').val();   
         this.outData.pFrom     = snap.child('primary/from').val();   
         this.outData.pTo       = snap.child('primary/to').val();  
         this.outData.sUsername = snap.child('secondary/username').val();
         this.outData.sDistance = snap.child('secondary/distance').val(); 
         this.outData.sAmount   = snap.child('secondary/amount').val();  
         this.outData.sAmount_to_pay   = snap.child('secondary/amount_to_pay').val();
         this.outData.sDuration = snap.child('secondary/duration').val(); 
         this.outData.sFrom     = snap.child('secondary/from').val();   
         this.outData.sTo       = snap.child('secondary/to').val();            
         this.outData.sUID      = snap.child('secondary_UID').val(); 
         


         this.btn.p_1=false;
         this.btn.p_2=false;

         if(this.outData.pUsername !=='' && !this.passenger.p_1){
            this.passenger.p_1=true;
            this.btn.disable_1=null;
            this.btn.p_1=true;
         }
         if(this.outData.sUsername !=='' && !this.passenger.p_2){
            this.passenger.p_2=true;
            this.btn.disable_2=null;
            this.btn.p_2=true;
         }
         console.log(snap.val());
         console.log('Update Array',this.outData);
      });
  }

  allocateDriver(elVal){
      if(elVal===1){    
        this.msgHandler.showLoading();
       let field=this.fireHandler.getFirebase().database().ref('ride/share/'+this.ID+'/primary');
       field.child('payment_verified').set('true').then((e)=>{
         this.msgHandler.dissmisLoading();
         this.btn.disable_1=true;
         this.btn.name_1='Payment Verified';
         this.btn.color_1='secondary';
         this.btn.p_1=true;
         this.completeBtn();
       });     

      }else if(elVal===2){
        this.msgHandler.showLoading();
         let field=this.fireHandler.getFirebase().database().ref('ride/share/'+this.ID+'/secondary');
          field.child('payment_verified').set('true').then((e)=>{
              this.msgHandler.dissmisLoading();
              this.btn.p_2=true;
              this.btn.disable_2=true;
              this.btn.name_2='Payment Verified';
              this.btn.color_2='secondary';
              this.completeBtn();
          }); 
      }
      console.log('accept payment call');      
  }

  completeBtn(){
    if(this.btn.p_1 && this.btn.p_2){
          this.btn.complete_disable=null;
          this.btn.complete_color='danger';
      }else if(this.btn.p_2) {
          if(this.btn.p_1){
            this.btn.complete_disable=null;
            this.btn.complete_color='danger';
          }
      }else if(this.btn.p_1){
            this.btn.complete_disable=null;
            this.btn.complete_color='danger';
      }
  }

  comfirmRide(){
      console.log('add driver share ride history');
      this.driverShareRideHistoryPusher();
      if(this.outData.pUID!==""){
        let x = {
            id:this.ID,
            uid:this.outData.pUID,
            date:this.outData.data,
            time:this.outData.time,
            from:this.outData.pFrom,
            to:this.outData.pTo,
            Verified:'true',
            secondary:false,
            distance:this.outData.pDistance,
            amount:this.outData.pAmount,
            payed:this.outData.pAmount_to_pay
        }
        this.PassengerShareRideHistoryPusher(x);
        console.log("Yes there is primary passenger");
    }if(this.outData.sUID!==''){
      let x = {
            id:this.ID,
            uid:this.outData.sUID,
            date:this.outData.data,
            time:this.outData.time,
            from:this.outData.sFrom,
            to:this.outData.sTo,
            Verified:'true',
            secondary:true,
            distance:this.outData.sDistance,
            amount:this.outData.sAmount,
            payed:this.outData.sAmount_to_pay
        }
        this.PassengerShareRideHistoryPusher(x);
        console.log("Yes there is secondary passenger");

      }
  }

//driver history pusher
  driverShareRideHistoryPusher(){
    let secondary_allocated=false;
    if(this.passenger.p_1&&this.passenger.p_2){
      secondary_allocated=true;
    }
    let Passenger={
      driver_uid:this.Driver_UID,
      date:this.outData.data,
      time:this.outData.time,
      secondary_allocated:secondary_allocated,
      primary:{
        uid:this.outData.pUID,
        username:this.outData.pUsername,
        distance:this.outData.pDistance,
        duration:this.outData.pDuration,
        amount:this.outData.pAmount_to_pay,
        from:this.outData.pFrom,
        to:this.outData.pTo,
      },
      secondary:{
        uid:this.outData.sUID,
        username:this.outData.sUsername,
        distance:this.outData.sDistance,
        duration:this.outData.sDuration,
        amount:this.outData.sAmount_to_pay,
        from:this.outData.sFrom,
        to:this.outData.sTo,
      }
    }
    let newPostKey = this.fireHandler.getFirebase().database().ref().child('history/driver/ride/share').push().key;
    this.fireHandler.getFirebase().database().ref('history/driver/ride/share/'+ newPostKey).set(Passenger).then(response=>{

    });
  }

  PassengerShareRideHistoryPusher(Passenger){
    let newPostKey = this.fireHandler.getFirebase().database().ref().child('history/passenger/ride/share').push().key;
    this.fireHandler.getFirebase().database().ref('history/passenger/ride/share/'+ newPostKey).set(Passenger).then(response=>{
    });
  }

}
