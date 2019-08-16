import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LeaveSettingService } from '../services/leave-setting.service';
import { AlertService } from 'src/app/shared/alert.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-init-leave',
  templateUrl: './init-leave.component.html',
  styles: []
})
export class InitLeaveComponent implements OnInit {
  periods: any = [];
  oldPeriodId: any;
  nextPeriodId: any;
  currentPeriodId: any;
  currentPeriodName: any;

  constructor(
    private sharedService: SharedService,
    private leaveSetting: LeaveSettingService,
    private alertService: AlertService
  ) {
    this.currentPeriodId = sessionStorage.getItem('periodId');
    this.currentPeriodName = sessionStorage.getItem('periodName');
  }

  ngOnInit() {
    this.getPeriods();
  }

  async getPeriods() {
    try {
      const rs: any = await this.sharedService.getPeriods();
      if (rs.ok) {
        this.periods = rs.rows;
      } else {
        console.log(rs.error);
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  async doProcess() {
    if (this.nextPeriodId === this.currentPeriodId) {
      this.alertService.error('กรุณาเลือกปีงบประมาณใหม่');
    } else {
      const confirm = await this.alertService.confirm('ต้องการประมวลผลข้อมูลใช่หรือไม่?');
      if (confirm) {
        const rs: any = await this.leaveSetting.initialLeave(this.nextPeriodId, this.oldPeriodId);
        if (rs.ok) {
          this.alertService.success();
        } else {
          this.alertService.error();
        }
      }
    }
  }
}
