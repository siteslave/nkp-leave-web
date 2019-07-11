import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveSettingService {
  token: any;
  httpOptions: any;

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
    this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
  }

  getSetting(periodId: any, employeeTypeId: any) {
    const _url = `${this.apiUrl}/leave-settings/settings`;
    return this.httpClient.post(_url,
      {
        periodId: periodId,
        employeeTypeId: employeeTypeId
      },
      this.httpOptions)
      .toPromise();
  }

  saveSetting(periodId: any, employeeTypeId: any, data: any[]) {
    const _url = `${this.apiUrl}/leave-settings/save-settings`;
    return this.httpClient.post(_url,
      {
        periodId: periodId,
        employeeTypeId: employeeTypeId,
        data: data
      },
      this.httpOptions)
      .toPromise();
  }

}
