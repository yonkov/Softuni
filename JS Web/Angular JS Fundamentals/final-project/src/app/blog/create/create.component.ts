import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
form: FormGroup;
  constructor(private fb: FormBuilder, private postService: BlogService, private router: Router ) { }

  ngOnInit() {
    this.form  = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      image:['', Validators.required],
      content:['', Validators.required],
    })
  }
  createPost(){
    this.postService.createPost(this.form.value).subscribe((data)=>{
      this.router.navigate(['/'])
    })
    
  }
  get f(){return this.form.controls}

  get invalid(){return this.form.invalid}

}
