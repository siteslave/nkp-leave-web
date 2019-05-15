import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/alert.service';
import { ModalNewUserComponent } from '../../shared/modal-new-user/modal-new-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  @ViewChild('mdlNewUser') private mdlNewUser: ModalNewUserComponent;

  items: any = [];
  query: any = '';
  pageSize = 20;
  total = 0;
  offset = 0;
  userType: any = '';

  userTypesItems = ['ADMIN', 'STAFF', 'MANAGER'];
  pageSizeItems: any = [10, 20, 30, 40, 50, 100];
  page = 1;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  async ngOnInit() {
    await this.getUsers();
  }

  async getUsers() {
    try {
      const rs: any = await this.userService.list(this.query, this.userType, this.pageSize, this.offset);
      if (rs.ok) {
        this.items = rs.rows;
        this.total = rs.total;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async onPageChange(event: number) {
    console.log(event);
    // tslint:disable-next-line:variable-name
    const _currentPage = +event;
    // tslint:disable-next-line:variable-name
    let _offset = 0;
    if (_currentPage > 1) {
      _offset = (_currentPage - 1) * this.pageSize;
    }

    this.offset = _offset;

    await this.getUsers();
  }

  enterSearch(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.getUsers();
    }
  }

  doSearch() {
    this.getUsers();
  }

  onSave(event: any) {
    if (event) {
      this.getUsers();
    }
  }

  openModal(item: any = null) {
    this.mdlNewUser.open(item);
  }

  async doRemove(item: any) {
    const confirm = await this.alertService.confirm(
      'ยืนยันการลบ',
      `ต้องการลบ ${ item.first_name } ${ item.last_name } ใช่หรือไม่?`
    );

    if (confirm) {
      try {
        const rs: any = await this.userService.delete(item.user_id);
        if (rs.ok) {
          this.alertService.success();
          await this.getUsers();
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }

    }
  }
}
