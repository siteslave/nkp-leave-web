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
    const _url = `${ this.apiUrl }/services/manager/leaves?limit=${ limit }&offset=${ offset }&status=${status}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  createLeaves(leaveTypeId: any, startDate: any, endDate: any, leaveDays: number, remark: any) {
    const _url = `${ this.apiUrl }/services/users/leaves`;
    const body: any = {
      leaveTypeId: leaveTypeId,
      startDate: startDate,
      endDate: endDate,
      leaveDays: leaveDays,
      remark: remark
    };
    return this.httpClient.post(_url, body, this.httpOptions).toPromise();
  }

  updateLeaves(leaveId: any, leaveTypeId: any, startDate: any, endDate: any, leaveDays: number, remark: any) {
    const _url = `${ this.apiUrl }/services/users/leaves/${leaveId}`;
    const body: any = {
      leaveTypeId: leaveTypeId,
      startDate: startDate,
      endDate: endDate,
      leaveDays: leaveDays,
      remark: remark
    };
    return this.httpClient.put(_url, body, this.httpOptions).toPromise();
  }

  getLeaveTypes() {
    const _url = `${ this.apiUrl }/services/users/leave-types`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  deleteLeave(leaveId: any) {
    const _url = `${ this.apiUrl }/services/users/leaves/${leaveId}`;
    return this.httpClient.delete(_url, this.httpOptions).toPromise();
  }

}
