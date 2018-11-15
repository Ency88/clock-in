import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Attendance } from '../../../models/attendance.model';
import { TimeRecord } from '../../../models/time.record.model';
import { TimeRecordEnum } from '../../../models/time.record.enum';
import { Observable } from 'rxjs';
import { UserTimesService } from '../../shared/user-times.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'ci-user-monthly-detail',
  templateUrl: './user-monthly-detail.component.html',
  styleUrls: ['./user-monthly-detail.component.scss'],
})
export class UserMonthlyDetailComponent implements OnInit {
  public panelOpenState: boolean;
  public workType: TimeRecordEnum = TimeRecordEnum.work;
  public attendances: Observable<any>;

  constructor(private userTimeService: UserTimesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.attendances = this.authService.user.pipe(
      switchMap(user => this.userTimeService.getAttendanceForUser(user.uid, new Date(), new Date()))
    );
  }

  headerText(attendance: Attendance) {
    return (
      attendance.day +
      ' ' +
      attendance.date.getDate() +
      '.' +
      attendance.date.getMonth() +
      '.' +
      attendance.date.getFullYear()
    );
  }

  calculateTotalTime(timeRecords: TimeRecord[]) {
    let result = 0;
    timeRecords.forEach(value => (result += value.to.getTime() - value.from.getTime()));
    result = result / 1000;
    const hours = Math.floor(result / 3600);
    const minutes = Math.floor((result % 3600) / 60);

    return hours + ' hrs, ' + minutes + ' mins';
  }
}
