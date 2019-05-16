import { Component, OnInit, ViewChild } from '@angular/core';
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

  open() {
    this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // save
    }, (reason) => {
      // cancel
    });
  }

}
