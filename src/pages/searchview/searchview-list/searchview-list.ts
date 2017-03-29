import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { SearchViewMapPage } from '../searchview-map/searchview-map';

@Component({
  selector: 'page-searchview-list',
  templateUrl: 'searchview-list.html'
})
export class SearchViewListPage {

  games: FirebaseListObservable<any>;
  gameType: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFire:AngularFire) {
    this.gameType = navParams.data;
  }
  ionViewDidLoad() {
    this.games = this.angularFire.database.list('/games/' + this.gameType);
  }

  toSearchViewMap(){
    this.navCtrl.push(SearchViewMapPage, this.gameType);
  }

  changeGames(){
    this.games = this.angularFire.database.list('/games/' + this.gameType);
  }

}
