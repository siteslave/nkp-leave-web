import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

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

  getLeaves(limit: number, offset: number, status: any = null) {
    const _url = `${this.apiUrl}/services/manager/leaves?limit=${limit}&offset=${offset}&status=${status}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  getEmployees(query: any, limit: number, offset: number) {
    const _url = `${this.apiUrl}/services/manager/employees?limit=${limit}&offset=${offset}&query=${query}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  getLeavesAll(limit: number, offset: number, status: any = '') {
    const _url = `${this.apiUrl}/services/manager/leaves?limit=${limit}&offset=${offset}&status=${status}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  updateStatus(leaveId: any, status: any) {
    const _url = `${this.apiUrl}/services/manager/leaves/status`;
    const body: any = {
      leaveId: leaveId,
      status: status
    };
    return this.httpClient.post(_url, body, this.httpOptions).toPromise();
  }

  updateInfo(firstName: any, lastName: any, password: any = null) {
    const _url = `${this.apiUrl}/services/manager/info`;
    const body = {
      firstName: firstName,
      lastName: lastName,
      password: password
    };
    return this.httpClient.put(_url, body, this.httpOptions).toPromise();
  }

  getInfo() {
    const _url = `${this.apiUrl}/services/manager/info`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
