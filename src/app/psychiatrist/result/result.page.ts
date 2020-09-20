import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FBCloudFirestore } from 'src/app/services/firebase';
import * as moment from 'moment';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  mindtest: any = [];
  constructor(private route: ActivatedRoute,
    private fbcloudfirestore: FBCloudFirestore) { }

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get("id");
    console.log(uid)
    this.get(uid)
  }

  async get(uid) {
    const orderBy = {
      attribute: "timestamp",
      desc: true,
    };


    const condition = [{
      attributes: "uid",
      statement: "==",
      value: uid
    }];

    this.fbcloudfirestore.get("mindtest", {orderBy, condition}).valueChanges().subscribe((d) => {
      this.mindtest = d;
      console.log(this.mindtest);
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
