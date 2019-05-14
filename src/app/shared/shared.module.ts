import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DepartmentService } from './services/department.service';
import { EmployeeTypeService } from './services/employee-type.service';
import { ModalNewDepartmentComponent } from './modal-new-department/modal-new-department.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlertComponent, ModalNewDepartmentComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    ModalNewDepartmentComponent
  ],
  providers: [
    DepartmentService,
    EmployeeTypeService
  ]
})
export class SharedModule {
}
