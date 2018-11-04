import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressSpinner} from '@angular/material';
import { IntervalObservable } from 'rxjs-compat/observable/IntervalObservable';
import {TimeLoggerService} from '../../../services/time.logger.service';

@Component({
  selector: 'ci-time-logger',
  templateUrl: './time-logger.component.html',
  styleUrls: ['./time-logger.component.scss']
})
export class TimeLoggerComponent implements OnInit {
  public date: Date;
  @ViewChild('progress_spinner')
  public progress_spinner: MatProgressSpinner;

  constructor(public timeLoggerService: TimeLoggerService) {
  }

  ngOnInit() {
    this.date = new Date();
    this.timeLoggerService.setProgressSpinner(this.progress_spinner);
  }

  processTracking() {
    if (this.timeLoggerService.tracking === false) {
      this.timeLoggerService.startTracking();
    } else {
      this.timeLoggerService.stopTracking();
    }
  }
}
