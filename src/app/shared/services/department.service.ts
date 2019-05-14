import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  list(limit: number, offset: number) {
    // tslint:disable-next-line:variable-name
    const _url = `${this.apiUrl}/departments?limit=${limit}&offset=${offset}`;
    return this.httpClient.get(_url)
      .toPromise();
  }

  create(departmentName: string, isEnabled: string) {
    // tslint:disable-next-line:variable-name
    const _url = `${this.apiUrl}/departments`;
    return this.httpClient.post(_url, {
      departmentName: departmentName,
      isEnabled: isEnabled
    })
      .toPromise();
  }

  update(departmentId: any, departmentName: string, isEnabled: string) {
    // tslint:disable-next-line:variable-name
    const _url = `${this.apiUrl}/departments/${departmentId}`;
    return this.httpClient.put(_url, {
      departmentName: departmentName,
      isEnabled: isEnabled
    })
      .toPromise();
  }
}
