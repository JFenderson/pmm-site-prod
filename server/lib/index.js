'use strict';

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

// import { join } from 'path';
// import bodyParser from 'body-parser';
// import AWS from 'aws-sdk';
// import configure from './config/db';
// import sgMail from '@sendgrid/mail';
// import db from './config/googleDb';
// import * as Storage from '@google-cloud/storage';
var port = 3000;

var CLIENT_PATH = _path.default.join(__dirname, '../../client');

var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.static(CLIENT_PATH));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.set('port', process.env.PORT || 3000);
app.get('/', function (_, res) {
  res.send('Welcome to the PMM Database!');
});
app.use('/api', _routes.default);
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server listening on ".concat(app.get('port')));
  }
});