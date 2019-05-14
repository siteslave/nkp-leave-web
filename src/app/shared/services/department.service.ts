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

  list() {
    // tslint:disable-next-line:variable-name
    const _url = `${this.apiUrl}/departments`;
    return this.httpClient.get(_url)
      .toPromise();
  }
}
