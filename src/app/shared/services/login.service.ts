import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  doLogin(username: string, password: string, userType: any) {
    const _url = `${ this.apiUrl }/login`;
    return this.httpClient.post(_url, {
      username: username,
      password: password,
      userType: userType
    }).toPromise();
  }
}
