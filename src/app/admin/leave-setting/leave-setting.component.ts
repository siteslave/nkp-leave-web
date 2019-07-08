import { Component, OnInit } from '@angular/core';
import { EmployeeTypeService } from '../services/employee-type.service';
import { AlertService } from 'src/app/shared/alert.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-leave-setting',
  templateUrl: './leave-setting.component.html',
  styles: []
})
export class LeaveSettingComponent implements OnInit {

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private sharedService: SharedService,
    private alertService: AlertService
  ) { }

  employeeTypes: any = [];
  choices = [];
  periods = [];
  currentPeriodId: any;

  ngOnInit() {
    this.getEmployeeTypes();
    this.getPeriods();
  }

  async getEmployeeTypes() {
    try {
      const rs: any = await this.employeeTypeService.list(100, 0);
      if (rs.ok) {
        this.employeeTypes = rs.rows;
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
    // get leave setting
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

  // showNotify() {

  //   Notification.requestPermission(function (permission) {
  //     // If the user accepts, let's create a notification
  //     if (permission === "granted") {
  //       let myNotification = new Notification(
  //         "ทดสอบ",
  //         {
  //           body: 'Lorem Ipsum Dolor Sit Amet',
  //           icon: './assets/images/logo.png'
  //         });

  //       myNotification.onclick = (e: any) => {
  //         console.log('Notification clicked')
  //       }
  //     } else {
  //       alert('Notification don\'t support!');
  //     }
  //   });
  // }
}
