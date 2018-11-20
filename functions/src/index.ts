import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import UserRecord = admin.auth.UserRecord;
import { UserModel } from '../../src/app/services/models/user.model';
import {apiRoute} from './routes/Api.route';

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

const app = express();
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if (
    (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    idToken = req.cookies.__session;
  } else {
    res.status(403).send('Unauthorized');
    return;
  }
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedIdToken => {
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
    });
};

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(validateFirebaseIdToken);
app.use('/api', apiRoute);

exports.app = functions.https.onRequest(app);
