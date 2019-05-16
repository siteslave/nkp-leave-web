import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, MainComponent, ProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    SharedModule,
    FormsModule
  ]
})
export class UsersModule { }
