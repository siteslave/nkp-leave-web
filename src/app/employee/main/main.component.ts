import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AlertService } from '../../shared/alert.service';
import { EmployeeService } from '../employee.service';
import { ModalNewLeaveComponent } from '../modals/modal-new-leave/modal-new-leave.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  @ViewChild('mdlNewLeave') private mdlNewLeave: ModalNewLeaveComponent;
  items: any = [];
  total = 0;
  offset = 0;
  page = 1;
  pageSizeItems: any = [10, 20, 30, 40, 50, 100];
  pageSize = 20;

  constructor(
    private userService: EmployeeService,
    private alertService: AlertService,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  async ngOnInit() {
    await this.getLeaves();
  }

  async getLeaves() {
    try {
      const rs: any = await this.userService.getLeaves(this.pageSize, this.offset);
      if (rs.ok) {
        this.items = rs.rows;
        this.total = rs.total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  openModal(item: any = null) {
    this.mdlNewLeave.open(item);
  }

  onPageChange(event: number) {
    const _currentPage = +event;
    // tslint:disable-next-line:variable-name
    let _offset = 0;
    if (_currentPage > 1) {
      _offset = (_currentPage - 1) * this.pageSize;
    }

    this.offset = _offset;

  }

  onSave(event: any) {
    if (event) {
      this.getLeaves();
    }
  }

  async doRemove(item: any) {
    const confirm = await this.alertService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?');
    if (confirm) {
      try {
        const rs: any = await this.userService.deleteLeave(item.leave_id);
        if (rs.ok) {
          this.alertService.success();
          this.getLeaves();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }
    }
  }

  print(item: any) {
    const token = sessionStorage.getItem('token');
    const url = `${this.apiUrl}/leaves/pdf/${item.leave_id}?token=${token}`;
    window.open(url, '_blank');
  }

  exportExcel() {
    const token = sessionStorage.getItem('token');
    const url = `${this.apiUrl}/services/employees/export?token=${token}`;

    window.open(url, '_blank');
  }
}
