import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Attendance } from '../../../models/attendance.model';
import { TimeRecord } from '../../../models/time.record.model';

@Component({
  selector: 'ci-user-monthly-detail',
  templateUrl: './user-monthly-detail.component.html',
  styleUrls: ['./user-monthly-detail.component.scss'],
})
export class UserMonthlyDetailComponent {
  panelOpenState: boolean;
  attendancesArray = [
    {day: 'MO', date: new Date(2018, 10, 28), timeRecords: [
        {from: new Date(2018, 10, 28, 7, 0), to: new Date(2018, 10, 28, 10, 55), type: 'work'},
        {from: new Date(2018, 10, 28, 11, 30), to: new Date(2018, 10, 28, 15, 1), type: 'work'}
    ]},
    {day: 'TU', date: new Date(2018, 10, 28), timeRecords: [
        {from: new Date(2018, 10, 28, 7, 30), to: new Date(2018, 10, 28, 9, 30), type: 'work'},
        {from: new Date(2018, 10, 28, 10, 30), to: new Date(2018, 10, 28, 11, 38), type: 'work'}
      ]},
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  attendances = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(() => {
      return this.attendancesArray;
    })
  );

  headerText(attendance: Attendance) {
    return attendance.day + attendance.date.getDate() + '.' + attendance.date.getMonth() + '.' + attendance.date.getFullYear();
  }

  calculateTotalTime(timeRecords: TimeRecord[]) {
    let result = 0;
    timeRecords.forEach(value => result += value.to.getTime() - value.from.getTime());
    result = result / 1000;
    const hours = Math.floor(result / 3600);
    const minutes = Math.floor((result % 3600) / 60);
    const seconds = result % 60;

    return hours + ' hrs, ' + minutes + ' mins, ' + seconds + ' secs';
  }
}
