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


// const CLIENT_PATH = path.join(__dirname, '../../client');
let app = express();


configurePassport(app);
app.use(compression());
app.use(cors());
// app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', (process.env.PORT || 3000));

app.get('/', (_, res) => { 
  res.send('Welcome to the PMM Database!') 
});
app.use('/api', routes); 

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`server listening on ${app.get('port')}`)
  }
});