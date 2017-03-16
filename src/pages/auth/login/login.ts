import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../../services/auth/auth';




@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage{
 
 

loginUserNameForm: FormGroup;
submitAttempt: boolean = false;
   //public data: any;
    public isSubmitted: Boolean = false;

    constructor(public navCtrl:NavController, public auhtorization: AuthorizationService, public formBuilder: FormBuilder){
        this.loginUserNameForm = formBuilder.group({
            username: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-z]* +\d{1,2}'),Validators.required])],
            password: ['',Validators.compose([Validators.maxLength(30),Validators.pattern('[a-zA-z]* +\d{1,2}'),Validators.required])]
        
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

noSubmit(e){
    e.preventDefeault();
}


}