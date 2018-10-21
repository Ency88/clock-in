import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ci-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss'],
})
export class UserLogoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.logout();
  }
}
