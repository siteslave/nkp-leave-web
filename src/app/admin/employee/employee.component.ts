import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../shared/alert.service';
import { ModalNewEmployeeComponent } from '../modals/modal-new-employee/modal-new-employee.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeTypeService } from '../services/employee-type.service';
import { DepartmentService } from '../services/department.service';
import { SubDepartmentService } from '../services/sub-department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {

  @ViewChild('mdlNewEmployee') private mdlNewEmployee: ModalNewEmployeeComponent;

  items: any = [];
  employeeTypeItems: any = [];
  departmentItems: any = [];
  subDepartmentItems: any = [];

  query: any = '';
  departmentId: any = '';
  subDepartmentId: any = '';
  employeeTypeId: any = '';
  pageSize = 20;
  total = 0;
  offset = 0;

  pageSizeItems: any = [10, 20, 30, 40, 50, 100];
  page = 1;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private employeeTypeService: EmployeeTypeService,
    private departmentService: DepartmentService,
    private subDepartmentService: SubDepartmentService
  ) {
  }

  async ngOnInit() {
    await this.getEmployees();
    this.getDepartment();
    this.getEmployeeType();
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

  async getEmployees() {
    try {
      const rs: any = await this.employeeService.list(
        this.query,
        this.employeeTypeId,
        this.departmentId,
        this.subDepartmentId,
        this.pageSize,
        this.offset);
      if (rs.ok) {
        this.items = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async onPageChange(event: number) {
    console.log(event);
    // tslint:disable-next-line:variable-name
    const _currentPage = +event;
    // tslint:disable-next-line:variable-name
    let _offset = 0;
    if (_currentPage > 1) {
      _offset = (_currentPage - 1) * this.pageSize;
    }

    this.offset = _offset;

    await this.getEmployees();
  }

  enterSearch(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.getEmployees();
    }
  }

  doSearch() {
    this.getEmployees();
  }

  onSave(event: any) {
    if (event) {
      this.getEmployees();
    }
  }

  openModal(item: any = null) {
    this.mdlNewEmployee.open(item);
  }

  async doRemove(item: any) {
    const confirm = await this.alertService.confirm(
      'ยืนยันการลบ',
      `ต้องการลบ ${item.first_name} ${item.last_name} ใช่หรือไม่?`
    );

    if (confirm) {
      try {
        const rs: any = await this.employeeService.delete(item.employee_id);
        if (rs.ok) {
          this.alertService.success();
          await this.getEmployees();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }

    }
  }

  onChangeDepartment() {
    this.subDepartmentId = '';
    this.getSubDepartment();
    this.getEmployees();
  }
}
