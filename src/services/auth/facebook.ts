import { Facebook } from 'ionic-native';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Injectable()
export class FacebookAuth{

    constructor(public angularFire:AngularFire){}

    loginWithFacebook(){
        Facebook.login(['email']).then((response) => {
            let credentials = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            let providerConfig = {
                provider: AuthProviders.Facebook,
                method: AuthMethods.OAuthToken,
                remember: 'default',
                scope: ['email']
            };
            this.angularFire.auth.login(credentials, providerConfig).then((success) => {
                return true;
            }).catch((error) => {
            }).catch((error) => {
            })
        });
    }
}