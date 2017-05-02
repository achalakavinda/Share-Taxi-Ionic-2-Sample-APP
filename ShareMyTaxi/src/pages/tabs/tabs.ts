import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
//import pages Home,Payments,Profile
import { HomePage } from '../home/home';
import { ProfileHome } from '../profile-home/profile-home';


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
  paymentPage = HomePage;
  proflePage = ProfileHome;

}
