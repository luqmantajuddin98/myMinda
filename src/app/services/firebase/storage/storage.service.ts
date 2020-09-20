import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FBStorage {
  QUOTATIONS = 'quotations';
  constructor(
    private afstorage: AngularFireStorage
  ) { }

  async upload(nodes, details: any){
    const rec = await this.afstorage.storage.ref(`${nodes}/${details.id}/${details.name}`);
    await rec.put(details.file);
    return await rec.getDownloadURL();
  }


}
