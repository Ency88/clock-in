import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const haveAccess: boolean = this.authService.isAuthenticated();
    if (!haveAccess) {
      console.log('AuthGuard');
      if (route.pathFromRoot.toString().match('edit')) {
        alert('You must be signed in to access clock-in!');
      }
    }
    return haveAccess;
  }
}
