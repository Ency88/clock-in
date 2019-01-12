import { Component, OnInit } from '@angular/core';
import { UserTimesService } from '../../shared/user-times.service';
import { AuthService } from '../../../services/auth.service';
import {WorktimeTypeEnum} from '../../../models/worktime-type.enum';

@Component({
  selector: 'ci-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public isWorking: boolean;
  public dayTarget: number;
  public alreadyDone: number;
  public loading = false;

  constructor(private timeService: UserTimesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe(({ uid }) => {
      this.timeService.getUserDayTarget(uid).subscribe(dayTarget => (this.dayTarget = dayTarget));
      this.timeService
        .getAlreadyDone(uid)
        .subscribe(alreadyDone => (this.alreadyDone = alreadyDone));
      this.timeService.isUserWorking(uid).subscribe(isWorking => (this.isWorking = isWorking));
    });
  }

  public handleChangeWorkStatus(): void {
    this.authService.user.subscribe(({ uid }) => {
      this.loading = true;
      this.timeService.toggleWork(uid, !this.isWorking ? WorktimeTypeEnum.start : WorktimeTypeEnum.stop).subscribe(alreadyDone => {
        this.alreadyDone = alreadyDone;
        this.timeService.isUserWorking(uid).subscribe(isWorking => {
          this.isWorking = isWorking;
          this.loading = false;
        });
      });
    });
  }
}
