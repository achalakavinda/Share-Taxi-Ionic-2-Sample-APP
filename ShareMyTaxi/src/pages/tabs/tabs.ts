import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';

//import pages Home,Payments,Profile
import { HomePage } from '../home/home';
import { Payment } from '../payment/payment';
import { Profile } from '../profile/profile';


/**
 * Generated class for the Tabs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  constructor(){}
  homePage = HomePage;
  paymentPage = Payment;
  proflePage = Profile;

}
