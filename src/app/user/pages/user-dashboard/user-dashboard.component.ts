import { Component, OnInit } from '@angular/core';
import { UserTimesService } from '../../shared/user-times.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'ci-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public isUserWorking: Observable<boolean>;
  public userTarget: Observable<number>;
  public alreadyDone: Observable<number>;

  constructor(private timeService: UserTimesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserWorking = this.authService.user.pipe(
      switchMap(({ uid }) => this.timeService.isUserWorking(uid))
    );
    this.userTarget = this.authService.user.pipe(
      switchMap(({ uid }) => this.timeService.getUserDayTarget(uid))
    );
    this.alreadyDone = this.authService.user.pipe(
      switchMap(({ uid }) => this.timeService.getAlreadyDone(uid))
    );
  }

  public handleChangeWorkStatus(): void {
    this.alreadyDone = this.authService.user.pipe(
      switchMap(({ uid }) => this.timeService.toggleWork(uid))
    );
    this.isUserWorking = this.authService.user.pipe(
      switchMap(({ uid }) => this.timeService.isUserWorking(uid))
    );
  }
}
