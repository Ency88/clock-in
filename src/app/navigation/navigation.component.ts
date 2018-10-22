import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ci-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements AfterViewChecked {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  auth = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked() {
    const auth = this.authService.isAuthenticated();
    if (auth !== this.auth) {
      // check if it change, tell CD update view
      this.auth = auth;
      this.cdRef.detectChanges();
    }
  }
}
