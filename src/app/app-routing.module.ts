import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './page/user/user.component';
import { UsercreateComponent } from './page/usercreate/usercreate.component';
import { UserdetailsComponent } from './page/userdetails/userdetails.component';

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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
