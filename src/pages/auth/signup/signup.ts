import { Component } from '@angular/core';

import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HomePage } from '../../home/home';

import { AuthData } from '../../../services/auth/auth';



@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage{

    signUpForm: FormGroup;
    submitAttempt: boolean = false;
    loading;

    constructor(public navCtrl:NavController, public formBuilder:FormBuilder, public alertCtrl:AlertController, public authData:AuthData, public loadingCtrl:LoadingController){
        this.signUpForm = formBuilder.group({
            email: ['',Validators.compose([Validators.required])],
            password: ['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]+')])],
            reenteredpassword: ['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]+')])]
        });
    }

    submitted(){

        this.submitAttempt = true;
        var accountSetup;

        if(this.signUpForm.value.password != this.signUpForm.value.reenteredpassword){
            this.passwordsDoNotMatch();
        }
        else{
            accountSetup = this.authData.signUpUser(this.signUpForm.value.email,this.signUpForm.value.password)
            if(accountSetup == false){
                    this.loading.dismiss().then(() => {
                    this.userErrorAlert("Error..Account Unable To Be Created");
                });
            }
            else{
                this.accountCreatedAlert();
            }
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true
            });
            this.loading.present();
        }
    }

    passwordsDoNotMatch(){
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Passwords do not match...try again',
            buttons: ['Ok']
        });
        alert.present();
    }

    userErrorAlert(error){
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: error,
            buttons: ['Ok']
        });
        alert.present();
    }

    accountCreatedAlert(){
        let alert = this.alertCtrl.create({
            title: 'Account Created!',
            subTitle: 'Play on!',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
                ]
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);
    }

}