import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DepartmentService } from './services/department.service';
import { EmployeeTypeService } from './services/employee-type.service';
import { ModalNewDepartmentComponent } from './modal-new-department/modal-new-department.component';
import { FormsModule } from '@angular/forms';
import { AlertService } from './alert.service';
import { ModalNewEmployeeTypeComponent } from './modal-new-employee-type/modal-new-employee-type.component';

@NgModule({
  declarations: [AlertComponent, ModalNewDepartmentComponent, ModalNewEmployeeTypeComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    ModalNewDepartmentComponent,
    ModalNewEmployeeTypeComponent
  ],
  providers: [
    DepartmentService,
    EmployeeTypeService,
    AlertService
  ]
})
export class SharedModule {
}
