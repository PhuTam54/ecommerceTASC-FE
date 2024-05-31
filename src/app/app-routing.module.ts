import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './page/clinic/clinic.component';
import { UserComponent } from './page/user/user.component';
import { FavoriteProductComponent } from './page/favorite-product/favorite-product.component';
import { UsercreateComponent } from './page/UserCreate/UserCreate.component';
import { UserdetailsComponent } from './page/UserDetails/UserDetails.component';
import { ClinicCreateComponent } from './page/clinic-create/clinic-create.component';


const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/create',
    component: UsercreateComponent,
  },
  {
    path: 'user/:id',
    component: UserdetailsComponent,
  },
  {
    path: 'clinic',
    component: ClinicComponent
  },
  {
    path: 'clinic/create',
    component: ClinicCreateComponent
  },
  {
    path: 'favorite-product',
    component: FavoriteProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
