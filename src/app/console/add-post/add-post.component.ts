import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl } from '@angular/forms';

import { urlAutofillMatches } from '../services/urlAutofillMatches';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  today = new Date();
  tagsArray: string[] = [];
  postForm = this.fb.group({
    // slug: [this.findNextSlug(this.todayString(this.today))],
    slug: [this.findNextSlug('2021-09-02')],
    url: [''],
    type: [''],
    duration: [''],
    title: [''],
    description: [''],
    imgUrl: [''],
    datePosted: [this.today],
    dateSource: [this.today],
    sourceSite: [''],
    sourceUrl: [''],
    authorName: [''],
    authorUrl: [''],
    likes: [''],
    featured: [''],
    tags: [''],
    visits: [''],
    postedBy: ['Steve Witman'],
  });
  types = [
    { value: 'video', viewValue: 'Video' },
    { value: 'blog', viewValue: 'Blog' },
    { value: 'podcast', viewValue: 'Podcast' },
    { value: 'release', viewValue: 'Release' },
    { value: 'community', viewValue: 'Community' },
  ];
  typeControl = new FormControl();

  constructor(private fb: FormBuilder, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.watchUrl();
    this.watchTags();
  }

  onSubmit() {
    console.log('SUBMIT CLICKED');
  }

  findNextSlug(dateString: string): void {
    let nextLetter = '';
    let newSlug = '';
    this.db
      .doc(`/dailyPosts/${dateString}`)
      .get()
      .subscribe((snap: any) => {
        const data = snap.data();
        console.log('DATA:', data);
        if (data === undefined) {
          newSlug = `${dateString}-a`;
        } else {
          const currLetter = Object.keys(data)
            .sort()
            .slice(-1)
            .pop()
            ?.slice(-1);
          if (currLetter) {
            nextLetter = this.nextChar(currLetter);
            newSlug = `${dateString}-${nextLetter}`;
          }
        }

        this.postForm.patchValue({
          slug: `${newSlug}`,
        });
      });
  }

  todayString(today: Date) {
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();
    const year = today.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const result = [year, month, day].join('-');
    return result;
  }

  nextChar(c: string) {
    let skip = 1;
    if (c === 'k' || c === 'n') {
      skip = 2;
    }
    return String.fromCharCode(c.charCodeAt(0) + skip);
  }

  convertSnaps<T>(results: any) {
    return <T[]>results.docs.map((snap: any) => {
      return {
        date: snap.id,
        ...(<any>snap.data()),
      };
    });
  }

  watchUrl() {
    this.postForm.get('url')?.valueChanges.subscribe((val) => {
      urlAutofillMatches.forEach((element) => {
        if (val.includes(element.urlPartial)) {
          this.postForm.patchValue({
            type: element.type,
            sourceSite: element.sourceSite,
            sourceUrl: element.sourceUrl,
            authorName: element.authorName,
            authorUrl: element.authorUrl,
          });
        }
      });
    });
  }

  watchTags() {
    // TODO remove later or use to check for slightly diff duplicates. Also maybe replace with chips and add tag btn.
    // this.postForm.get('tags').valueChanges.subscribe((val) => {
    //   this.tagsArray = this.csvToArray(val);
    // });
  }

  dateChanged() {
    const datePosted = this.postForm.get('datePosted')?.value;
    const dateString = this.todayString(datePosted);
    this.findNextSlug(dateString);
  }

  csvToArray(val: string): string[] {
    return val.split(',').map(function (item: string) {
      return item.trim();
    });
  }
}
