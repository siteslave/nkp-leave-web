import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  jwtHelper: JwtHelperService = new JwtHelperService;

  items = [];
  itemsSummary = [];
  employeeId: any;

  constructor(
    private sharedService: SharedService,
    private alertService: AlertService,
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.employeeId = decoded.employee_id;
  }

  async ngOnInit() {
    await this.getHistory();
  }

  async getHistory() {
    try {
      const rs: any = await this.sharedService.getLeaveHisotryByEmployee(this.employeeId);
      if (rs.ok) {
        this.items = rs.rows;
        this.itemsSummary = rs.summary.map(v => {
          if (v.leave_days_num > 0) {
            v.remain_days = +v.leave_days_num - +v.current_leave;
          } else {
            v.remain_days = 0;
          }

          return v;
        });
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

}
