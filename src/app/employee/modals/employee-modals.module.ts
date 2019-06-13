import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ModalNewLeaveComponent } from './modal-new-leave/modal-new-leave.component';

@NgModule({
  declarations: [
    ModalNewLeaveComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [ModalNewLeaveComponent]
})
export class EmployeeModalsModule { }
