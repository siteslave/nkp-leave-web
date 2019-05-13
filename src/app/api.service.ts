import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  getUser() {
    return this.httpClient.get('https://randomuser.me/api/?results=50')
      .toPromise();
  }
}
