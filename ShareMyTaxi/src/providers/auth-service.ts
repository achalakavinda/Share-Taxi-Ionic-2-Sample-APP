import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FirebaseHandler } from '../providers/firebase-handler';



@Injectable()
export class AuthService {
  public  uid ='0';
  public user_from_user_table=[];
  public user=[];

  constructor(private fireHandler:FirebaseHandler){
    setTimeout(()=>{
      this.getUid();
    },5000);
    this.getUserInfo();
  }
 login(credentials){      
      return this.fireHandler.getFirebase().auth().signInWithEmailAndPassword(credentials.email,credentials.password);
   }

  public register(credentials) {
    return this.fireHandler.getFirebase().auth().createUserWithEmailAndPassword(credentials.email,credentials.password);
  }

  public getUserInfo() {
    let x=[];
    this.fireHandler.getFirebase().auth().onAuthStateChanged(function(user) {
          if (user) {
            this.user=user;
          }
      });
  }

getUserFromUsers(UID){
    let shareRide = this.fireHandler.getFirebase().database().ref('users');
    let query = shareRide.orderByChild('UID').equalTo(UID);
    return query.once('value');
  }

  public getUid(){     
    let user = this.fireHandler.getFirebase().auth().currentUser;
    if(user){
      console.log('logged in',user.uid);
      this.uid=user.uid;
      this.getUserFromUsers(user.uid);
    }else{
        console.log('not logged in');
    }
    return user;
  }

  public logout() {
    return this.fireHandler.getFirebase().auth().signOut();
  }


}
