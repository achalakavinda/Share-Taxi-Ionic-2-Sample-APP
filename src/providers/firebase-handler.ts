import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';


@Injectable()
export class FirebaseHandler {

  private firebaseInitApp:any;
  private FB=firebase;
  private fireRef:any;
  private firebaseConfig={
    apiKey: "AIzaSyB-KCKrSIswArC3WTOOyKPBmNUihVhTglQ",
    authDomain: "sharetaxi-cdc6f.firebaseapp.com",
    databaseURL: "https://sharetaxi-cdc6f.firebaseio.com",
    projectId: "sharetaxi-cdc6f",
    storageBucket: "sharetaxi-cdc6f.appspot.com",
    messagingSenderId: "787464864609"
  };

  constructor(private http: Http) {
    console.log('Hello FirebaseHandler Provider');
    this.firebaseInitApp = this.FB.initializeApp(this.firebaseConfig);
    this.fireRef = firebase.database().ref();
  }

  public getFirebase(){
      return this.FB;
  }
  public getFireRef(){
    return this.fireRef;
  }

  
}
