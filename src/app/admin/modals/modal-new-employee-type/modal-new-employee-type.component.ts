import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeTypeService } from '../../services/employee-type.service';
import { AlertService } from 'src/app/shared/alert.service';
@Component({
  selector: 'app-modal-new-employee-type',
  templateUrl: './modal-new-employee-type.component.html',
  styles: []
})
export class ModalNewEmployeeTypeComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') private content;
  employeeTypeName: any = '';
  employeeTypeId: any;

  constructor(
    private modalService: NgbModal,
    private employeeTypeService: EmployeeTypeService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
  }

  open(item: any) {
    this.employeeTypeName = item ? item.employee_type_name : null;
    this.employeeTypeId = item ? item.employee_type_id : null;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
      }, (reason) => {
        // this.onSave.emit(false);
      });
  }

  async doSave() {

    if (this.employeeTypeName) {
      try {
        let rs: any;

        if (this.employeeTypeId) {
          rs = await this.employeeTypeService.update(this.employeeTypeId, this.employeeTypeName);
        } else {
          rs = await this.employeeTypeService.create(this.employeeTypeName);
        }

        if (rs.ok) {
          this.onSave.emit(true);
          this.alertService.success();
          this.modalService.dismissAll();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        this.alertService.error(e.message);
      }
    } else {
      this.alertService.error('กรุณาระบุชื่อหน่วยงาน');
    }

  }

}
