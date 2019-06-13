import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from 'src/app/shared/alert.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-modal-leave-history',
  templateUrl: './modal-leave-history.component.html',
})
export class ModalLeaveHistoryComponent implements OnInit {

  @ViewChild('content') private content: Element;

  employeeId: any;
  items: any = [];
  itemsSummary: any = [];

  firstName: any;
  lastName: any;
  departmentName: any;
  subDepartmentName: any;

  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    private alertService: AlertService,
  ) {
  }

  async ngOnInit() { }

  async getHistory() {
    try {
      const rs: any = await this.sharedService.getLeaveHisotryByEmployee(this.employeeId);
      if (rs.ok) {
        this.items = rs.rows;
        this.itemsSummary = rs.summary.map(v => {
          if (v.leave_days_num > 0) {
            v.remain_days = +v.leave_days_num - +v.current_leave;
          } else {
            v.remain_days = 0;
          }

          return v;
        });

        const info = rs.info;

        if (_.has(info, 'first_name')) {
          this.firstName = info.first_name;
        }
        if (_.has(info, 'last_name')) {
          this.lastName = info.last_name;
        }
        if (_.has(info, 'department_name')) {
          this.departmentName = info.department_name;
        }
        if (_.has(info, 'sub_department_name')) {
          this.subDepartmentName = info.sub_department_name;
        }

      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async open(employeeId: any) {
    this.employeeId = employeeId;
    this.modalService.open(this.content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      backdrop: 'static'
    }).result.then((result) => { }, (reason) => { });

    await this.getHistory();
  }

}
