import { Component, OnInit } from '@angular/core';
import { FBCloudFirestore, FBAuth } from 'src/app/services/firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-mind-test',
  templateUrl: 'mind-test.page.html',
  styleUrls: ['mind-test.page.scss']
})

export class Tab3Page implements OnInit {
  mindtest: any = [];
  constructor(
    private fbcloudfirestore: FBCloudFirestore,
    private fbauth: FBAuth,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  async get() {
    const uid = await this.fbauth.getUID();
    const orderBy = {
      attribute: "timestamp",
      desc: true,
    };


    const condition = [{
      attributes: "uid",
      statement: "==",
      value: uid["uid"]
    }];

    this.fbcloudfirestore.get("mindtest", {orderBy, condition}).valueChanges().subscribe((d) => {
      this.mindtest = d;
    });
  }

  timestamp(value){
    return moment(value).format("DD/MM/YYYY");
  }

  stress(value) {
    if (value <= 14) {
      return "Normal";
    } else if (value <= 18) {
      return "Mild";
    } else if (value <= 25) {
      return "Moderate";
    } else if (value <= 33) {
      return "Severe";
    } else {
      return "Extremely Severe";
    }
  }

  anxiety(value) {
    if (value <= 7) {
      return "Normal";
    } else if (value <= 9) {
      return "Mild";
    } else if (value <= 14) {
      return "Moderate";
    } else if (value <= 19) {
      return "Severe";
    } else {
      return "Extremely Severe";
    }
  }

  depression(value) {
    if (value <= 9) {
      return "Normal";
    } else if (value <= 13) {
      return "Mild";
    } else if (value <= 20) {
      return "Moderate";
    } else if (value <= 27) {
      return "Severe";
    } else {
      return "Extremely Severe";
    }
  }
}
