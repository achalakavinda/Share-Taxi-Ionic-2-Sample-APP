import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FirebaseHandler } from '../providers/firebase-handler';



@Injectable()
export class AuthService {

  constructor(private fireHandler:FirebaseHandler){
      this.getUid();
  }

 login(credentials){      
      return this.fireHandler.getFirebase().auth().signInWithEmailAndPassword(credentials.email,credentials.password);
   }

  public register(credentials) {
    return this.fireHandler.getFirebase().auth().createUserWithEmailAndPassword(credentials.email,credentials.password);
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
    }else{
        console.log('not logged in');
    }
    return user;
  }

  public logout() {
    return this.fireHandler.getFirebase().auth().signOut();
  }


}
