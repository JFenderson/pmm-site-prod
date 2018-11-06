"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _express = require("express");

var _nodemailer2 = require("../config/nodemailer");

var _sibApiV3Sdk = _interopRequireDefault(require("sib-api-v3-sdk"));

var _libphonenumberJs = require("libphonenumber-js");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.send('Server working. Please post at "/contact" to submit a message.');
});
router.post('/', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var mailOption = {
    from: "".concat(name, " <").concat(email, ">"),
    // who the email is coming from..in the contact form
    to: 'joseph.fenderson@gmail.com',
    //who the email is going to
    subject: "New Message from ".concat(email, " from the PMM Weekend Site"),
    //subject line
    text: message,
    html: "<div style=\"text-align: center; margin: auto; margin-right: auto 0; border: 1px solid; padding: 10px; width: 50%; height: auto;\">\n        <h1>Hey PMM Admin,</h1> \n        <h1>You have a new message from the PMM Weekend Site</h1>\n        <h2>From: ".concat(name, "</h2>\n        <h2>Message:</h2>\n        <h2>").concat(message, " </h2>\n      </div>")
  };

  _nodemailer2.transporter.sendMail(mailOption, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      res.sendStatus(201);
    }

    _nodemailer2.transporter.close();
  }); // sendInBlueTransporter.sendMail(mailOption, (error, res) => {
  //     if (error) {
  //         console.log(error);
  //     } else {
  //         console.log('email sent!')
  //         res.sendStatus(201);
  //     }
  //     transporter.close();
  // });


  _nodemailer2.mailgunTransporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent!');
      console.log(info);
    }

    _nodemailer2.transporter.close();
  });
});
var _default = router;
exports.default = _default;