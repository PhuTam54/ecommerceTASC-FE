import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './page/user/user.component';
import { UserDetailsComponent } from './page/UserDetails/UserDetails.component';
import { UserCreateComponent } from './page/UserCreate/UserCreate.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'user/create',
    component: UserCreateComponent,
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
