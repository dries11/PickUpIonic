import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { SearchViewMapPage } from '../searchview-map/searchview-map';

declare var google;

@Component({
  selector: 'page-searchview-list',
  templateUrl: 'searchview-list.html'
})
export class SearchViewListPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any

  games: FirebaseListObservable<any>;
  gameType: any;
  searchInfo: any;
  skillLevel: any = "Beginner"

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFire:AngularFire) {
    this.gameType = navParams.data;
    this.searchInfo = {
      gameType: this.gameType,
      skillLevel: this.skillLevel
    };
  }
  ionViewDidLoad() {
    this.games = this.angularFire.database.list('/games/' + this.gameType + "/" + this.skillLevel);
    this.initMaps();
  }

  toSearchViewMap(){
    this.navCtrl.push(SearchViewMapPage, this.searchInfo);
  }

  changeGames(){
    this.games = this.angularFire.database.list('/games/' + this.gameType  + "/" + this.skillLevel);
    this.initMaps();
  }

  poiOffStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off"}
      ]
    }
  ];

  initMaps(){
    this.games.forEach((game) => {
      for(var i = 0; i < game.length; i++){
        let mapElement = document.getElementById(game[i].$key);

        console.log(game[i]);

        let latLng = new google.maps.LatLng(game[i].location.latitude, game[i].location.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          disableDefaultUI: true,
          gestureHandling: 'none',
          styles: this.poiOffStyle
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var marker = new google.maps.Marker({
          map: this.map,
          draggable: false,
          position: latLng,
        });
      }
    })
  }
}
