import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeModalsModule } from './modals/employee-modals.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [LayoutComponent, MainComponent, ProfileComponent, DashboardComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    EmployeeModalsModule
  ],
  providers: [EmployeeService]
})
export class EmployeeModule {
}
