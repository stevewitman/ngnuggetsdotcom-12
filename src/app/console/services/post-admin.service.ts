import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostAdminService {
  constructor(private afs: AngularFirestore) {}

  getAutofillFromUrlList() {
    return this.afs.doc('/config/autofillFromUrlData').get();
  }

}
