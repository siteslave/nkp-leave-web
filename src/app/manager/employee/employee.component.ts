import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagerService } from '../manager.service';
import { AlertService } from 'src/app/shared/alert.service';
import { ModalLeaveHistoryComponent } from 'src/app/shared/modal-leave-history/modal-leave-history.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
  @ViewChild('mdlHistory') private mdlHistory: ModalLeaveHistoryComponent;

  items: any = [];
  query: any = '';

  pageSize = 20;
  total = 0;
  offset = 0;

  pageSizeItems: any = [10, 20, 30, 40, 50, 100];
  page = 1;

  constructor(
    private managerService: ManagerService,
    private alertService: AlertService,
  ) {
  }

  async ngOnInit() {
    await this.getEmployees();
  }

  async getEmployees() {
    try {
      const rs: any = await this.managerService.getEmployees(
        this.query,
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

  openHistory(employeeId: any) {
    this.mdlHistory.open(employeeId);
  }

}
