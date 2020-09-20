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
    try{
        const user = await this.fbauth.login(form);
        this.router.navigate([`/${user["type"]}`]);
    } catch (e){
      this.presentToast(e.message);
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
