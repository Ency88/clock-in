const firebase = require("firebase");
require('firebase/auth');
require('firebase/database');
require('firebase/storage');
require('typescript-require');

const production = require("./production.ts");

firebase.initializeApp(production.config);

firebase.auth().createUserWithEmailAndPassword(production.testUser1.email, production.testUser1.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));

firebase.auth().createUserWithEmailAndPassword(production.testUser2.email, production.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));

firebase.auth().createUserWithEmailAndPassword(production.testUser3.email, production.testUser2.password)
  .then(user => console.log(user))
  .catch(error => console.error(error));

//TODO fill 10 working days for each user (at least one break during day)
//working example
firebase.firestore().collection("/times").add(production.workingDay1).then(() => {
  console.log('Row created successfully');
}).catch(error => {
  console.log(error);
});
