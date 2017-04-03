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
  searchInfo: any;
  skillLevel: any = "Beginner";
  markerLatLng: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public angularFire: AngularFire) {
    this.searchInfo = navParams.data;
    this.gameType = this.searchInfo.gameType;
    this.skillLevel = this.searchInfo.skillLevel;
    this.games = angularFire.database.list('/games/' + this.gameType + "/" + this.skillLevel);
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
    }).then(() => {
        this.games.forEach((game) => {
          for(var i = 0; i < game.length; i++){
            let latlng = new google.maps.LatLng(game[i].location.latitude, game[i].location.longitude);
            var marker = new google.maps.Marker({
              map: this.map,
              draggable: false,
              position: latlng,
              title: game[i].type
            });
            var infowindow = new google.maps.InfoWindow({
              content: game[i].type
            });
            marker.addListener('click', function(){
              infowindow.open(this.map, marker);
            });
          }
      });
    });
  }

  toSearchViewList(){
    this.navCtrl.pop(SearchViewListPage);
  }

  changeGames(){
    this.games = this.angularFire.database.list('/games/' + this.gameType + "/" + this.skillLevel);
    this.initMap();
  }

  changeSkillLevel(){
    this.games = this.angularFire.database.list('/games/' + this.gameType + "/" + this.skillLevel);
    this.initMap();
  }

}
