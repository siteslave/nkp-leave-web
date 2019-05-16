import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { SubDepartmentService } from '../services/sub-department.service';
import { EmployeeTypeService } from '../services/employee-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-new-employee',
  templateUrl: './modal-new-employee.component.html',
  styles: []
})
export class ModalNewEmployeeComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') private content;

  departmentItems = [];
  subDepartmentItems = [];
  employeeTypeItems = [];

  departmentId: any = '';
  subDepartmentId: any = '';
  employeeTypeId: any = '';
  firstName: any = '';
  lastName: any = '';
  username: any = '';
  password: any = '';
  isEnabled = true;
  employeeId: any;

  constructor(
    private modalService: NgbModal,
    private departmentService: DepartmentService,
    private subDepartmentService: SubDepartmentService,
    private employeeTypeService: EmployeeTypeService
  ) {
  }

  ngOnInit() {
    this.getDepartment();
    this.getEmployeeType();
  }

  open(item: any) {
    this.firstName = item ? item.first_name : null;
    this.lastName = item ? item.last_name : null;
    this.username = item ? item.username : null;
    this.employeeTypeId = item ? item.employee_type_id : null;
    this.departmentId = item ? item.department_id : null;
    this.subDepartmentId = item ? item.sub_department_id : null;

    if (this.departmentId) {
      this.getSubDepartment();
    }

    this.employeeId = item ? item.employee_id : null;
    this.isEnabled = item ? item.is_enabled === 'Y' ? true : false : true;

    this.password = '';

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'})
      .result.then((result) => {
    }, (reason) => {
      // this.onSave.emit(false);
    });
  }

  async getDepartment() {
    try {
      const rs: any = await this.departmentService.list('', 100, 0);
      if (rs.ok) {
        this.departmentItems = rs.rows;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getSubDepartment() {
    try {
      const rs: any = await this.subDepartmentService.list('', this.departmentId, 100, 0);
      if (rs.ok) {
        this.subDepartmentItems = rs.rows;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getEmployeeType() {
    try {
      const rs: any = await this.employeeTypeService.list(100, 0);
      if (rs.ok) {
        this.employeeTypeItems = rs.rows;
      }
    } catch (e) {
      console.log(e);
    }
  }

  onDepartmentChange() {
    this.getSubDepartment();
  }
}
