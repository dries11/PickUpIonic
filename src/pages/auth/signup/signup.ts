import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignUpPage{

    signUpForm: FormGroup;
    submitAttempt: boolean = false;

    constructor(public navCtrl:NavController, public formBuilder:FormBuilder){
        this.signUpForm = formBuilder.group({
            email: ['',Validators.compose([Validators.required])],
            password: ['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]+')])],
            reenteredpassword: ['',Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]+')])]
        });
    }

    submitted(){

        this.submitAttempt = true;

        if(!this.signUpForm.valid){
            alert('Error!');
        }
        if(this.signUpForm.value.password != this.signUpForm.value.reenteredpassword){
            alert('Passwords Do Not Match');
        }
        else{
            //Firebase here
            console.log(this.signUpForm);
        }
    }

}