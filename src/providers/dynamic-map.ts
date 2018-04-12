import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../providers/auth-service';
import { FirebaseHandler } from '../providers/firebase-handler';
/*
  Generated class for the DynamicMap provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DynamicMap {

  //geolocation watcher
  watch:any;

  constructor(public geoLocation:Geolocation,private fireHander:FirebaseHandler,private auth:AuthService) {
    console.log('Hello DynamicMap Provider');
  }

  


}

