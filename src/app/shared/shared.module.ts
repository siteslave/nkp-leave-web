import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
import { AlertService } from './alert.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './auth-guard.service';
import { ThaiDatePipe } from './thai-date.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManagerGuardService } from './manager-guard.service';
import { SharedService } from './services/shared.service';
import { ModalLeaveHistoryComponent } from './modal-leave-history/modal-leave-history.component';

@NgModule({
  declarations: [
    AlertComponent,
    ThaiDatePipe,
    ModalLeaveHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    AlertComponent,
    ThaiDatePipe,
    ModalLeaveHistoryComponent
  ],
  providers: [
    AlertService,
    LoginService,
    AuthGuardService,
    ManagerGuardService,
    SharedService
  ]
})
export class SharedModule {
}
