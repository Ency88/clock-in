import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { attendanceForUserMock } from './mocks/attendance-for-user.mock';
import { TimeLoggingMock } from './mocks/time-logging.mock';

@Injectable({
  providedIn: 'root',
})
export class UserTimesService {
  constructor() {}

  public getAttendanceForUser(userId: string, fromDate: Date, toDate: Date): Observable<any> {
    return of(attendanceForUserMock);
  }

  public isUserWorking(userId: string): Observable<boolean> {
    return TimeLoggingMock.isUserWorking();
  }

  public toggleWork(userId: string): Observable<number> {
    return TimeLoggingMock.toggleWorkStatus();
  }

  public getUserDayTarget(userId: string): Observable<number> {
    return TimeLoggingMock.getUserDayTarget();
  }
}
