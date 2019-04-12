import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './authentication/auth.service'
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken()
    let jsonreq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
    return next.handle(jsonreq)
  }
}
