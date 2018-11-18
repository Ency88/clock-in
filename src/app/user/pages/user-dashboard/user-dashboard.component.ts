import { Component, OnInit } from '@angular/core';
import { UserTimesService } from '../../shared/user-times.service';
import { Observable } from 'rxjs';
import { WorkingStatus } from '../../components/time-logger/time-logger.component';

@Component({
  selector: 'ci-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public isUserWorking: Observable<boolean>;
  public userTarget: Observable<number>;
  public alreadyDone: Observable<number>;

  constructor(private timeService: UserTimesService) {}

  ngOnInit(): void {
    this.isUserWorking = this.timeService.isUserWorking('userId');
    this.userTarget = this.timeService.getUserDayTarget('userId');
  }

  public handleChangeWorkStatus(): void {
    this.alreadyDone = this.timeService.toggleWork('userId');
    this.isUserWorking = this.timeService.isUserWorking('userId');
    this.userTarget = this.timeService.getUserDayTarget('userId');
  }
}
