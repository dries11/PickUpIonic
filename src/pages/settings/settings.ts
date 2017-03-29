import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../services/auth/auth';

import { LoginPage } from '../auth/login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  notificationsOn: boolean;

  constructor(public navCtrl: NavController, public authData:AuthData) {}

  logoutUser(){
    this.authData.logoutUser();
    this.navCtrl.setRoot(LoginPage);
  }

}
