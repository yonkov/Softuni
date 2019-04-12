import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-furniture-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  posts$: Observable<Array<Post>>;
  constructor(private postService: BlogService) { }

  ngOnInit() {
    this.posts$ = this.postService.getAllPost()
  }

}
