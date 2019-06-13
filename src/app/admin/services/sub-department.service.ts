import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubDepartmentService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  list(query: any, departmentId: any, limit: number, offset: number) {
    // tslint:disable-next-line:variable-name
    const _url = `${ this.apiUrl }/sub-departments?query=${ query }&departmentId=${departmentId}&limit=${ limit }&offset=${ offset }`;
    return this.httpClient.get(_url)
      .toPromise();
  }

  create(subDepartmentName: string, departmentId: any) {
    // tslint:disable-next-line:variable-name
    const _url = `${ this.apiUrl }/sub-departments`;
    return this.httpClient.post(_url, {
      subDepartmentName: subDepartmentName,
      departmentId: departmentId
    })
      .toPromise();
  }

  update(subDepartmentId: any, subDepartmentName: string, departmentId: string) {
    // tslint:disable-next-line:variable-name
    const _url = `${ this.apiUrl }/sub-departments/${ subDepartmentId }`;
    return this.httpClient.put(_url, {
      subDepartmentName: subDepartmentName,
      departmentId: departmentId
    })
      .toPromise();
  }

  delete(subDepartmentId: any) {
    // tslint:disable-next-line:variable-name
    const _url = `${ this.apiUrl }/sub-departments/${ subDepartmentId }`;
    return this.httpClient.delete(_url)
      .toPromise();
  }

}
