import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/alert.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  isUser: any = true;
  isAdmin = false;

  username: any;
  password: any;

  isRemember: any = true;

  constructor(private alertService: AlertService, private loginService: LoginService) {
  }

  ngOnInit() {
    const _username = localStorage.getItem('username');
    if (_username) {
      this.username = _username;
    }
  }

  toggle(type: string) {
    if (type === 'isUser') {
      this.isUser = true;
      this.isAdmin = false;
    } else {
      this.isUser = false;
      this.isAdmin = true;
    }
  }

  async doLogin() {
    if (this.username && this.password) {
      // login
      try {
        const userType = this.isAdmin ? 'ADMIN' : 'USER';
        const rs: any = await this.loginService.doLogin(this.username, this.password, userType);
        if (rs.ok) {
          const token = rs.token;
          sessionStorage.setItem('token', token);

          if (this.isRemember) {
            localStorage.setItem('username', this.username);
          } else {
            localStorage.removeItem('username');
          }
        } else {
          this.alertService.error(rs.error);
        }
      } catch (e) {
        console.log(e);
        this.alertService.error();
      }
    } else {
      this.alertService.error('ข้อมูลไม่ครบ');
    }
  }
}
