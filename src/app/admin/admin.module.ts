import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { DepartmentComponent } from './department/department.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LayoutComponent, DepartmentComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class AdminModule { }
