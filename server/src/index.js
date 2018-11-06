// 'use strict';
// require('dotenv').config()

import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
// import { join } from 'path';
// import bodyParser from 'body-parser';
// import AWS from 'aws-sdk';
// import configure from './config/db';
// import sgMail from '@sendgrid/mail';
// import db from './config/googleDb';
// import * as Storage from '@google-cloud/storage';

const port = 3000;
const CLIENT_PATH = path.join(__dirname, '../../client');
let app = express();

app.use(cors());
app.use(express.static(CLIENT_PATH));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('port', (process.env.PORT || 3000));

app.get('/', (_, res) => { 
  res.send('Hello World!') 
});
app.use('/api', routes); 

app.listen(app.get('port'), (err) => {
  if(err){
    console.log(err)
  }else{
    console.log(`server listening on ${app.get('port')}`)
  }
});


