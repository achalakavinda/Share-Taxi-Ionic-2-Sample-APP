import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
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
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    console.log("this is called");
    this.http.get("https://newsapi.org/v1/articles?source=techcrunch&apiKey=b604a485219b45a59e8ac483431c8221",{headers: headers}).subscribe(data=>{
      console.log("Hellow world");
    },(err)=>{
      console.log("Oops!");
    });
  }

  httpCreateUserAcount(details){
    console.log("this is called");
  }


}
