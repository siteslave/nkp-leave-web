import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../shared/alert.service';
import { ManagerService } from '../manager.service';
import { ModalLeaveHistoryComponent } from 'src/app/shared/modal-leave-history/modal-leave-history.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  @ViewChild('mdlHistory') private mdlHistory: ModalLeaveHistoryComponent;

  draftItems: any = [];
  allItems: any = [];

  draftTotal = 0;
  allTotal = 0;
  draftOffset = 0;
  allOffset = 0;
  draftPage = 1;
  allPage = 1;
  allPageSizeItems: any = [10, 20, 30, 40, 50, 100];
  draftPageSizeItems: any = [10, 20, 30, 40, 50, 100];
  pageSize = 20;

  leaveStatus = [
    { name: 'รออนุมัติ', value: 'DRAFT' },
    { name: 'อนุมัติ', value: 'APPROVED' },
    { name: 'ไม่อนุมัติ', value: 'DENIED' }
  ];
  status: any;

  constructor(private managerService: ManagerService, private alertService: AlertService) {
  }

  async ngOnInit() {
    await this.getDraftLeaves();
    await this.getAllLeaves();
  }

  async getDraftLeaves() {
    try {
      const rs: any = await this.managerService.getLeaves(this.pageSize, this.draftOffset, 'DRAFT');
      if (rs.ok) {
        this.draftItems = rs.rows;
        this.draftTotal = rs.total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async getAllLeaves() {
    try {
      const rs: any = await this.managerService.getLeavesAll(this.pageSize, this.allOffset, this.status);
      if (rs.ok) {
        this.allItems = rs.rows;
        this.allTotal = rs.total;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  onDraftPageChange(event: number) {
    const _currentPage = +event;
    // tslint:disable-next-line:variable-name
    let _offset = 0;
    if (_currentPage > 1) {
      _offset = (_currentPage - 1) * this.pageSize;
    }

    this.draftOffset = _offset;

  }

  onAllPageChange(event: number) {
    const _currentPage = +event;
    // tslint:disable-next-line:variable-name
    let _offset = 0;
    if (_currentPage > 1) {
      _offset = (_currentPage - 1) * this.pageSize;
    }

    this.allOffset = _offset;

  }

  async doDeny(item: any) {
    const confirm = await this.alertService.confirm('ปฏิเสธการลา', `ต้องการปฏิเสธการลา ${item.first_name} ${item.last_name} ใช่หรือไม่?`);
    if (confirm) {
      try {
        const rs: any = await this.managerService.updateStatus(item.leave_id, 'DENIED');
        if (rs.ok) {
          this.alertService.success();
          await this.getDraftLeaves();
          await this.getAllLeaves();
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }
    }
  }

  async doApproved(item: any) {
    const confirm = await this.alertService.confirm('อนุมัติการลา', `ต้องการอนุมัติการลา ${item.first_name} ${item.last_name} ใช่หรือไม่?`);
    if (confirm) {
      try {
        const rs: any = await this.managerService.updateStatus(item.leave_id, 'APPROVED');
        if (rs.ok) {
          this.alertService.success();
          await this.getDraftLeaves();
          await this.getAllLeaves();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }
    }
  }

  openHistory(employeeId: any) {
    this.mdlHistory.open(employeeId);
  }
}
