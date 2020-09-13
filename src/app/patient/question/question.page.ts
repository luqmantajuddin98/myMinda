import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  constructor(public alertController: AlertController) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.presentAlert();
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
      <p>0 Did not apply to me at all</p>
      <p>The rating scale is as follows:</p>
      <p>The rating scale is as follows:</p>
      <p>The rating scale is as follows:</p>`,
      buttons: ['OK']
    });

    await alert.present();
  }

}
