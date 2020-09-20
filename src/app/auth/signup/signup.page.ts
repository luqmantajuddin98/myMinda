import { Component, OnInit } from '@angular/core';
import { FBAuth } from 'src/app/services/firebase';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CloneVisitor } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: any = {
    name: "",
    age: "",
    email: "",
    gender: "",
    phone: "",
    type: "",
    password: ""
  }
  constructor(
    private fbauth: FBAuth,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }

  async save(form) {
    try {
      await this.fbauth.register(form);
      this.presentToast("Successfully create user. Login to continue");
      //route to login
        this.router.navigate(['/']);
    } catch (e) {
      this.presentToast(e, "danger");
    }
  }

  async presentToast(text, color = "success") {
    const toast = await this.toast.create({
      color: color,
      message: text,
      duration: 2000
    });
    toast.present();
  }

}

