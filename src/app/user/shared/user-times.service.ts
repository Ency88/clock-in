import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { WorktimeTypeEnum } from '../../models/worktime-type.enum';
import { LocationService } from '../../services/location.service';

@Injectable({
  providedIn: 'root',
})
export class UserTimesService {
  private database;

  constructor(private locationService: LocationService) {
    this.database = firebase.firestore();
    this.database.settings({ timestampsInSnapshots: true });
  }

  /**
   * Get user's attendance in specified time range in ascending order
   */
  public getAttendanceForUser(userId: string, fromDate: Date, toDate: Date): Observable<any> {
    return from(
      this.database
        .collection('worktimes')
        .where('uid', '==', userId)
        .where('timestamp', '>=', fromDate)
        .where('timestamp', '<=', toDate)
        .orderBy('timestamp', 'asc')
        .get()
    ).pipe(catchError(err => throwError(err)));
  }

  public getAttendanceForUserInMonth(
    userId: string,
    fromDate: Date,
    toDate: Date
  ): Observable<number> {
    return from(
      this.database
        .collection('worktimes')
        .where('uid', '==', userId)
        .where('timestamp', '>=', fromDate)
        .where('timestamp', '<=', toDate)
        .orderBy('timestamp', 'asc')
        .get()
    ).pipe(
      catchError(err => throwError(err)),
      map(({ size, docs }) => docs.data().forEach())
    );
  }

  /**
   * Get user's working status
   */
  public isUserWorking(userId: string): Observable<boolean> {
    const lastMidnight = new Date();
    lastMidnight.setHours(0, 0, 0, 0);
    return this.getAttendanceForUser(userId, lastMidnight, new Date()).pipe(
      catchError(err => throwError(err)),
      map(
        ({ size, docs }) =>
          size ? docs[docs.length - 1].data().type === WorktimeTypeEnum.start : false
      )
    );
  }

  /**
   * Toggle user's working state and get user's time already done in seconds
   */
  public toggleWork(userId: string): Observable<number> {
    return this.locationService.getCurrentPosition().pipe(
      map(({ coords: { latitude, longitude } }) => ({ latitude, longitude })),
      // if error getting position or user has disabled location use zeros
      catchError(() => {
        this.updateLocation(userId, false).subscribe();
        return of({ latitude: 0, longitude: 0 });
      }),
      withLatestFrom(this.isUserWorking(userId)),
      switchMap(([{ latitude, longitude }, working]) => {
        this.updateLocation(userId, true).subscribe();
        return from(
          this.database.collection('worktimes').add({
            timestamp: new Date(),
            type: working ? WorktimeTypeEnum.stop : WorktimeTypeEnum.start,
            uid: userId,
            latitude,
            longitude,
          })
        );
      }),
      catchError(err => throwError(err)),
      switchMap(() => this.getAlreadyDone(userId))
    );
  }

  /**
   * Get user's day time target in seconds
   */
  public getUserDayTarget(userId: string): Observable<number> {
    return from(
      this.database
        .collection('users')
        .where('uid', '==', userId)
        .get()
    ).pipe(
      catchError(err => throwError(err)),
      map(({ size, docs }) => (size ? docs[0].data().dayTarget : 0))
    );
  }

  /**
   * Get user's day time target in seconds
   */
  public getUserMonthTarget(userId: string): Observable<number> {
    return from(
      this.database
        .collection('users')
        .where('uid', '==', userId)
        .get()
    ).pipe(
      catchError(err => throwError(err)),
      map(({ size, docs }) => (size ? docs[0].data().monthTarget : 0))
    );
  }

  /**
   * Get user's already done in seconds
   */
  public getAlreadyDone(userId: string): Observable<number> {
    const lastMidnight = new Date();
    lastMidnight.setHours(0, 0, 0, 0);
    return this.getAttendanceForUser(userId, lastMidnight, new Date()).pipe(
      catchError(err => throwError(err)),
      map(snapshots => {
        // if no worktimes
        if (!snapshots.size) {
          return 0;
        }
        let index = 0;
        let total = 0;
        let start;
        snapshots.forEach(doc => {
          if (index % 2) {
            total += doc.data().timestamp.seconds - start;
            start = 0;
          } else {
            start = doc.data().timestamp.seconds;
          }
          index++;
        });
        // if in progress
        const last = snapshots.docs[snapshots.docs.length - 1];
        if (last.data().type === WorktimeTypeEnum.start) {
          total += Math.floor(Date.now() / 1000) - last.data().timestamp.seconds;
        }
        return total;
      })
    );
  }

  /**
   * Set status of user's location tracking
   */
  public updateLocation(userId: string, enabled: boolean): Observable<boolean> {
    return from(
      this.database
        .collection('users')
        .where('uid', '==', userId)
        .get()
    ).pipe(
      catchError(err => throwError(err)),
      map(({ size, docs }) => size && docs[0].ref.update({ isLocation: enabled })),
      map(() => enabled)
    );
  }

  /**
   * Get user's location status
   */
  public getLocationStatus(userId: string): Observable<boolean> {
    return from(
      this.database
        .collection('users')
        .where('uid', '==', userId)
        .get()
    ).pipe(map(({ size, docs }) => size && docs[0].data().isLocation));
  }
}
