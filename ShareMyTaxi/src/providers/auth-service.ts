import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FirebaseHandler } from '../providers/firebase-handler';



@Injectable()
export class AuthService {

  constructor(private fireHandler:FirebaseHandler){

  }
 login(credentials){      
      return this.fireHandler.getFirebase().auth().signInWithEmailAndPassword(credentials.email,credentials.password);
   }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      // this.angFire.auth.createUser;
      // return Observable.create(observer => {
      //   observer.next(true);
      //   observer.complete();
      // });
    }
  }

  public getUserInfo() {
    
  }

  public logout() {
    
  }


}
