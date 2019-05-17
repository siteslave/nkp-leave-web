import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalNewLeaveComponent } from '../../shared/modal-new-leave/modal-new-leave.component';
import { AlertService } from '../../shared/alert.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  @ViewChild('mdlNewLeave') private mdlNewLeave: ModalNewLeaveComponent;
  draftItems: any = [];
  approveItems: any = [];

  total = 0;
  offset = 0;
  page = 1;
  pageSizeItems: any = [10, 20, 30, 40, 50, 100];
  pageSize = 20;

  constructor(private managerService: ManagerService, private alertService: AlertService) {
  }

  async ngOnInit() {
    await this.getLeaves();
    await this.getApprovedLeaves();
  }

  async getLeaves() {
    try {
      const rs: any = await this.managerService.getLeaves(this.pageSize, this.offset, 'DRAFT');
      if (rs.ok) {
        this.draftItems = rs.rows;
        this.total = rs.total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getApprovedLeaves() {
    try {
      const rs: any = await this.managerService.getLeaves(this.pageSize, this.offset, 'APPROVED');
      if (rs.ok) {
        this.approveItems = rs.rows;
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

  // async doRemove(item: any) {
  //   const confirm = await this.alertService.confirm('ยืนยันการลบ', 'คุณต้องการลบรายการนี้ ใช่หรือไม่?');
  //   if (confirm) {
  //     try {
  //       const rs: any = await this.userService.deleteLeave(item.leave_id);
  //       if (rs.ok) {
  //         this.alertService.success();
  //         this.getLeaves();
  //       } else {
  //         this.alertService.error(rs.error);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //       this.alertService.error();
  //     }
  //   }
  // }
}
