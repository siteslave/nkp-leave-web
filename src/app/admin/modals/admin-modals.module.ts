import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNewDepartmentComponent } from './modal-new-department/modal-new-department.component';
import { ModalNewUserComponent } from './modal-new-user/modal-new-user.component';
import { ModalNewEmployeeComponent } from './modal-new-employee/modal-new-employee.component';
import { ModalNewEmployeeTypeComponent } from './modal-new-employee-type/modal-new-employee-type.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalLeaveSettingCopyComponent } from './modal-leave-setting-copy/modal-leave-setting-copy.component';

@NgModule({
  declarations: [
    ModalNewDepartmentComponent,
    ModalNewUserComponent,
    ModalNewEmployeeComponent,
    ModalNewEmployeeTypeComponent,
    ModalLeaveSettingCopyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ModalNewDepartmentComponent,
    ModalNewUserComponent,
    ModalNewEmployeeComponent,
    ModalNewEmployeeTypeComponent,
    ModalLeaveSettingCopyComponent
  ]
})
export class AdminModalsModule { }
