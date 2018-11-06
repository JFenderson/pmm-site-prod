"use strict";

var _express = require("express");

var _table = _interopRequireDefault(require("../utils/table"));

var _zipcodes = _interopRequireDefault(require("zipcodes"));

var _humanparser = _interopRequireDefault(require("humanparser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dotenv from 'dotenv';
// import db from '../config/googleDb';
// import { transporter, sendInBlueTransporter, mailgunTransporter } from '../config/nodemailer';
// dotenv.config();
var router = (0, _express.Router)();
var members = new _table.default('members'); // let pmmMember = db.firestore.collection('pmmMembers').doc();

router.get('/', function (req, res) {
  // pmmMember.get()
  // .then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     res.json(doc.data());
  //   })
  // })
  // .catch((err) => {
  //   console.log('Error getting documents', err);
  // })
  members.getAll().then(function (member) {
    res.status(200).json(member);
  }).catch(function (err) {
    console.log(err);
  });
});
router.get('/:id', function (req, res) {
  members.getOne(req.params.id).then(function (member) {
    res.status(200).json(member);
  }).catch(function (err) {
    console.log(err);
  });
});
router.post('/signup', function (req, res) {
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
    crabYear: crabYear //   const mailOption = {
    //     from: `fenderson.joseph@gmail.com`,// who the email is coming from..in the contact form
    //     to: `${name} <${email}>`,//who the email is going to
    //     subject: `Thank you for Signing Up to the PMM Weekend Site`,//subject line
    //     html: `
    //     <div style="text-align: center;">
    //       <h1>Hello <span style="color: purple;">${name.firstName}</span>,</h1> <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>
    //       <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>
    //       <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>
    //       <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>
    //     </div>`,
    // };
    // pmmMember.set(data)
    // .then((ref) => {
    //   res.json(ref.writeTime.toDate());
    //   console.log('added!')
    // })
    // .then((res) => {
    //   console.log(res);
    //   transporter.sendMail(mailOption,(error, res)=> {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('email sent!')
    //         res.sendStatus(201);
    //     }
    //     transporter.close();
    //   })
    // })
    // .catch((err)=> {
    //   console.log('There was an error posting users',err);
    // })

  };
  members.insert(data).then(function (id) {
    res.status(201).json(id);
  }).catch(function (err) {
    console.log(err);
  }); //   mailgunTransporter.sendMail(mailOption, (error, info)=> {
  //     if (error) {
  //         console.log(error);
  //     } else {
  //         console.log('email sent!')
  //         console.log(info)
  //     }
  //     transporter.close();
  //   })    
  // })
});
module.exports = router;