import { NgModule } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './app/components/navigation/navigation.component';
import { HomeComponent } from './app/components/home/home.component';

import { DropdownDirective } from './app/components/navigation/dropdown.directive';
import { CollapseDirective } from './app/components/navigation/collapse.directive';

import { AppRoutingModule } from './app-routing.module';
import {ToastrModule} from 'ngx-toastr'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { JwtInterceptorService } from './app/core/interceptors/jwt-interceptor.service';
import { ResponseHandlerInterceptorService } from './app/core/interceptors/response-handler-interceptor.service';
import { AuthService } from './app/core/services/auth.service';
import { FooterComponent } from './app/components/footer/footer.component';
import { HeaderComponent } from './app/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DropdownDirective,
    CollapseDirective,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }