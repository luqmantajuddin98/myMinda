import { Component, OnInit } from '@angular/core';
import { FBCloudFirestore, FBAuth } from 'src/app/services/firebase';

@Component({
  selector: 'app-psychiatrist',
  templateUrl: './psychiatrist.page.html',
  styleUrls: ['./psychiatrist.page.scss'],
})
export class PsychiatristPage implements OnInit {

  user: any= {
    name: "-",
    age: "-",
    gender: "-",
    phone: "-",
    email: "-"
  };
  constructor(
    private fbcloudfirestore: FBCloudFirestore,
    private fbauth: FBAuth
    ) { }

  ngOnInit() {
    this.getPsychiatrist();
  }

  async getPsychiatrist() {
    const auth = await this.fbauth.getAccount();
    const condition = [{
      attributes: "patient",
      statement: "==",
      value: auth["email"]
    }];

    this.fbcloudfirestore.get("patient_psychiatrist", { condition }).valueChanges().subscribe(async (d: Array<any>) => {
      console.log(d);
      const cond = [{
        attributes: "email",
        statement: "==",
        value: d[0]["psychiatrist"]
      }];

      const user = this.fbcloudfirestore.get("users", { condition:cond }).valueChanges().subscribe(async (users: Array<any>) => {
        this.user = users[0];
        console.log(this.user);
        user.unsubscribe();
      });
    });
  }

}
