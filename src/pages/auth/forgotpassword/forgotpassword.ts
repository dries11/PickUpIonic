import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';

import { AuthData } from '../../../services/auth/auth';

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotPasswordPage {

  resetPasswordForm: FormGroup;

  constructor(public authData: AuthData, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public formBuilder : FormBuilder) {
    this.resetPasswordForm = formBuilder.group({
      email:['']
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } 
    else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        let alert = this.alertCtrl.create({
          message: "We just sent you a reset link to your email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      }, 
      (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        errorAlert.present();
      });
    }
  }

}
