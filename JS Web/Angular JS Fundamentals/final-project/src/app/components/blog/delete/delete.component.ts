import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../core/services/blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit, OnDestroy {
  post: Post;
  getPosts$: Observable<Array<Post>>;
  form: FormGroup;
  delSub: Subscription
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
      this.delSub=this.postService.getPost(id).subscribe(data => {
        this.post = data;
      });
    });
  }

  ngOnDestroy(){
    this.delSub.unsubscribe();
  }

  deletePost(id) {
    this.delSub=this.postService.deletePost(id)
      .subscribe(data =>
        this.router.navigate(['/'])
      )};

  get f(){return this.form.controls}

  get invalid(){return this.form.invalid}
}
