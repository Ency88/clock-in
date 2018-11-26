import * as firebase from 'firebase';
import { environment } from '../../src/environments/environment';
import seeds from './collections/combined';
import { promise } from 'selenium-webdriver';

firebase.initializeApp(environment.firebase);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default class Seeder {
  seed(): void {
    console.log('Seeding database...');
    this.mockUsers(seeds).then(() => console.log('Done seeding'));
  }

  private async mockUsers(users): promise.Promise<any> {
    for (const user of users) {
      console.log(`Started mocking user: ${user.user.email}...`);
      const uid = await this.mockUser(user.user, user.submissions, user.worktimes);
      console.log(`Done user: ${user.user.email} with uid: ${uid}`);
    }
    return promise.Promise.resolve();
  }

  private async mockUser(user, submissions, worktimes): promise.Promise<string> {
    // create user
    const {
      user: { uid },
    } = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
    console.log(`Created user: ${uid}`);
    // create submissions
    for (const submission of submissions) {
      const { id } = await db.collection('submissions').add({
        uid,
        period: submission.period,
      });
      console.log(`Created submission: ${id}`);
    }
    // create worktimes
    for (const worktime of worktimes) {
      const { id } = await db.collection('worktimes').add({
        timestamp: worktime.timestamp,
        type: worktime.type,
        uid,
      });
      console.log(`Created worktime: ${id}`);
    }

    return promise.Promise.resolve(uid);
  }

  // private mockUser(user): Observable<string> {
  //   return of(user).pipe(
  //     switchMap(({ email, password }) =>
  //       from(firebase.auth().createUserWithEmailAndPassword(email, password))
  //     ),
  //     map(({ user: { uid } }) => uid),
  //     tap(uid => console.log(`Created user: ${uid}`))
  //   );
  // }
  //
  // private mockWorktimesForUser(uid: string, docs: WorktimeModel[]): Observable<string> {
  //   return from(docs).pipe(
  //     mergeMap(({ timestamp, type }) =>
  //       db.collection('worktimes').add({
  //         timestamp,
  //         type,
  //         uid,
  //       })
  //     ),
  //     catchError(err => throwError(err)),
  //     map(({ id }) => id),
  //     tap(id => console.log(`Created worktime: ${id}`))
  //   );
  // }
  //
  // private mockSubmissionsForUser(uid: string, docs: SubmissionModel[]): Observable<string> {
  //   return from(docs).pipe(
  //     mergeMap(({ period }) =>
  //       db.collection('submissions').add({
  //         uid,
  //         period,
  //       })
  //     ),
  //     catchError(err => throwError(err)),
  //     map(({ id }) => id),
  //     tap(id => console.log(`Created submission: ${id}`))
  //   );
  // }
}
