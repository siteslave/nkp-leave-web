import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  register(username: string, password: string, userId: string) {
    const url = `${this.apiUrl}/register`;
    return this.httpClient.post(url, {
      username: username,
      password: password,
      userId: userId
    }).toPromise();
  }
}
