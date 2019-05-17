import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/alert.service';
import { LoginService } from '../shared/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  jwtHelper = new JwtHelperService();

  isUser: any = true;
  isAdmin = false;

  username: any;
  password: any;

  isRemember: any = true;

  constructor(
    private alertService: AlertService,
    private loginService: LoginService,
    private router: Router
  ) {
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

          const decodedToken = this.jwtHelper.decodeToken(token);

          if (decodedToken.user_type === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (decodedToken.user_type === 'MANAGER') {
            this.router.navigate(['/manager']);
          } else if (decodedToken === 'STAFF') {
            //
          } else {
            // user
            this.router.navigate(['/users']);
          }
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
