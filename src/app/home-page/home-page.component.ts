import { Component, OnInit } from '@angular/core';
import {PostService} from '../shared/post.service';
import {Observable} from 'rxjs';

class Posts {
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$: Observable<Posts[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
  }

}
