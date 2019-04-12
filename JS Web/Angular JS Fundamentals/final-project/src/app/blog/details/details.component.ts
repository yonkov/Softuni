import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post: Post;
  constructor(
    private route: ActivatedRoute, 
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
  }
}
