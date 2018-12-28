import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorktimeModel } from '../../../../models/worktime.model';
import { UserTimesService } from '../../../shared/user-times.service';
import { AuthService } from '../../../../services/auth.service';
import { UserMonthlyDetailService } from '../user-monthly-detail.service';
import { WorktimeTypeEnum } from '../../../../models/worktime-type.enum';

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
    if (event.match('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')) {
      const [hours, minutes] = event.split(':');
      const originalDate = this.userMonthlyDetailService.getDate(work.timestamp);
      originalDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      work.timestamp = originalDate;
    }
  }

  onDeleteWorkTime(index: number, workTime: WorktimeModel) {
    console.log('index', index, workTime);
    if (workTime.docId != null) {
      this.userMonthlyDetailService.workTimesToUpdate.splice(index, 1);
      this.workTimeToDelete.push(workTime);
    } else {
      this.userMonthlyDetailService.workTimesToUpdate.splice(index, 1);
    }
  }

  onAddWorkTime(workTime: WorktimeModel) {
    const fromWorktime = {
      timestamp: workTime.timestamp,
      type: WorktimeTypeEnum.start,
      uid: null,
      latitude: null,
      longitude: null,
      docId: null,
    };
    this.userMonthlyDetailService.workTimesToUpdate.push(fromWorktime);
    const toWorktime = {
      timestamp: workTime.timestamp,
      type: WorktimeTypeEnum.stop,
      uid: null,
      latitude: null,
      longitude: null,
      docId: null,
    };
    this.userMonthlyDetailService.workTimesToUpdate.push(toWorktime);
  }

  onDataSave() {
    this.authService.user.subscribe(async ({uid}) => {
      for (const workTime of this.userMonthlyDetailService.workTimesToUpdate) {
        if (workTime.docId != null) {
          await this.userTimeService.updateWorkTime(workTime).toPromise();
        } else {
          await this.userTimeService.addWorkTime(uid, workTime).toPromise();
        }
      }
      for (const workTime of this.workTimeToDelete) {
        await this.userTimeService.deleteWorkTime(workTime.docId).toPromise();
      }
      this.router.navigate(['/user/monthly-detail'], { relativeTo: this.route });
    });
  }

  onCancelButton() {
    this.router.navigate(['/user/monthly-detail'], { relativeTo: this.route });
  }
}
