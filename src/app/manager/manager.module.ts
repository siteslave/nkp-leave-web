import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ManagerService } from './manager.service';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [LayoutComponent, MainComponent, ProfileComponent, EmployeeComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule
  ],
  providers: [ManagerService]
})
export class ManagerModule {
}
