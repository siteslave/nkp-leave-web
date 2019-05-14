import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../shared/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styles: []
})
export class DepartmentComponent implements OnInit {

  items: any = [];

  constructor(
    private departmentService: DepartmentService
  ) {
  }

  async ngOnInit() {
    await this.getDepartments();
  }

  async getDepartments() {
    try {
      const rs: any = await this.departmentService.list();
      if (rs.rows) {
        this.items = rs.rows;
      }
    } catch (e) {
      console.log(e);
    }
  }

}
