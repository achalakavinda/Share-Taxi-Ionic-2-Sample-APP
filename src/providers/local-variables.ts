import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalVariables provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalVariables {

  constructor(private storage: Storage ,public http: Http) {
    console.log('Hello Local Variables Provider');
  }

  SetUserType(name){
    console.log("set user type :"+name);
    this.storage.set("USER_TYPE",name);
  }

  GetUserType(){
    return this.storage.get("USER_TYPE");
  }
}
