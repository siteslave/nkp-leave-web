import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  list(query: any, userType: any, limit: number, offset: number) {
    const _url = `${ this.apiUrl }/users?query=${ query }&userType=${ userType }&limit=${ limit }&offset=${ offset }`;
    return this.httpClient.get(_url)
      .toPromise();
  }

  create(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string,
    isEnabled: string
  ) {
    const _url = `${ this.apiUrl }/users`;
    return this.httpClient.post(_url, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      userType: userType,
      isEnabled: isEnabled
    })
      .toPromise();
  }

  update(
    userId: any,
    firstName: string,
    lastName: string,
    userType: string,
    isEnabled: string
  ) {
    const _url = `${ this.apiUrl }/users/${ userId }`;
    return this.httpClient.put(_url, {
      firstName: firstName,
      lastName: lastName,
      userType: userType,
      isEnabled: isEnabled
    })
      .toPromise();
  }

  delete(userId: any) {
    const _url = `${ this.apiUrl }/users/${ userId }`;
    return this.httpClient.delete(_url)
      .toPromise();
  }

}
