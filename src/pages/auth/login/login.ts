import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HomePage } from '../../home/home';
import { SignUpPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgotpassword/forgotpassword';

import { AuthData } from '../../../services/auth/auth';
import { FacebookAuth } from '../../../services/auth/facebook';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage{

    homePage: any;
    signUpPage: any;
    forgotPasswordPage: any;

    fblogin: any;
    loginEmailForm: FormGroup;
    loading: any;

    submitAttempt: boolean = false;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public facebookAuth: FacebookAuth, public authData: AuthData, public alertCtrl:AlertController, public loadingCtrl:LoadingController){
        this.fblogin = facebookAuth;
        this.loginEmailForm = formBuilder.group({
            email: ['',Validators.compose([Validators.maxLength(30),Validators.pattern("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"),Validators.required])],
            password: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-z0-9]*'),Validators.required])]
        
        });
    }

    goToSignUpPage(){
        this.navCtrl.push(SignUpPage);
    }

    goToForgotPasswordPage(){
        this.navCtrl.push(ForgotPasswordPage);
    }

    onSubmit(infoData){
        this.submitAttempt = true;
        this.loginWithEmail();
    }

    loginWithFacebook(){
        this.fblogin.loginWithFacebook();
    }

    loginWithEmail(){
        if(this.loginEmailForm.valid){
            console.log(this.loginEmailForm.value);
        }
        else{
            this.authData.loginUser(this.loginEmailForm.value.email,this.loginEmailForm.value.password).then( authData => {
                this.navCtrl.setRoot(HomePage);
            }, error => {
                this.loading.dismiss().then( () => {
                    let alert = this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create({
                dismissOnPageChange: true,
            });
            this.loading.present();
        }
    }
}