import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/auth/login/login';
import { SignUpPage } from '../pages/auth/signup/signup';
import { ForgotPasswordPage } from '../pages/auth/forgotpassword/forgotpassword';
import { CreateGamePage } from '../pages/creategame/creategame';
import { GameViewAdminPage } from '../pages/gameview/gameview-admin/gameview-admin';
import { GameViewUserPage } from '../pages/gameview/gameview-user/gameview-user';
import { ProfilePage } from '../pages/profile/profile';
import { SearchViewListPage } from '../pages/searchview/searchview-list/searchview-list';
import { SearchViewMapPage } from '../pages/searchview/searchview-map/searchview-map';
import { SettingsPage } from '../pages/settings/settings';


import { AuthData } from '../services/auth/auth';
import { FacebookAuth } from '../services/auth/facebook';
import { AngularFireModule } from 'angularfire2';
import { Geolocation } from '@ionic-native/geolocation';

export const firebaseConfig = {
    apiKey: "AIzaSyB0Bo1Q8njukDF9PCzSsHwtAqpGRBUvxQw",
    authDomain: "demoionic-df0b4.firebaseapp.com",
    databaseURL: "https://demoionic-df0b4.firebaseio.com",
    storageBucket: "demoionic-df0b4.appspot.com",
    messagingSenderId: "1089273285103"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    ForgotPasswordPage,
    CreateGamePage,
    GameViewAdminPage,
    GameViewUserPage,
    ProfilePage,
    SearchViewListPage,
    SearchViewMapPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    ForgotPasswordPage,
    CreateGamePage,
    GameViewAdminPage,
    GameViewUserPage,
    ProfilePage,
    SearchViewListPage,
    SearchViewMapPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, FacebookAuth, AuthData, Geolocation]
})
export class AppModule {}
