import { Injectable } from '@angular/core';
import { IntervalObservable } from 'rxjs-compat/observable/IntervalObservable';
import { MatProgressSpinner, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class TimeLoggerService {
  public timer = 0;
  private intervalObservable;
  public tracking: Boolean = false;
  public progress_spinner: MatProgressSpinner;
  public progressValue = 0;

  constructor(private snackBar: MatSnackBar) {}

  public setProgressSpinner(progress_spinner: MatProgressSpinner) {
    this.progress_spinner = progress_spinner;
  }

  startTracking() {
    this.tracking = true;
    this.intervalObservable = IntervalObservable.create(1000);
    this.intervalObservable = this.intervalObservable.subscribe(() => {
      if (this.tracking === false) {
        this.intervalObservable.unsubscribe();
      }
      this.timer++;
      this.calculateProgressValue();
    });
  }

  calculateProgressValue() {
    // 8 h = 8 * 60 * 60
    const defaultLimit = 10; // for demo purposes 10 secs
    this.progressValue = (this.timer / defaultLimit) * 100;
    if (this.progressValue === 100) {
      this.stopTracking();
      this.snackBar.open('Time limit reached. Go home', '', {
        duration: 1500,
        horizontalPosition: 'end',
      });
      // send data to firebase
    }
  }

  stopTracking() {
    this.tracking = false;
  }
}
