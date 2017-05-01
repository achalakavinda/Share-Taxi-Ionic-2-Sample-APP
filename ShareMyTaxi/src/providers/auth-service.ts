import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire , AuthProviders, AuthMethods } from 'angularfire2';



export class User {
  name:String;
  email:String;
  constructor( name:string , email: string){
    this.name;
    this.email;
  }

}

@Injectable()
export class AuthService {

  fireAuth

  constructor(public angFire:AngularFire){

  }
  currentUser:User;

  public login(credentials){
       return this.angFire.auth.login({
         email:credentials.email,
         password:credentials.password
       },{
         provider:AuthProviders.Password,
         method:AuthMethods.Password
       });
   }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      this.angFire.auth.createUser;
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() {
    return this.angFire.auth.getAuth();
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


}
