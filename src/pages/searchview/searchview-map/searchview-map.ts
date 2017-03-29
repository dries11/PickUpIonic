import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { SearchViewListPage } from '../searchview-list/searchview-list';

declare var google;

@Component({
  selector: 'page-searchview-map',
  templateUrl: 'searchview-map.html'
})
export class SearchViewMapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  games: FirebaseListObservable<any>;
  gameType: String;
  markerLatLng: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public angularFire: AngularFire) {
    this.gameType = navParams.data;
    this.games = angularFire.database.list('/games/' + this.gameType);
  }

  ionViewDidLoad() {
    this.initMap();
  }

  initMap(){

    this.geolocation.getCurrentPosition().then((position) => {

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false 
    };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (error) => {
      alert("Error!");
    });

    this.games.forEach((game) => {
      let latlng = new google.maps.LatLng(game[0].location.latitude, game[0].location.longitude);
      var marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        position: latlng
      });
      marker.setMap(this.map);
    });
  }

  toSearchViewList(){
    this.navCtrl.pop(SearchViewListPage);
  }

  changeGames(){
    this.games = this.angularFire.database.list('/games/' + this.gameType);
  }

}
