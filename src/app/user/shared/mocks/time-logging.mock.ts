import { Observable, of } from 'rxjs';

export class TimeLoggingMock {
  private static working = false;
  private static startedTime: Date = undefined;
  private static alreadyDone = 0;
  private static userDayTarget = 120000;

  public static isUserWorking(): Observable<boolean> {
    return of(TimeLoggingMock.working);
  }

  public static getUserDayTarget(): Observable<number> {
    return of(TimeLoggingMock.userDayTarget);
  }

  public static toggleWorkStatus(): Observable<number> {
    if (TimeLoggingMock.working) {
      this.stopWorking();
    } else {
      this.startWorking();
    }
    return of(TimeLoggingMock.alreadyDone);
  }

  private static startWorking(): void {
    TimeLoggingMock.startedTime = new Date();
    TimeLoggingMock.working = true;
  }

  private static stopWorking(): void {
    TimeLoggingMock.working = false;
    const currentDate = new Date();
    TimeLoggingMock.alreadyDone += currentDate.getTime() - TimeLoggingMock.startedTime.getTime();
  }
}
