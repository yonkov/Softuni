import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Furniture } from '../models/furniture';
import {Observable} from '../../../node_modules/rxjs'
const createF= 'http://localhost:5000/furniture/create'
const getAllF= 'http://localhost:5000/furniture/all'
const getUserF= 'http://localhost:5000/furniture/user'
const getSingleF= 'http://localhost:5000/furniture/details/'
const deleteF= 'http://localhost:5000/furniture/delete/'
@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  constructor(private http: HttpClient) { }

  createFurniture(data){
    return this.http.post(createF, data)
  }

  getAllFurniture(): Observable<Array<Furniture>>{
    return this.http.get<Array<Furniture>>(getAllF)
  }

  getUserFurniture(): Observable<Array<Furniture>>{
    return this.http.get<Array<Furniture>>(getUserF)
  }

  getFurniture(id): Observable<Furniture>{
    return this.http.get<Furniture>(getSingleF + id)
  }

  deleteFurniture(id): Observable<Furniture>{
    return this.http.delete<Furniture>(deleteF + id)
  }
}
