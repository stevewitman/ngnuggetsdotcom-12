import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostAdminService {
  constructor(private afs: AngularFirestore) {}

  getNewPostData() {
    return this.afs.doc('/config/newPostData').get();
  }

}
