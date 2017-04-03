import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserInfo } from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userInfo:UserInfo) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
