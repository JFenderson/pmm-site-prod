"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mailgunTransporter = exports.sendInBlueTransporter = exports.transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _sibApiV3Sdk = _interopRequireDefault(require("sib-api-v3-sdk"));

var _nodemailerSendinblueTransport = _interopRequireDefault(require("nodemailer-sendinblue-transport"));

var _nodemailerMailgunTransport = _interopRequireDefault(require("nodemailer-mailgun-transport"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var transporter = _nodemailer.default.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN
  }
});

exports.transporter = transporter;

var sendInBlueTransporter = _nodemailer.default.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  service: 'SendinBlue',
  auth: {
    user: process.env.SENDINBLUE_USER,
    pass: process.env.SENDINBLUE_PW
  }
});

exports.sendInBlueTransporter = sendInBlueTransporter;
var mgAuth = {
  auth: {
    api_key: process.env.MAILGUN_PK,
    domain: process.env.MAILGUN_DOMAIN
  }
};

var mailgunTransporter = _nodemailer.default.createTransport((0, _nodemailerMailgunTransport.default)(mgAuth));

exports.mailgunTransporter = mailgunTransporter;