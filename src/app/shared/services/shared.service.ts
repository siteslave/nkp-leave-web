import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
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

  getLeaveHisotryByEmployee(employeeId: any) {
    const _url = `${this.apiUrl}/leaves/${employeeId}/history`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  getPositions() {
    const _url = `${this.apiUrl}/positions`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  getPeriods() {
    const _url = `${this.apiUrl}/shared/periods`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
