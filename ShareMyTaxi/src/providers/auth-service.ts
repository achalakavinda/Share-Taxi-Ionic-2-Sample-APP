import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire , AuthProviders, AuthMethods} from 'angularfire2';

/*
 Generated class for the AuthService provider.
 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

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

  constructor(public angFire:AngularFire){

  }
  currentUser:User;

  /*
  public login(credentials) {

     if (credentials.email === null || credentials.password === null) {
     return Observable.throw("Please insert credentials");
     }

    if( credentials.email!=null && credentials.password!=null ) {
      let status = true;
      this.angFire.auth.login({
        email:credentials.email,
        password:credentials.password
      },{
        provider:AuthProviders.Password,
        method:AuthMethods.Password
      }).then((response)=>{
        console.log('success full'+JSON.stringify(response));
        status=true;
      }).catch((err)=>{
        console.log(err);
      });
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "test");
        //this.currentUser = new User('admin', 'admin@test.com');
        observer.next(status);
        observer.complete();
      });
    }
  }
*/
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
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }


}
