import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthData } from '../../services/auth/auth';

import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { CreateGamePage } from '../creategame/creategame';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authData:AuthData) {}

  toSettingsPage(){
    this.navCtrl.push(SettingsPage);
  }

  toProfilePage(){
    this.navCtrl.push(ProfilePage);
  }

  toCreateGamePage(){
    this.navCtrl.push(CreateGamePage);
  }

}
