import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  username: any;
  firstName: any;
  lastName: any;
  password: any;
  positionName: any;
  departmentName: any;
  subDepartmentName: any;

  constructor(
    private managerService: EmployeeService,
    private alertService: AlertService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    await this.getInfo();
  }

  async getInfo() {
    try {
      const rs: any = await this.managerService.getInfo();
      if (rs.ok) {
        this.username = rs.info.username;
        this.firstName = rs.info.first_name;
        this.lastName = rs.info.last_name;
        this.positionName = rs.info.position_name;
        this.departmentName = rs.info.department_name;
        this.subDepartmentName = rs.info.sub_department_name;
      } else {
        this.alertService.error(rs.error);
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

  async save() {
    if (this.firstName && this.lastName) {
      try {
        const rs: any = await this.managerService.updateInfo(this.firstName, this.lastName, this.password);
        if (rs.ok) {
          this.alertService.success();
          const confirm = await this.alertService.confirm('เข้าสู่ระบบใหม่', 'ต้องการเข้าสู่ระบใหม่หรือไม่?');
          if (confirm) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('firstName');
            sessionStorage.removeItem('lastName');
            sessionStorage.removeItem('periodName');

            this.router.navigate(['/login']);
          }
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
