import * as admin from 'firebase-admin';
import firebase from "firebase";
import * as serviceAccount from '../../../serviceAccountKey.json';
import Storage from '@google-cloud/storage';


var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.GOOGLE_DATEBASE_URL,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET
});

var firestore = admin.firestore();
var storage = admin.storage();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var bucket = admin.storage().bucket();
app.storage()
//setting up google storage buckets
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  // Initialize Firebase
  var config = {
    apiKey: process.env.GOOGLE_API_KEY,
    authDomain: process.env.GOOGLE_AUTH_DOMAIN,
    databaseURL: process.env.GOOGLE_DATABASE_URL,
    projectId: process.env.GOOGLE_PROJECTID,
    storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
    messagingSenderId: process.env.GOOGLE_MESSAGEID
  };
  // var storage = firebase.storage().ref();

  // let storage = firebase.app().storage('gs://pmm-site-a57b9.appspot.com');

export default { firestore, storage, config };