import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

  getLeaves(limit: number, offset: number) {
    const _url = `${ this.apiUrl }/leaves?limit=${limit}&offset=${offset}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
