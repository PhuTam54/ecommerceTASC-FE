import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './pages/department/department.component';
import { PositionComponent } from './pages/position/position.component';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

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
    path: 'department',
    component: DepartmentComponent,
  },
  {
    path: 'position',
    component: PositionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
