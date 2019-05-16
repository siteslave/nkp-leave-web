import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  jwtHelper = new JwtHelperService();

  constructor(private router: Router) {
  }

  canActivate() {

    const token = sessionStorage.getItem('token');

    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      console.log('is expired: ', isExpired);

      if (isExpired) {
        // login
        this.router.navigate(['/login']);
        return false;
      } else {
        const jwtDecoded = this.jwtHelper.decodeToken(token);
        if (jwtDecoded.user_type === 'ADMIN') {
          return true;
        } else {
          // login
          this.router.navigate(['/login']);
          return false;
        }
      }
    } else {
      // login
      this.router.navigate(['/login']);
      return false;
    }

  }
}
