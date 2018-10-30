import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {Attendance} from '../../../models/attendance.model';
import {TimeRecord} from '../../../models/time.record.model';

@Component({
  selector: 'ci-user-monthly-detail',
  templateUrl: './user-monthly-detail.component.html',
  styleUrls: ['./user-monthly-detail.component.scss'],
})
export class UserMonthlyDetailComponent {
  panelOpenState: boolean;
  attendancesArray = [
    new Attendance('M',
      new Date(2018, 10, 28),
      [
        new TimeRecord(
          new Date(2018, 10, 28, 7, 30),
          new Date(2018, 10, 28, 9, 30), 'work'),
        new TimeRecord(
          new Date(2018, 10, 28, 10, 30),
          new Date(2018, 10, 28, 11, 38), 'work')]),
    new Attendance('T',
      new Date(2018, 10, 29),
      [
        new TimeRecord(
          new Date(2018, 10, 29, 7, 30),
          new Date(2018, 10, 29, 12, 30), 'work'),
        new TimeRecord(
          new Date(2018, 10, 29, 12, 32),
          new Date(2018, 10, 29, 15, 38), 'work')])
  ];

  /** Based on the screen size, switch from standard to one column per row */
  attendances = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return this.attendancesArray;
      }
      return this.attendancesArray;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {
  }


  calculateTotalTime(timeRecords: TimeRecord[]) {
    let res = 0;
    for (const timeRecord of timeRecords) {
      res += timeRecord.to.getTime() - timeRecord.from.getTime();
    }
    let hr = 0;
    let min = 0;
    let sec = 0;
    while (res >= 1000) {
      res = (res - 1000);
      sec = sec + 1;
      if (sec >= 60) {
        min = min + 1;
      }
      if (sec === 60) {
        sec = 0;
      }
      if (min >= 60) {
        hr = hr + 1;
      }
      if (min === 60) {
        min = 0;
      }
      if (hr >= 24) {
        hr = (hr - 24);
      }
    }
    return hr + 'h ' + min + 'min';
  }
}
