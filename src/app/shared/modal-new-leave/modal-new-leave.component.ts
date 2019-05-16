import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../users/users.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-modal-new-leave',
  templateUrl: './modal-new-leave.component.html',
  styles: [],
  providers: [UsersService]
})
export class ModalNewLeaveComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') private content;
  startDate: any;
  endDate: any;

  leaveTypeItems = [];
  leaveTypeId: any;
  remark: any;
  leaveDays: any;

  constructor(
    private modalService: NgbModal,
    private userService: UsersService,
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {
    await this.getLeaveTypes();
  }

  async getLeaveTypes() {
    try {
      const rs: any = await this.userService.getLeaveTypes();
      if (rs.ok) {
        this.leaveTypeItems = rs.rows;
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async doSave() {
    const startDate = `${ this.startDate.year }-${ this.startDate.month }-${ this.startDate.day }`;
    const endDate = `${ this.endDate.year }-${ this.endDate.month }-${ this.endDate.day }`;

    if (startDate && endDate && this.leaveTypeId && this.leaveDays) {
      try {
        const rs: any = await this.userService.create(this.leaveTypeId, startDate, endDate, this.leaveDays, this.remark);
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

  open() {
    this.leaveTypeId = null;
    this.leaveDays = 0;
    this.startDate = null;
    this.endDate = null;
    this.remark = null;

    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // save
    }, (reason) => {
      // cancel
    });
  }

}
