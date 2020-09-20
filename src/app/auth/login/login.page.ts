import { Component } from '@angular/core';
import { FBAuth } from 'src/app/services/firebase';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.scss']
})
export class Tab1Page {
  form: any = {
    email: "",
    password:""
  }
  constructor(
    private fbauth: FBAuth,
    private router: Router,
    private toast: ToastController
    ) {}

  async login(form){
    console.log(form)
    if(form['email'] != ''){
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var check =  regex.test(form['email']);
    }
    
    if(check){

      const user = await this.fbauth.login(form);
      console.log(user);

      if(user["type"] == "patient")
      {
        this.router.navigate(['/patient']);
      } else {
        this.router.navigate(['/psychiatrist']);
      }

    } else {
      this.presentToast("No user found.");
    }
  }

  async presentToast(text) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }
}
