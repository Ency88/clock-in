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
      const ref = await db.collection('worktimes').doc();
      await ref.set({
        timestamp: worktime.timestamp,
        type: worktime.type,
        uid,
        latitude: worktime.latitude,
        longitude: worktime.longitude,
        docId: ref.id,
      });
      console.log(`Created worktime: ${ref.id}`);
    }

    return promise.Promise.resolve(uid);
  }
}
