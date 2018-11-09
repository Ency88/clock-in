import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs-compat/observable/IntervalObservable';

@Injectable({
  providedIn: 'root',
})
export class TimeLoggerService {
  public timer = 0;
  intervalObservable;
  public tracking: Boolean = false;
  public progressValue = 0;

  constructor() {}

  startTracking() {
    this.tracking = true;
    this.intervalObservable = IntervalObservable.create(1000);
  }

  calculateProgressValue() {
    // 8 h = 8 * 60 * 60
    const defaultLimit = 10; // for demo purposes 10 secs
    this.progressValue = (this.timer / defaultLimit) * 100;
    if (this.progressValue === 100) {
      this.progressValue = 0;
      this.timer = 0;
      this.stopTracking();
      // send data to firebase
    }
  }

  stopTracking() {
    this.tracking = false;
  }

  toggleTracking() {
    if (this.tracking === false) {
      this.startTracking();
    } else {
      this.stopTracking();
    }
  }
}
