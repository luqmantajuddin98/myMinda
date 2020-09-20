import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { FBCloudFirestore, FBAuth } from 'src/app/services/firebase';

@Component({
  selector: 'app-psychiatrist-patient',
  templateUrl: 'patient.page.html',
  styleUrls: ['patient.page.scss']
})

export class Tab2Page implements OnInit {
  users: any = [];
  constructor(
    public alertController: AlertController,
    private fbcloudfirestore: FBCloudFirestore,
    private fbauth: FBAuth,
    private toast: ToastController
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Patient',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: async (data) => {
            let isExist = false;
            this.users.forEach(element => {
              if (data["email"] == element["email"]) {
                isExist = true;
              }
            });
            if (isExist) {
              this.presentToast("Patient already exist.");
            } else {
              await this.get(data)
            }

            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }

  async getPatient() {
    const auth = await this.fbauth.getAccount();
    const condition = [{
      attributes: "psychiatrist",
      statement: "==",
      value: auth["email"]
    }];

    this.fbcloudfirestore.get("patient_psychiatrist", { condition }).valueChanges().subscribe(async (d: Array<any>) => {
      this.users = [];
      d.forEach((element) => {
        const cond = [{
          attributes: "email",
          statement: "==",
          value: element["patient"]
        }];

        const user = this.fbcloudfirestore.get("users", { condition: cond }).snapshotChanges().subscribe(async (users: Array<any>) => {
          this.users.push({uid: users[0].payload.doc.id, ...users[0].payload.doc.data()});
          console.log(this.users)
          user.unsubscribe();
        });
      });
    });
  }

  async get(data) {
    const condition = [{
      attributes: "email",
      statement: "==",
      value: data.email
    }, {
      attributes: "type",
      statement: "==",
      value: "patient"
    }];

    const user = this.fbcloudfirestore.get("users", { condition }).valueChanges().subscribe(async (d: Array<any>) => {
      console.log(d);
      if (d.length < 1) {
        this.presentToast("No patient found.");
      } else {
        const auth = await this.fbauth.getAccount();
        const data = {
          patient: d[0].email,
          psychiatrist: auth["email"]
        }
        await this.fbcloudfirestore.add("patient_psychiatrist", data);
        this.presentToast("Successfully added.");
      }
      user.unsubscribe();
    });
  }

  async presentToast(text) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  toResult(uid){
    
  }


}
