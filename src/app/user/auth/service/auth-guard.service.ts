import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const haveAccess: boolean = this.authService.isAuthenticated();
    if (!haveAccess) {
      this.router.navigate(['user/login'], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    }
    return true;
  }
}
