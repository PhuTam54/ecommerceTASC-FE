import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/users/user.component';
import { UserDetailComponent } from './pages/user/user-detail/user-detail.component';
import { CategoryComponent } from './pages/category/categories/category.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { ClinicComponent } from './pages/clinic/clinics/clinics.component';
import { ClinicCreateComponent } from './pages/clinic/clinic-create/clinic-create.component';
import { ProductsComponent } from './pages/product/products/product.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
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
    path: 'product',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'clinic',
    component: ClinicComponent,
  },
  {
    path: 'clinic/create',
    component: ClinicCreateComponent,
  },
  {
    path: 'clinic/:id',
    component: ClinicCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
