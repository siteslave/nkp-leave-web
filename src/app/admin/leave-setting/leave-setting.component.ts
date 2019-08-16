import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeTypeService } from '../services/employee-type.service';
import { AlertService } from 'src/app/shared/alert.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as _ from 'lodash';
import { LeaveSettingService } from '../services/leave-setting.service';
import { ModalLeaveSettingCopyComponent } from '../modals/modal-leave-setting-copy/modal-leave-setting-copy.component';
@Component({
  selector: 'app-leave-setting',
  templateUrl: './leave-setting.component.html',
  styles: []
})
export class LeaveSettingComponent implements OnInit {

  @ViewChild('mdlCopy') mdlCopy: ModalLeaveSettingCopyComponent;

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private sharedService: SharedService,
    private leaveSetting: LeaveSettingService,
    private alertService: AlertService
  ) { }

  employeeTypes: any = [];
  choices = [];
  periods = [];
  currentPeriodId: any;

  employeeTypeName: any = '';
  employeeTypeId: any = '';

  async ngOnInit() {
    await this.getPeriods();
    await this.getEmployeeTypes();
  }

  async getEmployeeTypes() {
    try {
      const rs: any = await this.employeeTypeService.list(100, 0);
      if (rs.ok) {
        this.employeeTypes = rs.rows;

        if (this.employeeTypes.length) {
          this.employeeTypeId = this.employeeTypes[0].employee_type_id;
          this.getSetting();
        }
      } else {
        console.log(rs.error);
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  setPeriod() {
    this.getSetting();
  }

  async getSetting() {

    const idx = _.findIndex(this.employeeTypes, { employee_type_id: +this.employeeTypeId });

    if (idx > -1) {
      this.employeeTypeName = this.employeeTypes[idx].employee_type_name;
      this.employeeTypeId = this.employeeTypes[idx].employee_type_id;

      this.choices = [];

      try {
        const rs: any = await this.leaveSetting.getSetting(this.currentPeriodId, this.employeeTypeId);
        if (rs.ok) {
          this.choices = rs.rows;
        } else {
          console.log(rs.error);
          this.alertService.error();
        }
      } catch (error) {
        console.log(error);
        this.alertService.error('เกิดข้อผิดพลาด');
      }
    } else {
      this.choices = [];
      this.employeeTypeName = '';
      this.employeeTypeId = '';
    }

  }

  async getPeriods() {
    try {
      const rs: any = await this.sharedService.getPeriods();
      if (rs.ok) {
        this.periods = rs.rows;
        const idx = _.findIndex(this.periods, { is_current: 'Y' });
        if (idx > -1) {
          this.currentPeriodId = this.periods[idx].period_id;
        }
      } else {
        console.log(rs.error);
        this.alertService.error();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error('เกิดข้อผิดพลาด');
    }
  }

  onChangeLeaveDays(leaveTypeId: any, leaveDays: number) {
    const idx = _.findIndex(this.choices, { leave_type_id: leaveTypeId });
    if (idx > -1) {
      this.choices[idx].leave_days = +leaveDays;
    }
  }

  onChangeMaxLeaveDays(leaveTypeId: any, leaveDays: number) {
    const idx = _.findIndex(this.choices, { leave_type_id: leaveTypeId });
    if (idx > -1) {
      this.choices[idx].max_leave_days = +leaveDays;
    }
  }
  onChangeIsCollect(leaveTypeId: any, isCollect: any) {
    console.log(isCollect);
    const idx = _.findIndex(this.choices, { leave_type_id: leaveTypeId });
    if (idx > -1) {
      this.choices[idx].is_collect = isCollect ? 'Y' : 'N';
    }
  }

  async saveSetting() {
    if (this.currentPeriodId && this.employeeTypeId) {

      if (this.choices.length) {
        var data = [];
        this.choices.forEach(v => {
          let obj: any = {};
          obj.employee_type_id = this.employeeTypeId;
          obj.leave_type_id = v.leave_type_id;
          obj.leave_days = +v.leave_days || 0;
          obj.max_leave_days = v.is_collect === 'Y' ? +v.max_leave_days : 0;
          obj.period_id = +this.currentPeriodId;
          obj.is_collect = v.is_collect || 'N';

          data.push(obj);
        });

        console.log(data);

        if (data.length) {
          const confirm = await this.alertService.confirm('ต้องการบันทึกรายการ ใช่หรือไม่?');
          if (confirm) {
            this._doSave(data);
          }
        } else {
          this.alertService.error('ไม่พบข้อมูลที่ต้องการบันทึก');
        }

      } else {
        this.alertService.error('ไม่พบข้อมูลที่ต้องการบันทึก');
      }
    } else {
      this.alertService.error('กรุณาระบุปีงบประมาณ และ ประเภทเจ้าหน้าที่')
    }
  }

  async _doSave(data: any[]) {
    try {
      const rs: any = await this.leaveSetting.saveSetting(this.currentPeriodId, this.employeeTypeId, data);
      if (rs.ok) {
        this.alertService.success();
      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      this.alertService.error('เกิดข้อผิดพลาด')
    }
  }

  openCopy() {
    this.mdlCopy.open();
  }
}
