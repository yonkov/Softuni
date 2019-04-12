import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  post: Post;
  getPosts$: Observable<Array<Post>>;
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private postService: BlogService) { }

  ngOnInit() {
    this.getPosts$ = this.postService.getAllPost()
    this.form  = this.fb.group({
      title:[''],
      image:[''],
      content:[''],
    })
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.postService.getPost(id).subscribe(data => {
        this.post = data;    
      });
    });
  }

  deletePost(id) {
    this.postService.deletePost(id)
      .subscribe(data =>
        //this.getPosts$ = this.postService.getAllPost()
        this.router.navigate(['/'])
      )};

  get f(){return this.form.controls}

  get invalid(){return this.form.invalid}
}
