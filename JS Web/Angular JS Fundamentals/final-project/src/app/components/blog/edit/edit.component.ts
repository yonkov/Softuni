import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit, OnDestroy {
  post: Post;
  form: FormGroup;
  editSub: Subscription
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private postService: BlogService) { }

  ngOnInit() {
    this.form  = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      image:['', Validators.required],
      content:['', Validators.required],
    })
  }

  ngAfterViewInit() {
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.editSub = this.postService.getPost(id).subscribe(data => {
        this.post = data;
        this.form.patchValue({
          title: this.post.title,
          image: this.post.image,
          content: this.post.content
        });
      });
    });

  }

  ngOnDestroy(){
    this.editSub.unsubscribe();
  }

  editPost(id){
    this.editSub = this.postService.editPost(id, this.form.value).subscribe((data)=>{
      this.router.navigate(['/'])
    })
  }

  get f(){return this.form.controls}

  get invalid(){return this.form.invalid}
}
