import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FBAuth {

  constructor(
    private afstore: AngularFirestore,
    private afauth: AngularFireAuth
  ) { }

  async login(user): Promise<Account>{
    console.log(user)
    await this.afauth.auth.signInWithEmailAndPassword(user.email, user.password);
    return await this.getAccount();
  }

  async logout(){
		return await this.afauth.auth.signOut();
  }

  register(user){
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.afauth.auth.createUserWithEmailAndPassword(user["email"], user["password"]);
        this.saveUserToDB(user, res.user.uid);
        resolve(true);
      } catch(error) {
        reject(error);
      }
    });
  }

  saveUserToDB(user: any, uid: string){
    delete user.password;
    return this.afstore.doc('users/' + uid).set(user); 
  }

  async getAccount(): Promise<Account>{
    const res = await this.getUID();
    return new Promise((resolve, reject) => {
      this.afstore.doc("users/" + res["uid"]).valueChanges().subscribe((res: Account) => {
        resolve(res);
      });
    }) 
  }

  async setAccount(data) {
    const res = await this.getUID();
    return await this.afstore.doc('users/' + res["uid"]).set(data, { merge: true });
  }

  async getUID(){
    return new Promise((resolve, reject) => {
      this.afauth.user.subscribe(user => {
        resolve(user);
      });
    });
  }
}
