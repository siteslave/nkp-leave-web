import { LineService } from './../line.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  username: any;
  password: any;
  userId: any;
  isRegister = false;
  constructor(
    private lineService: LineService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {
    this.route.queryParams
      .subscribe(userId => {
        this.userId = userId.userId;
      });
  }

  async ngOnInit() {
    if (this.userId) {
      await this.checkLineId();
    } else {
      this.router.navigate(['/404']);
    }
  }

  async checkLineId() {
    try {
      const rs: any = await this.lineService.checkLineId(this.userId);
      if (rs.ok) {
        this.router.navigate(['/line/register-success']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async register() {
    try {
      this.isRegister = true;
      if (this.username && this.password) {
        const rs: any = await this.lineService.register(this.username, this.password, this.userId);
        if (rs.ok) {
          this.router.navigate(['/line/register-success']);
        } else {
          this.alertService.error(rs.error);
        }
        this.isRegister = false;
      }
    } catch (error) {
      this.isRegister = false;
      this.alertService.error(error);
    }

  }

}
