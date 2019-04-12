import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CreateFurnitureComponent } from './furniture/create-furniture/create-furniture.component';
import {AuthGuard} from './authentication/guards/auth.guard'
import {AdminGuard} from './authentication/guards/admin.guard'
import { FurnitureAllComponent } from './furniture/furniture-all/furniture-all.component';
import { FurnitureDetailsComponent } from './furniture/furniture-details/furniture-details.component';
import { FurnitureUserComponent } from './furniture/furniture-user/furniture-user.component';
import { CreateComponent } from './blog/create/create.component';
import { AllComponent } from './blog/all/all.component';
import { AboutComponent } from './blog/about/about.component';
import { DetailsComponent } from './blog/details/details.component';
import { EditComponent } from './blog/edit/edit.component';
import { DeleteComponent } from './blog/delete/delete.component';
import { SinglePostResolver } from './blog/single-blog.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'blog/create', component: CreateComponent, canActivate: [AdminGuard] },
  { path: 'blog/about', component: AboutComponent },
  { path: 'blog/all', component: AllComponent },
  { path: 'blog/details/:id', component: DetailsComponent, resolve: { post: SinglePostResolver }},
  { path: 'blog/edit/:id', component: EditComponent, canActivate: [AdminGuard] },
  { path: 'blog/delete/:id', component: DeleteComponent, canActivate: [AdminGuard] },
  { path: 'furniture', loadChildren: './furniture/furniture.module#FurnitureModule', canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }