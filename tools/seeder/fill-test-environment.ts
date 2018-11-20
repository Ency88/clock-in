import * as firebase from 'firebase';
import {environment} from '../../src/environments/environment';
import * as seeds from './seeds';

firebase.initializeApp(environment.firebase);
const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

firebase
  .auth()
  .createUserWithEmailAndPassword(seeds.testUser1.email, seeds.testUser1.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));
firebase
  .auth()
  .createUserWithEmailAndPassword(seeds.testUser2.email, seeds.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));
firebase
  .auth()
  .createUserWithEmailAndPassword(seeds.testUser3.email, seeds.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));

firestore
  .collection('/times')
  .add(seeds.workingDay1)
  .then(() => {
    console.log('Row workingDay1 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay2)
  .then(() => {
    console.log('Row workingDay2 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay3)
  .then(() => {
    console.log('Row workingDay3 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay4)
  .then(() => {
    console.log('Row workingDay4 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay5)
  .then(() => {
    console.log('Row workingDay5 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay6)
  .then(() => {
    console.log('Row workingDay6 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay7)
  .then(() => {
    console.log('Row workingDay7 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay8)
  .then(() => {
    console.log('Row workingDay8 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay9)
  .then(() => {
    console.log('Row workingDay9 created successfully');
  })
  .catch(error => {
    console.log(error);
  });

firestore
  .collection('/times')
  .add(seeds.workingDay10)
  .then(() => {
    console.log('Row workingDay10 created successfully');
  })
  .catch(error => {
    console.log(error);
  });
