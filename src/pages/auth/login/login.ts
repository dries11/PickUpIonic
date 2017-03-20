import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../../home/home';
import { SignUpPage } from '../signup/signup';
import { ForgotPasswordPage } from '../forgotpassword/forgotpassword';
import { FacebookAuth } from '../../../services/auth/facebook';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage{

    homePage: any;
    signUpPage: any;
    fblogin: any;
    forgotPasswordPage: any;
    loginEmailForm: FormGroup;
    submitAttempt: boolean = false;
    isSubmitted: boolean = false;

    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public facebookAuth: FacebookAuth){
        this.fblogin = facebookAuth;
        this.loginEmailForm = formBuilder.group({
            email: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'),Validators.required])],
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
        this.isSubmitted = true;
        console.log('onSubmit');
        console.log(infoData);
    }

    loginWithFacebook(){
        this.fblogin.loginWithFacebook();
    }
}