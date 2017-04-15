import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { auth } from 'firebase';
import 'rxjs/add/operator/map';

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

  currentUser:User;

  public login(credentials) {
    /*
    if (credentials.email === null || credentials.password === null) {

      return Observable.throw("Please insert credentials");
    } */

    if( credentials.email!=null && credentials.password!=null ) {
       return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "test" && credentials.email === "test");
        //this.currentUser = new User('admin', 'admin@test.com');
        observer.next(access);
        observer.complete();
      });
    }
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
