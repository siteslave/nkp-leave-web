import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  list(query: any, employeeTypeId: any, departmentId: any, subDepartmentId: any, limit: number, offset: number) {
    const _url = `${ this.apiUrl }/employees?query=${ query }&employeeTypeId=${ employeeTypeId }&departmentId=${departmentId}&subDepartmentId=${subDepartmentId}&limit=${ limit }&offset=${ offset }`;
    return this.httpClient.get(_url)
      .toPromise();
  }

  create(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    employeeTypeId: string,
    departmentId: any,
    subDepartmentId: any,
    isEnabled: string
  ) {
    const _url = `${ this.apiUrl }/employees`;
    return this.httpClient.post(_url, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      employeeTypeId: employeeTypeId,
      departmentId: departmentId,
      subDepartmentId: subDepartmentId,
      isEnabled: isEnabled
    })
      .toPromise();
  }

  update(
    employeeId: any,
    firstName: string,
    lastName: string,
    employeeTypeId: string,
    departmentId: any,
    subDepartmentId: any,
    isEnabled: string
  ) {
    const _url = `${ this.apiUrl }/employees/${ employeeId }`;
    return this.httpClient.put(_url, {
      firstName: firstName,
      lastName: lastName,
      employeeTypeId: employeeTypeId,
      departmentId: departmentId,
      subDepartmentId: subDepartmentId,
      isEnabled: isEnabled
    })
      .toPromise();
  }

  delete(employeeId: any) {
    const _url = `${ this.apiUrl }/employees/${ employeeId }`;
    return this.httpClient.delete(_url)
      .toPromise();
  }
  
}
