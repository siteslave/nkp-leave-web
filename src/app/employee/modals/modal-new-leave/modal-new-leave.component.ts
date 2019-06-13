import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as moment from 'moment';
import { EmployeeService } from '../../employee.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-modal-new-leave',
  templateUrl: './modal-new-leave.component.html',
  styles: [],
  providers: [EmployeeService]
})
export class ModalNewLeaveComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') private content: Element;
  startDate: any;
  endDate: any;

  leaveId: any;
  leaveTypeItems = [];
  leaveTypeId: any;
  remark: any;
  leaveDays: any;

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService,
    private alertService: AlertService,
  ) {
  }

  async ngOnInit() {
    await this.getLeaveTypes();
  }

  async getLeaveTypes() {
    try {
      const rs: any = await this.employeeService.getLeaveTypes();
      if (rs.ok) {
        this.leaveTypeItems = rs.rows;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async doSave() {
    const startDate = `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`;
    const endDate = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`;

    if (startDate && endDate && this.leaveTypeId && this.leaveDays) {
      try {
        const rs: any = this.leaveId ?
          await this.employeeService.updateLeaves(this.leaveId, this.leaveTypeId, startDate, endDate, this.leaveDays, this.remark)
          : await this.employeeService.createLeaves(this.leaveTypeId, startDate, endDate, this.leaveDays, this.remark);

        if (rs.ok) {
          this.alertService.success();
          this.onSave.emit(true);
          this.modalService.dismissAll();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error(e.message);
      }
    } else {
      this.alertService.error('ข้อมูลไม่ครบ');
    }
  }

  open(item: any) {
    this.leaveId = _.has(item, 'leave_id') ? item.leave_id : null;
    this.leaveTypeId = _.has(item, 'leave_type_id') ? item.leave_type_id : null;
    this.leaveDays = _.has(item, 'leave_days') ? item.leave_days : 0;
    if (_.has(item, 'start_date')) {
      const _startDate = moment(item.start_date);
      this.startDate = {
        year: _startDate.get('year'),
        month: _startDate.get('month') + 1,
        day: _startDate.get('date')
      };
    }
    if (_.has(item, 'end_date')) {
      const _endDate = moment(item.end_date);
      this.endDate = {
        year: _endDate.get('year'),
        month: _endDate.get('month') + 1,
        day: _endDate.get('date')
      };
    }

    this.remark = item ? item.remark : null;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // save
    }, (reason) => {
      // cancel
    });
  }

}
