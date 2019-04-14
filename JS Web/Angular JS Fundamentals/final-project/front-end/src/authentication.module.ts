import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './app/components/authentication/signin/signin.component';
import { SignupComponent } from './app/components/authentication/signup/signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ])
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
  ]
})
export class AuthenticationModule { }