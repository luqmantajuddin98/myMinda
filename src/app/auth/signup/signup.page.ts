import { Component, OnInit } from '@angular/core';
import { FBAuth } from 'src/app/services/firebase';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  async save(form) {
    try {
      await this.fbauth.register(form);
      alert("Successfully create user. Login to continue");
      //route to login
        this.router.navigate(['/']);
    } catch (e) {
      alert(e);
    }
  }

}

