import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './page/department/department.component';
import { PositionComponent } from './page/position/position.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
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
