import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuardService {

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
        if (jwtDecoded.user_type === 'MANAGER') {
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
