import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { PaymentHistory } from '../payment-history/payment-history';
import { PayementPackages } from '../payement-packages/payement-packages';
import { ShareRatio } from '../share-ratio/share-ratio';

/**
 * Generated class for the Payment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class Payment {

  selectedItem : any;
  items: Array<{title: string , note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.selectedItem = navParams.get('item');    
    this.items = [];
    this.items = this.addPaymentMenu();

    /*
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/

  }

  //build payment menu list items
  private addPaymentMenu(){
    return [
   
      { id:'history' , title: 'History', note: '',icon:'card'},
      { id:'packages', title: 'Packages', note: '',icon:'card'},
      { id:'shareratio', title: 'Share Ratio', note: '',icon:'card'} 
        
      ];
  }

   itemTapped(id) {
    
    console.log("Item is tapped "+ id);
    if( id == 'history' ){
      this.navCtrl.push(PaymentHistory);
    }else if ( id == 'packages' ){
      this.navCtrl.push(PayementPackages);
    }else if ( id == 'shareratio' ){
      this.navCtrl.push(ShareRatio);
    }else{
      
    }
  }

}
