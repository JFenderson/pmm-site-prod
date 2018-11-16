import * as admin from 'firebase-admin';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import * as serviceAccount from '../../../serviceAccountKey.json';
import Storage from '@google-cloud/storage';


// var config = {
//   apiKey: process.env.GOOGLE_API_KEY,
//   authDomain: process.env.GOOGLE_AUTH_DOMAIN,
//   databaseURL: process.env.GOOGLE_DATABASE_URL,
//   projectId: process.env.GOOGLE_PROJECTID,
//   storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
//   messagingSenderId: process.env.GOOGLE_MESSAGEID
// };

// admin.initializeApp({
//   config,
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://pmm-site-a57b9.firebaseio.com"
// });

var firestore = admin.firestore();
var storage = admin.storage();

const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

// var bucket = admin.storage().bucket();
// app.storage()

  // var storage = firebase.storage().ref();

  // let storage = firebase.app().storage('gs://pmm-site-a57b9.appspot.com');

export default { firestore, storage, config };