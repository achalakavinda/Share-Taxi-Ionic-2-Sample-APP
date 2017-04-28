import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {map} from "rxjs/operator/map";
declare var google;
/**
 * Generated class for the ShareHome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-share-home',
  templateUrl: 'share-home.html',
})
export class ShareHome {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.map =this.navParams.get('map');
  }

  ionViewDidLoad() {
    this.sampleMap();
  }

  loadMap(){

  }
  sampleMap(){
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
}
