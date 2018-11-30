import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {UserTimesService} from '../../shared/user-times.service';
import {AuthService} from '../../../services/auth.service';
import {WorktimeModel} from '../../../models/worktime.model';
import {FormControl} from '@angular/forms';
import {MatDatepicker} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {Moment} from 'moment';
const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ci-user-monthly-detail',
  templateUrl: './user-monthly-detail.component.html',
  styleUrls: ['./user-monthly-detail.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserMonthlyDetailComponent implements OnInit {
  public panelOpenState: boolean;
  public worktimes: WorktimeModel[] = [];
  public groupedWorkTimes = new Map<String, WorktimeModel>();
  public date = new FormControl(moment());
  public myDate = new Date();
  public showSpinner = true;

  constructor(private userTimeService: UserTimesService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.pipe(
      switchMap(user => this.userTimeService.getAttendanceForUser(user.uid, this.myDate, new Date()))
    ).subscribe(r => {
      r.forEach(e => {
        this.worktimes = [e.data(), ...this.worktimes];
      });
      this.showSpinner = false;
    });
  }

  headerText(worktime) {
    const headerDate = new Date(worktime.timestamp.seconds * 1000);
    return (
      headerDate.getDate() +
      '.' +
      headerDate.getMonth() +
      '.' +
      headerDate.getFullYear()
    );
  }
  
  
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.myDate = ctrlValue.toDate();
    this.onDateChange();
  }
  
  onDateChange() {
    this.showSpinner = true;
    let tempWorkTime;
    this.authService.user.pipe(
      switchMap(user => this.userTimeService.getAttendanceForUser(user.uid, this.myDate, new Date()))
    ).subscribe(r => {
      r.forEach(e => {
        this.worktimes = [e.data(), ...this.worktimes];
        if (tempWorkTime == null) {
          tempWorkTime = e.data();
          this.groupedWorkTimes.set(this.headerText(e.data()), e.data());
        } else {
          if (this.headerText(tempWorkTime) === this.headerText(e.data())) {
            this.groupedWorkTimes.set(this.headerText(tempWorkTime), e.data());
          }
          tempWorkTime = e.data();
          this.showSpinner = false;
        }
      });
    };
  }

  getKeyValuePairs(workTime: String) {
    const result: WorktimeModel[] = [];
    this.worktimes.forEach(e => {
      if (this.headerText(e) === workTime) {
        result.push(e);
      }
    });
    return result.reverse();
  }

  getDateFromNumberTimestamp(timestamp){
    const timestampDate = new Date(timestamp.seconds * 1000);
    let zero = '';
    if (timestampDate.getMinutes().toString().length === 1){
      zero = '0';
    }
    return (
      timestampDate.getHours() + ':' + zero + timestampDate.getMinutes()
    );
  }
}
