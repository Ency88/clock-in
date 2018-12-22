import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorktimeModel } from '../../../../models/worktime.model';
import { UserTimesService } from '../../../shared/user-times.service';
import { AuthService } from '../../../../services/auth.service';
import { UserMonthlyDetailService } from '../user-monthly-detail.service';
import { WorktimeTypeEnum } from '../../../../models/worktime-type.enum';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ci-user-edit-worktime',
  templateUrl: './user-edit-worktime.component.html',
  styleUrls: ['./user-edit-worktime.component.scss'],
})
export class UserEditWorktimeComponent implements OnInit {
  public date: Date;
  public workTime: WorktimeModel;
  public workTimeToDelete: WorktimeModel[] = [];
  constructor(
    private userTimeService: UserTimesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public userMonthlyDetailService: UserMonthlyDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.date = params['date'];
    });
    this.workTime = this.userMonthlyDetailService.getWorkTime();
  }

  dateNumberChange(event: string, work: WorktimeModel) {
    console.log(event);
    const array = event.split(':');
    const tempDate = this.userMonthlyDetailService.getDate(work.timestamp);
    tempDate.setHours(parseInt(array[0], 10));
    tempDate.setMinutes(parseInt(array[1], 10));
    if (event.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
      work.timestamp = tempDate;
    }
  }

  onDeleteWorkTime(index: number, workTime: WorktimeModel) {
    console.log(index);
    if (workTime.docId != null) {
      this.userMonthlyDetailService.workTimesToUpdate.splice(index, 1);
      this.workTimeToDelete.push(workTime);
    } else {
      this.userMonthlyDetailService.workTimesToUpdate.splice(index, 1);
    }
  }

  onAddWorkTime() {
    this.userTimeService.addEmptyWorkTimeToArray(
      WorktimeTypeEnum.start,
      this.userMonthlyDetailService.workTimesToUpdate
    );
    this.userTimeService.addEmptyWorkTimeToArray(
      WorktimeTypeEnum.stop,
      this.userMonthlyDetailService.workTimesToUpdate
    );
  }

  onDataSave() {
    this.userMonthlyDetailService.workTimesToUpdate.forEach(workTime => {
      if (workTime.docId != null) {
        this.userTimeService.updateWorkTime(workTime).subscribe();
      } else {
        this.authService.user
          .pipe(switchMap(({ uid }) => this.userTimeService.addWorkTime(uid, workTime)))
          .subscribe();
      }
    });
    this.workTimeToDelete.forEach(workTimeRow => {
      this.userTimeService.deleteWorkTime(workTimeRow.docId).subscribe();
    });
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCancelButton() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
