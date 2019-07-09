import { LineModule } from './line/line.module';
import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import { SharedModule } from './shared/shared.module';
import { MomentDateFormatter } from './shared/date-format.service';

import { environment } from '../environments/environment';
import { LoginModule } from './login/login.module';

registerLocaleData(localeTh, 'th');

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    Page3Component,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    LoginModule,
    LineModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'th' },
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: NgbDateParserFormatter, useClass: MomentDateFormatter },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
