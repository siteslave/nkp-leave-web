import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  fullname: any;

  constructor(private router: Router) {
    const firstName = sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');

    this.fullname = `${ firstName } ${ lastName }`;
  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('periodName');

    this.router.navigate(['/login']);
  }
}
