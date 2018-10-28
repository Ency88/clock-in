import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.user.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['login']);
        }
        return !!user;
      })
    );
  }
}
