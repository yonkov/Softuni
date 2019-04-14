import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../shared/models/post';
import {Observable} from 'rxjs'
/* In dev mode */
// const createF= 'http://localhost:5000/post/create'
// const createC= 'http://localhost:5000/post/comment/create'
// const getAllF= 'http://localhost:5000/post/all'
// const getSingleF= 'http://localhost:5000/post/details/'
// const editSingleF= 'http://localhost:5000/post/edit/'
// const deleteF= 'http://localhost:5000/post/delete/'
/* In production: */
const createF= '/post/create'
const createC= '/post/comment/create'
const getAllF= '/post/all'
const getSingleF= '/post/details/'
const editSingleF= '/post/edit/'
const deleteF= '/post/delete/' 
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  createPost(data){
    return this.http.post(createF, data)
  }

  createComment(data){
    return this.http.post(createC, data)
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
