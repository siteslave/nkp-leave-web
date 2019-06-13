import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../shared/alert.service';
import { ModalNewEmployeeTypeComponent } from '../modals/modal-new-employee-type/modal-new-employee-type.component';
import { EmployeeTypeService } from '../services/employee-type.service';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styles: []
})
export class EmployeeTypeComponent implements OnInit {

  @ViewChild('mdlNewEmployeeType') private mdlNewEmployeeType: ModalNewEmployeeTypeComponent;

  items: any = [];
  page: any = 1;
  total = 0;
  pageSize = 10;

  pageSizeItems = [10, 20, 30, 40, 50, 100];

  limit = 0;
  offset = 0;

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {
    await this.getEmployeeTypes();
  }

  async getEmployeeTypes() {
    try {
      const rs: any = await this.employeeTypeService.list(this.pageSize, this.offset);
      if (rs.rows) {
        this.items = rs.rows;
        this.total = rs.total;
      }
    } catch (e) {
      console.log(e);
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
    this.limit = this.pageSize;

    console.log(this.offset, this.limit);

    await this.getEmployeeTypes();
  }

  async doRemove(item: any) {
    try {
      const confirm = await this.alertService.confirm('ยืนยันการลบ', `คุณต้องการลบ ${item.employee_type_name} ใช่หรือไม่?`);
      if (confirm) {
        const rs: any = await this.employeeTypeService.delete(item.employee_type_id);
        if (rs.ok) {
          this.alertService.success();
          await this.getEmployeeTypes();
        } else {
          this.alertService.error(rs.error);
        }
      }

    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  onSave(event: any) {
    if (event) {
      this.getEmployeeTypes();
    }
  }

  openModal(item: any = null) {
    this.mdlNewEmployeeType.open(item);
  }
}
