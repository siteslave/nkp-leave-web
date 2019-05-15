import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../shared/services/department.service';
import { ModalNewDepartmentComponent } from '../../shared/modal-new-department/modal-new-department.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: []
})
export class DepartmentComponent implements OnInit {

  @ViewChild('mdlNewDepartment') private mdlNewDepartment: ModalNewDepartmentComponent;

  items: any = [];
  page: any = 1;
  total = 0;
  pageSize = 10;
  pageSizeItems = [10, 20, 30, 40, 50, 100];

  limit = 0;
  offset = 0;

  constructor(
    private departmentService: DepartmentService
  ) {
  }

  async ngOnInit() {
    await this.getDepartments();
  }

  openModal(item: any = null) {
    this.mdlNewDepartment.open(item);
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

  onSaveDepartment(event: any) {
    if (event) {
      this.getDepartments();
    } else {
      console.log('User cancel');
    }
  }
}
