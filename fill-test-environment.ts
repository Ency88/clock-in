import * as firebase from 'firebase';
const production = require('./production.ts');

firebase.initializeApp(production.config);
const firestore = firebase.firestore();
firestore.settings( { timestampsInSnapshots: true });

firebase.auth().createUserWithEmailAndPassword(production.testUser1.email, production.testUser1.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));
firebase.auth().createUserWithEmailAndPassword(production.testUser2.email, production.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));
firebase.auth().createUserWithEmailAndPassword(production.testUser3.email, production.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));

firestore.collection('/times').add(production.workingDay1).then(() => {
  console.log('Row workingDay1 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay2).then(() => {
  console.log('Row workingDay2 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay3).then(() => {
  console.log('Row workingDay3 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay4).then(() => {
  console.log('Row workingDay4 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay5).then(() => {
  console.log('Row workingDay5 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay6).then(() => {
  console.log('Row workingDay6 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay7).then(() => {
  console.log('Row workingDay7 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay8).then(() => {
  console.log('Row workingDay8 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay9).then(() => {
  console.log('Row workingDay9 created successfully');
}).catch(error => {
  console.log(error);
});

firestore.collection('/times').add(production.workingDay10).then(() => {
  console.log('Row workingDay10 created successfully');
}).catch(error => {
  console.log(error);
});
