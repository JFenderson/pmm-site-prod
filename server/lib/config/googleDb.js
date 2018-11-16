"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var admin = _interopRequireWildcard(require("firebase-admin"));

var _firebase = _interopRequireDefault(require("firebase"));

require("firebase/auth");

require("firebase/database");

var serviceAccount = _interopRequireWildcard(require("../../../serviceAccountKey.json"));

var _storage = _interopRequireDefault(require("@google-cloud/storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
var settings = {
  /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings); // var bucket = admin.storage().bucket();
// app.storage()
// var storage = firebase.storage().ref();
// let storage = firebase.app().storage('gs://pmm-site-a57b9.appspot.com');

var _default = {
  firestore: firestore,
  storage: storage,
  config: config
};
exports.default = _default;