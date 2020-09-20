import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FBCloudFirestore, FBAuth } from 'src/app/services/firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {
  form: any = {
    q1: "0",
    q2: "0",
    q3: "0",
    q4: "0",
    q5: "0",
    q6: "0",
    q7: "0",
    q8: "0",
    q9: "0",
    q10: "0",
    q11: "0",
    q12: "0",
    q13: "0",
    q14: "0",
    q15: "0",
    q16: "0",
    q17: "0",
    q18: "0",
    q19: "0",
    q20: "0",
    q21: "0",
    stress: "",
    anxiety: "",
    depression: ""
  }

  constructor(
    public alertController: AlertController,
    private fbauth: FBAuth,
    private router: Router,
    private fbcloudfirestore: FBCloudFirestore
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.presentAlert();
  }

  async save(form) {
    try {

      const uid = await this.fbauth.getUID();
      const date = new Date();
      console.log(uid);
      let total = {
        anxiety: 0,
        stress: 0,
        depression: 0,
        uid: uid["uid"],
        timestamp: date.getTime()
        
      };


      const stress = [1, 6, 8, 11, 12, 14, 18];
      const anxiety = [2, 4, 7, 9, 15, 19, 20];
      const depression = [3, 5, 10, 13, 16, 17, 21];


      for (let i = 1; i <= 21; i++) {
        if (stress.indexOf(i) > -1) {
          total.stress += parseInt(this.form[`q${i}`]);
          continue;
        }
        if (anxiety.indexOf(i) > -1) {
          total.anxiety += parseInt(this.form[`q${i}`]);
          continue;
        }
        if (depression.indexOf(i) > -1) {
          total.depression += parseInt(this.form[`q${i}`]);
          continue;
        }
      }

      total.stress *= 2;
      total.anxiety *= 2;
      total.depression *= 2;
      console.log(total);
      await this.fbcloudfirestore.add("mindtest", total);
      //route to login
       this.router.navigate(['/patient/mind-test']);
    } catch (e) {
      alert(e);
    }



  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `<p>
      Please read each statement and circle a number 0, 1, 2 or 3 which indicates how much the statement 
      applied to you over the past week. There are no right or wrong answers. Do not spend too much 
      time on any statement.
      </p>
      <br>
      <p>The rating scale is as follows:</p>
      <br>
      <p>0 - Did not apply to me at all</p>
      <p>1 - Applied to me to some degree, or some of the time:</p>
      <p>2 - Applied to me to a considerable degree or a good part of time</p>
      <p>3 - Applied to me very much or most of the time</p>`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
