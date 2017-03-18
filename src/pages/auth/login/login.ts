import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/auth/auth';
import { HomePage } from '../../home/home';
import { SignUpPage } from '../signup/signup';




@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage{
    public homePage: any;
    public signUpPage: any;
    loginUserNameForm: FormGroup;
    submitAttempt: boolean = false;
    public isSubmitted: Boolean = false;

    constructor(public navCtrl:NavController, public auhtorization: AuthorizationService, public formBuilder: FormBuilder){
       this.homePage = HomePage;
      this.signUpPage = SignUpPage;
        this.loginUserNameForm = formBuilder.group({
            username: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-z0-9]*'),Validators.required])],
            password: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-z0-9]*'),Validators.required])]
        
        });
    }
    
       
    

onSubmit(infoData){
           this.isSubmitted = true;
           console.log('onSubmit');
           console.log(infoData);
if(infoData.valid){
    this.auhtorization.Username = this.auhtorization.Username;
    this.auhtorization.Password = this.auhtorization.Password;
    }
}

}