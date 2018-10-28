import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ci-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @ViewChild('drawer')
  public drawer;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  toggle() {
    this.drawer.toggle();
  }

  logout() {
    this.authService.logout().subscribe(
      () => this.router.navigate(['login']),
      () =>
        this.snackBar.open('Log out was not successful', '', {
          duration: 1500,
          horizontalPosition: 'end',
        })
    );
  }
}
