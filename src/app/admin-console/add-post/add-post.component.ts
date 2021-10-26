import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { PostAdminService } from '../services/post-admin.service';

import { NewPostData, AutofillFromUrl, AutofillFromAuthorName } from '../models/new-post-data';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit, OnDestroy {
  today = new Date();
  tagsArray: string[] = [];
  postForm = this.fb.group({
    slug: [this.findNextSlug(this.todayString(this.today))],
    // slug: [this.findNextSlug('2021-09-02')],
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

  subscription1$!: Subscription;
  newPostData$!: Observable<DocumentSnapshot<NewPostData>>;
  newPostData!: NewPostData;

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private postAdminService: PostAdminService
  ) {}

  ngOnInit(): void {
    this.getNewPostData();
    this.watchUrlValueChanges();
    this.watchAuthorNameValueChanges();
    this.watchTags();
  }

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
  }

  getNewPostData() {
    this.newPostData$ = this.postAdminService.getNewPostData() as Observable<
      DocumentSnapshot<NewPostData>
    >;
    this.subscription1$ = this.newPostData$.subscribe((snap: any) => {
      const data = snap.data();
      if (data !== undefined) {
        this.newPostData = data;
      } else {
        console.log('DATA UNDEFINED');
      }
    });
  }

  watchUrlValueChanges() {
    // When url field changes, if matches urlPartial then autofill appropriate fields.
    this.postForm.get('url')?.valueChanges.subscribe((val) => {
      this.newPostData.autofillFromUrl.forEach((element: AutofillFromUrl) => {
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

  watchAuthorNameValueChanges() {
    // When authorName field changes, autofill authorUrl field.
    this.postForm.get('authorName')?.valueChanges.subscribe((val) => {
      this.newPostData.autofillFromAuthorName.forEach(
        (element: AutofillFromAuthorName) => {
          if (val === element.authorName) {
            this.postForm.patchValue({
              authorUrl: element.authorUrl,
            });
          }
        }
      );
    });
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
