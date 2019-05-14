import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: []
})
export class DepartmentComponent implements OnInit {

  items: any = [];
  page: any;
  total = 0;
  pageSize = 2;

  limit = 0;
  offset = 0;

  constructor(
    private departmentService: DepartmentService
  ) {
  }

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments() {
    try {
      const rs: any = await this.departmentService.list(this.pageSize, this.offset);
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

    await this.getDepartments();
  }
}
