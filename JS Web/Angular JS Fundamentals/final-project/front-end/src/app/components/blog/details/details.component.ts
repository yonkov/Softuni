import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  post: Post;
  form: FormGroup
  comSub: Subscription
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
      this.comSub = this.postService.createComment(this.form.value).subscribe((data) => {
          setTimeout(() => {
            this.postService.getPost(id).subscribe(data => {
              this.post = data;
            });
          }, 700);
          
            this.form.reset();
        });
        
      
    });
  }

  ngOnDestroy(){
    this.comSub.unsubscribe()
  }



  get f() { return this.form.controls }

  get invalid() { return this.form.invalid }

}