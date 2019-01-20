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

  /**
   * Get formatted current date.
   */
  get formattedDate() {
    return new Date().toDateString();
  }

  /**
   * Get percentage for chart.
   */
  get percentageOfDone() {
    // if overtime
    if (this.alreadyDone > this.dayTarget) {
      return 100;
    }
    // calculate percentage
    let result = 0;
    if (this.dayTarget !== 0) {
      result = Math.round((this.alreadyDone * 100) / this.dayTarget);
    }
    return result;
  }

  /**
   * Get formatted day target time.
   */
  get target() {
    const time = new Date(0, 0, 0, 0, 0, 0, 0);
    time.setSeconds(this.dayTarget);
    let text = time.getHours() ? `${time.getHours()}h ` : '';
    text += time.getMinutes() ? `${time.getMinutes()}min` : '';
    return text;
  }

  /**
   * Get formatted already done time.
   */
  get done() {
    // if overtime, display it
    let seconds = 0;
    let text = '';
    if (this.alreadyDone > this.dayTarget) {
      seconds = this.alreadyDone - this.dayTarget;
      text += 'overtime ';
    } else {
      seconds = this.alreadyDone;
    }

    if (seconds) { // working already in progress
      const time = new Date(0, 0, 0, 0, 0, 0, 0);
      time.setSeconds(seconds);
      text += time.getHours() ? `${time.getHours()}h ` : '';
      text += time.getMinutes() ? `${time.getMinutes()}min` : '';
    } else {
      text += '0min';
    }
    return text;
  }

  /**
   * Emit working status.
   */
  public onWorkStatusChanged() {
    if (this.isWorking) {
      this.workTrackingChanged.emit(WorkingStatus.WorkStopped);
    } else {
      this.workTrackingChanged.emit(WorkingStatus.WorkStarted);
    }
  }
}
