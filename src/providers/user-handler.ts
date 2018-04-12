import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserHandler provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserHandler {

  constructor(public http: Http) {
    console.log('Hello UserHandler Provider');
  }

}

// "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9wmHPnqXtzuoVddWd24oA7jQQb6NB2QE&libraries=places" 