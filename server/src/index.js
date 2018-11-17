'use strict';
require('dotenv').config()

import express from 'express';
import cors from 'cors';
import path from 'path';
import * as firebase from 'firebase';
import admin from 'firebase-admin';
import routes from './routes';
import serviceAccount from '../../serviceAccountKey.json';
import logger from 'morgan';
import ejs from 'ejs';
import ZipCodes from 'zipcodes';
import human from 'humanparser';


let app = express();

var config = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.GOOGLE_AUTH_DOMAIN,
  databaseURL: process.env.GOOGLE_DATABASE_URL,
  projectId: process.env.GOOGLE_PROJECTID,
  storageBucket: process.env.GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.GOOGLE_MESSAGEID
};

admin.initializeApp({
  config,
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pmm-site-a57b9.firebaseio.com"
});

app.use(logger('dev'));
app.set('port', (process.env.PORT || 8080));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('views'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../../views'));

app.get('/', (_, res) => { 
  res.render('index');

  isAuthenticated()
});

let db = admin.firestore();
let database = admin.database();

const settings = {/* your settings... */ timestampsInSnapshots: true};
admin.firestore().settings(settings);

let pmmMember = db.collection('pmmMembers');

app.post('/user', (req, res) => {
  let { email, phoneNumber, crabYear} = req.body;
  let name = human.parseName(req.body.name);
  let location = ZipCodes.lookup(req.body.location);
 
  let data = {
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  }

  pmmMember.doc(`${name.firstName}_${name.lastName}`).set(data)
    .then((ref) => {
      res.json(ref.writeTime);
      console.log('added!')
    })
    .catch((err)=> {
      console.log('There was an error posting users',err);
    })
  
    database.ref(`/pmmMembers/${name.firstName}_${name.lastName}`).push(data);
});

app.get('/user', (req, res) => {
  pmmMember.get()
  .then(snapshot => {
    res.render('user', {member_list: snapshot.forEach((doc) => {
      return doc.data();
    })});
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, '=>',doc.data())
    // })
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  })

});

function isAuthenticated(req, res, next) {
  var user = firebase.auth().currentUser;

  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.redirect('index');
  }
}


// app.use('/api', routes); 

app.listen(app.get('port'), (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`server listening on ${app.get('port')}`)
  }
});
