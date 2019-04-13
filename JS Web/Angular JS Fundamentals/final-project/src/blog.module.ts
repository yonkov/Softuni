import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './app/components/blog/create/create.component';
import { DetailsComponent } from './app/components/blog/details/details.component';
import { DeleteComponent } from './app/components/blog/delete/delete.component';
import { EditComponent } from './app/components/blog/edit/edit.component';
import { AllComponent } from './app/components/blog/all/all.component';
import { AboutComponent } from './app/components/blog/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './app/core/services/blog.service';
import { RouterModule} from '@angular/router';
import { SinglePostResolver } from './app/components/blog/single-blog.resolver';
import {AdminGuard} from './app/core/guards/admin.guard'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'create', component: CreateComponent, canActivate: [AdminGuard] },
      { path: 'about', component: AboutComponent },
      { path: 'all', component: AllComponent },
      { path: 'details/:id', component: DetailsComponent, resolve: { post: SinglePostResolver } },
      { path: 'edit/:id', component: EditComponent, canActivate: [AdminGuard]},
      { path: 'delete/:id', component: DeleteComponent, canActivate: [AdminGuard]},
    ])
  ],
  declarations: [
    CreateComponent,
    DetailsComponent,
    DeleteComponent,
    EditComponent,
    AllComponent,
    AboutComponent
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule { }
