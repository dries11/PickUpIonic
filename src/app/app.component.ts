import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/auth/login/login';

import { AngularFire } from 'angularfire2';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, angularFire: AngularFire) {

    const authObserver = angularFire.auth.subscribe( user => {
      if(user){
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      }
      else{
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
