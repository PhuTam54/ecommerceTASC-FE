import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/users/user.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { CategoryComponent } from './pages/category/categories/category.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { ClinicComponent } from './pages/clinic/clinics/clinics.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'category/update/:id',
    component: CategoryDetailComponent,
  },
  {
    path: 'clinic',
    component: ClinicComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
