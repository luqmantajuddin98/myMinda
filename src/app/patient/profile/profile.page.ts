import { Component, OnInit } from '@angular/core';
import { FBCloudFirestore, FBAuth } from 'src/app/services/firebase';

@Component({
  selector: 'app-patient-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class Tab2Page implements OnInit {
  user: any= {
    name: "",
    age: 0,
    gender: "",
    phone: "",
    email: ""
  };
  constructor(
    private fbcloudfirestore : FBCloudFirestore,
    private fbauth : FBAuth
    ) {}

  ngOnInit(): void {
    this.getAccount();
  }

  async getAccount(){
    this.user = await this.fbauth.getAccount();
    console.log(this.user);
    
  }
}
