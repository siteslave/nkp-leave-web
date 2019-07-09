import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AlertService } from 'src/app/shared/alert.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

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
  periodName = '';


  constructor(
    private sharedService: SharedService,
    private alertService: AlertService,
  ) {
    const token = sessionStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);
    this.employeeId = decoded.employee_id;
    this.periodName = decoded.period_name;
  }

  async ngOnInit() {
    await this.getHistory();
    // Highcharts.chart('chart1', this.options);
    // Highcharts.chart('chart2', this.pieOptions);
  }

  async createColumn(categories: any[], data: any[]) {
    var options: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'สถิติการลา'
      },
      subtitle: {
        text: this.periodName
      },
      xAxis: {
        categories: categories,
        labels: {
          rotation: -45
        },
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'จำนวน (วัน)'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: data
      // series: [{
      //   name: 'จำนวนวันลา',
      //   data: [10, 25, 5]
      // },
      // {
      //   name: 'คงเหลือ',
      //   data: [20, 45, 20]
      // }]
    }

    Highcharts.chart('chart1', options);
  }

  async createPie(data: any[]) {
    let pieOptions: any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'สรุปการลา'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: data
      }]
    }

    Highcharts.chart('chart2', pieOptions);
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

        let _categories = [];
        let _data = [];

        _data[0] = {};
        _data[0].name = 'จำนวนวันลา';
        _data[0].data = [];

        _data[1] = {};
        _data[1].name = 'คงเหลือ';
        _data[1].data = [];

        let _pieData = []; // {name: 'xxxx', y: 10}

        let idx = 0;

        this.itemsSummary.forEach(v => {
          _categories.push(v.leave_type_name);
          _data[0].data.push(+v.current_leave);
          _data[1].data.push(+v.remain_days);

          let obj: any = {};
          obj.name = v.leave_type_name;
          obj.y = +v.current_leave;
          if (idx === 0) {
            obj.sliced = true;
            obj.selected = true;
          }
          _pieData.push(obj);

          idx++;
        });

        // console.log(_categories);
        // console.log(_data);

        this.createColumn(_categories, _data);
        this.createPie(_pieData);
      }
    } catch (e) {
      console.log(e);
      this.alertService.error();
    }
  }

}
