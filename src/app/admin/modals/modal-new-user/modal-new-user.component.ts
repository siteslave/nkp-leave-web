import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-new-user',
  templateUrl: './modal-new-user.component.html',
  styles: []
})
export class ModalNewUserComponent implements OnInit {

  @Output('onSave') private onSave: EventEmitter<any> = new EventEmitter();

  @ViewChild('content') private content;
  isEnabled: any = true;
  firstName: any = '';
  lastName: any = '';
  userType: any = '';
  username: any = '';
  password: any = '';

  item: any;
  userId: any;
  userTypesItems: any = ['ADMIN', 'STAFF', 'MANAGER'];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
  }

  open(item: any) {
    this.firstName = item ? item.first_name : null;
    this.lastName = item ? item.last_name : null;
    this.username = item ? item.username : null;
    this.userType = item ? item.user_type : null;
    this.userId = item ? item.user_id : null;
    this.isEnabled = item ? item.is_enabled === 'Y' ? true : false : true;

    this.password = '';

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
      }, (reason) => {
        // this.onSave.emit(false);
      });
  }

  async doSave() {

    let isError = false;

    if (this.userId) {
      isError = !(this.firstName && this.lastName && this.userType);
    } else {
      isError = !(this.firstName && this.lastName && this.userType && this.username && this.password);
    }

    if (!isError) {
      try {
        const _isEnabled = this.isEnabled ? 'Y' : 'N';
        let rs: any;

        if (this.userId) {
          rs = await this.userService.update(this.userId, this.firstName, this.lastName, this.userType, _isEnabled);
        } else {
          rs = await this.userService.create(this.username, this.password, this.firstName, this.lastName, this.userType, _isEnabled);
        }

        if (rs.ok) {
          this.onSave.emit(true);
          this.alertService.success();
          this.modalService.dismissAll();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        this.alertService.error(e.message);
      }
    } else {
      this.alertService.error('กรุณาระบุข้อมูลให้ครบ');
    }

  }

}
