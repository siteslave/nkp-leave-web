import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  imageUrl: any;

  username: any;
  firstName: any;
  lastName: any;
  password: any;
  positionName: any;
  departmentName: any;
  subDepartmentName: any;

  fileName: any;
  filesToUpload: File;

  constructor(
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private router: Router,
    @Inject('API_URL') private apiUrl: string,
    private zone: NgZone
  ) {
    const token = sessionStorage.getItem('token');
    this.imageUrl = `${this.apiUrl}/services/employees/image?token=${token}`;
  }

  async ngOnInit() {
    await this.getInfo();
  }

  async fileChangeEvent(fileInput: any) {
    console.log(fileInput);

    this.filesToUpload = null;
    this.filesToUpload = <File>fileInput.target.files[0];
    if (this.filesToUpload) {
      this.fileName = fileInput.target.files[0].name;
      const confirm = await this.alertService.confirm('อัปโหลดไฟล์', `อัปโหลดไฟล์ ${this.fileName} ใช่หรือไม่?`);
      if (confirm) {
        this._doUpload();
      }
    }
  }

  async _doUpload() {
    try {
      const rs: any = await this.employeeService.uploadFile(this.filesToUpload);
      if (rs.ok) {
        this.alertService.success();
        // this.imageUrl = null;
        const rnd = moment().format('x');
        const token = sessionStorage.getItem('token');
        this.imageUrl = `${this.apiUrl}/services/employees/image?token=${token}&rnd=${rnd}`;
        // this.zone.run(() => {
          
        // });

      } else {
        this.alertService.error(rs.error);
      }
    } catch (error) {
      console.log(error);
      this.alertService.error();
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.employeeService.getInfo();
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
        const rs: any = await this.employeeService.updateInfo(this.firstName, this.lastName, this.password);
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
