import { Component, OnInit } from '@angular/core';
import { EmployeeTypeService } from '../../shared/services/employee-type.service';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styles: []
})
export class EmployeeTypeComponent implements OnInit {

  items: any = [];
  page: any = 1;
  total = 0;
  pageSize = 2;

  pageSizeItems = [2, 10, 20, 30, 40, 50, 100];

  limit = 0;
  offset = 0;

  constructor(
    private employeeTypeService: EmployeeTypeService
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

}
