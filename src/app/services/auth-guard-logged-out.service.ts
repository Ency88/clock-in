import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardLoggedOutService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/user/dashboard']);
    return false;
  }
}
