import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<any>;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.reloadPosts();
  }

  reloadPosts() {
    this.posts$ = this.postsService.loadPosts();
    this.posts$.subscribe(val => console.log('VAL', val))
  }

}
