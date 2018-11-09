import { Component, OnInit } from '@angular/core';
import { TimeLoggerService } from '../../../services/time.logger.service';

@Component({
  selector: 'ci-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public date: Date;
  public formattedDate = '';
  constructor(public timeLoggerService: TimeLoggerService) {}

  ngOnInit() {
    this.date = new Date();
    this.formattedDate =
      this.date.getDate() + '.' + this.date.getMonth() + '.' + this.date.getFullYear();
  }

  processTracking() {
    this.timeLoggerService.toggleTracking();
    const subscription = this.timeLoggerService.intervalObservable.subscribe(() => {
      this.timeLoggerService.timer++;
      this.timeLoggerService.calculateProgressValue();
      if (this.timeLoggerService.tracking === false) {
        subscription.unsubscribe();
      }
    });
  }
}
