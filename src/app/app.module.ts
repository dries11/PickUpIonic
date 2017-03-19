import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/auth/login/login';
import { SignUpPage } from '../pages/auth/signup/signup';
import { FacebookAuth } from '../services/auth/facebook';
import { AngularFireModule } from 'angularfire2';

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
    SignUpPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, FacebookAuth]
})
export class AppModule {}
