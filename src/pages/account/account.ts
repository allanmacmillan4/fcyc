import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData) {

  }

  updatePicture() {
    console.log('Clicked to update picture');
  }


  support() {
    this.nav.push('SupportPage');
  }
}
