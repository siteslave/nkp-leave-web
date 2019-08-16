import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertService } from 'src/app/shared/alert.service';
import { LeaveSettingService } from '../../services/leave-setting.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-modal-leave-setting-copy',
  templateUrl: './modal-leave-setting-copy.component.html',
  styles: [],
  providers: [LeaveSettingService, SharedService]
})
export class ModalLeaveSettingCopyComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('content') private content: Element;

  oldPeriodId = null;
  nextPeriodId = null;
  periods: any = [];

  constructor(
    private modalService: NgbModal,
    private leaveSettingService: LeaveSettingService,
    private sharedService: SharedService,
    private alertService: AlertService,
  ) {
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
  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // save
    }, (reason) => {
      // cancel
    });
  }

  async doSave() {
    if (this.oldPeriodId === this.nextPeriodId) {
      this.alertService.error('กรุณาเลือกปีงบประมาณใหม่');
    } else {
      const confirm = await this.alertService.confirm('ต้องการสำเนาการตั้งค่าการลา ใช่หรือไม่?');
      if (confirm) {
        const rs: any = await this.leaveSettingService.saveCopySetting(this.oldPeriodId, this.nextPeriodId);
        if (rs.ok) {
          this.alertService.success();
          this.modalService.dismissAll();
        } else {
          this.alertService.error(rs.error);
        }
      }
    }
  }

}
