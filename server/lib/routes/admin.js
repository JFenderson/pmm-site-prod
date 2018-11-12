"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _table = _interopRequireDefault(require("../utils/table"));

var _tokens = require("../utils/tokens");

var _auth = require("../middleware/auth.mw");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { generateHash } from '../utils/security';
var router = (0, _express.Router)();
var members = new _table.default('members'); //base index page for admin

router.get('/signin', function (req, res) {
  res.render('login', {
    'message': req.flash('message')
  });
}); //when the admin post the login info to view the backend data

router.post('/signin', _passport.default.authenticate('local', {
  successRedirect: 'http://localhost:3000/api/user',
  //if success will redirect to user page to show database of users
  failureRedirect: '/signin',
  //if fail will redirect to signin page
  failureFlash: true
}), function (req, res, info) {
  res.render('user', {
    'message': req.flash()
  });
});
router.get('/me', _auth.tokenMiddleware, _auth.isLoggedIn, function (req, res) {
  res.json(req.user);
});
router.post('/login', function (req, res, next) {
  _passport.default.authenticate('local', function (err, token, info) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    } else if (!token) {
      return res.status(401).json(info);
    } else {
      return res.status(201).json(token);
    }
  })(req, res, next);
}); // router.get('/generate/:pw', (req, res, next)=>{
//     generateHash(req.params.pw)
//         .then((hash)=>{
//             res.send(hash)
//         })
//         .catch((err)=>{
//             next(err);
//         })
// })

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/signin');
}

var _default = router;
exports.default = _default;