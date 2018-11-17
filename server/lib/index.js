'use strict';

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var firebase = _interopRequireWildcard(require("firebase"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _routes = _interopRequireDefault(require("./routes"));

var _serviceAccountKey = _interopRequireDefault(require("../../serviceAccountKey.json"));

var _morgan = _interopRequireDefault(require("morgan"));

var _ejs = _interopRequireDefault(require("ejs"));

var _zipcodes = _interopRequireDefault(require("zipcodes"));

var _humanparser = _interopRequireDefault(require("humanparser"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express.default)();
var config = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  databaseURL: process.env.GOOGLE_DATABASE_URL,
  projectId: process.env.GOOGLE_PROJECTID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGEID
};

_firebaseAdmin.default.initializeApp({
  config: config,
  credential: _firebaseAdmin.default.credential.cert(_serviceAccountKey.default),
  databaseURL: "https://pmm-site-a57b9.firebaseio.com"
});

app.use((0, _morgan.default)('dev'));
app.set('port', process.env.PORT || 8080);
app.use((0, _cors.default)());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(_express.default.static('views'));
app.set('view engine', 'pug');
app.set('views', _path.default.join(__dirname, '../../views'));
app.get('/', function (_, res) {
  res.render('index');
  isAuthenticated();
});

var db = _firebaseAdmin.default.firestore();

var database = _firebaseAdmin.default.database();

var settings = {
  /* your settings... */
  timestampsInSnapshots: true
};

_firebaseAdmin.default.firestore().settings(settings);

var memeberRef = database.ref('/pmmMembers');
var pmmMember = db.collection('pmmMembers');
app.post('/user', function (req, res) {
  var _req$body = req.body,
      email = _req$body.email,
      phoneNumber = _req$body.phoneNumber,
      crabYear = _req$body.crabYear;

  var name = _humanparser.default.parseName(req.body.name);

  var location = _zipcodes.default.lookup(req.body.location);

  var data = {
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  };
  pmmMember.doc("".concat(name.firstName, "_").concat(name.lastName)).set(data).then(function (ref) {
    res.json(ref.writeTime);
    console.log('added!');
  }).catch(function (err) {
    console.log('There was an error posting users', err);
  });
  memeberRef.push(data);
});
app.get('/user', function (req, res) {
  pmmMember.get().then(function (snapshot) {
    res.render('user', {
      member_list: snapshot.forEach(function (doc) {
        return doc.data();
      })
    }); // snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>',doc.data())
    // })
  }).catch(function (err) {
    console.log('Error getting documents', err);
  });
});

function isAuthenticated(req, res, next) {
  var user = firebase.auth().currentUser;

  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.redirect('index');
  }
} // app.use('/api', routes); 


app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server listening on ".concat(app.get('port')));
  }
});