import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private httpClient: HttpClient,
    @Inject('API_URL') private apiUrl: string
  ) {
  }

  register(username: string, password: string, userId: string) {
    const url = `${this.apiUrl}/line/register`;
    return this.httpClient.post(url, {
      username: username,
      password: password,
      userId: userId
    }).toPromise();
  }

  checkLineId(lineId: string) {
    const url = `${this.apiUrl}/line/id/${lineId}`;
    return this.httpClient.get(url).toPromise();
  }
}
