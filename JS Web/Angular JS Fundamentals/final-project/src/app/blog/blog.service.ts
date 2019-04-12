import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import {Observable} from '../../../node_modules/rxjs'
const createF= 'http://localhost:5000/post/create'
const getAllF= 'http://localhost:5000/post/all'
const getSingleF= 'http://localhost:5000/post/details/'
const editSingleF= 'http://localhost:5000/post/edit/'
const deleteF= 'http://localhost:5000/post/delete/'
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  createPost(data){
    return this.http.post(createF, data)
  }

  getAllPost(): Observable<Array<Post>>{
    return this.http.get<Array<Post>>(getAllF)
  }

  getPost(id: string): Observable<Post>{
    return this.http.get<Post>(getSingleF + id)
  }
  editPost(id, data) {
    console.log(data);
    
    return this.http.put(editSingleF +id, data)
  } 

  deletePost(id): Observable<Post>{
    return this.http.delete<Post>(deleteF + id)
  }
}
