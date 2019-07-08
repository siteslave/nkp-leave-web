import { AlertService } from 'src/app/shared/alert.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../shared/services/register.service';
import { ActivatedRoute } from '@angular/router';

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
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.route.queryParams
      .subscribe(userId => {
        this.userId = userId.userId;
      });
  }

  ngOnInit() {
  }

  async register() {
    try {
      if (this.username && this.password) {
        const rs: any = await this.registerService.register(this.username, this.password, this.userId);
        if (rs.ok) {
          this.isRegister = true;
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }

  }

}
