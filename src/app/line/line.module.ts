import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineRoutingModule } from './line-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterSuccessComponent
  ],
  imports: [
    CommonModule,
    LineRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
  ]
})
export class LineModule { }
