import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DepartmentComponent } from './department/department.component';
import { UsersComponent } from './users/users.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: 'department', component: DepartmentComponent}, // /admin/department
      {path: 'employee-type', component: EmployeeTypeComponent}, // /admin/users
      {path: 'users', component: UsersComponent}, // /admin/users
      {path: 'employees', component: EmployeeComponent}, // /admin/users
      {path: '', redirectTo: 'department', pathMatch: 'full'} // /admin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
