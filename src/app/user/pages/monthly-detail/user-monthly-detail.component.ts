import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { UserTimesService } from '../../shared/user-times.service';
import { AuthService } from '../../../services/auth.service';
import { WorktimeModel } from '../../../models/worktime.model';
import { FormControl } from '@angular/forms';
import { MatDatepicker, MatDialog, MatDialogConfig } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { SignTheMonthDialogComponent } from '../../components/sign-the-month-dialog/sign-the-month-dialog.component';
import { WorktimeTypeEnum } from '../../../models/worktime-type.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMonthlyDetailService } from './user-monthly-detail.service';
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
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class UserMonthlyDetailComponent implements OnInit {
  public panelOpenState: boolean;
  public groupedWorkTimes = new Map<String, WorktimeModel>();
  public date = new FormControl(moment());
  public myDate = new Date();
  public showSpinner = true;
  public monthlyTargetReached = false;
  public onSign = false;
  public userMonthTarget;
  public alreadyDoneTarget: number;
  public allWorktimes = [];

  constructor(
    private userTimeService: UserTimesService,
    private authService: AuthService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public userMonthlyDetailService: UserMonthlyDetailService
  ) {}

  ngOnInit(): void {
    this.userMonthlyDetailService.worktimes = [];
    this.authService.user
      .pipe(
        switchMap(user =>
          this.userTimeService.getAttendanceForUser(user.uid, this.myDate, new Date())
        )
      )
      .subscribe(r => {
        r.forEach(e => {
          this.userMonthlyDetailService.worktimes = [
            e.data(),
            ...this.userMonthlyDetailService.worktimes,
          ];
        });
        this.showSpinner = false;
      });

    this.authService.user
      .pipe(
        switchMap(user =>
          this.userTimeService.getAttendanceForUser(user.uid, new Date(2018, 1, 1), new Date())
        )
      )
      .subscribe(r => {
        r.forEach(e => {
          const date = new Date(e.data().timestamp.seconds * 1000);
          this.allWorktimes = [date.toISOString(), ...this.allWorktimes];
        });
      });
  }

  headerText(worktime) {
    const headerDate = new Date(worktime.timestamp.seconds * 1000);
    return (
      headerDate.getDate() + '-' + (headerDate.getMonth() + 1) + '-' + headerDate.getFullYear()
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
    this.authService.user
      .pipe(
        switchMap(user =>
          this.userTimeService.getAttendanceForUser(user.uid, this.myDate, new Date())
        )
      )
      .subscribe(r => {
        r.forEach(e => {
          this.userMonthlyDetailService.worktimes = [
            e.data(),
            ...this.userMonthlyDetailService.worktimes,
          ];
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
          this.alreadyDoneTarget += e.data().timestamp.seconds;
        });
        this.showSpinner = false;
      });
  }

  calculateTotalTimeDone() {
    this.alreadyDoneTarget = 0;
    let startDate;
    let stopDate;
    this.userMonthlyDetailService.worktimes.forEach(work => {
      const tmDate = this.userMonthlyDetailService.getDate(work.timestamp);
      if (startDate == null && work.type === WorktimeTypeEnum.start) {
        startDate = tmDate;
      } else if (stopDate == null && work.type === WorktimeTypeEnum.stop) {
        stopDate = tmDate;
      }
      if (startDate != null && stopDate != null) {
        console.log(stopDate);
        console.log(startDate);
        let result = stopDate.getSeconds().valueOf() - startDate.getSeconds().valueOf();
        if (result < 0) {
          result = -result;
        }
        console.log(result);
        this.alreadyDoneTarget = this.alreadyDoneTarget + result;
        console.log(this.alreadyDoneTarget);
        startDate = null;
        stopDate = null;
      }
    });
    this.alreadyDoneTarget = this.alreadyDoneTarget * 60 * 60;
  }

  onSignTheMonth() {
    this.calculateTotalTimeDone();
    this.onSign = !this.onSign;
    this.authService.user
      .pipe(switchMap(user => this.userTimeService.getUserMonthTarget(user.uid)))
      .subscribe(target => {
        this.userMonthTarget = target;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        console.log('Month target ' + this.userMonthTarget);
        console.log('Already done ' + this.alreadyDoneTarget);
        if (this.alreadyDoneTarget >= this.userMonthTarget) {
          dialogConfig.data = {
            title:
              'Do you want to sign this month? After signing the month any changes will be possible',
          };
        } else {
          dialogConfig.data = {
            title:
              'You have not reached month hours target. Do you want to really sign it?' +
              ' After signing the month any changes will be possible',
          };
        }

        this.dialog.open(SignTheMonthDialogComponent, dialogConfig);
      });
  }

  myFilter = (d: Date) => {
    d = new Date(d.toISOString());
    const day = 1,
      month = d.getMonth(),
      year = d.getFullYear();
    return this.allWorktimes.find(element => {
      element = new Date(element);
      const year_element = element.getFullYear();
      const day_element = 1;
      const month_element = element.getMonth();
      return year_element === year && day_element === day && month_element === month;
    });
  };

  onEditTheRecord(workTime: WorktimeModel) {
    this.userMonthlyDetailService.setWorkTime(workTime);
    this.userMonthlyDetailService.setWorkTimesToUpdate(
      this.userMonthlyDetailService.getKeyValuePairs(this.headerText(workTime))
    );
    this.router.navigate(['edit', this.headerText(workTime)], { relativeTo: this.route });
  }
}
