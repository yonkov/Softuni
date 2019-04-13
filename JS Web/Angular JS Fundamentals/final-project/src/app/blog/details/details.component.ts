import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../../authentication/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post: Post;
  form: FormGroup
  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    public postService: BlogService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
    
    this.form = this.fb.group({
      comment: ['', [Validators.required]]
    })
  }
  createComment() {
    this.route.params.subscribe(data => {
      const id = data['id']
      this.form.value.id=id;
      
      this.postService.createComment(this.form.value).subscribe((data) => {
        this.postService.getPost(id).subscribe(data => {
          this.post = data;
      });
      });
    });
  }

  get f() { return this.form.controls }

  get invalid() { return this.form.invalid }

}