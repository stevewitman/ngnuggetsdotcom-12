import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    const posts$ = this.db
      .collection('dailyPosts')
      .get()
      .pipe(
        map((result) => this.convertSnaps(result)),
        tap(console.log)
      );
    posts$.subscribe(data => console.log('DAT', data))
    // return results;
  }

  convertSnaps<T>(results: { docs: any[]; }) {
    return <T[]> results.docs.map((snap) => {
      return {
        date: snap.id,
        ...(<any>snap.data()),
      };
    })
  }
}
