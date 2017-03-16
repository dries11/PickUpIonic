import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class AuthData {

    public fireAuthentication: any;
    public userProfile: any;

    constructor(){
        this.fireAuthentication = firebase.auth();
        this.userProfile = firebase.database().ref('/userProfile');
    }

    loginUser(email: string, password: string): firebase.Promise<any> {
        return this.fireAuthentication.signInWithEmailAndPassword(email, password);
    }

    signUpUser(email: string, password: string): firebase.Promise<any> {
        return this.fireAuthentication.createUserWithEmailAndPassword(email, password).then((newUser) => {
            this.userProfile.child(newUser.uid).set({email: email})
        })
    }

    resetPassword(email: string): firebase.Promise<any> {
        return this.fireAuthentication.sendPasswordResetEmail(email);
    }

    logoutUser(): firebase.Promise<any>{
        return this.fireAuthentication.signOut();
    }
}