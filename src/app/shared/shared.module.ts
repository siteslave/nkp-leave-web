import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DepartmentService } from './services/department.service';
import { EmployeeTypeService } from './services/employee-type.service';
import { ModalNewDepartmentComponent } from './modal-new-department/modal-new-department.component';
import { FormsModule } from '@angular/forms';
import { AlertService } from './alert.service';
import { ModalNewEmployeeTypeComponent } from './modal-new-employee-type/modal-new-employee-type.component';
import { UserService } from './services/user.service';
import { ModalNewUserComponent } from './modal-new-user/modal-new-user.component';
import { ModalNewEmployeeComponent } from './modal-new-employee/modal-new-employee.component';
import { EmployeeService } from './services/employee.service';
import { SubDepartmentService } from './services/sub-department.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './auth-guard.service';
import { ModalNewLeaveComponent } from './modal-new-leave/modal-new-leave.component';
import { ThaiDatePipe } from './thai-date.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AlertComponent,
    ModalNewDepartmentComponent,
    ModalNewEmployeeTypeComponent,
    ModalNewUserComponent,
    ModalNewEmployeeComponent,
    ModalNewLeaveComponent,
    ThaiDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    AlertComponent,
    ModalNewDepartmentComponent,
    ModalNewEmployeeTypeComponent,
    ModalNewUserComponent,
    ModalNewEmployeeComponent,
    ModalNewLeaveComponent,
    ThaiDatePipe
  ],
  providers: [
    DepartmentService,
    EmployeeTypeService,
    AlertService,
    UserService,
    EmployeeService,
    SubDepartmentService,
    LoginService,
    AuthGuardService
  ]
})
export class SharedModule {
}
