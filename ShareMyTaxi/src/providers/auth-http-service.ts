import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthHttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthHttpService {

  constructor(public http: Http) {
    console.log('Hello AuthHttpService Provider');
  }

  httpTest(){
    console.log("this is called");
    this.http.get("http://localhost/http/",{}).map(res => res.json()).subscribe(data=>{
      console.log(data);
    },(err)=>{
      console.log("Oops!");
    });
  }

  httpCreateUserAcount(details){
    console.log("this is called");
  }


}
