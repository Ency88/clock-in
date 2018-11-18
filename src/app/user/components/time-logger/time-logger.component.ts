import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum WorkingStatus {
  WorkStarted,
  WorkStopped,
}

@Component({
  selector: 'ci-time-logger',
  templateUrl: './time-logger.component.html',
  styleUrls: ['./time-logger.component.scss'],
})
export class TimeLoggerComponent {
  @Input()
  public alreadyDone: number;

  @Input()
  public dayTarget: number;

  @Input()
  public isWorking: boolean;

  @Output()
  public workTrackingChanged = new EventEmitter<WorkingStatus>();

  get formattedDate() {
    return new Date().toDateString();
  }

  get percentageOfDone() {
    let result = 0;
    if (this.dayTarget !== 0) {
      result = Math.round((this.alreadyDone * 100) / this.dayTarget);
    }
    return result;
  }

  public onWorkStatusChanged() {
    if (this.isWorking) {
      this.workTrackingChanged.emit(WorkingStatus.WorkStopped);
    } else {
      this.workTrackingChanged.emit(WorkingStatus.WorkStarted);
    }
  }
}
