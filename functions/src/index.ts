import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import UserRecord = admin.auth.UserRecord;
import { UserModel } from '../../src/app/services/models/user.model';

admin.initializeApp();

export const addUserToFirestoreOnCreate = functions.auth.user().onCreate((user: UserRecord) => {
  const userData: UserModel = {
    uid: user.uid,
    email: user.email,
  };

  admin
    .firestore()
    .collection('users')
    .add(userData)
    .catch(error => console.log('Error occurred: ', error))
    .then(success => console.log('Successful created.', success))
    .catch(error => console.log('Error occurred: ', error));
});
