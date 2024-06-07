import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/shop/products/products.component';
import { ProductDetailComponent } from './pages/shop/product-detail/product-detail.component';

const routes: Routes = [
  {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent,
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  // },
  // {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'user',
  //   component: UserComponent,
  // },
  // {
  //   path: 'user/:id',
  //   component: UserDetailComponent,
  // },
  // {
  //   path: 'category',
  //   component: CategoryComponent,
  // },
  // {
  //   path: 'category/:id',
  //   component: CategoryComponent,
  // },
  // {
  //   path: 'category/update/:id',
  //   component: CategoryDetailComponent,
  // },
  {
    path: 'product',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  // {
  //   path: 'clinic',
  //   component: ClinicComponent,
  // },
  // {
  //   path: 'clinic/create',
  //   component: ClinicCreateComponent,
  // },
  // {
  //   path: 'clinic/:id',
  //   component: ClinicCreateComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
