'use strict';
require('dotenv').config()

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import flash from 'connect-flash';
import session from 'express-session';
import compression from 'compression';
import configurePassport from './config/passport';


const PUBLIC_PATH = path.join(__dirname, '../public');
let app = express();


configurePassport(app);
app.use(session({secret: '{secret}', name: 'session_id', saveUninitialized: true, resave: true}));
app.use(flash());
app.use(compression());
app.use(cors());
app.use(express.static(PUBLIC_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../../views'));

app.get('/', (_, res) => { 
  res.render('login');
});

app.use('/api', routes); 


app.listen(app.get('port'), (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`server listening on ${app.get('port')}`)
  }
});
